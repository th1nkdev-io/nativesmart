<script setup lang="ts">
import { NsBadge, NsIcon, NsImage } from "@nativesmart/vue";
import { computed, onBeforeUnmount, ref, useAttrs } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

/* Served from the shared public folder. */
const savanna = { src: "lab/savanna.svg", alt: "Acacias au coucher du soleil" };

/*
 * Local images load at once, so the playground can replay a load: the source is withheld for a
 * moment, which keeps the placeholder on screen. It can also break the source to show the fallback.
 */
const pending = ref(false);
const broken = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

function replay() {
  broken.value = false;
  pending.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => (pending.value = false), 1800);
}

onBeforeUnmount(() => clearTimeout(timer));

const source = computed(() => (attrs.src ? String(attrs.src) : undefined));

const playgroundAttrs = computed(() => ({
  ...attrs,
  lazySrc: attrs.lazySrc ? String(attrs.lazySrc) : source.value,
  src: pending.value ? undefined : broken.value ? "lab/introuvable.svg" : source.value
}));

/* Tiles: placeholders stay loading, fit and position use a portrait image in a wide frame. */
const tileAttrs = computed(() => {
  const group = variation?.group;
  if (group === "placeholder") return { ...attrs, src: undefined, lazySrc: source.value };
  if (group === "fit" || group === "position") return { ...attrs, ...savanna, caption: undefined };
  if (group === "captionPlacement") return attrs;
  return { ...attrs, caption: undefined };
});
</script>

<template>
  <div v-if="variation" class="demo-image-tile">
    <NsImage v-bind="tileAttrs" />
  </div>

  <div v-else class="demo-image">
    <NsImage v-bind="playgroundAttrs" :key="String(broken)">
      <template #overlay><NsBadge label="Nouveau" intent="success" /></template>
    </NsImage>
    <div class="demo-image__tools">
      <button type="button" @click="replay">
        <NsIcon name="refresh" size="sm" :spin="pending" />Rejouer le chargement
      </button>
      <button type="button" :aria-pressed="broken" @click="broken = !broken">
        <NsIcon name="alert-triangle" size="sm" />Image cassée
      </button>
    </div>
  </div>
</template>

<style>
.demo-image {
  display: grid;
  gap: var(--ns-space-4);
  inline-size: 520px;
  max-inline-size: 100%;
}

.demo-image__tools {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--ns-space-2);
}

.demo-image__tools button {
  display: inline-flex;
  align-items: center;
  gap: var(--ns-space-2);
  min-block-size: 34px;
  padding-inline: var(--ns-space-3);
  border: 1px solid var(--ns-color-border);
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-surface);
  color: var(--ns-color-text);
  font: inherit;
  font-size: var(--ns-text-caption-size);
  font-weight: var(--ns-font-weight-medium);
  cursor: pointer;
}

.demo-image__tools button:hover {
  background: var(--ns-color-surface-hover);
}

.demo-image__tools button[aria-pressed="true"] {
  border-color: var(--ns-color-warning-border);
  background: var(--ns-color-warning-muted);
  color: var(--ns-color-on-warning-muted);
}

.demo-image-tile {
  inline-size: 100%;
}
</style>
