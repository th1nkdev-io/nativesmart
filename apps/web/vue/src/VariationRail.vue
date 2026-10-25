<script setup lang="ts">
import { NsIcon } from "@nativesmart/vue";
import { onBeforeUnmount, onMounted, ref } from "vue";

defineProps<{
  title: string;
  code?: string;
  kind?: string;
  description?: string;
  defaultValue?: string;
  count: number;
}>();

const track = ref<HTMLElement>();
const atStart = ref(true);
const atEnd = ref(true);

/* Arrows only when the rail overflows; each one disables at its end. */
function update() {
  const element = track.value;
  if (!element) return;
  const scrolled = Math.abs(element.scrollLeft);
  atStart.value = scrolled <= 1;
  atEnd.value = scrolled + element.clientWidth >= element.scrollWidth - 1;
}

function scroll(direction: 1 | -1) {
  const element = track.value;
  if (!element) return;
  const rtl = getComputedStyle(element).direction === "rtl" ? -1 : 1;
  element.scrollBy({ left: direction * rtl * element.clientWidth * 0.8, behavior: "smooth" });
}

let observer: ResizeObserver | undefined;
onMounted(() => {
  update();
  observer = new ResizeObserver(update);
  if (track.value) observer.observe(track.value);
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <section class="rail">
    <header class="rail__head">
      <div class="rail__heading">
        <h2 class="rail__title">
          {{ title }}
          <span class="rail__meta">
            <code v-if="code">{{ code }}</code>
            <span v-if="kind">{{ kind }}</span>
            <span>{{ count }} {{ count > 1 ? "variantes" : "variante" }}</span>
          </span>
        </h2>
        <p v-if="description" class="rail__description">{{ description }}</p>
      </div>
      <div v-if="!(atStart && atEnd)" class="rail__arrows">
        <button
          type="button"
          aria-label="Variantes précédentes"
          :disabled="atStart"
          @click="scroll(-1)"
        >
          <NsIcon name="chevron-left" size="sm" />
        </button>
        <button type="button" aria-label="Variantes suivantes" :disabled="atEnd" @click="scroll(1)">
          <NsIcon name="chevron-right" size="sm" />
        </button>
      </div>
    </header>
    <div
      ref="track"
      :class="['rail__track', { 'rail__track--start': atStart, 'rail__track--end': atEnd }]"
      @scroll.passive="update"
    >
      <slot />
    </div>
  </section>
</template>

<style>
.rail {
  display: grid;
  gap: var(--ns-space-4);
  min-inline-size: 0;
}

.rail__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--ns-space-4);
}

.rail__heading {
  display: grid;
  gap: var(--ns-space-1);
  min-inline-size: 0;
}

.rail__title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--ns-space-2) var(--ns-space-3);
  margin: 0;
  color: var(--ns-color-text);
  font-size: var(--ns-text-title-sm-size);
  font-weight: var(--ns-font-weight-semibold);
  line-height: var(--ns-text-title-sm-line-height);
}

.rail__meta {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--ns-space-1-5);
  font-size: 11px;
  font-weight: var(--ns-font-weight-medium);
}

.rail__meta > * {
  padding: 2px 8px;
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-surface-muted);
  color: var(--ns-color-text-muted);
}

.rail__meta code {
  background: var(--ns-color-primary-muted);
  color: var(--ns-color-on-primary-muted);
  font-family: var(--ns-font-mono);
}

.rail__description {
  margin: 0;
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-body-sm-size);
  line-height: var(--ns-text-body-sm-line-height);
}

.rail__arrows {
  display: flex;
  flex: none;
  gap: var(--ns-space-1-5);
}

.rail__arrows button {
  display: inline-grid;
  place-items: center;
  inline-size: 32px;
  block-size: 32px;
  border: 1px solid var(--ns-color-border);
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-surface);
  color: var(--ns-color-text);
  cursor: pointer;
  transition:
    background-color var(--ns-duration-fast) var(--ns-easing-standard),
    opacity var(--ns-duration-fast) var(--ns-easing-standard);
}

.rail__arrows button:hover:not(:disabled) {
  background: var(--ns-color-surface-hover);
}

.rail__arrows button:disabled {
  opacity: 0.35;
  cursor: default;
}

.rail__arrows button:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
  outline-offset: 2px;
}

/* One row per group: tiles never leave an unexpected hole. */
.rail__track {
  --rail-fade: 40px;
  display: flex;
  gap: var(--ns-space-3);
  padding-block: 2px var(--ns-space-2);
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 2px;
  scrollbar-width: none;
  mask-image: linear-gradient(
    to right,
    transparent,
    #000 var(--rail-fade),
    #000 calc(100% - var(--rail-fade)),
    transparent
  );
}

.rail__track--start {
  mask-image: linear-gradient(to right, #000 calc(100% - var(--rail-fade)), transparent);
}

.rail__track--end {
  mask-image: linear-gradient(to right, transparent, #000 var(--rail-fade));
}

.rail__track--start.rail__track--end {
  mask-image: none;
}

/* Discreet: the arrows, the fade and the trackpad scroll it; no bar underneath. */
.rail__track::-webkit-scrollbar {
  display: none;
}

[dir="rtl"] .rail__track {
  mask-image: none;
}

.rail__track > * {
  flex: 0 0 var(--renderer-tile);
  scroll-snap-align: start;
}

@media (prefers-reduced-motion: reduce) {
  .rail__track {
    scroll-behavior: auto;
  }
}
</style>
