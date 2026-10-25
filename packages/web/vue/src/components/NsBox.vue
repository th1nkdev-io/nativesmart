<script setup lang="ts">
import { computed } from "vue";

export type NsBoxBreakpoint = "sm" | "md" | "lg" | "xl";
/** A value, or one value per breakpoint from `base` up: `{ base: "4", md: "8" }`. */
export type NsBoxResponsive<T> = T | ({ base?: T } & Partial<Record<NsBoxBreakpoint, T>>);

export type NsBoxSpace =
  | "0"
  | "0-5"
  | "1"
  | "1-5"
  | "2"
  | "2-5"
  | "3"
  | "4"
  | "5"
  | "6"
  | "8"
  | "10"
  | "12"
  | "16";
export type NsBoxMargin = NsBoxSpace | "auto";
export type NsBoxDisplay =
  | "block"
  | "flex"
  | "grid"
  | "inline"
  | "inline-block"
  | "inline-flex"
  | "none";
export type NsBoxDirection = "row" | "column" | "row-reverse" | "column-reverse";
export type NsBoxAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type NsBoxJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
export type NsBoxBackground =
  | "none"
  | "background"
  | "surface"
  | "surface-muted"
  | "surface-raised"
  | "surface-sunken"
  | "surface-brand"
  | "surface-inverse"
  | "primary-muted"
  | "info-muted"
  | "success-muted"
  | "warning-muted"
  | "danger-muted";
export type NsBoxTone = "auto" | "default" | "muted" | "subtle" | "inherit";
export type NsBoxBorder = "none" | "subtle" | "default" | "strong" | "dashed";
export type NsBoxRadius =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "card"
  | "control"
  | "full";
export type NsBoxElevation = "0" | "1" | "2" | "3" | "4" | "5";
export type NsBoxMaterial = "none" | "thin" | "regular" | "thick";
export type NsBoxOverflow = "visible" | "hidden" | "clip" | "auto" | "scroll";

export interface NsBoxProps {
  /** Rendered element: `section`, `nav`, `li`, `button`… */
  as?: string;
  padding?: NsBoxResponsive<NsBoxSpace>;
  /** Start and end padding; mirrors in right-to-left layouts. */
  paddingInline?: NsBoxResponsive<NsBoxSpace>;
  /** Top and bottom padding. */
  paddingBlock?: NsBoxResponsive<NsBoxSpace>;
  margin?: NsBoxResponsive<NsBoxMargin>;
  marginInline?: NsBoxResponsive<NsBoxMargin>;
  marginBlock?: NsBoxResponsive<NsBoxMargin>;
  display?: NsBoxResponsive<NsBoxDisplay>;
  direction?: NsBoxResponsive<NsBoxDirection>;
  align?: NsBoxResponsive<NsBoxAlign>;
  justify?: NsBoxResponsive<NsBoxJustify>;
  /** Space between children, with flex or grid. */
  gap?: NsBoxResponsive<NsBoxSpace>;
  /** Equal grid columns, with `display="grid"`. */
  columns?: NsBoxResponsive<number>;
  wrap?: boolean;
  /** Fills the free space of a flex parent. */
  grow?: boolean;
  background?: NsBoxBackground;
  /** Text color. `auto` follows the background so text keeps its contrast. */
  tone?: NsBoxTone;
  border?: NsBoxBorder;
  radius?: NsBoxRadius;
  elevation?: NsBoxElevation;
  /** Translucent blurred surface over busy content. */
  material?: NsBoxMaterial;
  overflow?: NsBoxOverflow;
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  /** Hover and pressed feedback, for a box rendered as a button or a link. */
  interactive?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<NsBoxProps>(), {
  as: "div",
  wrap: false,
  grow: false,
  background: "none",
  tone: "auto",
  border: "none",
  radius: "none",
  elevation: "0",
  material: "none",
  interactive: false,
  disabled: false
});

const breakpoints: readonly NsBoxBreakpoint[] = ["sm", "md", "lg", "xl"];

const space = (value: string) => (value === "auto" ? "auto" : `var(--ns-space-${value})`);
const aligns: Record<NsBoxAlign, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline"
};
const justifies: Record<NsBoxJustify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly"
};

