<script setup lang="ts">
import { computed } from "vue";

export type NsGridBreakpoint = "sm" | "md" | "lg" | "xl";
/** A value, or one value per breakpoint from `base` up: `{ base: 4, md: 8, lg: 12 }`. */
export type NsGridResponsive<T> = T | ({ base?: T } & Partial<Record<NsGridBreakpoint, T>>);
/** A number of columns, or `layout`: the layout grid tokens, 4 on phones, 8 on tablets, 12 on desktops. */
export type NsGridColumns = number | "layout";
export type NsGridSpace = "layout" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12";
export type NsGridAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type NsGridJustify = "start" | "center" | "end" | "stretch";

export interface NsGridProps {
  /** Rendered element: `ul` for a list of cards, `section`… */
  as?: string;
  columns?: NsGridResponsive<NsGridColumns>;
  /** Space between cells. `layout` follows the layout gutter: 16, 24 then 32 px. */
  gap?: NsGridResponsive<NsGridSpace>;
  rowGap?: NsGridResponsive<NsGridSpace>;
  columnGap?: NsGridResponsive<NsGridSpace>;
  /** Vertical alignment of the cells in their row. */
  align?: NsGridResponsive<NsGridAlign>;
  /** Horizontal alignment of the cells in their columns. */
  justify?: NsGridResponsive<NsGridJustify>;
  /**
   * Fluid grid: as many columns as fit, each at least this wide (`240px`, `16rem`). Replaces
   * `columns`, and needs no breakpoint at all.
   */
  minItemWidth?: string;
  /** Fills holes left by wide items with later, smaller ones. */
  dense?: boolean;
  /** What breakpoints measure: the window, or the grid itself, for grids in side panels and cards. */
  breakpoints?: "viewport" | "container";
}

const props = withDefaults(defineProps<NsGridProps>(), {
  as: "div",
  columns: 12,
  gap: "layout",
  dense: false,
  breakpoints: "viewport"
});

const space = (value: string) =>
  value === "layout" ? "var(--ns-grid-gutter)" : `var(--ns-space-${value})`;
const columns = (value: NsGridColumns) =>
  value === "layout" ? "var(--ns-grid-columns)" : `${Math.max(1, Math.round(value))}`;
const places: Record<string, string> = {
  start: "start",
  center: "center",
  end: "end",
  stretch: "stretch",
  baseline: "baseline"
};

const responsive: readonly [keyof NsGridProps, string, (value: never) => string][] = [
  ["columns", "count", columns],
  ["gap", "gap", space],
  ["rowGap", "rgap", space],
  ["columnGap", "cgap", space],
  ["align", "align", (value: string) => places[value]],
  ["justify", "justify", (value: string) => places[value]]
];

const layout = computed(() => {
  const style: Record<string, string> = {};
  const classes: string[] = [];
  for (const [prop, key, toCss] of responsive) {
    const value = props[prop];
    if (value === undefined) continue;
    const values = typeof value === "object" && value !== null ? value : { base: value };
    for (const [point, item] of Object.entries(values)) {
      if (item === undefined) continue;
      style[`--ns-grid-${key}-${point}`] = toCss(item as never);
      classes.push(`ns-grid--${key}-${point}`);
    }
  }
  if (props.minItemWidth) style["--ns-grid-min"] = props.minItemWidth;
  return { style, classes };
});
</script>

<template>
  <div v-if="breakpoints === 'container'" class="ns-grid-scope">
    <component
      :is="as"
      :class="[
        'ns-grid',
        'ns-grid--container',
        ...layout.classes,
        { 'ns-grid--fluid': minItemWidth, 'ns-grid--dense': dense }
      ]"
      :style="layout.style"
    >
      <slot />
    </component>
  </div>
  <component
    :is="as"
    v-else
    :class="[
      'ns-grid',
      'ns-grid--viewport',
      ...layout.classes,
      { 'ns-grid--fluid': minItemWidth, 'ns-grid--dense': dense }
    ]"
    :style="layout.style"
  >
    <slot />
  </component>
</template>

<style>
/*
 * Custom properties inherit: a nested grid or item must not take its parent's settings.
 * Each element's own values come inline and win over this reset.
 */
