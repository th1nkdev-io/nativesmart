<script setup lang="ts">
import { Comment, Fragment, Text, computed, useSlots, type VNode } from "vue";

export type NsStackBreakpoint = "sm" | "md" | "lg" | "xl";
/** A value, or one value per breakpoint from `base` up: `{ base: "column", md: "row" }`. */
export type NsStackResponsive<T> = T | ({ base?: T } & Partial<Record<NsStackBreakpoint, T>>);
export type NsStackDirection = "column" | "row" | "column-reverse" | "row-reverse";
export type NsStackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type NsStackAlign = "stretch" | "start" | "center" | "end" | "baseline";
export type NsStackJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

export interface NsStackProps {
  direction?: NsStackResponsive<NsStackDirection>;
  /** Space between items, from the spacing scale. */
  gap?: NsStackResponsive<NsStackGap>;
  /** Alignment across the axis. */
  align?: NsStackResponsive<NsStackAlign>;
  /** Distribution along the axis. */
  justify?: NsStackResponsive<NsStackJustify>;
  /** Items flow onto new lines when the row is full. */
  wrap?: boolean;
  /** Draws a line between items, in the middle of the gap. A `divider` slot replaces it. */
  divided?: boolean;
  /** Items share the length equally, such as a row of buttons. */
  fill?: boolean;
  /** Joins the items into one group: no gap, shared borders, outer corners only. */
  compact?: boolean;
  /** Sits in a line of text like a word, sized to its items. */
  inline?: boolean;
  /** Element to render: `ul` or `ol` for a list, `nav`, `section`… */
  as?: string;
}

const props = withDefaults(defineProps<NsStackProps>(), {
  direction: "column",
  gap: "md",
  align: "stretch",
  justify: "start",
  wrap: false,
  divided: false,
  fill: false,
  compact: false,
  inline: false,
  as: "div"
});

const slots = useSlots();

const steps: Record<NsStackGap, string> = {
  none: "0px",
  xs: "var(--ns-space-1)",
  sm: "var(--ns-space-2)",
  md: "var(--ns-space-4)",
  lg: "var(--ns-space-6)",
  xl: "var(--ns-space-8)",
  "2xl": "var(--ns-space-12)"
};
const aligns: Record<NsStackAlign, string> = {
  stretch: "stretch",
  start: "flex-start",
  center: "center",
  end: "flex-end",
  baseline: "baseline"
};
const justifies: Record<NsStackJustify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly"
};

/** Responsive props: CSS variable suffix and how a value becomes CSS. */
const responsive = [
  ["direction", "direction", (value: string) => value],
  ["gap", "gap", (value: NsStackGap) => steps[value]],
  ["align", "align", (value: NsStackAlign) => aligns[value]],
  ["justify", "justify", (value: NsStackJustify) => justifies[value]]
] as const;

function isPerBreakpoint(value: unknown): value is Record<string, string> {
  return typeof value === "object" && value !== null;
}

/*
 * Each value becomes a variable: `--ns-stack-gap-base`, `--ns-stack-gap-md`… The stylesheet picks
 * the one of the current breakpoint.
 */
const layout = computed(() => {
  const style: Record<string, string> = {};
  const classes: string[] = [];
  for (const [prop, key, toCss] of responsive) {
    const value = props[prop];
    const values = isPerBreakpoint(value) ? value : { base: value };
    for (const [point, item] of Object.entries(values)) {
      if (item === undefined) continue;
      style[`--ns-stack-${key}-${point}`] = toCss(item as never);
      if (point !== "base") classes.push(`ns-stack--${key}-${point}`);
    }
  }
  return { style, classes };
});

/* Compact groups join along the base axis. */
const axis = computed(() => {
  const value = isPerBreakpoint(props.direction)
    ? (props.direction.base ?? "column")
    : props.direction;
  return value.startsWith("row") ? "row" : "column";
});

const separated = computed(() => (props.divided || Boolean(slots.divider)) && !props.compact);
const isList = computed(() => props.as === "ul" || props.as === "ol");

/* The rendered children, without fragments, comments or blank text, so separators go between. */
function items() {
  const out: VNode[] = [];
  const walk = (nodes: VNode[]) => {
    for (const node of nodes) {
      if (node.type === Fragment && Array.isArray(node.children)) walk(node.children as VNode[]);
      else if (node.type === Comment) continue;
      else if (node.type === Text && !String(node.children).trim()) continue;
      else out.push(node);
    }
  };
  walk(slots.default?.() ?? []);
  return out;
}
</script>

<template>
  <component
    :is="as"
    :class="[
      'ns-stack',
      ...layout.classes,
      {
        'ns-stack--wrap': wrap,
        'ns-stack--divided': separated,
        'ns-stack--fill': fill,
        'ns-stack--inline': inline,
        [`ns-stack--compact ns-stack--compact-${axis}`]: compact
      }
    ]"
    :style="layout.style"
  >
    <template v-if="separated">
      <template v-for="(item, index) in items()" :key="item.key ?? index">
        <component
          :is="isList ? 'li' : 'span'"
          v-if="index > 0"
          :class="['ns-stack__divider', { 'ns-stack__divider--custom': slots.divider }]"
          :role="isList ? 'none' : undefined"
          aria-hidden="true"
          ><slot name="divider"
        /></component>
        <component :is="item" />
      </template>
    </template>
    <slot v-else />
  </component>
