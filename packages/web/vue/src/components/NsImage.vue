<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import NsIcon from "./NsIcon.vue";

export type NsImageRatio = "auto" | "1/1" | "4/3" | "3/2" | "16/9" | "3/4" | "21/9";
export type NsImageFit = "cover" | "contain" | "fill" | "scale-down";
export type NsImagePosition = "center" | "top" | "bottom" | "start" | "end";
export type NsImageRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type NsImagePlaceholder = "shimmer" | "blur" | "color" | "none";
export type NsImageCaptionPlacement = "below" | "overlay";

export interface NsImageProps {
  /** Image address. Without one, the placeholder stays, such as while an API answers. */
  src?: string;
  /** What the image shows. Leave it empty only for a decorative image. */
  alt?: string;
  /** Frame shape; `auto` keeps the image's own. */
  ratio?: NsImageRatio;
  fit?: NsImageFit;
  /** Part kept in view when the image is cropped. */
  position?: NsImagePosition;
  radius?: NsImageRadius;
  /** What shows while loading. `blur` uses `lazySrc`. */
  placeholder?: NsImagePlaceholder;
  /** Small image shown blurred while the full one loads. */
  lazySrc?: string;
  /** Image used when `src` fails, before the alt text panel. */
  fallbackSrc?: string;
  srcset?: string;
  sizes?: string;
  loading?: "lazy" | "eager";
  caption?: string;
  captionPlacement?: NsImageCaptionPlacement;
  /** Opens the full image in a lightbox with zoom. */
  preview?: boolean;
  bordered?: boolean;
  /** Purely visual: empty alt, hidden from assistive tech. */
  decorative?: boolean;
  previewLabel?: string;
  closeLabel?: string;
  zoomInLabel?: string;
  zoomOutLabel?: string;
}

const props = withDefaults(defineProps<NsImageProps>(), {
  alt: "",
  ratio: "16/9",
  fit: "cover",
  position: "center",
  radius: "lg",
  placeholder: "shimmer",
  loading: "lazy",
  captionPlacement: "below",
  preview: false,
  bordered: false,
  decorative: false,
  previewLabel: "Enlarge image",
  closeLabel: "Close",
  zoomInLabel: "Zoom in",
  zoomOutLabel: "Zoom out"
});

const emit = defineEmits<{ load: [event: Event]; error: [event: Event]; preview: [] }>();

type State = "loading" | "loaded" | "error";
const state = ref<State>("loading");
const usingFallback = ref(false);
const current = computed(() => (usingFallback.value ? props.fallbackSrc : props.src));
const image = ref<HTMLImageElement>();

/* A cached image can be complete before Vue listens: read its state once mounted. */
function inspect() {
  const element = image.value;
  if (element?.complete && element.getAttribute("src")) {
    state.value = element.naturalWidth > 0 ? "loaded" : "error";
  }
}

onMounted(inspect);

watch(
  () => props.src,
  async () => {
    usingFallback.value = false;
    state.value = "loading";
    await nextTick();
    inspect();
  }
);

function onLoad(event: Event) {
  state.value = "loaded";
  emit("load", event);
}

function onError(event: Event) {
  if (props.fallbackSrc && !usingFallback.value) {
    usingFallback.value = true;
    return;
  }
  state.value = "error";
  emit("error", event);
}

const positions: Record<NsImagePosition, string> = {
  center: "center",
  top: "center top",
  bottom: "center bottom",
  start: "left center",
  end: "right center"
};

const frameStyle = computed(() => ({
  "--ns-image-ratio": props.ratio === "auto" ? undefined : props.ratio.replace("/", " / "),
  "--ns-image-fit": props.fit,
  "--ns-image-position": positions[props.position],
  "--ns-image-radius": props.radius === "full" ? "9999px" : `var(--ns-radius-${props.radius})`
}));

const altText = computed(() => (props.decorative ? "" : props.alt));
const showPlaceholder = computed(() => state.value === "loading" && props.placeholder !== "none");

/* Lightbox: a native modal dialog, so focus, Escape and the top layer come with it. */
const dialog = ref<HTMLDialogElement>();
const zoom = ref(1);

function open() {
  if (state.value === "error") return;
  zoom.value = 1;
  dialog.value?.showModal();
  emit("preview");
}

function close() {
  dialog.value?.close();
}

function zoomBy(step: number) {
  zoom.value = Math.min(4, Math.max(1, Math.round((zoom.value + step) * 10) / 10));
}

function onBackdrop(event: MouseEvent) {
  if (event.target === dialog.value) close();
}
</script>