.ns-grid {
  --ns-grid-count-base: initial;
  --ns-grid-count-sm: initial;
  --ns-grid-count-md: initial;
  --ns-grid-count-lg: initial;
  --ns-grid-count-xl: initial;
  --ns-grid-gap-base: initial;
  --ns-grid-gap-sm: initial;
  --ns-grid-gap-md: initial;
  --ns-grid-gap-lg: initial;
  --ns-grid-gap-xl: initial;
  --ns-grid-rgap-base: initial;
  --ns-grid-rgap-sm: initial;
  --ns-grid-rgap-md: initial;
  --ns-grid-rgap-lg: initial;
  --ns-grid-rgap-xl: initial;
  --ns-grid-cgap-base: initial;
  --ns-grid-cgap-sm: initial;
  --ns-grid-cgap-md: initial;
  --ns-grid-cgap-lg: initial;
  --ns-grid-cgap-xl: initial;
  --ns-grid-align-base: initial;
  --ns-grid-align-sm: initial;
  --ns-grid-align-md: initial;
  --ns-grid-align-lg: initial;
  --ns-grid-align-xl: initial;
  --ns-grid-justify-base: initial;
  --ns-grid-justify-sm: initial;
  --ns-grid-justify-md: initial;
  --ns-grid-justify-lg: initial;
  --ns-grid-justify-xl: initial;
}

.ns-grid-item {
  --ns-grid-item-span-base: initial;
  --ns-grid-item-span-sm: initial;
  --ns-grid-item-span-md: initial;
  --ns-grid-item-span-lg: initial;
  --ns-grid-item-span-xl: initial;
  --ns-grid-item-start-base: initial;
  --ns-grid-item-start-sm: initial;
  --ns-grid-item-start-md: initial;
  --ns-grid-item-start-lg: initial;
  --ns-grid-item-start-xl: initial;
  --ns-grid-item-order-base: initial;
  --ns-grid-item-order-sm: initial;
  --ns-grid-item-order-md: initial;
  --ns-grid-item-order-lg: initial;
  --ns-grid-item-order-xl: initial;
  --ns-grid-item-rows-base: initial;
  --ns-grid-item-rows-sm: initial;
  --ns-grid-item-rows-md: initial;
  --ns-grid-item-rows-lg: initial;
  --ns-grid-item-rows-xl: initial;
  --ns-grid-item-self-base: initial;
  --ns-grid-item-self-sm: initial;
  --ns-grid-item-self-md: initial;
  --ns-grid-item-self-lg: initial;
  --ns-grid-item-self-xl: initial;
}

.ns-grid-scope {
  container: ns-grid / inline-size;
}

.ns-grid {
  --ns-grid-count: var(--ns-grid-count-base);
  --ns-grid-gap: var(--ns-grid-gap-base);
  --ns-grid-rgap: var(--ns-grid-rgap-base);
  --ns-grid-cgap: var(--ns-grid-cgap-base);
  --ns-grid-align: var(--ns-grid-align-base);
  --ns-grid-justify: var(--ns-grid-justify-base);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(var(--ns-grid-count, 12), minmax(0, 1fr));
  row-gap: var(--ns-grid-rgap, var(--ns-grid-gap, var(--ns-grid-gutter)));
  column-gap: var(--ns-grid-cgap, var(--ns-grid-gap, var(--ns-grid-gutter)));
  align-items: var(--ns-grid-align, stretch);
  justify-items: var(--ns-grid-justify, stretch);
  margin: 0;
  padding: 0;
  list-style: none;
}

.ns-grid--fluid {
  grid-template-columns: repeat(auto-fill, minmax(min(var(--ns-grid-min), 100%), 1fr));
}

.ns-grid--dense {
  grid-auto-flow: row dense;
}

/* An item never spans more columns than the grid has: no phantom columns on small screens. */
.ns-grid-item {
  --ns-grid-item-span: var(--ns-grid-item-span-base);
  --ns-grid-item-start: var(--ns-grid-item-start-base);
  --ns-grid-item-order: var(--ns-grid-item-order-base);
  --ns-grid-item-rows: var(--ns-grid-item-rows-base);
  --ns-grid-item-self: var(--ns-grid-item-self-base);
  box-sizing: border-box;
  min-inline-size: 0;
  grid-column: var(--ns-grid-item-start, auto) / span
    min(var(--ns-grid-item-span, 1), var(--ns-grid-count, 12));
  grid-row-end: span var(--ns-grid-item-rows, 1);
  order: var(--ns-grid-item-order, 0);
  align-self: var(--ns-grid-item-self, auto);
}

