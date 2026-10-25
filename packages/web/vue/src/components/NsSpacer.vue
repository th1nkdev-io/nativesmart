<script setup lang="ts">
import { computed } from "vue";

export type NsSpacerBreakpoint = "sm" | "md" | "lg" | "xl";
export type NsSpacerStep = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
/** `auto` takes the free space, a step or a number of pixels is fixed, `none` collapses. */
export type NsSpacerSize = "auto" | "none" | NsSpacerStep | number;
/** A size, or one size per breakpoint from `base` up: `{ base: "md", lg: "auto" }`. */
export type NsSpacerResponsive<T> = T | ({ base?: T } & Partial<Record<NsSpacerBreakpoint, T>>);
export type NsSpacerMinSize = "none" | "xs" | "sm" | "md" | "lg";
export type NsSpacerAxis = "auto" | "horizontal" | "vertical";

export interface NsSpacerProps {
  size?: NsSpacerResponsive<NsSpacerSize>;
  /** Share of the free space when several auto spacers split it. */
  grow?: number;
  /** Space an auto spacer keeps even when the row is full. */
  minSize?: NsSpacerMinSize;
  /**
   * `auto` sizes along the parent's flex direction. `horizontal` or `vertical` also work in normal
   * flow, between inline words or blocks.
   */
  axis?: NsSpacerAxis;
  /** Draws the space with its size, to check a layout. */
  reveal?: boolean;
}

const props = withDefaults(defineProps<NsSpacerProps>(), {
  size: "auto",
  grow: 1,
  minSize: "none",
  axis: "auto",
  reveal: false
});

const steps: Record<NsSpacerStep, string> = {
  xs: "1",
  sm: "2",
  md: "4",
  lg: "6",
  xl: "8",
  "2xl": "12"
};
const pixels: Record<NsSpacerStep, number> = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, "2xl": 48 };
const step = (value: NsSpacerStep) => `var(--ns-space-${steps[value]})`;

function isPerBreakpoint(value: unknown): value is Record<string, NsSpacerSize> {
  return typeof value === "object" && value !== null;
}

/*
 * A spacer is a flex item whose basis is its size: the basis follows the main axis, so the same
 * spacer works in a row and in a column. Each breakpoint gets its own grow and basis variables.
 */
const layout = computed(() => {
  const style: Record<string, string | number> = {};
  const classes: string[] = [];
  const values = isPerBreakpoint(props.size) ? props.size : { base: props.size };
  for (const [point, value] of Object.entries(values)) {
    if (value === undefined) continue;
    let grow = 0;
    let basis = "0px";
    if (value === "auto") {
      grow = Math.max(0, props.grow);
      basis = props.minSize === "none" ? "0px" : step(props.minSize);
    } else if (typeof value === "number") {
      basis = `${Math.max(0, value)}px`;
    } else if (value !== "none") {
      basis = step(value);
    }
    style[`--ns-spacer-grow-${point}`] = grow;
    style[`--ns-spacer-basis-${point}`] = basis;
    if (point !== "base") classes.push(`ns-spacer--${point}`);
  }
  return { style, classes };
});

/*
 * What reveal writes in the middle: the size in pixels, or auto with its share. A space under
 * 12 px keeps the hatching only.
 */
const readout = computed(() => {
  const value = isPerBreakpoint(props.size) ? (props.size.base ?? "auto") : props.size;
  if (value === "auto") return props.grow === 1 ? "auto" : `auto ×${props.grow}`;
  const size = value === "none" ? 0 : typeof value === "number" ? value : pixels[value];
  return size < 12 ? undefined : String(size);
});
</script>

<template>
  <span
    :class="[
      'ns-spacer',
      `ns-spacer--axis-${axis}`,
      ...layout.classes,
      { 'ns-spacer--reveal': reveal }
    ]"
    :style="layout.style"
    :data-size="reveal ? readout : undefined"
    aria-hidden="true"
  />
</template>

<style>
/* Inherited variables are reset so a spacer nested in another never takes its size. */
.ns-spacer {
  --ns-spacer-grow-base: 1;
  --ns-spacer-basis-base: 0px;
  --ns-spacer-grow-sm: initial;
  --ns-spacer-basis-sm: initial;
  --ns-spacer-grow-md: initial;
  --ns-spacer-basis-md: initial;
  --ns-spacer-grow-lg: initial;
  --ns-spacer-basis-lg: initial;
  --ns-spacer-grow-xl: initial;
  --ns-spacer-basis-xl: initial;
  --ns-spacer-grow: var(--ns-spacer-grow-base);
  --ns-spacer-basis: var(--ns-spacer-basis-base);
  box-sizing: border-box;
  display: block;
  flex: var(--ns-spacer-grow) 0 var(--ns-spacer-basis);
  align-self: stretch;
  min-inline-size: 0;
  min-block-size: 0;
  pointer-events: none;
}

/* Outside a flex container the basis does nothing: the axis turns it into a width or height. */
.ns-spacer--axis-horizontal {
  display: inline-block;
  inline-size: var(--ns-spacer-basis);
  vertical-align: middle;
}

.ns-spacer--axis-vertical {
  block-size: var(--ns-spacer-basis);
}

@media (min-width: 640px) {
  .ns-spacer--sm {
    --ns-spacer-grow: var(--ns-spacer-grow-sm);
    --ns-spacer-basis: var(--ns-spacer-basis-sm);
  }
}

@media (min-width: 768px) {
  .ns-spacer--md {
    --ns-spacer-grow: var(--ns-spacer-grow-md);
    --ns-spacer-basis: var(--ns-spacer-basis-md);
  }
}

@media (min-width: 1024px) {
  .ns-spacer--lg {
    --ns-spacer-grow: var(--ns-spacer-grow-lg);
    --ns-spacer-basis: var(--ns-spacer-basis-lg);
  }
}

@media (min-width: 1280px) {
  .ns-spacer--xl {
    --ns-spacer-grow: var(--ns-spacer-grow-xl);
    --ns-spacer-basis: var(--ns-spacer-basis-xl);
  }
}

/* Reveal: the space hatched in the primary color, its size in the middle. */
.ns-spacer--reveal {
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  min-inline-size: 2px;
  min-block-size: 2px;
  border-radius: var(--ns-radius-sm);
  container-type: inline-size;
  outline: 1px dashed color-mix(in srgb, var(--ns-color-primary) 55%, transparent);
  outline-offset: -1px;
  background: repeating-linear-gradient(
    -45deg,
    color-mix(in srgb, var(--ns-color-primary) 16%, transparent) 0 1px,
    color-mix(in srgb, var(--ns-color-primary) 5%, transparent) 1px 6px
  );
}

.ns-spacer--reveal.ns-spacer--axis-horizontal {
  display: inline-grid;
  block-size: 1.25em;
}

.ns-spacer--reveal[data-size]::after {
  content: attr(data-size);
  padding: 1px var(--ns-space-1);
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-primary);
  color: var(--ns-color-on-primary);
  font-family: var(--ns-font-mono);
  font-size: 10px;
  font-weight: var(--ns-font-weight-semibold);
  line-height: 14px;
  white-space: nowrap;
}

/* The readout only shows where it fits. */
@container (max-width: 27px) {
  .ns-spacer--reveal[data-size]::after {
    content: none;
  }
}
</style>
