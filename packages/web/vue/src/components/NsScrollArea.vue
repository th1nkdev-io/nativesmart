<script setup lang="ts" generic="T">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

export type NsScrollAreaOrientation = "vertical" | "horizontal" | "both";
/** When the bars show: on hover, while scrolling, always, whenever content overflows, never, or the system's own. */
export type NsScrollAreaScrollbars = "hover" | "scroll" | "always" | "auto" | "hidden" | "native";
export type NsScrollAreaSnap = "none" | "start" | "center";

/** What a template ref on NsScrollArea gives access to. */
export interface NsScrollAreaExpose {
  scrollToIndex: (index: number, align?: "start" | "center" | "end") => void;
  scrollToEdge: (edge: "top" | "bottom" | "start" | "end") => void;
  viewport: HTMLElement | undefined;
}

export interface NsScrollAreaProps<T> {
  orientation?: NsScrollAreaOrientation;
  scrollbars?: NsScrollAreaScrollbars;
  /** Milliseconds the bars stay after scrolling or hovering stops. */
  hideDelay?: number;
  size?: "thin" | "regular";
  /** Fades the edges where more content is hidden. */
  shadows?: boolean;
  /** Children snap into place: set `scroll-snap-align` on them, or let `start` and `center` do it. */
  snap?: NsScrollAreaSnap;
  /** Accessible name of the region, announced when it takes keyboard focus. */
  label?: string;
  maxHeight?: string;
  height?: string;
  /** Virtual list: only the visible rows are rendered, through the `item` slot. */
  items?: readonly T[];
  /** Fixed row height of the virtual list, in pixels. */
  itemHeight?: number;
  /** Extra rows rendered above and below the visible ones. */
  overscan?: number;
  /** Distance from the end, in pixels, at which `end-reached` fires: for infinite lists. */
  endThreshold?: number;
}

const props = withDefaults(defineProps<NsScrollAreaProps<T>>(), {
  orientation: "vertical",
  scrollbars: "hover",
  hideDelay: 600,
  size: "regular",
  shadows: true,
  snap: "none",
  itemHeight: 48,
  overscan: 4,
  endThreshold: 160
});

const emit = defineEmits<{
  scroll: [position: { top: number; left: number }];
  "end-reached": [];
}>();

defineSlots<{
  default?: () => unknown;
  item?: (props: { item: T; index: number }) => unknown;
}>();

const viewport = ref<HTMLElement>();
const content = ref<HTMLElement>();
const metrics = ref({ top: 0, left: 0, height: 0, width: 0, scrollHeight: 0, scrollWidth: 0 });
const scrolling = ref(false);
const rtl = ref(false);

const vertical = computed(() => props.orientation !== "horizontal");
const horizontal = computed(() => props.orientation !== "vertical");
const overflowY = computed(
  () => vertical.value && metrics.value.scrollHeight > metrics.value.height + 1
);
const overflowX = computed(
  () => horizontal.value && metrics.value.scrollWidth > metrics.value.width + 1
);
const drawn = computed(() => props.scrollbars !== "native" && props.scrollbars !== "hidden");

/* ---------- Virtual list ---------- */
const virtual = computed(() => props.items !== undefined);
const range = computed(() => {
  if (!props.items) return { start: 0, end: 0 };
  const first = Math.floor(metrics.value.top / props.itemHeight) - props.overscan;
  const last =
    Math.ceil((metrics.value.top + metrics.value.height) / props.itemHeight) + props.overscan;
  return { start: Math.max(0, first), end: Math.min(props.items.length, Math.max(last, 0)) };
});
const visibleItems = computed(() =>
  (props.items ?? []).slice(range.value.start, range.value.end).map((item, offset) => ({
    item,
    index: range.value.start + offset
  }))
);

/* ---------- Measures ---------- */
function measure() {
  const element = viewport.value;
  if (!element) return;
  metrics.value = {
    top: element.scrollTop,
    left: Math.abs(element.scrollLeft),
    height: element.clientHeight,
    width: element.clientWidth,
    scrollHeight: element.scrollHeight,
    scrollWidth: element.scrollWidth
  };
}

let hideTimer: ReturnType<typeof setTimeout> | undefined;
let endArmed = true;
/** Content size when end-reached last fired: it fires again only once the content has grown. */
let firedAt = 0;
function onScroll() {
  measure();
  scrolling.value = true;
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => (scrolling.value = false), props.hideDelay);
  emit("scroll", { top: metrics.value.top, left: metrics.value.left });

  const { top, height, scrollHeight, left, width, scrollWidth } = metrics.value;
  const total = vertical.value ? scrollHeight : scrollWidth;
  const remaining = vertical.value ? scrollHeight - height - top : scrollWidth - width - left;
  if (!endArmed && (total > firedAt || remaining > props.endThreshold)) endArmed = true;
  if (endArmed && remaining <= props.endThreshold) {
    endArmed = false;
    firedAt = total;
    emit("end-reached");
  }
}

