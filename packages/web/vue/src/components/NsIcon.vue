<script setup lang="ts">
import { computed } from "vue";
import { iconPath } from "../icons";

export type NsIconSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type NsIconTone =
  | "current"
  | "muted"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type NsIconVariant = "plain" | "soft" | "solid" | "outline";
export type NsIconShape = "circle" | "rounded" | "square";
export type NsIconStroke = "auto" | "thin" | "regular" | "bold";
export type NsIconRotation = 0 | 90 | 180 | 270 | "0" | "90" | "180" | "270";
export type NsIconFlip = "none" | "horizontal" | "vertical";

export interface NsIconProps {
  /** Icon identifier from the built-in set or one added with `registerIcons`. */
  name: string;
  /** Meaning when the icon is not decorative. Without it the icon is hidden from assistive tech. */
  label?: string;
  size?: NsIconSize;
  /** Color; `current` takes the surrounding text color. */
  tone?: NsIconTone;
  /** Glyph alone, or inside a tinted, solid or outlined container. */
  variant?: NsIconVariant;
  shape?: NsIconShape;
  /** Line weight; `auto` thins the largest sizes. */
  stroke?: NsIconStroke;
  rotate?: NsIconRotation;
  flip?: NsIconFlip;
  /** Turns continuously, for loading or syncing. */
  spin?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<NsIconProps>(), {
  size: "md",
  tone: "current",
  variant: "plain",
  shape: "rounded",
  stroke: "auto",
  rotate: 0,
  flip: "none",
  spin: false,
  disabled: false
});

const path = computed(() => iconPath(props.name));
/** Arrows and chevrons that point sideways flip in right-to-left layouts. */
const directional = computed(() => /^(arrow|chevron)-(left|right)$/.test(props.name));
const contained = computed(() => props.variant !== "plain");

const weight = computed(() => {
  if (props.stroke !== "auto") return props.stroke;
  return ["xl", "2xl", "3xl"].includes(props.size) ? "thin" : "regular";
});

/* Rotation and flip compose into one transform on the glyph. */
const transform = computed(() => {
  const parts: string[] = [];
  const turn = Number(props.rotate);
  if (turn) parts.push(`rotate(${turn}deg)`);
  if (props.flip === "horizontal") parts.push("scaleX(-1)");
  if (props.flip === "vertical") parts.push("scaleY(-1)");
  return parts.length ? parts.join(" ") : undefined;
});

const classes = computed(() => [
  `ns-icon--${props.size}`,
  `ns-icon--tone-${props.tone}`,
  `ns-icon--stroke-${weight.value}`,
  { "ns-icon--spin": props.spin, "ns-icon--disabled": props.disabled }
]);
</script>

<template>
  <span
    v-if="contained"
    :class="['ns-icon-box', `ns-icon-box--${variant}`, `ns-icon-box--${shape}`, ...classes]"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  >
    <svg
      :class="['ns-icon', { 'ns-icon--missing': !path }]"
      viewBox="0 0 24 24"
      aria-hidden="true"
      :data-directional="directional || undefined"
      :style="{ '--ns-icon-transform': transform }"
      focusable="false"
    >
      <path v-if="path" :d="path" />
      <rect v-else x="4" y="4" width="16" height="16" rx="3" stroke-dasharray="3 3" />
    </svg>
  </span>
  <svg
    v-else
    :class="['ns-icon', ...classes, { 'ns-icon--missing': !path }]"
    viewBox="0 0 24 24"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
    :data-directional="directional || undefined"
    :style="{ '--ns-icon-transform': transform }"
    focusable="false"
  >
    <path v-if="path" :d="path" />
    <rect v-else x="4" y="4" width="16" height="16" rx="3" stroke-dasharray="3 3" />
  </svg>
</template>

<style>
.ns-icon,
.ns-icon-box {
  --ns-icon-size: var(--ns-icon-size-md);
  --ns-icon-color: currentColor;
  --ns-icon-stroke: var(--ns-icon-stroke-regular);
}

.ns-icon {
  display: inline-block;
  flex: none;
  inline-size: var(--ns-icon-size);
  block-size: var(--ns-icon-size);
  fill: none;
  stroke: var(--ns-icon-color);
  stroke-width: var(--ns-icon-stroke);
  stroke-linecap: round;
  stroke-linejoin: round;
  vertical-align: middle;
  transform: var(--ns-icon-transform, none);
}

/* Inside a container the glyph takes the container's size and stroke, and its text color. */
.ns-icon-box .ns-icon {
  --ns-icon-size: inherit;
  --ns-icon-color: currentColor;
  --ns-icon-stroke: inherit;
}

/* Sizes */
.ns-icon--2xs {
  --ns-icon-size: var(--ns-icon-size-2xs);
}

.ns-icon--xs {
  --ns-icon-size: var(--ns-icon-size-xs);
}

.ns-icon--sm {
  --ns-icon-size: var(--ns-icon-size-sm);
}