/** Responsive props: CSS variable suffix and how a token becomes a CSS value. */
const responsive: readonly [keyof NsBoxProps, string, (value: never) => string][] = [
  ["padding", "p", space],
  ["paddingInline", "px", space],
  ["paddingBlock", "py", space],
  ["margin", "m", space],
  ["marginInline", "mx", space],
  ["marginBlock", "my", space],
  ["gap", "gap", space],
  ["display", "display", (value: string) => value],
  ["direction", "direction", (value: string) => value],
  ["align", "align", (value: NsBoxAlign) => aligns[value]],
  ["justify", "justify", (value: NsBoxJustify) => justifies[value]],
  ["columns", "columns", (value: number) => `repeat(${value}, minmax(0, 1fr))`]
];

function isPerBreakpoint(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/*
 * Each value becomes a variable: `--ns-box-p-base`, `--ns-box-p-md`… The stylesheet picks the one
 * of the current breakpoint, so a base value never blocks a larger screen.
 */
const layout = computed(() => {
  const style: Record<string, string> = {};
  const classes: string[] = [];
  for (const [prop, key, toCss] of responsive) {
    const value = props[prop];
    if (value === undefined) continue;
    const values = isPerBreakpoint(value) ? value : { base: value };
    for (const [point, item] of Object.entries(values)) {
      if (item === undefined) continue;
      style[`--ns-box-${key}-${point}`] = toCss(item as never);
      classes.push(`ns-box--${key}-${point}`);
    }
  }
  for (const [prop, css] of [
    ["width", "inline-size"],
    ["height", "block-size"],
    ["minWidth", "min-inline-size"],
    ["maxWidth", "max-inline-size"],
    ["minHeight", "min-block-size"],
    ["maxHeight", "max-block-size"]
  ] as const) {
    if (props[prop]) style[css] = props[prop]!;
  }
  return { style, classes };
});

const tone = computed(() => {
  if (props.tone !== "auto") return props.tone;
  if (props.background === "surface-brand") return "on-brand";
  if (props.background === "surface-inverse") return "inverse";
  if (props.background.endsWith("-muted") && props.background !== "surface-muted") {
    return `on-${props.background}`;
  }
  return "inherit";
});

const focusable = computed(() => ["button", "a"].includes(props.as));
</script>

<template>
  <component
    :is="as"
    :class="[
      'ns-box',
      ...layout.classes,
      `ns-box--bg-${background}`,
      `ns-box--tone-${tone}`,
      `ns-box--border-${border}`,
      `ns-box--material-${material}`,
      {
        'ns-box--wrap': wrap,
        'ns-box--grow': grow,
        'ns-box--interactive': interactive,
        'ns-box--disabled': disabled
      }
    ]"
    :style="{
      ...layout.style,
      '--ns-box-radius': `var(--ns-radius-${radius})`,
      '--ns-box-shadow': `var(--ns-elevation-${elevation})`,
      overflow
    }"
    :type="as === 'button' ? 'button' : undefined"
    :disabled="as === 'button' && disabled ? true : undefined"
    :aria-disabled="disabled && !focusable ? true : undefined"
  >
    <slot />
  </component>
</template>

<style>
/*
 * Custom properties inherit: without this reset a nested box would take its parent's padding,
 * direction or gap. Each box's own values come inline and win over this rule.
 */
