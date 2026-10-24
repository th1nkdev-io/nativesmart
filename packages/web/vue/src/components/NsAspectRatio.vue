<script setup lang="ts">
import { computed, onMounted, onUpdated, ref } from "vue";
import NsIcon from "./NsIcon.vue";

export type NsAspectRatioPreset =
  | "square"
  | "photo"
  | "video"
  | "wide"
  | "portrait"
  | "story"
  | "golden";
/** A preset token, a number (`16 / 9`), a `"w:h"` or `"w/h"` string, or `"auto"` for the media's own ratio. */
export type NsAspectRatioValue =
  | NsAspectRatioPreset
  | "auto"
  | number
  | `${number}:${number}`
  | `${number}/${number}`;
export type NsAspectRatioBreakpoint = "sm" | "md" | "lg" | "xl";
export type NsAspectRatioFit = "cover" | "contain" | "fill" | "scale-down";
export type NsAspectRatioFocus = "center" | "top" | "bottom" | "start" | "end";
export type NsAspectRatioRadius = "image" | "none" | "sm" | "md" | "lg" | "xl" | "full";
export type NsAspectRatioPlaceholder = "shimmer" | "color" | "none";

export interface NsAspectRatioProps {
  ratio?: NsAspectRatioValue;
  /** Other ratios from a breakpoint up, for example `{ md: "wide" }` for a banner. */
  responsive?: Partial<Record<NsAspectRatioBreakpoint, Exclude<NsAspectRatioValue, "auto">>>;
  fit?: NsAspectRatioFit;
  /** Part of the media kept in view when it is cropped. */
  focus?: NsAspectRatioFocus;
  radius?: NsAspectRatioRadius;
  placeholder?: NsAspectRatioPlaceholder;
  title?: string;
  description?: string;
  /** Darkens the bottom of the media so overlays stay readable. On by default with a caption. */
  scrim?: boolean;
  /** Media zooms in slightly on hover and keyboard focus. */
  zoom?: boolean;
  /** Forces the placeholder, for content that is not media. */
  loading?: boolean;
  /** Caps the height, for example `60vh`: the media is cropped further instead of growing. */
  maxHeight?: string;
  /** Rendered element: `figure`, `li`, `a`… */
  as?: string;
}

const props = withDefaults(defineProps<NsAspectRatioProps>(), {
  ratio: "video",
  fit: "cover",
  focus: "center",
  radius: "image",
  placeholder: "shimmer",
  scrim: false,
  zoom: false,
  loading: false,
  as: "div"
});

const emit = defineEmits<{ load: [event: Event]; error: [event: Event] }>();

const presets = new Set(["square", "photo", "video", "wide", "portrait", "story", "golden"]);

/** Any accepted ratio as a CSS `aspect-ratio` value. */
function cssRatio(value: NsAspectRatioValue) {
  if (typeof value === "number") return value > 0 ? `${value}` : "1";
  if (presets.has(value)) return `var(--ns-aspect-${value})`;
  const [width, height] = value.split(/[:/]/).map((part) => Number(part.trim()));
  return width > 0 && height > 0 ? `${width} / ${height}` : "16 / 9";
}

const auto = computed(() => props.ratio === "auto");
const breakpoints = computed(
  () => Object.keys(props.responsive ?? {}) as NsAspectRatioBreakpoint[]
);

const style = computed(() => {
  const vars: Record<string, string> = {
    "--ns-aspect-radius": `var(--ns-radius-${props.radius})`,
    "--ns-aspect-fit": props.fit
  };
  if (!auto.value) vars["--ns-aspect-ratio"] = cssRatio(props.ratio);
  for (const point of breakpoints.value) {
    vars[`--ns-aspect-ratio-${point}`] = cssRatio(props.responsive![point]!);
  }
  if (props.maxHeight) vars["max-block-size"] = props.maxHeight;
  return vars;
});

/* Media state: images, videos and frames report it; any other content counts as loaded. */
type MediaState = "loading" | "loaded" | "error";
const state = ref<MediaState>("loading");
const media = ref<HTMLElement>();
const fallbackLabel = ref<string>();

function inspect() {
  const element = media.value?.querySelector<HTMLElement>("img, video, iframe");
  if (!element) {
    state.value = "loaded";
    return;
  }
  fallbackLabel.value = element.getAttribute("alt") || element.getAttribute("title") || undefined;
  if (element instanceof HTMLImageElement && element.complete && element.getAttribute("src")) {
    state.value = element.naturalWidth > 0 ? "loaded" : "error";
  } else if (element instanceof HTMLVideoElement && element.readyState >= 2) {
    state.value = "loaded";
  } else if (state.value !== "error") {
    state.value = "loading";
  }
}