</template>

<style>
/* Breakpoint values are reset so a nested stack never takes its parent's. */
.ns-stack {
  --ns-stack-direction-sm: initial;
  --ns-stack-direction-md: initial;
  --ns-stack-direction-lg: initial;
  --ns-stack-direction-xl: initial;
  --ns-stack-gap-sm: initial;
  --ns-stack-gap-md: initial;
  --ns-stack-gap-lg: initial;
  --ns-stack-gap-xl: initial;
  --ns-stack-align-sm: initial;
  --ns-stack-align-md: initial;
  --ns-stack-align-lg: initial;
  --ns-stack-align-xl: initial;
  --ns-stack-justify-sm: initial;
  --ns-stack-justify-md: initial;
  --ns-stack-justify-lg: initial;
  --ns-stack-justify-xl: initial;
  --ns-stack-direction: var(--ns-stack-direction-base, column);
  --ns-stack-gap: var(--ns-stack-gap-base, var(--ns-space-4));
  --ns-stack-align: var(--ns-stack-align-base, stretch);
  --ns-stack-justify: var(--ns-stack-justify-base, flex-start);
  --ns-stack-divider-color: var(--ns-color-border);
  box-sizing: border-box;
  display: flex;
  flex-direction: var(--ns-stack-direction);
  align-items: var(--ns-stack-align);
  justify-content: var(--ns-stack-justify);
  gap: var(--ns-stack-gap);
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ns-stack--inline {
  display: inline-flex;
  vertical-align: middle;
}

.ns-stack--wrap {
  flex-wrap: wrap;
}

@media (min-width: 640px) {
  .ns-stack--direction-sm {
    --ns-stack-direction: var(--ns-stack-direction-sm);
  }
  .ns-stack--gap-sm {
    --ns-stack-gap: var(--ns-stack-gap-sm);
  }
  .ns-stack--align-sm {
    --ns-stack-align: var(--ns-stack-align-sm);
  }
  .ns-stack--justify-sm {
    --ns-stack-justify: var(--ns-stack-justify-sm);
  }
}

@media (min-width: 768px) {
  .ns-stack--direction-md {
    --ns-stack-direction: var(--ns-stack-direction-md);
  }
  .ns-stack--gap-md {
    --ns-stack-gap: var(--ns-stack-gap-md);
  }
  .ns-stack--align-md {
    --ns-stack-align: var(--ns-stack-align-md);
  }
  .ns-stack--justify-md {
    --ns-stack-justify: var(--ns-stack-justify-md);
  }
}

@media (min-width: 1024px) {
  .ns-stack--direction-lg {
    --ns-stack-direction: var(--ns-stack-direction-lg);
  }
  .ns-stack--gap-lg {
    --ns-stack-gap: var(--ns-stack-gap-lg);
  }
  .ns-stack--align-lg {
    --ns-stack-align: var(--ns-stack-align-lg);
  }
  .ns-stack--justify-lg {
    --ns-stack-justify: var(--ns-stack-justify-lg);
  }
}

@media (min-width: 1280px) {
  .ns-stack--direction-xl {
    --ns-stack-direction: var(--ns-stack-direction-xl);
  }
  .ns-stack--gap-xl {
    --ns-stack-gap: var(--ns-stack-gap-xl);
  }
  .ns-stack--align-xl {
    --ns-stack-align: var(--ns-stack-align-xl);
  }
  .ns-stack--justify-xl {
    --ns-stack-justify: var(--ns-stack-justify-xl);
  }
}

/*
 * Divided: half the gap on each side of the line. The line stretches across the axis and is 1 px
 * along it, so it turns with the direction without knowing it.
 */
.ns-stack--divided {
  gap: calc(var(--ns-stack-gap) / 2);
}

.ns-stack__divider {
  flex: none;
  align-self: stretch;
  min-inline-size: 1px;
  min-block-size: 1px;
  background: var(--ns-stack-divider-color);
}

.ns-stack__divider--custom {
  display: flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 0;
  min-block-size: 0;
  background: none;
  color: var(--ns-color-text-muted);
}

.ns-stack--fill > :not(.ns-stack__divider) {
  flex: 1 1 0%;
  min-inline-size: 0;
}

/* Compact: one group, borders shared, only the outer corners rounded. */
.ns-stack--compact {
  gap: 0;
}

.ns-stack--compact > :hover,
.ns-stack--compact > :focus-visible,
.ns-stack--compact > :focus-within {
  position: relative;
  z-index: 1;
}

.ns-stack--compact-row > :not(:first-child) {
  margin-inline-start: -1px;
  border-start-start-radius: 0;
  border-end-start-radius: 0;
}

.ns-stack--compact-row > :not(:last-child) {
  border-start-end-radius: 0;
  border-end-end-radius: 0;
}

.ns-stack--compact-column > :not(:first-child) {
  margin-block-start: -1px;
  border-start-start-radius: 0;
  border-start-end-radius: 0;
}

.ns-stack--compact-column > :not(:last-child) {
  border-end-start-radius: 0;
  border-end-end-radius: 0;
}
</style>