<template>
  <component
    :is="caption ? 'figure' : 'div'"
    :class="[
      'ns-image',
      `ns-image--${state}`,
      `ns-image--placeholder-${placeholder}`,
      `ns-image--caption-${captionPlacement}`,
      {
        'ns-image--auto': ratio === 'auto',
        'ns-image--bordered': bordered,
        'ns-image--previewable': preview && state !== 'error'
      }
    ]"
    :style="frameStyle"
  >
    <div class="ns-image__frame">
      <img
        v-if="placeholder === 'blur' && lazySrc && state === 'loading'"
        class="ns-image__lazy"
        :src="lazySrc"
        alt=""
        aria-hidden="true"
      />
      <span v-if="showPlaceholder" class="ns-image__placeholder" aria-hidden="true" />

      <img
        v-if="current"
        v-show="state !== 'error'"
        ref="image"
        class="ns-image__img"
        :src="current"
        :srcset="usingFallback ? undefined : srcset"
        :sizes="usingFallback ? undefined : sizes"
        :alt="altText"
        :aria-hidden="decorative || undefined"
        :loading="loading"
        decoding="async"
        @load="onLoad"
        @error="onError"
      />

      <span
        v-if="state === 'error'"
        class="ns-image__fallback"
        :role="decorative ? undefined : 'img'"
        :aria-label="decorative ? undefined : altText || undefined"
      >
        <slot name="fallback">
          <NsIcon name="image" size="lg" />
          <small v-if="altText" aria-hidden="true">{{ altText }}</small>
        </slot>
      </span>

      <span v-if="$slots.overlay" class="ns-image__overlay"><slot name="overlay" /></span>

      <!-- The trigger covers the frame, so the image keeps its own alt and role. -->
      <button
        v-if="preview && state !== 'error'"
        type="button"
        class="ns-image__trigger"
        :aria-label="altText ? `${previewLabel} : ${altText}` : previewLabel"
        @click="open"
      >
        <span class="ns-image__zoom" aria-hidden="true"><NsIcon name="search" size="sm" /></span>
      </button>
    </div>

    <figcaption v-if="caption" class="ns-image__caption">{{ caption }}</figcaption>

    <dialog
      v-if="preview"
      ref="dialog"
      class="ns-image__lightbox"
      :aria-label="altText || previewLabel"
      @click="onBackdrop"
    >
      <div class="ns-image__tools">
        <button
          type="button"
          :aria-label="zoomOutLabel"
          :disabled="zoom <= 1"
          @click="zoomBy(-0.5)"
        >
          <NsIcon name="minus" size="sm" />
        </button>
        <output>{{ Math.round(zoom * 100) }} %</output>
        <button type="button" :aria-label="zoomInLabel" :disabled="zoom >= 4" @click="zoomBy(0.5)">
          <NsIcon name="plus" size="sm" />
        </button>
        <button type="button" :aria-label="closeLabel" autofocus @click="close">
          <NsIcon name="close" size="sm" />
        </button>
      </div>
      <div class="ns-image__stage" @click.self="close">
        <img
          :src="current"
          :alt="altText"
          :style="{ transform: `scale(${zoom})` }"
          @dblclick="zoom = zoom > 1 ? 1 : 2"
        />
      </div>
      <p v-if="caption" class="ns-image__lightbox-caption">{{ caption }}</p>
    </dialog>
  </component>
</template>

<style>
.ns-image {
  position: relative;
  display: grid;
  gap: var(--ns-space-2);
  min-inline-size: 0;
  margin: 0;
}

.ns-image__frame {
  position: relative;
  display: block;
  overflow: hidden;
  inline-size: 100%;
  aspect-ratio: var(--ns-image-ratio, auto);
  border-radius: var(--ns-image-radius);
  background: var(--ns-color-surface-muted);
  isolation: isolate;
}

.ns-image--bordered .ns-image__frame::after {
  position: absolute;
  inset: 0;
  z-index: 3;
  border: 1px solid color-mix(in srgb, var(--ns-color-text) 10%, transparent);
  border-radius: inherit;
  content: "";
  pointer-events: none;
}

.ns-image__img {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: var(--ns-image-fit);
  object-position: var(--ns-image-position);
  opacity: 1;
  transition:
    opacity var(--ns-duration-normal) var(--ns-easing-standard),
    transform var(--ns-duration-slow) var(--ns-easing-standard);
}

.ns-image--auto .ns-image__img {
  block-size: auto;
}

.ns-image--loading .ns-image__img {
  opacity: 0;
}

.ns-image--auto.ns-image--loading .ns-image__frame {
  min-block-size: 120px;
}

/* Placeholders */
.ns-image__placeholder,
.ns-image__lazy {
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
}

.ns-image__lazy {
  object-fit: var(--ns-image-fit);
  filter: blur(14px);
  transform: scale(1.08);
}

.ns-image--placeholder-blur .ns-image__placeholder {
  display: none;
}

.ns-image--placeholder-shimmer .ns-image__placeholder {
  background: linear-gradient(
      100deg,
      transparent 30%,
      color-mix(in srgb, var(--ns-color-surface) 70%, transparent) 50%,
      transparent 70%
    )
    0 0 / 200% 100% var(--ns-color-surface-muted);
  animation: ns-image-shimmer 1.4s linear infinite;
}

.ns-image--placeholder-color .ns-image__placeholder {
  background: var(--ns-color-primary-muted);
}