let observer: ResizeObserver | undefined;
onMounted(() => {
  rtl.value = getComputedStyle(viewport.value!).direction === "rtl";
  measure();
  observer = new ResizeObserver(measure);
  observer.observe(viewport.value!);
  if (content.value) observer.observe(content.value);
});
onBeforeUnmount(() => {
  observer?.disconnect();
  clearTimeout(hideTimer);
});

/* ---------- Drawn scrollbars ---------- */
const minimumThumb = 24;
function thumb(axis: "y" | "x") {
  const m = metrics.value;
  const view = axis === "y" ? m.height : m.width;
  const total = axis === "y" ? m.scrollHeight : m.scrollWidth;
  const position = axis === "y" ? m.top : m.left;
  const track = view - 4;
  const length = Math.max(minimumThumb, (view / Math.max(total, 1)) * track);
  const travel = Math.max(track - length, 0);
  const offset = total > view ? (position / (total - view)) * travel : 0;
  return { length, offset, ratio: travel > 0 ? (total - view) / travel : 0 };
}
const thumbY = computed(() => thumb("y"));
const thumbX = computed(() => thumb("x"));

let drag: { axis: "y" | "x"; start: number; scroll: number; ratio: number } | undefined;
function startDrag(axis: "y" | "x", event: PointerEvent) {
  const element = viewport.value;
  if (!element) return;
  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  drag = {
    axis,
    start: axis === "y" ? event.clientY : event.clientX,
    scroll: axis === "y" ? element.scrollTop : element.scrollLeft,
    ratio: (axis === "y" ? thumbY : thumbX).value.ratio
  };
  event.preventDefault();
}
function moveDrag(event: PointerEvent) {
  const element = viewport.value;
  if (!drag || !element) return;
  const delta = (drag.axis === "y" ? event.clientY : event.clientX) - drag.start;
  if (drag.axis === "y") element.scrollTop = drag.scroll + delta * drag.ratio;
  else element.scrollLeft = drag.scroll + delta * drag.ratio;
}
function endDrag() {
  drag = undefined;
}

/** A click on the track jumps a page towards the click, as native scrollbars do. */
function jump(axis: "y" | "x", event: MouseEvent) {
  const element = viewport.value;
  if (!element || event.target !== event.currentTarget) return;
  const bar = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const info = (axis === "y" ? thumbY : thumbX).value;
  if (axis === "y") {
    const after = event.clientY - bar.top > info.offset;
    element.scrollBy({ top: (after ? 1 : -1) * element.clientHeight * 0.9, behavior: "smooth" });
  } else {
    const fromStart = rtl.value ? bar.right - event.clientX : event.clientX - bar.left;
    const after = fromStart > info.offset;
    const sign = (after ? 1 : -1) * (rtl.value ? -1 : 1);
    element.scrollBy({ left: sign * element.clientWidth * 0.9, behavior: "smooth" });
  }
}

/* ---------- Edge fades ---------- */
const fades = computed(() => {
  if (!props.shadows) return { top: 0, bottom: 0, start: 0, end: 0 };
  const m = metrics.value;
  const fade = 28;
  return {
    top: overflowY.value && m.top > 1 ? fade : 0,
    bottom: overflowY.value && m.top < m.scrollHeight - m.height - 1 ? fade : 0,
    start: overflowX.value && m.left > 1 ? fade : 0,
    end: overflowX.value && m.left < m.scrollWidth - m.width - 1 ? fade : 0
  };
});

/* ---------- Programmatic scrolling ---------- */
function scrollToIndex(index: number, align: "start" | "center" | "end" = "start") {
  const element = viewport.value;
  if (!element) return;
  const top = index * props.itemHeight;
  const offset =
    align === "center"
      ? top - (element.clientHeight - props.itemHeight) / 2
      : align === "end"
        ? top - element.clientHeight + props.itemHeight
        : top;
  /* Far jumps land at once: a smooth scroll across thousands of rows takes seconds. */
  const far = Math.abs(offset - element.scrollTop) > element.clientHeight * 3;
  element.scrollTo({ top: Math.max(0, offset), behavior: far ? "auto" : "smooth" });
}

function scrollToEdge(edge: "top" | "bottom" | "start" | "end") {
  const element = viewport.value;
  if (!element) return;
  if (edge === "top") element.scrollTo({ top: 0, behavior: "smooth" });
  else if (edge === "bottom") element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
  else {
    const toEnd = edge === "end" ? 1 : 0;
    const left = toEnd * (element.scrollWidth - element.clientWidth) * (rtl.value ? -1 : 1);
    element.scrollTo({ left, behavior: "smooth" });
  }
}