.ns-box {
  --ns-box-p-base: initial;
  --ns-box-p-sm: initial;
  --ns-box-p-md: initial;
  --ns-box-p-lg: initial;
  --ns-box-p-xl: initial;
  --ns-box-px-base: initial;
  --ns-box-px-sm: initial;
  --ns-box-px-md: initial;
  --ns-box-px-lg: initial;
  --ns-box-px-xl: initial;
  --ns-box-py-base: initial;
  --ns-box-py-sm: initial;
  --ns-box-py-md: initial;
  --ns-box-py-lg: initial;
  --ns-box-py-xl: initial;
  --ns-box-m-base: initial;
  --ns-box-m-sm: initial;
  --ns-box-m-md: initial;
  --ns-box-m-lg: initial;
  --ns-box-m-xl: initial;
  --ns-box-mx-base: initial;
  --ns-box-mx-sm: initial;
  --ns-box-mx-md: initial;
  --ns-box-mx-lg: initial;
  --ns-box-mx-xl: initial;
  --ns-box-my-base: initial;
  --ns-box-my-sm: initial;
  --ns-box-my-md: initial;
  --ns-box-my-lg: initial;
  --ns-box-my-xl: initial;
  --ns-box-gap-base: initial;
  --ns-box-gap-sm: initial;
  --ns-box-gap-md: initial;
  --ns-box-gap-lg: initial;
  --ns-box-gap-xl: initial;
  --ns-box-display-base: initial;
  --ns-box-display-sm: initial;
  --ns-box-display-md: initial;
  --ns-box-display-lg: initial;
  --ns-box-display-xl: initial;
  --ns-box-direction-base: initial;
  --ns-box-direction-sm: initial;
  --ns-box-direction-md: initial;
  --ns-box-direction-lg: initial;
  --ns-box-direction-xl: initial;
  --ns-box-align-base: initial;
  --ns-box-align-sm: initial;
  --ns-box-align-md: initial;
  --ns-box-align-lg: initial;
  --ns-box-align-xl: initial;
  --ns-box-justify-base: initial;
  --ns-box-justify-sm: initial;
  --ns-box-justify-md: initial;
  --ns-box-justify-lg: initial;
  --ns-box-justify-xl: initial;
  --ns-box-columns-base: initial;
  --ns-box-columns-sm: initial;
  --ns-box-columns-md: initial;
  --ns-box-columns-lg: initial;
  --ns-box-columns-xl: initial;
}

.ns-box {
  --ns-box-background: transparent;
  --ns-box-color: inherit;
  --ns-box-border-color: var(--ns-color-border);
  --ns-box-border-style: solid;
  --ns-box-border-width: 0;
  --ns-box-p: var(--ns-box-p-base);
  --ns-box-px: var(--ns-box-px-base);
  --ns-box-py: var(--ns-box-py-base);
  --ns-box-m: var(--ns-box-m-base);
  --ns-box-mx: var(--ns-box-mx-base);
  --ns-box-my: var(--ns-box-my-base);
  --ns-box-gap: var(--ns-box-gap-base);
  --ns-box-display: var(--ns-box-display-base);
  --ns-box-direction: var(--ns-box-direction-base);
  --ns-box-align: var(--ns-box-align-base);
  --ns-box-justify: var(--ns-box-justify-base);
  --ns-box-columns: var(--ns-box-columns-base);
  box-sizing: border-box;
  display: var(--ns-box-display, block);
  flex-direction: var(--ns-box-direction, row);
  align-items: var(--ns-box-align, normal);
  justify-content: var(--ns-box-justify, normal);
  gap: var(--ns-box-gap, normal);
  grid-template-columns: var(--ns-box-columns, none);
  min-inline-size: 0;
  padding-block: var(--ns-box-py, var(--ns-box-p, 0));
  padding-inline: var(--ns-box-px, var(--ns-box-p, 0));
  margin-block: var(--ns-box-my, var(--ns-box-m, 0));
  margin-inline: var(--ns-box-mx, var(--ns-box-m, 0));
  border: var(--ns-box-border-width) var(--ns-box-border-style) var(--ns-box-border-color);
  border-radius: var(--ns-box-radius);
  background: var(--ns-box-background);
  box-shadow: var(--ns-box-shadow);
  color: var(--ns-box-color);
  font: inherit;
  text-align: inherit;
  text-decoration: none;
  transition:
    background-color var(--ns-duration-fast) var(--ns-easing-standard),
    box-shadow var(--ns-duration-normal) var(--ns-easing-standard),
    transform var(--ns-duration-fast) var(--ns-easing-standard);
}

/* Breakpoints of the layout tokens, smallest first so larger screens win. */
@media (min-width: 640px) {
  .ns-box--p-sm {
    --ns-box-p: var(--ns-box-p-sm);
  }
  .ns-box--px-sm {
    --ns-box-px: var(--ns-box-px-sm);
  }
  .ns-box--py-sm {
    --ns-box-py: var(--ns-box-py-sm);
  }
  .ns-box--m-sm {
    --ns-box-m: var(--ns-box-m-sm);
  }
  .ns-box--mx-sm {
    --ns-box-mx: var(--ns-box-mx-sm);
  }
  .ns-box--my-sm {
    --ns-box-my: var(--ns-box-my-sm);
  }
  .ns-box--gap-sm {
    --ns-box-gap: var(--ns-box-gap-sm);
  }
  .ns-box--display-sm {
    --ns-box-display: var(--ns-box-display-sm);
  }
  .ns-box--direction-sm {
    --ns-box-direction: var(--ns-box-direction-sm);
  }
  .ns-box--align-sm {
    --ns-box-align: var(--ns-box-align-sm);
  }
  .ns-box--justify-sm {
    --ns-box-justify: var(--ns-box-justify-sm);
  }
  .ns-box--columns-sm {
    --ns-box-columns: var(--ns-box-columns-sm);
  }
}

