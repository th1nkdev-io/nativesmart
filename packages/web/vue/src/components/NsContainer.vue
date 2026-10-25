<script setup lang="ts">
import { computed } from "vue";

export type NsContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "prose" | "full";
export type NsContainerGutter = "auto" | "none" | "2" | "4" | "6" | "8" | "12";
export type NsContainerSpacing = "none" | "sm" | "md" | "lg" | "xl";
export type NsContainerBackground =
  | "none"
  | "background"
  | "surface"
  | "surface-muted"
  | "surface-brand"
  | "surface-inverse";

export interface NsContainerProps {
  /** Rendered element: `main`, `section`, `header`, `footer`… */
  as?: string;
  /** Maximum content width: a container token, the reading measure, or the full width. */
  size?: NsContainerSize;
  /** Snaps the width to the current breakpoint instead of following the window. */
  fixed?: boolean;
  /** Side margins. `auto` follows the layout grid: wider on wider screens. */
  gutter?: NsContainerGutter;
  /** Content against the start edge instead of centred. */
  align?: "center" | "start";
  /** Vertical breathing room of a page section. */
  spacing?: NsContainerSpacing;
  /** Paints the whole band, edge to edge; the content stays within the width. */
  background?: NsContainerBackground;
  /** Keeps content clear of notches and rounded corners on phones. */
  safeArea?: boolean;
}

const props = withDefaults(defineProps<NsContainerProps>(), {
  as: "div",
  size: "xl",
  fixed: false,
  gutter: "auto",
  align: "center",
  spacing: "none",
  background: "none",
  safeArea: true
});

const style = computed(() => ({
  "--ns-container-size":
    props.size === "prose"
      ? "var(--ns-measure-normal)"
      : props.size === "full"
        ? "100%"
        : `var(--ns-container-${props.size})`,
  "--ns-container-gutter":
    props.gutter === "auto"
      ? "var(--ns-grid-margin)"
      : props.gutter === "none"
        ? "0px"
        : `var(--ns-space-${props.gutter})`,
  "--ns-container-block": props.spacing === "none" ? "0px" : `var(--ns-section-${props.spacing})`
}));

const tone = computed(() =>
  props.background === "surface-brand"
    ? "on-brand"
    : props.background === "surface-inverse"
      ? "inverse"
      : "inherit"
);
</script>

<template>
  <component
    :is="as"
    :class="[
      'ns-container',
      `ns-container--${align}`,
      `ns-container--bg-${background}`,
      `ns-container--tone-${tone}`,
      { 'ns-container--fixed': fixed, 'ns-container--safe': safeArea }
    ]"
    :style="style"
  >
    <div class="ns-container__content"><slot /></div>
  </component>
</template>

<style>
/*
 * Two layers. The band spans its parent: background, section spacing, and the query container.
 * The content column is centred with padding computed in `cqi`, which always means the band's
 * width, so a `[data-bleed]` child can step out to the exact edges, even in a nested container.
 */
.ns-container {
  --ns-container-background: transparent;
  --ns-container-color: inherit;
  box-sizing: border-box;
  display: block;
  inline-size: 100%;
  padding-block: var(--ns-container-block);
  background: var(--ns-container-background);
  color: var(--ns-container-color);
  container: ns-container / inline-size;
}

.ns-container__content {
  --ns-container-max: min(var(--ns-container-size), var(--ns-container-step, 100cqi));
  --ns-container-room: max(0px, calc(100cqi - var(--ns-container-max)));
  --ns-container-start: max(var(--ns-container-gutter), calc(var(--ns-container-room) / 2));
  --ns-container-end: var(--ns-container-start);
  box-sizing: border-box;
  padding-inline: var(--ns-container-start) var(--ns-container-end);
}

.ns-container--start > .ns-container__content {
  --ns-container-start: var(--ns-container-gutter);
  --ns-container-end: max(
    var(--ns-container-gutter),
    calc(100cqi - var(--ns-container-max) - var(--ns-container-gutter))
  );
}

/* Safe areas are physical: the notch side depends on the reading direction. */
.ns-container--safe > .ns-container__content {
  --ns-container-start-safe: max(var(--ns-container-start), env(safe-area-inset-left, 0px));
  --ns-container-end-safe: max(var(--ns-container-end), env(safe-area-inset-right, 0px));
  padding-inline: var(--ns-container-start-safe) var(--ns-container-end-safe);
}

[dir="rtl"] .ns-container--safe > .ns-container__content {
  --ns-container-start-safe: max(var(--ns-container-start), env(safe-area-inset-right, 0px));
  --ns-container-end-safe: max(var(--ns-container-end), env(safe-area-inset-left, 0px));
}

/* Fixed: the width steps from one breakpoint to the next, never in between. */
@media (min-width: 640px) {
  .ns-container--fixed {
    --ns-container-step: var(--ns-container-sm);
  }
}

@media (min-width: 768px) {
  .ns-container--fixed {
    --ns-container-step: var(--ns-container-md);
  }
}

@media (min-width: 1024px) {
  .ns-container--fixed {
    --ns-container-step: var(--ns-container-lg);
  }
}

@media (min-width: 1280px) {
  .ns-container--fixed {
    --ns-container-step: var(--ns-container-xl);
  }
}

@media (min-width: 1536px) {
  .ns-container--fixed {
    --ns-container-step: var(--ns-container-2xl);
  }
}

/* A child that runs edge to edge of the band: banners, full-width images, carousels. */
.ns-container__content > [data-bleed] {
  margin-inline: calc(var(--ns-container-start) * -1) calc(var(--ns-container-end) * -1);
}

.ns-container--safe > .ns-container__content > [data-bleed] {
  margin-inline: calc(var(--ns-container-start-safe) * -1) calc(var(--ns-container-end-safe) * -1);
}

.ns-container--bg-background {
  --ns-container-background: var(--ns-color-background);
}

.ns-container--bg-surface {
  --ns-container-background: var(--ns-color-surface);
}

.ns-container--bg-surface-muted {
  --ns-container-background: var(--ns-color-surface-muted);
}

.ns-container--bg-surface-brand {
  --ns-container-background: var(--ns-color-surface-brand);
}

.ns-container--bg-surface-inverse {
  --ns-container-background: var(--ns-color-surface-inverse);
}

.ns-container--tone-on-brand {
  --ns-container-color: var(--ns-color-text-on-brand);
}

.ns-container--tone-inverse {
  --ns-container-color: var(--ns-color-text-inverse);
}
</style>