defineExpose({ scrollToIndex, scrollToEdge, viewport });
</script>

<template>
  <div
    :class="[
      'ns-scroll-area',
      `ns-scroll-area--${orientation}`,
      `ns-scroll-area--bars-${scrollbars}`,
      `ns-scroll-area--${size}`,
      `ns-scroll-area--snap-${snap}`,
      { 'ns-scroll-area--scrolling': scrolling }
    ]"
    :style="{ maxBlockSize: maxHeight, blockSize: height }"
  >
    <div
      ref="viewport"
      class="ns-scroll-area__viewport"
      :tabindex="overflowX || overflowY ? 0 : undefined"
      :role="label ? 'region' : undefined"
      :aria-label="label"
      :style="{
        '--ns-fade-top': `${fades.top}px`,
        '--ns-fade-bottom': `${fades.bottom}px`,
        '--ns-fade-start': `${fades.start}px`,
        '--ns-fade-end': `${fades.end}px`
      }"
      @scroll.passive="onScroll"
    >
      <div
        v-if="virtual"
        ref="content"
        class="ns-scroll-area__virtual"
        :style="{ blockSize: `${(items?.length ?? 0) * itemHeight}px` }"
      >
        <div
          class="ns-scroll-area__window"
          :style="{ transform: `translateY(${range.start * itemHeight}px)` }"
        >
          <div
            v-for="row in visibleItems"
            :key="row.index"
            class="ns-scroll-area__row"
            :style="{ blockSize: `${itemHeight}px` }"
          >
            <slot name="item" :item="row.item" :index="row.index" />
          </div>
        </div>
      </div>
      <div v-else ref="content" class="ns-scroll-area__content"><slot /></div>
    </div>

    <div
      v-if="drawn && overflowY"
      class="ns-scroll-area__bar ns-scroll-area__bar--y"
      aria-hidden="true"
      @click="jump('y', $event)"
    >
      <span
        class="ns-scroll-area__thumb"
        :style="{ blockSize: `${thumbY.length}px`, transform: `translateY(${thumbY.offset}px)` }"
        @pointerdown="startDrag('y', $event)"
        @pointermove="moveDrag"
        @pointerup="endDrag"
        @pointercancel="endDrag"
      />
    </div>
    <div
      v-if="drawn && overflowX"
      class="ns-scroll-area__bar ns-scroll-area__bar--x"
      aria-hidden="true"
      @click="jump('x', $event)"
    >
      <span
        class="ns-scroll-area__thumb"
        :style="{ inlineSize: `${thumbX.length}px`, insetInlineStart: `${thumbX.offset}px` }"
        @pointerdown="startDrag('x', $event)"
        @pointermove="moveDrag"
        @pointerup="endDrag"
        @pointercancel="endDrag"
      />
    </div>
  </div>
</template>

<style>
.ns-scroll-area {
  --ns-scrollbar-size: 10px;
  --ns-scrollbar-thumb: color-mix(in srgb, var(--ns-color-text) 32%, transparent);
  --ns-scrollbar-thumb-hover: color-mix(in srgb, var(--ns-color-text) 50%, transparent);
  --ns-scrollbar-track: transparent;
  position: relative;
  display: flex;
  flex-direction: column;
  min-block-size: 0;
  overflow: hidden;
}

.ns-scroll-area--thin {
  --ns-scrollbar-size: 6px;
}

/*
 * Scrolling stays native: wheel, touch, inertia, keyboard and assistive tech all work. Only the
 * bars are drawn, so they look the same on every system.
 */
.ns-scroll-area__viewport {
  flex: 1 1 auto;
  min-block-size: 0;
  overflow: hidden;
  overscroll-behavior: contain;
  scrollbar-width: none;
  border-radius: inherit;
  -webkit-mask-image:
    linear-gradient(
      to bottom,
      transparent,
      #000 var(--ns-fade-top),
      #000 calc(100% - var(--ns-fade-bottom)),
      transparent
    ),
    linear-gradient(
      to right,
      transparent,
      #000 var(--ns-fade-start),
      #000 calc(100% - var(--ns-fade-end)),
      transparent
    );
  mask-image:
    linear-gradient(
      to bottom,
      transparent,
      #000 var(--ns-fade-top),
      #000 calc(100% - var(--ns-fade-bottom)),
      transparent
    ),
    linear-gradient(
      to right,
      transparent,
      #000 var(--ns-fade-start),
      #000 calc(100% - var(--ns-fade-end)),
      transparent
    );
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}