@media (min-width: 768px) {
  .ns-box--p-md {
    --ns-box-p: var(--ns-box-p-md);
  }
  .ns-box--px-md {
    --ns-box-px: var(--ns-box-px-md);
  }
  .ns-box--py-md {
    --ns-box-py: var(--ns-box-py-md);
  }
  .ns-box--m-md {
    --ns-box-m: var(--ns-box-m-md);
  }
  .ns-box--mx-md {
    --ns-box-mx: var(--ns-box-mx-md);
  }
  .ns-box--my-md {
    --ns-box-my: var(--ns-box-my-md);
  }
  .ns-box--gap-md {
    --ns-box-gap: var(--ns-box-gap-md);
  }
  .ns-box--display-md {
    --ns-box-display: var(--ns-box-display-md);
  }
  .ns-box--direction-md {
    --ns-box-direction: var(--ns-box-direction-md);
  }
  .ns-box--align-md {
    --ns-box-align: var(--ns-box-align-md);
  }
  .ns-box--justify-md {
    --ns-box-justify: var(--ns-box-justify-md);
  }
  .ns-box--columns-md {
    --ns-box-columns: var(--ns-box-columns-md);
  }
}

@media (min-width: 1024px) {
  .ns-box--p-lg {
    --ns-box-p: var(--ns-box-p-lg);
  }
  .ns-box--px-lg {
    --ns-box-px: var(--ns-box-px-lg);
  }
  .ns-box--py-lg {
    --ns-box-py: var(--ns-box-py-lg);
  }
  .ns-box--m-lg {
    --ns-box-m: var(--ns-box-m-lg);
  }
  .ns-box--mx-lg {
    --ns-box-mx: var(--ns-box-mx-lg);
  }
  .ns-box--my-lg {
    --ns-box-my: var(--ns-box-my-lg);
  }
  .ns-box--gap-lg {
    --ns-box-gap: var(--ns-box-gap-lg);
  }
  .ns-box--display-lg {
    --ns-box-display: var(--ns-box-display-lg);
  }
  .ns-box--direction-lg {
    --ns-box-direction: var(--ns-box-direction-lg);
  }
  .ns-box--align-lg {
    --ns-box-align: var(--ns-box-align-lg);
  }
  .ns-box--justify-lg {
    --ns-box-justify: var(--ns-box-justify-lg);
  }
  .ns-box--columns-lg {
    --ns-box-columns: var(--ns-box-columns-lg);
  }
}

@media (min-width: 1280px) {
  .ns-box--p-xl {
    --ns-box-p: var(--ns-box-p-xl);
  }
  .ns-box--px-xl {
    --ns-box-px: var(--ns-box-px-xl);
  }
  .ns-box--py-xl {
    --ns-box-py: var(--ns-box-py-xl);
  }
  .ns-box--m-xl {
    --ns-box-m: var(--ns-box-m-xl);
  }
  .ns-box--mx-xl {
    --ns-box-mx: var(--ns-box-mx-xl);
  }
  .ns-box--my-xl {
    --ns-box-my: var(--ns-box-my-xl);
  }
  .ns-box--gap-xl {
    --ns-box-gap: var(--ns-box-gap-xl);
  }
  .ns-box--display-xl {
    --ns-box-display: var(--ns-box-display-xl);
  }
  .ns-box--direction-xl {
    --ns-box-direction: var(--ns-box-direction-xl);
  }
  .ns-box--align-xl {
    --ns-box-align: var(--ns-box-align-xl);
  }
  .ns-box--justify-xl {
    --ns-box-justify: var(--ns-box-justify-xl);
  }
  .ns-box--columns-xl {
    --ns-box-columns: var(--ns-box-columns-xl);
  }
}