.ns-icon--lg {
  --ns-icon-size: var(--ns-icon-size-lg);
}

.ns-icon--xl {
  --ns-icon-size: var(--ns-icon-size-xl);
}

.ns-icon--2xl {
  --ns-icon-size: var(--ns-icon-size-2xl);
}

.ns-icon--3xl {
  --ns-icon-size: var(--ns-icon-size-3xl);
}

/* Stroke */
.ns-icon--stroke-thin {
  --ns-icon-stroke: var(--ns-icon-stroke-thin);
}

.ns-icon--stroke-bold {
  --ns-icon-stroke: var(--ns-icon-stroke-bold);
}

/* Tones: the glyph color, and the container colors that go with it. */
.ns-icon--tone-muted {
  --ns-icon-color: var(--ns-color-text-muted);
  --ns-icon-tint: var(--ns-color-surface-muted);
  --ns-icon-fill: var(--ns-color-text-muted);
  --ns-icon-on-fill: var(--ns-color-surface);
  --ns-icon-border: var(--ns-color-border);
}

.ns-icon--tone-primary {
  --ns-icon-color: var(--ns-color-primary-text);
  --ns-icon-tint: var(--ns-color-primary-muted);
  --ns-icon-fill: var(--ns-color-primary);
  --ns-icon-on-fill: var(--ns-color-on-primary);
  --ns-icon-border: var(--ns-color-primary-border);
}

.ns-icon--tone-success {
  --ns-icon-color: var(--ns-color-success-text);
  --ns-icon-tint: var(--ns-color-success-muted);
  --ns-icon-fill: var(--ns-color-success);
  --ns-icon-on-fill: var(--ns-color-on-success);
  --ns-icon-border: var(--ns-color-success-border);
}

.ns-icon--tone-warning {
  --ns-icon-color: var(--ns-color-warning-text);
  --ns-icon-tint: var(--ns-color-warning-muted);
  --ns-icon-fill: var(--ns-color-warning);
  --ns-icon-on-fill: var(--ns-color-on-warning);
  --ns-icon-border: var(--ns-color-warning-border);
}

.ns-icon--tone-danger {
  --ns-icon-color: var(--ns-color-danger-text);
  --ns-icon-tint: var(--ns-color-danger-muted);
  --ns-icon-fill: var(--ns-color-danger);
  --ns-icon-on-fill: var(--ns-color-on-danger);
  --ns-icon-border: var(--ns-color-danger-border);
}

.ns-icon--tone-info {
  --ns-icon-color: var(--ns-color-info-text);
  --ns-icon-tint: var(--ns-color-info-muted);
  --ns-icon-fill: var(--ns-color-info);
  --ns-icon-on-fill: var(--ns-color-on-info);
  --ns-icon-border: var(--ns-color-info-border);
}

/* Container: about twice the glyph, in the tone. */
.ns-icon-box {
  display: inline-grid;
  flex: none;
  place-items: center;
  box-sizing: border-box;
  inline-size: calc(var(--ns-icon-size) * 2);
  block-size: calc(var(--ns-icon-size) * 2);
  border: 1px solid transparent;
  border-radius: var(--ns-radius-md);
  color: var(--ns-icon-color);
  vertical-align: middle;
}

.ns-icon-box--circle {
  border-radius: var(--ns-radius-full);
}

.ns-icon-box--square {
  border-radius: var(--ns-radius-xs);
}

.ns-icon-box--soft {
  background: var(--ns-icon-tint, color-mix(in srgb, currentColor 12%, transparent));
}

.ns-icon-box--solid {
  background: var(--ns-icon-fill, var(--ns-color-text));
  color: var(--ns-icon-on-fill, var(--ns-color-surface));
}

.ns-icon-box--outline {
  border-color: var(--ns-icon-border, var(--ns-color-border));
}

/* States */
.ns-icon--spin.ns-icon,
.ns-icon--spin .ns-icon {
  animation: ns-icon-spin 1s linear infinite;
}

@keyframes ns-icon-spin {
  from {
    transform: var(--ns-icon-transform, rotate(0deg)) rotate(0deg);
  }
  to {
    transform: var(--ns-icon-transform, rotate(0deg)) rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ns-icon--spin.ns-icon,
  .ns-icon--spin .ns-icon {
    animation: none;
  }
}

.ns-icon--disabled {
  --ns-icon-color: var(--ns-color-text-disabled);
}

.ns-icon-box.ns-icon--disabled {
  border-color: var(--ns-color-border-subtle);
  background: var(--ns-color-surface-disabled);
  color: var(--ns-color-text-disabled);
}

.ns-icon--missing {
  opacity: var(--ns-opacity-muted);
}

/* Icons mirror in right-to-left layouts only when they point somewhere. */
[dir="rtl"] .ns-icon[data-directional] {
  transform: scaleX(-1) var(--ns-icon-transform,);
}
</style>
