<script setup lang="ts">
import { computed, inject } from "vue";
import {
  buttonGroupKey,
  type NsButtonIntent,
  type NsButtonSize,
  type NsButtonVariant
} from "./button-context";
import NsButton from "./NsButton.vue";

export type NsIconButtonShape = "rounded" | "circle" | "square";

export interface NsIconButtonProps {
  icon: string;
  /** What the button does: its accessible name, also shown in the tooltip. */
  label: string;
  variant?: NsButtonVariant;
  intent?: NsButtonIntent;
  size?: NsButtonSize;
  shape?: NsIconButtonShape;
  /** A count on the corner; an empty string draws a dot. */
  badge?: string | number;
  /** Shows the label in a bubble on hover and focus. */
  tooltip?: boolean;
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  /** Toggle state, used by ToggleButton. */
  pressed?: boolean;
}

const props = withDefaults(defineProps<NsIconButtonProps>(), {
  shape: "rounded",
  tooltip: true,
  loading: false,
  disabled: false,
  pressed: undefined
});

const emit = defineEmits<{ press: [event: MouseEvent] }>();

/* Alone, an icon button is a quiet ghost; in a group, it takes the group's look. */
const group = inject(buttonGroupKey, undefined);
const variant = computed(() => props.variant ?? (group ? undefined : "ghost"));
const intent = computed(() => props.intent ?? (group ? undefined : "neutral"));

const shapes = { rounded: "rounded", circle: "pill", square: "sharp" } as const;
const hasBadge = computed(() => props.badge !== undefined && props.badge !== null);
const dot = computed(() => hasBadge.value && String(props.badge) === "");
/* The count is part of the name: « Notifications, 3 ». */
const name = computed(() =>
  hasBadge.value && !dot.value ? `${props.label}, ${props.badge}` : props.label
);
</script>

<template>
  <span
    :class="[
      'ns-icon-button',
      `ns-icon-button--${size ?? 'md'}`,
      { 'ns-icon-button--tooltip': tooltip && !disabled }
    ]"
    :data-tip="tooltip ? label : undefined"
  >
    <NsButton
      :label="name"
      :icon="icon"
      icon-only
      :variant="variant"
      :intent="intent"
      :size="size"
      :shape="shapes[shape]"
      :loading="loading"
      :disabled="disabled"
      :href="href"
      :pressed="pressed"
      @press="emit('press', $event)"
    />
    <span
      v-if="hasBadge"
      :class="['ns-icon-button__badge', { 'ns-icon-button__badge--dot': dot }]"
      aria-hidden="true"
      >{{ dot ? "" : badge }}</span
    >
  </span>
</template>

<style>
.ns-icon-button {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}

/* The icon grows with the square. */
.ns-icon-button--md .ns-icon {
  --ns-icon-size: var(--ns-icon-size-md);
}

.ns-icon-button--lg .ns-icon,
.ns-icon-button--xl .ns-icon {
  --ns-icon-size: var(--ns-icon-size-lg);
}

.ns-icon-button__badge {
  position: absolute;
  inset-block-start: -4px;
  inset-inline-end: -4px;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  min-inline-size: 18px;
  block-size: 18px;
  padding-inline: 5px;
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-danger);
  box-shadow: 0 0 0 2px var(--ns-color-surface);
  color: var(--ns-color-on-danger);
  font-family: var(--ns-font-sans);
  font-size: 10px;
  font-weight: var(--ns-font-weight-bold);
  font-variant-numeric: tabular-nums;
  line-height: 1;
  pointer-events: none;
}

.ns-icon-button__badge--dot {
  inset-block-start: 2px;
  inset-inline-end: 2px;
  min-inline-size: 10px;
  block-size: 10px;
  padding: 0;
}

/* Tooltip: the label above, on hover and keyboard focus; hidden from assistive tech. */
.ns-icon-button--tooltip::after {
  position: absolute;
  inset-block-end: calc(100% + 8px);
  inset-inline-start: 50%;
  z-index: 20;
  padding: var(--ns-space-1) var(--ns-space-2);
  border-radius: var(--ns-radius-md);
  background: var(--ns-color-surface-inverse);
  color: var(--ns-color-text-inverse);
  content: attr(data-tip);
  font-family: var(--ns-font-sans);
  font-size: var(--ns-text-caption-size);
  font-weight: var(--ns-font-weight-medium);
  line-height: 1.3;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 4px);
  transition:
    opacity var(--ns-duration-fast) var(--ns-easing-standard),
    transform var(--ns-duration-fast) var(--ns-easing-standard);
}

.ns-icon-button--tooltip:hover::after,
.ns-icon-button--tooltip:focus-within::after {
  opacity: 1;
  transform: translate(-50%, 0);
  transition-delay: 300ms;
}

.ns-icon-button--tooltip:focus-within::after {
  transition-delay: 0ms;
}

[dir="rtl"] .ns-icon-button--tooltip::after {
  transform: translate(50%, 4px);
}

[dir="rtl"] .ns-icon-button--tooltip:hover::after,
[dir="rtl"] .ns-icon-button--tooltip:focus-within::after {
  transform: translate(50%, 0);
}
</style>