.ns-box--wrap {
  flex-wrap: wrap;
}

.ns-box--grow {
  flex: 1 1 0%;
}

/* Backgrounds */
.ns-box--bg-background {
  --ns-box-background: var(--ns-color-background);
}
.ns-box--bg-surface {
  --ns-box-background: var(--ns-color-surface);
}
.ns-box--bg-surface-muted {
  --ns-box-background: var(--ns-color-surface-muted);
}
.ns-box--bg-surface-raised {
  --ns-box-background: var(--ns-color-surface-raised);
}
.ns-box--bg-surface-sunken {
  --ns-box-background: var(--ns-color-surface-sunken);
}
.ns-box--bg-surface-brand {
  --ns-box-background: var(--ns-color-surface-brand);
}
.ns-box--bg-surface-inverse {
  --ns-box-background: var(--ns-color-surface-inverse);
}
.ns-box--bg-primary-muted {
  --ns-box-background: var(--ns-color-primary-muted);
}
.ns-box--bg-info-muted {
  --ns-box-background: var(--ns-color-info-muted);
}
.ns-box--bg-success-muted {
  --ns-box-background: var(--ns-color-success-muted);
}
.ns-box--bg-warning-muted {
  --ns-box-background: var(--ns-color-warning-muted);
}
.ns-box--bg-danger-muted {
  --ns-box-background: var(--ns-color-danger-muted);
}

/* Text tone: auto picks the pair of the background */
.ns-box--tone-default {
  --ns-box-color: var(--ns-color-text);
}
.ns-box--tone-muted {
  --ns-box-color: var(--ns-color-text-muted);
}
.ns-box--tone-subtle {
  --ns-box-color: var(--ns-color-text-subtle);
}
.ns-box--tone-on-brand {
  --ns-box-color: var(--ns-color-text-on-brand);
}
.ns-box--tone-inverse {
  --ns-box-color: var(--ns-color-text-inverse);
}
.ns-box--tone-on-primary-muted {
  --ns-box-color: var(--ns-color-on-primary-muted);
}
.ns-box--tone-on-info-muted {
  --ns-box-color: var(--ns-color-on-info-muted);
}
.ns-box--tone-on-success-muted {
  --ns-box-color: var(--ns-color-on-success-muted);
}
.ns-box--tone-on-warning-muted {
  --ns-box-color: var(--ns-color-on-warning-muted);
}
.ns-box--tone-on-danger-muted {
  --ns-box-color: var(--ns-color-on-danger-muted);
}

/* Borders */
.ns-box:not(.ns-box--border-none) {
  --ns-box-border-width: 1px;
}
.ns-box--border-subtle {
  --ns-box-border-color: var(--ns-color-border-subtle);
}
.ns-box--border-strong {
  --ns-box-border-color: var(--ns-color-border-strong);
}
.ns-box--border-dashed {
  --ns-box-border-style: dashed;
  --ns-box-border-color: var(--ns-color-border-strong);
}

/* Materials: translucent surfaces that blur what is behind them */
.ns-box:not(.ns-box--material-none) {
  backdrop-filter: var(--ns-box-material-filter);
  -webkit-backdrop-filter: var(--ns-box-material-filter);
}

.ns-box--material-thin {
  --ns-box-background: var(--ns-material-thin);
  --ns-box-material-filter: var(--ns-material-thin-filter);
}

.ns-box--material-regular {
  --ns-box-background: var(--ns-material-regular);
  --ns-box-material-filter: var(--ns-material-regular-filter);
}

.ns-box--material-thick {
  --ns-box-background: var(--ns-material-thick);
  --ns-box-material-filter: var(--ns-material-thick-filter);
}

/* Interaction */
.ns-box--interactive {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.ns-box--interactive:not(.ns-box--disabled):hover {
  --ns-box-background: var(--ns-color-surface-hover);
}

.ns-box--interactive:not(.ns-box--disabled):active {
  transform: scale(0.99);
}

.ns-box--interactive:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
  outline-offset: var(--ns-focus-ring-offset);
}

.ns-box--disabled {
  opacity: var(--ns-opacity-disabled);
  cursor: not-allowed;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .ns-box--interactive:not(.ns-box--disabled):active {
    transform: none;
  }
}
</style>
