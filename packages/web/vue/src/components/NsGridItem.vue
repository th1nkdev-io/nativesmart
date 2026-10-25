<script setup lang="ts">
import { computed } from "vue";
import type { NsGridAlign, NsGridResponsive } from "./NsGrid.vue";

export interface NsGridItemProps {
  as?: string;
  /** Columns taken: a number, or `full` for the whole row. Never more than the grid has. */
  span?: NsGridResponsive<number | "full">;
  /** Empty columns before the item. */
  offset?: NsGridResponsive<number>;
  /** Display order: a number, `first` or `last`. The reading order stays the source order. */
  order?: NsGridResponsive<number | "first" | "last">;
  /** Rows taken. */
  rowSpan?: NsGridResponsive<number>;
  /** Vertical alignment of this item only. */
  align?: NsGridResponsive<NsGridAlign>;
}

const props = withDefaults(defineProps<NsGridItemProps>(), { as: "div" });

const responsive: readonly [keyof NsGridItemProps, string, (value: never) => string][] = [
  [
    "span",
    "span",
    (value: number | "full") => (value === "full" ? "999" : `${Math.max(1, Math.round(value))}`)
  ],
  ["offset", "start", (value: number) => (value > 0 ? `${Math.round(value) + 1}` : "auto")],
  [
    "order",
    "order",
    (value: number | "first" | "last") =>
      value === "first" ? "-1" : value === "last" ? "999" : `${value}`
  ],
  ["rowSpan", "rows", (value: number) => `${Math.max(1, Math.round(value))}`],
  ["align", "self", (value: string) => value]
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
      style[`--ns-grid-item-${key}-${point}`] = toCss(item as never);
      classes.push(`ns-grid-item--${key}-${point}`);
    }
  }
  return { style, classes };
});
</script>

<template>
  <component :is="as" :class="['ns-grid-item', ...layout.classes]" :style="layout.style">
    <slot />
  </component>
</template>