.ns-grid--fluid > .ns-grid-item {
  grid-column: auto / span min(var(--ns-grid-item-span, 1), 1);
}

/* Breakpoints of the window */
@media (min-width: 640px) {
  .ns-grid--viewport.ns-grid--count-sm {
    --ns-grid-count: var(--ns-grid-count-sm);
  }

  .ns-grid--viewport.ns-grid--gap-sm {
    --ns-grid-gap: var(--ns-grid-gap-sm);
  }

  .ns-grid--viewport.ns-grid--rgap-sm {
    --ns-grid-rgap: var(--ns-grid-rgap-sm);
  }

  .ns-grid--viewport.ns-grid--cgap-sm {
    --ns-grid-cgap: var(--ns-grid-cgap-sm);
  }

  .ns-grid--viewport.ns-grid--align-sm {
    --ns-grid-align: var(--ns-grid-align-sm);
  }

  .ns-grid--viewport.ns-grid--justify-sm {
    --ns-grid-justify: var(--ns-grid-justify-sm);
  }

  .ns-grid--viewport > .ns-grid-item--span-sm {
    --ns-grid-item-span: var(--ns-grid-item-span-sm);
  }

  .ns-grid--viewport > .ns-grid-item--start-sm {
    --ns-grid-item-start: var(--ns-grid-item-start-sm);
  }

  .ns-grid--viewport > .ns-grid-item--order-sm {
    --ns-grid-item-order: var(--ns-grid-item-order-sm);
  }

  .ns-grid--viewport > .ns-grid-item--rows-sm {
    --ns-grid-item-rows: var(--ns-grid-item-rows-sm);
  }

  .ns-grid--viewport > .ns-grid-item--self-sm {
    --ns-grid-item-self: var(--ns-grid-item-self-sm);
  }
}

@media (min-width: 768px) {
  .ns-grid--viewport.ns-grid--count-md {
    --ns-grid-count: var(--ns-grid-count-md);
  }

  .ns-grid--viewport.ns-grid--gap-md {
    --ns-grid-gap: var(--ns-grid-gap-md);
  }

  .ns-grid--viewport.ns-grid--rgap-md {
    --ns-grid-rgap: var(--ns-grid-rgap-md);
  }

  .ns-grid--viewport.ns-grid--cgap-md {
    --ns-grid-cgap: var(--ns-grid-cgap-md);
  }

  .ns-grid--viewport.ns-grid--align-md {
    --ns-grid-align: var(--ns-grid-align-md);
  }

  .ns-grid--viewport.ns-grid--justify-md {
    --ns-grid-justify: var(--ns-grid-justify-md);
  }

  .ns-grid--viewport > .ns-grid-item--span-md {
    --ns-grid-item-span: var(--ns-grid-item-span-md);
  }

  .ns-grid--viewport > .ns-grid-item--start-md {
    --ns-grid-item-start: var(--ns-grid-item-start-md);
  }

  .ns-grid--viewport > .ns-grid-item--order-md {
    --ns-grid-item-order: var(--ns-grid-item-order-md);
  }

  .ns-grid--viewport > .ns-grid-item--rows-md {
    --ns-grid-item-rows: var(--ns-grid-item-rows-md);
  }

  .ns-grid--viewport > .ns-grid-item--self-md {
    --ns-grid-item-self: var(--ns-grid-item-self-md);
  }
}

@media (min-width: 1024px) {
  .ns-grid--viewport.ns-grid--count-lg {
    --ns-grid-count: var(--ns-grid-count-lg);
  }

  .ns-grid--viewport.ns-grid--gap-lg {
    --ns-grid-gap: var(--ns-grid-gap-lg);
  }

  .ns-grid--viewport.ns-grid--rgap-lg {
    --ns-grid-rgap: var(--ns-grid-rgap-lg);
  }

  .ns-grid--viewport.ns-grid--cgap-lg {
    --ns-grid-cgap: var(--ns-grid-cgap-lg);
  }

  .ns-grid--viewport.ns-grid--align-lg {
    --ns-grid-align: var(--ns-grid-align-lg);
  }

  .ns-grid--viewport.ns-grid--justify-lg {
    --ns-grid-justify: var(--ns-grid-justify-lg);
  }

  .ns-grid--viewport > .ns-grid-item--span-lg {
    --ns-grid-item-span: var(--ns-grid-item-span-lg);
  }

  .ns-grid--viewport > .ns-grid-item--start-lg {
    --ns-grid-item-start: var(--ns-grid-item-start-lg);
  }

  .ns-grid--viewport > .ns-grid-item--order-lg {
    --ns-grid-item-order: var(--ns-grid-item-order-lg);
  }

  .ns-grid--viewport > .ns-grid-item--rows-lg {
    --ns-grid-item-rows: var(--ns-grid-item-rows-lg);
  }

  .ns-grid--viewport > .ns-grid-item--self-lg {
    --ns-grid-item-self: var(--ns-grid-item-self-lg);
  }
}