[dir="rtl"] .ns-scroll-area__viewport {
  -webkit-mask-image:
    linear-gradient(
      to bottom,
      transparent,
      #000 var(--ns-fade-top),
      #000 calc(100% - var(--ns-fade-bottom)),
      transparent
    ),
    linear-gradient(
      to left,
      transparent,
      #000 var(--ns-fade-start),
      #000 calc(100% - var(--ns-fade-end)),
      transparent
    );
  mask-image:
    linear-gradient(
      to bottom,
      transparent,
      #000 var(--ns-fade-top),
      #000 calc(100% - var(--ns-fade-bottom)),
      transparent
    ),
    linear-gradient(
      to left,
      transparent,
      #000 var(--ns-fade-start),
      #000 calc(100% - var(--ns-fade-end)),
      transparent
    );
}

.ns-scroll-area__viewport::-webkit-scrollbar {
  display: none;
}

.ns-scroll-area--vertical > .ns-scroll-area__viewport {
  overflow-y: auto;
}

.ns-scroll-area--horizontal > .ns-scroll-area__viewport {
  overflow-x: auto;
}

.ns-scroll-area--both > .ns-scroll-area__viewport {
  overflow: auto;
}

.ns-scroll-area--bars-native > .ns-scroll-area__viewport {
  scrollbar-width: auto;
}

.ns-scroll-area--bars-native > .ns-scroll-area__viewport::-webkit-scrollbar {
  display: initial;
}

.ns-scroll-area__viewport:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
  outline-offset: calc(var(--ns-focus-ring-width) * -1);
}

.ns-scroll-area--horizontal .ns-scroll-area__content {
  display: inline-block;
  min-inline-size: 100%;
}

/* Snap */
.ns-scroll-area--snap-start.ns-scroll-area--vertical > .ns-scroll-area__viewport {
  scroll-snap-type: y mandatory;
}

.ns-scroll-area--snap-start:not(.ns-scroll-area--vertical) > .ns-scroll-area__viewport,
.ns-scroll-area--snap-center:not(.ns-scroll-area--vertical) > .ns-scroll-area__viewport {
  scroll-snap-type: x mandatory;
}

.ns-scroll-area--snap-center.ns-scroll-area--vertical > .ns-scroll-area__viewport {
  scroll-snap-type: y mandatory;
}

.ns-scroll-area--snap-start .ns-scroll-area__content > * > *,
.ns-scroll-area--snap-start .ns-scroll-area__row {
  scroll-snap-align: start;
}

.ns-scroll-area--snap-center .ns-scroll-area__content > * > *,
.ns-scroll-area--snap-center .ns-scroll-area__row {
  scroll-snap-align: center;
}

/* Virtual list */
.ns-scroll-area__virtual {
  position: relative;
}

.ns-scroll-area__window {
  position: absolute;
  inset: 0 0 auto;
  will-change: transform;
}

.ns-scroll-area__row {
  box-sizing: border-box;
  overflow: hidden;
}

/* Drawn bars */
.ns-scroll-area__bar {
  position: absolute;
  z-index: 1;
  display: flex;
  padding: 2px;
  background: var(--ns-scrollbar-track);
  opacity: 0;
  transition:
    opacity var(--ns-duration-normal) var(--ns-easing-standard),
    background-color var(--ns-duration-fast) var(--ns-easing-standard);
  touch-action: none;
  user-select: none;
}

.ns-scroll-area__bar--y {
  inset-block: 0;
  inset-inline-end: 0;
  inline-size: var(--ns-scrollbar-size);
}

.ns-scroll-area__bar--x {
  inset-inline: 0;
  inset-block-end: 0;
  block-size: var(--ns-scrollbar-size);
}

.ns-scroll-area__thumb {
  position: relative;
  flex: none;
  border-radius: var(--ns-radius-full);
  background: var(--ns-scrollbar-thumb);
  cursor: default;
  transition: background-color var(--ns-duration-fast) var(--ns-easing-standard);
}

.ns-scroll-area__bar--y .ns-scroll-area__thumb {
  inline-size: 100%;
}

.ns-scroll-area__bar--x .ns-scroll-area__thumb {
  block-size: 100%;
}

.ns-scroll-area__thumb:hover,
.ns-scroll-area__thumb:active {
  background: var(--ns-scrollbar-thumb-hover);
}

.ns-scroll-area__bar:hover {
  --ns-scrollbar-track: color-mix(in srgb, var(--ns-color-text) 6%, transparent);
}

/* When the bars show */
.ns-scroll-area--bars-always > .ns-scroll-area__bar,
.ns-scroll-area--bars-auto > .ns-scroll-area__bar,
.ns-scroll-area--bars-hover:hover > .ns-scroll-area__bar,
.ns-scroll-area--bars-hover:focus-within > .ns-scroll-area__bar,
.ns-scroll-area--scrolling > .ns-scroll-area__bar {
  opacity: 1;
}

.ns-scroll-area--bars-always > .ns-scroll-area__bar {
  --ns-scrollbar-track: color-mix(in srgb, var(--ns-color-text) 5%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .ns-scroll-area__bar {
    transition: none;
  }
}
</style>