/* load and error do not bubble, but they cross ancestors in the capture phase. */
function onLoad(event: Event) {
  state.value = "loaded";
  emit("load", event);
}

function onError(event: Event) {
  state.value = "error";
  emit("error", event);
}

let lastSource: string | null | undefined;
onMounted(() => {
  lastSource = media.value?.querySelector("img, video, iframe")?.getAttribute("src");
  inspect();
});
/* A new source starts over; other re-renders keep the current state. */
onUpdated(() => {
  const source = media.value?.querySelector("img, video, iframe")?.getAttribute("src");
  if (source === lastSource) return;
  lastSource = source;
  state.value = "loading";
  inspect();
});

const showPlaceholder = computed(
  () => props.placeholder !== "none" && (props.loading || state.value === "loading")
);
const hasCaption = computed(() => Boolean(props.title || props.description));
</script>

<template>
  <component
    :is="as"
    :class="[
      'ns-aspect-ratio',
      `ns-aspect-ratio--${state}`,
      `ns-aspect-ratio--focus-${focus}`,
      ...breakpoints.map((point) => `ns-aspect-ratio--at-${point}`),
      {
        'ns-aspect-ratio--auto': auto,
        'ns-aspect-ratio--zoom': zoom,
        'ns-aspect-ratio--busy': loading
      }
    ]"
    :style="style"
    :aria-busy="loading || state === 'loading' || undefined"
  >
    <span
      v-if="showPlaceholder"
      :class="['ns-aspect-ratio__placeholder', `ns-aspect-ratio__placeholder--${placeholder}`]"
      aria-hidden="true"
    />
    <div ref="media" class="ns-aspect-ratio__media" @load.capture="onLoad" @error.capture="onError">
      <slot />
    </div>
    <div
      v-if="state === 'error'"
      class="ns-aspect-ratio__fallback"
      :role="fallbackLabel ? 'img' : undefined"
      :aria-label="fallbackLabel"
    >
      <slot name="fallback"><NsIcon name="image" size="lg" /></slot>
    </div>
    <span
      v-if="(scrim || hasCaption) && !showPlaceholder"
      class="ns-aspect-ratio__scrim"
      aria-hidden="true"
    />
    <div v-if="$slots.overlay" class="ns-aspect-ratio__overlay"><slot name="overlay" /></div>
    <div v-if="hasCaption && !showPlaceholder" class="ns-aspect-ratio__caption">
      <strong v-if="title" class="ns-aspect-ratio__title">{{ title }}</strong>
      <span v-if="description" class="ns-aspect-ratio__description">{{ description }}</span>
    </div>
  </component>
</template>

<style>
.ns-aspect-ratio {
  --ns-aspect-ratio: 16 / 9;
  --ns-aspect-radius: var(--ns-radius-image);
  --ns-aspect-fit: cover;
  --ns-aspect-position: 50% 50%;
  --ns-aspect-background: var(--ns-color-surface-muted);
  --ns-aspect-shimmer: color-mix(in srgb, var(--ns-color-surface) 70%, transparent);
  --ns-aspect-scrim: color-mix(in srgb, var(--ns-color-overlay) 72%, transparent);
  --ns-aspect-caption-color: #fff;
  --ns-aspect-zoom: 1.06;
  position: relative;
  display: block;
  box-sizing: border-box;
  inline-size: 100%;
  aspect-ratio: var(--ns-aspect-ratio);
  overflow: hidden;
  isolation: isolate;
  border-radius: var(--ns-aspect-radius);
  background: var(--ns-aspect-background);
  color: var(--ns-color-text-muted);
}

/* Ratios that change from a breakpoint up: sm, md, lg and xl of the layout tokens. */
@media (min-width: 640px) {
  .ns-aspect-ratio--at-sm {
    aspect-ratio: var(--ns-aspect-ratio-sm);
  }
}

@media (min-width: 768px) {
  .ns-aspect-ratio--at-md {
    aspect-ratio: var(--ns-aspect-ratio-md);
  }
}

@media (min-width: 1024px) {
  .ns-aspect-ratio--at-lg {
    aspect-ratio: var(--ns-aspect-ratio-lg);
  }
}

@media (min-width: 1280px) {
  .ns-aspect-ratio--at-xl {
    aspect-ratio: var(--ns-aspect-ratio-xl);
  }
}