@media (min-width: 1280px) {
  .ns-grid--viewport.ns-grid--count-xl {
    --ns-grid-count: var(--ns-grid-count-xl);
  }

  .ns-grid--viewport.ns-grid--gap-xl {
    --ns-grid-gap: var(--ns-grid-gap-xl);
  }

  .ns-grid--viewport.ns-grid--rgap-xl {
    --ns-grid-rgap: var(--ns-grid-rgap-xl);
  }

  .ns-grid--viewport.ns-grid--cgap-xl {
    --ns-grid-cgap: var(--ns-grid-cgap-xl);
  }

  .ns-grid--viewport.ns-grid--align-xl {
    --ns-grid-align: var(--ns-grid-align-xl);
  }

  .ns-grid--viewport.ns-grid--justify-xl {
    --ns-grid-justify: var(--ns-grid-justify-xl);
  }

  .ns-grid--viewport > .ns-grid-item--span-xl {
    --ns-grid-item-span: var(--ns-grid-item-span-xl);
  }

  .ns-grid--viewport > .ns-grid-item--start-xl {
    --ns-grid-item-start: var(--ns-grid-item-start-xl);
  }

  .ns-grid--viewport > .ns-grid-item--order-xl {
    --ns-grid-item-order: var(--ns-grid-item-order-xl);
  }

  .ns-grid--viewport > .ns-grid-item--rows-xl {
    --ns-grid-item-rows: var(--ns-grid-item-rows-xl);
  }

  .ns-grid--viewport > .ns-grid-item--self-xl {
    --ns-grid-item-self: var(--ns-grid-item-self-xl);
  }
}

/* Breakpoints of the grid itself */
@container ns-grid (min-width: 640px) {
  .ns-grid--container.ns-grid--count-sm {
    --ns-grid-count: var(--ns-grid-count-sm);
  }

  .ns-grid--container.ns-grid--gap-sm {
    --ns-grid-gap: var(--ns-grid-gap-sm);
  }

  .ns-grid--container.ns-grid--rgap-sm {
    --ns-grid-rgap: var(--ns-grid-rgap-sm);
  }

  .ns-grid--container.ns-grid--cgap-sm {
    --ns-grid-cgap: var(--ns-grid-cgap-sm);
  }

  .ns-grid--container.ns-grid--align-sm {
    --ns-grid-align: var(--ns-grid-align-sm);
  }

  .ns-grid--container.ns-grid--justify-sm {
    --ns-grid-justify: var(--ns-grid-justify-sm);
  }

  .ns-grid--container > .ns-grid-item--span-sm {
    --ns-grid-item-span: var(--ns-grid-item-span-sm);
  }

  .ns-grid--container > .ns-grid-item--start-sm {
    --ns-grid-item-start: var(--ns-grid-item-start-sm);
  }

  .ns-grid--container > .ns-grid-item--order-sm {
    --ns-grid-item-order: var(--ns-grid-item-order-sm);
  }

  .ns-grid--container > .ns-grid-item--rows-sm {
    --ns-grid-item-rows: var(--ns-grid-item-rows-sm);
  }

  .ns-grid--container > .ns-grid-item--self-sm {
    --ns-grid-item-self: var(--ns-grid-item-self-sm);
  }
}