@keyframes ns-image-shimmer {
  from {
    background-position: 150% 0;
  }
  to {
    background-position: -50% 0;
  }
}

/* Fallback */
.ns-image__fallback {
  position: absolute;
  inset: 0;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: var(--ns-space-2);
  padding: var(--ns-space-4);
  background: var(--ns-color-surface-sunken);
  color: var(--ns-color-text-subtle);
  text-align: center;
}

.ns-image--auto .ns-image__fallback {
  position: relative;
  min-block-size: 140px;
}

.ns-image__fallback small {
  max-inline-size: 28ch;
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
  line-height: 1.4;
}

/* Overlay content and caption */
.ns-image__overlay {
  position: absolute;
  inset-block-start: var(--ns-space-2);
  inset-inline-start: var(--ns-space-2);
  z-index: 2;
  display: flex;
  gap: var(--ns-space-1);
}

.ns-image__caption {
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
  line-height: 1.45;
}

/* Over the frame: the caption is the figure's last child, laid over the frame's foot. */
.ns-image--caption-overlay .ns-image__caption {
  position: absolute;
  inset: auto 0 0;
  z-index: 2;
  border-end-start-radius: var(--ns-image-radius);
  border-end-end-radius: var(--ns-image-radius);
  pointer-events: none;
  padding: var(--ns-space-8) var(--ns-space-4) var(--ns-space-3);
  background: linear-gradient(to bottom, transparent, rgb(0 0 0 / 0.7));
  color: #fff;
  font-weight: var(--ns-font-weight-medium);
  text-align: start;
}

/* Preview trigger: a transparent button over the whole frame. */
.ns-image__trigger {
  position: absolute;
  inset: 0;
  z-index: 2;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: inherit;
  background: none;
  cursor: zoom-in;
}

.ns-image--previewable .ns-image__frame:hover .ns-image__img {
  transform: scale(1.03);
}

.ns-image__trigger:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
  outline-offset: calc(var(--ns-focus-ring-width) * -1);
}

.ns-image__zoom {
  position: absolute;
  inset-block-start: var(--ns-space-2);
  inset-inline-end: var(--ns-space-2);
  z-index: 2;
  display: grid;
  place-items: center;
  inline-size: 32px;
  block-size: 32px;
  border-radius: var(--ns-radius-full);
  background: rgb(0 0 0 / 0.5);
  color: #fff;
  opacity: 0;
  transition: opacity var(--ns-duration-fast) var(--ns-easing-standard);
}

.ns-image__trigger:hover .ns-image__zoom,
.ns-image__trigger:focus-visible .ns-image__zoom {
  opacity: 1;
}

/* Lightbox */
.ns-image__lightbox {
  inline-size: 100vw;
  max-inline-size: 100vw;
  block-size: 100dvh;
  max-block-size: 100dvh;
  margin: 0;
  padding: 0;
  border: 0;
  background: rgb(8 10 14 / 0.92);
  color: #fff;
}

.ns-image__lightbox[open] {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  animation: ns-image-open var(--ns-duration-normal) var(--ns-easing-standard);
}

.ns-image__lightbox::backdrop {
  background: transparent;
}

.ns-image__tools {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--ns-space-1);
  padding: var(--ns-space-3);
}

.ns-image__tools button {
  display: grid;
  place-items: center;
  inline-size: 40px;
  block-size: 40px;
  border: 0;
  border-radius: var(--ns-radius-full);
  background: rgb(255 255 255 / 0.1);
  color: #fff;
  cursor: pointer;
}

.ns-image__tools button:hover:not(:disabled) {
  background: rgb(255 255 255 / 0.2);
}

.ns-image__tools button:disabled {
  opacity: 0.4;
  cursor: default;
}

.ns-image__tools button:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

.ns-image__tools button:last-child {
  margin-inline-start: var(--ns-space-3);
}

.ns-image__tools output {
  min-inline-size: 5ch;
  font-family: var(--ns-font-mono);
  font-size: 12px;
  text-align: center;
}

.ns-image__stage {
  display: grid;
  place-items: center;
  overflow: auto;
  padding: var(--ns-space-4);
}

.ns-image__stage img {
  max-inline-size: 100%;
  max-block-size: 100%;
  object-fit: contain;
  transition: transform var(--ns-duration-normal) var(--ns-easing-standard);
  cursor: zoom-in;
}

.ns-image__lightbox-caption {
  margin: 0;
  padding: var(--ns-space-3) var(--ns-space-4) var(--ns-space-5);
  color: rgb(255 255 255 / 0.8);
  font-size: var(--ns-text-body-sm-size);
  text-align: center;
}

@keyframes ns-image-open {
  from {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ns-image--placeholder-shimmer .ns-image__placeholder,
  .ns-image__lightbox[open] {
    animation: none;
  }

  .ns-image--previewable .ns-image__frame:hover .ns-image__img {
    transform: none;
  }
}
</style>
