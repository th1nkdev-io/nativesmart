<script lang="ts">
import type { InjectionKey, Ref } from "vue";

export type NsSurfaceLevel = "sunken" | "base" | "raised" | "floating" | "overlay";
export type NsSurfaceVariant = "elevated" | "outlined" | "filled" | "glass";
export type NsSurfaceTone =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "brand"
  | "inverse";
export type NsSurfaceRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl";
export type NsSurfacePadding = "none" | "sm" | "md" | "lg" | "xl";

/** Levels from the lowest; `auto` takes the one above its parent surface. */
export const surfaceLevels: readonly NsSurfaceLevel[] = [
  "sunken",
  "base",
  "raised",
  "floating",
  "overlay"
];

/** The level of the nearest surface, read by nested `auto` surfaces. */
export const surfaceLevelKey: InjectionKey<Readonly<Ref<NsSurfaceLevel>>> =
  Symbol("ns-surface-level");
</script>

<script setup lang="ts">
import { computed, inject, provide, ref } from "vue";

export interface NsSurfaceProps {
  /** Height of the layer. `auto` sits one level above its parent surface, `base` at the root. */
  level?: NsSurfaceLevel | "auto";
  /** How the layer stands out: shadow, outline, fill or glass. */
  variant?: NsSurfaceVariant;
  /** Color of the layer; text and borders follow. */
  tone?: NsSurfaceTone;
  radius?: NsSurfaceRadius;
  padding?: NsSurfacePadding;
  /** Element to render: `section`, `article`, `button`, `a`… */
  as?: string;
  /** Lifts on hover, presses down and shows a focus ring. */
  interactive?: boolean;
  /** Outlined in the primary color, as a chosen option. */
  selected?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<NsSurfaceProps>(), {
  level: "auto",
  variant: "elevated",
  tone: "neutral",
  radius: "lg",
  padding: "md",
  as: "div",
  interactive: false,
  selected: false,
  disabled: false
});

defineSlots<{ default?: (props: { level: NsSurfaceLevel }) => unknown }>();

const parent = inject(surfaceLevelKey, undefined);
const resolved = computed<NsSurfaceLevel>(() => {
  if (props.level !== "auto") return props.level;
  if (!parent) return "base";
  const index = surfaceLevels.indexOf(parent.value);
  return surfaceLevels[Math.min(index + 1, surfaceLevels.length - 1)]!;
});
provide(surfaceLevelKey, resolved);

/* A div or section that acts as a button gets its keyboard behaviour. */
const native = computed(() => ["button", "a"].includes(props.as));
const actsAsButton = computed(() => props.interactive && !native.value);
const root = ref<HTMLElement>();

function activate(event: KeyboardEvent) {
  if (!actsAsButton.value || props.disabled || event.target !== root.value) return;
  event.preventDefault();
  root.value?.click();
}
</script>

<template>
  <component
    :is="as"
    ref="root"
    :class="[
      'ns-surface',
      `ns-surface--${resolved}`,
      `ns-surface--${variant}`,
      `ns-surface--tone-${tone}`,
      `ns-surface--radius-${radius}`,
      `ns-surface--padding-${padding}`,
      {
        'ns-surface--interactive': interactive && !disabled,
        'ns-surface--selected': selected,
        'ns-surface--disabled': disabled
      }
    ]"
    :data-level="resolved"
    :type="as === 'button' ? 'button' : undefined"
    :disabled="as === 'button' && disabled ? true : undefined"
    :role="actsAsButton ? 'button' : undefined"
    :tabindex="actsAsButton && !disabled ? 0 : undefined"
    :aria-disabled="disabled && as !== 'button' ? true : undefined"
    @keydown.enter="activate"
    @keydown.space="activate"
  >
    <slot :level="resolved" />
  </component>
</template>

<style>
/*
 * A level sets the background and the shadow together; the variant then decides what stands
 * out. Every value is a variable reset here, so a nested surface never inherits its parent's.
 */
