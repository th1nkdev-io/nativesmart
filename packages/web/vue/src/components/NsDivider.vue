<script setup lang="ts">
import { computed, useSlots } from "vue";

export type NsDividerOrientation = "horizontal" | "vertical";
export type NsDividerVariant = "solid" | "dashed" | "dotted" | "gradient";
export type NsDividerThickness = "thin" | "medium" | "thick";
export type NsDividerTone = "subtle" | "default" | "strong" | "primary";
export type NsDividerInset = "none" | "start" | "middle";
export type NsDividerSpacing = "none" | "sm" | "md" | "lg";
export type NsDividerLabelPlacement = "start" | "center" | "end";

export interface NsDividerProps {
  orientation?: NsDividerOrientation;
  /** Line style: solid, dashed, dotted, or a gradient that fades at both ends. */
  variant?: NsDividerVariant;
  thickness?: NsDividerThickness;
  tone?: NsDividerTone;
  /** `start` lines up with list text after an avatar; `middle` keeps a margin on both sides. */
  inset?: NsDividerInset;
  /** Space before and after the line. */
  spacing?: NsDividerSpacing;
  /** Short text on the line, such as « ou » or a section name. A default slot replaces it. */
  label?: string;
  labelPlacement?: NsDividerLabelPlacement;
  /** Purely visual: hidden from assistive tech. */
  decorative?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<NsDividerProps>(), {
  orientation: "horizontal",
  variant: "solid",
  thickness: "thin",
  tone: "default",
  inset: "none",
  spacing: "none",
  labelPlacement: "center",
  decorative: false,
  disabled: false
});

const slots = useSlots();
/* With a label the text is read normally and the two lines around it are decoration. */
const labelled = computed(() => Boolean(props.label || slots.default));
</script>

<template>
  <div
    v-if="labelled"
    :class="[
      'ns-divider',
      'ns-divider--labelled',
      `ns-divider--${orientation}`,
      `ns-divider--${variant}`,
      `ns-divider--${thickness}`,
      `ns-divider--tone-${tone}`,
      `ns-divider--inset-${inset}`,
      `ns-divider--spacing-${spacing}`,
      `ns-divider--label-${labelPlacement}`,
      { 'ns-divider--disabled': disabled }
    ]"
  >
    <span class="ns-divider__line" aria-hidden="true" />
    <span class="ns-divider__label"
      ><slot>{{ label }}</slot></span
    >
    <span class="ns-divider__line" aria-hidden="true" />
  </div>
  <div
    v-else
    :class="[
      'ns-divider',
      `ns-divider--${orientation}`,
      `ns-divider--${variant}`,
      `ns-divider--${thickness}`,
      `ns-divider--tone-${tone}`,
      `ns-divider--inset-${inset}`,
      `ns-divider--spacing-${spacing}`,
      { 'ns-divider--disabled': disabled }
    ]"
    :role="decorative ? 'none' : 'separator'"
    :aria-orientation="decorative ? undefined : orientation"
  >
    <span class="ns-divider__line" aria-hidden="true" />
  </div>
</template>

<style>
.ns-divider {
  --ns-divider-color: var(--ns-color-border);
  --ns-divider-width: 1px;
  --ns-divider-style: solid;
  --ns-divider-spacing: 0px;
  --ns-divider-inset: var(--ns-space-14);
  --ns-divider-label-gap: var(--ns-space-3);
  --ns-divider-label-offset: var(--ns-space-6);
  box-sizing: border-box;
  display: flex;
  flex: none;
  align-items: center;
  margin: 0;
  color: var(--ns-color-text-muted);
  font-family: var(--ns-font-sans);
}

.ns-divider--horizontal {
  inline-size: auto;
  margin-block: var(--ns-divider-spacing);
}

.ns-divider--vertical {
  flex-direction: column;
  align-self: stretch;
  min-block-size: 1em;
  margin-inline: var(--ns-divider-spacing);
}