.ns-aspect-ratio__media {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.ns-aspect-ratio__media > :is(img, video, iframe, canvas, svg, picture),
.ns-aspect-ratio__media > picture > img {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  border: 0;
  object-fit: var(--ns-aspect-fit);
  object-position: var(--ns-aspect-position);
  transition:
    opacity var(--ns-duration-slow) var(--ns-easing-standard),
    transform var(--ns-duration-slower) var(--ns-easing-emphasized-decelerate);
}

/* Media fades in once loaded; a broken image never shows its broken icon. */
.ns-aspect-ratio--loading .ns-aspect-ratio__media > :is(img, video),
.ns-aspect-ratio--busy .ns-aspect-ratio__media > :is(img, video) {
  opacity: 0;
}

.ns-aspect-ratio--error .ns-aspect-ratio__media {
  visibility: hidden;
}

/* auto: the media keeps its own ratio, as in a masonry gallery. */
.ns-aspect-ratio--auto {
  aspect-ratio: auto;
}

.ns-aspect-ratio--auto .ns-aspect-ratio__media {
  position: relative;
}

.ns-aspect-ratio--auto .ns-aspect-ratio__media > :is(img, video, iframe, canvas, svg, picture),
.ns-aspect-ratio--auto .ns-aspect-ratio__media > picture > img {
  block-size: auto;
}

.ns-aspect-ratio--auto:is(.ns-aspect-ratio--loading, .ns-aspect-ratio--error) {
  min-block-size: 160px;
}

.ns-aspect-ratio--auto.ns-aspect-ratio--error .ns-aspect-ratio__media {
  position: absolute;
}

/* Focus */
.ns-aspect-ratio--focus-top {
  --ns-aspect-position: 50% 0%;
}

.ns-aspect-ratio--focus-bottom {
  --ns-aspect-position: 50% 100%;
}

.ns-aspect-ratio--focus-start {
  --ns-aspect-position: 0% 50%;
}

.ns-aspect-ratio--focus-end {
  --ns-aspect-position: 100% 50%;
}

[dir="rtl"] .ns-aspect-ratio--focus-start {
  --ns-aspect-position: 100% 50%;
}

[dir="rtl"] .ns-aspect-ratio--focus-end {
  --ns-aspect-position: 0% 50%;
}

/* Placeholder */
.ns-aspect-ratio__placeholder {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: var(--ns-aspect-background);
}

.ns-aspect-ratio__placeholder--shimmer {
  background:
    linear-gradient(100deg, transparent 30%, var(--ns-aspect-shimmer) 50%, transparent 70%) 0 0 /
      250% 100% no-repeat,
    var(--ns-aspect-background);
  animation: ns-aspect-shimmer 1.6s var(--ns-easing-standard) infinite;
}

.ns-aspect-ratio:not(.ns-aspect-ratio--busy) .ns-aspect-ratio__placeholder {
  z-index: 0;
}

.ns-aspect-ratio__fallback {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  place-items: center;
  background: var(--ns-aspect-background);
  color: var(--ns-color-text-subtle);
}

.ns-aspect-ratio__scrim {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: linear-gradient(to top, var(--ns-aspect-scrim), transparent 55%);
  pointer-events: none;
}

.ns-aspect-ratio__overlay {
  position: absolute;
  inset: 0;
  z-index: 4;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  gap: var(--ns-space-2);
  padding: var(--ns-space-3);
  pointer-events: none;
}

.ns-aspect-ratio__overlay > * {
  pointer-events: auto;
}

.ns-aspect-ratio__caption {
  position: absolute;
  inset-inline: 0;
  inset-block-end: 0;
  z-index: 4;
  display: grid;
  gap: 2px;
  padding: var(--ns-space-4);
  color: var(--ns-aspect-caption-color);
  font-family: var(--ns-font-sans);
  text-shadow: 0 1px 2px rgb(0 0 0 / 0.35);
}

.ns-aspect-ratio__title {
  font-size: var(--ns-text-title-sm-size);
  font-weight: var(--ns-font-weight-semibold);
  line-height: var(--ns-text-title-sm-line-height);
}

.ns-aspect-ratio__description {
  font-size: var(--ns-text-body-sm-size);
  line-height: var(--ns-text-body-sm-line-height);
  opacity: 0.88;
}

/* Zoom */
.ns-aspect-ratio--zoom:is(:hover, :focus-within) .ns-aspect-ratio__media > * {
  transform: scale(var(--ns-aspect-zoom));
}

@keyframes ns-aspect-shimmer {
  from {
    background-position:
      100% 0,
      0 0;
  }
  to {
    background-position:
      -50% 0,
      0 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ns-aspect-ratio__placeholder--shimmer {
    animation: none;
  }

  .ns-aspect-ratio--zoom:is(:hover, :focus-within) .ns-aspect-ratio__media > * {
    transform: none;
  }
}
</style>