.ns-surface {
  --ns-surface-background: var(--ns-color-surface);
  --ns-surface-color: var(--ns-color-text);
  --ns-surface-border: transparent;
  --ns-surface-shadow: none;
  --ns-surface-shadow-hover: var(--ns-elevation-card);
  --ns-surface-radius: var(--ns-radius-lg);
  --ns-surface-padding: var(--ns-space-4);
  --ns-surface-filter: none;
  box-sizing: border-box;
  display: block;
  position: relative;
  min-inline-size: 0;
  margin: 0;
  padding: var(--ns-surface-padding);
  border: 1px solid var(--ns-surface-border);
  border-radius: var(--ns-surface-radius);
  background: var(--ns-surface-background);
  box-shadow: var(--ns-surface-shadow);
  color: var(--ns-surface-color);
  font: inherit;
  text-align: inherit;
  text-decoration: none;
  backdrop-filter: var(--ns-surface-filter);
  -webkit-backdrop-filter: var(--ns-surface-filter);
  transition:
    background-color var(--ns-duration-fast) var(--ns-easing-standard),
    border-color var(--ns-duration-fast) var(--ns-easing-standard),
    box-shadow var(--ns-duration-normal) var(--ns-easing-standard),
    transform var(--ns-duration-fast) var(--ns-easing-standard);
}

/* Levels */
.ns-surface--sunken {
  --ns-surface-background: var(--ns-color-surface-sunken);
  --ns-surface-shadow: inset 0 1px 3px rgb(0 0 0 / 0.06);
  --ns-surface-shadow-hover: inset 0 1px 3px rgb(0 0 0 / 0.1);
}

.ns-surface--base {
  --ns-surface-border: var(--ns-color-border-subtle);
  --ns-surface-shadow: var(--ns-elevation-flat);
  --ns-surface-shadow-hover: var(--ns-elevation-card);
}

.ns-surface--raised {
  --ns-surface-background: var(--ns-color-surface-raised);
  --ns-surface-shadow: var(--ns-elevation-card);
  --ns-surface-shadow-hover: var(--ns-elevation-raised);
}

.ns-surface--floating {
  --ns-surface-background: var(--ns-color-surface-floating);
  --ns-surface-shadow: var(--ns-elevation-popover);
  --ns-surface-shadow-hover: var(--ns-elevation-modal);
}

.ns-surface--overlay {
  --ns-surface-background: var(--ns-color-surface-floating);
  --ns-surface-shadow: var(--ns-elevation-modal);
  --ns-surface-shadow-hover: var(--ns-elevation-modal);
}

/* Variants */
.ns-surface--outlined {
  --ns-surface-border: var(--ns-color-border);
  --ns-surface-shadow: none;
  --ns-surface-shadow-hover: none;
}

.ns-surface--filled {
  --ns-surface-border: transparent;
  --ns-surface-shadow: none;
  --ns-surface-shadow-hover: none;
}

.ns-surface--filled:where(.ns-surface--base) {
  --ns-surface-background: var(--ns-color-surface-muted);
}

.ns-surface--glass {
  --ns-surface-background: var(--ns-material-regular);
  --ns-surface-filter: var(--ns-material-regular-filter);
  --ns-surface-border: color-mix(in srgb, var(--ns-color-border-subtle) 70%, transparent);
}

/* Tones: background, text and border from the same role. */
.ns-surface--tone-primary {
  --ns-surface-tone-background: var(--ns-color-primary-muted);
  --ns-surface-color: var(--ns-color-on-primary-muted);
  --ns-tone-border: var(--ns-color-primary-border);
}

.ns-surface--tone-success {
  --ns-surface-tone-background: var(--ns-color-success-muted);
  --ns-surface-color: var(--ns-color-on-success-muted);
  --ns-tone-border: var(--ns-color-success-border);
}