.ns-divider__line {
  flex: 1 1 0%;
  min-inline-size: 0;
  min-block-size: 0;
  border: 0 var(--ns-divider-style) var(--ns-divider-color);
}

.ns-divider--horizontal .ns-divider__line {
  border-block-start-width: var(--ns-divider-width);
}

.ns-divider--vertical .ns-divider__line {
  border-inline-start-width: var(--ns-divider-width);
}

/* Gradient: the line fades out at both ends. */
.ns-divider--gradient .ns-divider__line {
  border: 0;
  background: linear-gradient(
    var(--ns-divider-gradient-angle, to right),
    transparent,
    var(--ns-divider-color),
    transparent
  );
}

.ns-divider--gradient.ns-divider--horizontal .ns-divider__line {
  block-size: var(--ns-divider-width);
}

.ns-divider--gradient.ns-divider--vertical .ns-divider__line {
  --ns-divider-gradient-angle: to bottom;
  inline-size: var(--ns-divider-width);
}

.ns-divider--gradient.ns-divider--labelled .ns-divider__line:first-child {
  background: linear-gradient(
    var(--ns-divider-gradient-angle, to right),
    transparent,
    var(--ns-divider-color)
  );
}

.ns-divider--gradient.ns-divider--labelled .ns-divider__line:last-child {
  background: linear-gradient(
    var(--ns-divider-gradient-angle, to right),
    var(--ns-divider-color),
    transparent
  );
}

[dir="rtl"] .ns-divider--gradient.ns-divider--horizontal {
  --ns-divider-gradient-angle: to left;
}

/* Label */
.ns-divider--labelled {
  gap: var(--ns-divider-label-gap);
}

.ns-divider__label {
  flex: none;
  font-size: var(--ns-text-caption-size);
  font-weight: var(--ns-font-weight-medium);
  line-height: var(--ns-text-caption-line-height);
  white-space: nowrap;
}

.ns-divider--label-start .ns-divider__line:first-child,
.ns-divider--label-end .ns-divider__line:last-child {
  flex: 0 0 var(--ns-divider-label-offset);
}

/* Style, thickness and tone */
.ns-divider--dashed {
  --ns-divider-style: dashed;
}

.ns-divider--dotted {
  --ns-divider-style: dotted;
}

.ns-divider--medium {
  --ns-divider-width: 2px;
}

.ns-divider--thick {
  --ns-divider-width: 4px;
}

.ns-divider--thick .ns-divider__line {
  border-radius: var(--ns-radius-full);
}

.ns-divider--tone-subtle {
  --ns-divider-color: var(--ns-color-border-subtle);
}

.ns-divider--tone-strong {
  --ns-divider-color: var(--ns-color-border-strong);
}

.ns-divider--tone-primary {
  --ns-divider-color: var(--ns-color-primary);
  color: var(--ns-color-primary-text);
}

/* Inset: logical sides, so it mirrors in right-to-left layouts. */
.ns-divider--horizontal.ns-divider--inset-start {
  margin-inline-start: var(--ns-divider-inset);
}

.ns-divider--horizontal.ns-divider--inset-middle {
  margin-inline: var(--ns-space-4);
}

.ns-divider--vertical.ns-divider--inset-start {
  margin-block-start: var(--ns-space-2);
}

.ns-divider--vertical.ns-divider--inset-middle {
  margin-block: var(--ns-space-2);
}

/* Spacing */
.ns-divider--spacing-sm {
  --ns-divider-spacing: var(--ns-space-2);
}

.ns-divider--spacing-md {
  --ns-divider-spacing: var(--ns-space-4);
}

.ns-divider--spacing-lg {
  --ns-divider-spacing: var(--ns-space-6);
}

.ns-divider--disabled {
  --ns-divider-color: var(--ns-color-border-disabled);
  color: var(--ns-color-text-disabled);
}
</style>