@container ns-grid (min-width: 768px) {
  .ns-grid--container.ns-grid--count-md {
    --ns-grid-count: var(--ns-grid-count-md);
  }

  .ns-grid--container.ns-grid--gap-md {
    --ns-grid-gap: var(--ns-grid-gap-md);
  }

  .ns-grid--container.ns-grid--rgap-md {
    --ns-grid-rgap: var(--ns-grid-rgap-md);
  }

  .ns-grid--container.ns-grid--cgap-md {
    --ns-grid-cgap: var(--ns-grid-cgap-md);
  }

  .ns-grid--container.ns-grid--align-md {
    --ns-grid-align: var(--ns-grid-align-md);
  }

  .ns-grid--container.ns-grid--justify-md {
    --ns-grid-justify: var(--ns-grid-justify-md);
  }

  .ns-grid--container > .ns-grid-item--span-md {
    --ns-grid-item-span: var(--ns-grid-item-span-md);
  }

  .ns-grid--container > .ns-grid-item--start-md {
    --ns-grid-item-start: var(--ns-grid-item-start-md);
  }

  .ns-grid--container > .ns-grid-item--order-md {
    --ns-grid-item-order: var(--ns-grid-item-order-md);
  }

  .ns-grid--container > .ns-grid-item--rows-md {
    --ns-grid-item-rows: var(--ns-grid-item-rows-md);
  }

  .ns-grid--container > .ns-grid-item--self-md {
    --ns-grid-item-self: var(--ns-grid-item-self-md);
  }
}

@container ns-grid (min-width: 1024px) {
  .ns-grid--container.ns-grid--count-lg {
    --ns-grid-count: var(--ns-grid-count-lg);
  }

  .ns-grid--container.ns-grid--gap-lg {
    --ns-grid-gap: var(--ns-grid-gap-lg);
  }

  .ns-grid--container.ns-grid--rgap-lg {
    --ns-grid-rgap: var(--ns-grid-rgap-lg);
  }

  .ns-grid--container.ns-grid--cgap-lg {
    --ns-grid-cgap: var(--ns-grid-cgap-lg);
  }

  .ns-grid--container.ns-grid--align-lg {
    --ns-grid-align: var(--ns-grid-align-lg);
  }

  .ns-grid--container.ns-grid--justify-lg {
    --ns-grid-justify: var(--ns-grid-justify-lg);
  }

  .ns-grid--container > .ns-grid-item--span-lg {
    --ns-grid-item-span: var(--ns-grid-item-span-lg);
  }

  .ns-grid--container > .ns-grid-item--start-lg {
    --ns-grid-item-start: var(--ns-grid-item-start-lg);
  }

  .ns-grid--container > .ns-grid-item--order-lg {
    --ns-grid-item-order: var(--ns-grid-item-order-lg);
  }

  .ns-grid--container > .ns-grid-item--rows-lg {
    --ns-grid-item-rows: var(--ns-grid-item-rows-lg);
  }

  .ns-grid--container > .ns-grid-item--self-lg {
    --ns-grid-item-self: var(--ns-grid-item-self-lg);
  }
}

@container ns-grid (min-width: 1280px) {
  .ns-grid--container.ns-grid--count-xl {
    --ns-grid-count: var(--ns-grid-count-xl);
  }

  .ns-grid--container.ns-grid--gap-xl {
    --ns-grid-gap: var(--ns-grid-gap-xl);
  }

  .ns-grid--container.ns-grid--rgap-xl {
    --ns-grid-rgap: var(--ns-grid-rgap-xl);
  }

  .ns-grid--container.ns-grid--cgap-xl {
    --ns-grid-cgap: var(--ns-grid-cgap-xl);
  }

  .ns-grid--container.ns-grid--align-xl {
    --ns-grid-align: var(--ns-grid-align-xl);
  }

  .ns-grid--container.ns-grid--justify-xl {
    --ns-grid-justify: var(--ns-grid-justify-xl);
  }

  .ns-grid--container > .ns-grid-item--span-xl {
    --ns-grid-item-span: var(--ns-grid-item-span-xl);
  }

  .ns-grid--container > .ns-grid-item--start-xl {
    --ns-grid-item-start: var(--ns-grid-item-start-xl);
  }

  .ns-grid--container > .ns-grid-item--order-xl {
    --ns-grid-item-order: var(--ns-grid-item-order-xl);
  }

  .ns-grid--container > .ns-grid-item--rows-xl {
    --ns-grid-item-rows: var(--ns-grid-item-rows-xl);
  }

  .ns-grid--container > .ns-grid-item--self-xl {
    --ns-grid-item-self: var(--ns-grid-item-self-xl);
  }
}
</style>