.ns-surface--tone-warning {
  --ns-surface-tone-background: var(--ns-color-warning-muted);
  --ns-surface-color: var(--ns-color-on-warning-muted);
  --ns-tone-border: var(--ns-color-warning-border);
}

.ns-surface--tone-danger {
  --ns-surface-tone-background: var(--ns-color-danger-muted);
  --ns-surface-color: var(--ns-color-on-danger-muted);
  --ns-tone-border: var(--ns-color-danger-border);
}

.ns-surface--tone-info {
  --ns-surface-tone-background: var(--ns-color-info-muted);
  --ns-surface-color: var(--ns-color-on-info-muted);
  --ns-tone-border: var(--ns-color-info-border);
}

.ns-surface--tone-brand {
  --ns-surface-tone-background: var(--ns-color-surface-brand);
  --ns-surface-color: var(--ns-color-text-on-brand);
  --ns-tone-border: transparent;
}

.ns-surface--tone-inverse {
  --ns-surface-tone-background: var(--ns-color-surface-inverse);
  --ns-surface-color: var(--ns-color-text-inverse);
  --ns-tone-border: transparent;
}

/* Low specificity on purpose: rules further down, such as disabled, win by order. */
.ns-surface:where(:not(.ns-surface--tone-neutral)) {
  --ns-surface-background: var(--ns-surface-tone-background);
  --ns-surface-border: var(--ns-tone-border);
}

.ns-surface:where(:not(.ns-surface--tone-neutral)):where(
    .ns-surface--elevated,
    .ns-surface--filled
  ) {
  --ns-surface-border: transparent;
}

.ns-surface:where(:not(.ns-surface--tone-neutral)):where(.ns-surface--glass) {
  --ns-surface-background: color-mix(in srgb, var(--ns-surface-tone-background) 72%, transparent);
}

/* Radius and padding */
.ns-surface--radius-none {
  --ns-surface-radius: 0;
}

.ns-surface--radius-sm {
  --ns-surface-radius: var(--ns-radius-sm);
}

.ns-surface--radius-md {
  --ns-surface-radius: var(--ns-radius-md);
}

.ns-surface--radius-xl {
  --ns-surface-radius: var(--ns-radius-xl);
}

.ns-surface--radius-2xl {
  --ns-surface-radius: var(--ns-radius-2xl);
}

.ns-surface--padding-none {
  --ns-surface-padding: 0px;
}

.ns-surface--padding-sm {
  --ns-surface-padding: var(--ns-space-2);
}

.ns-surface--padding-lg {
  --ns-surface-padding: var(--ns-space-6);
}

.ns-surface--padding-xl {
  --ns-surface-padding: var(--ns-space-8);
}

/* States */
.ns-surface--interactive {
  cursor: pointer;
  user-select: none;
}

.ns-surface--interactive:hover {
  box-shadow: var(--ns-surface-shadow-hover);
}

.ns-surface--interactive:is(.ns-surface--outlined, .ns-surface--filled):hover {
  background: color-mix(in srgb, var(--ns-surface-background) 92%, var(--ns-color-text));
}

.ns-surface--interactive:active {
  box-shadow: var(--ns-surface-shadow);
  transform: scale(0.99);
}

.ns-surface--interactive:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
  outline-offset: var(--ns-focus-ring-offset);
}

.ns-surface--selected {
  --ns-surface-border: var(--ns-color-primary);
  box-shadow:
    0 0 0 1px var(--ns-color-primary),
    var(--ns-surface-shadow);
}

.ns-surface--disabled {
  --ns-surface-background: var(--ns-color-surface-disabled);
  --ns-surface-color: var(--ns-color-text-disabled);
  --ns-surface-shadow: none;
  --ns-surface-border: var(--ns-color-border-subtle);
  cursor: not-allowed;
}

@media (prefers-reduced-motion: reduce) {
  .ns-surface--interactive:active {
    transform: none;
  }
}
</style>
