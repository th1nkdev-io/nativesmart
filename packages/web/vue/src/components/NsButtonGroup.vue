<script setup lang="ts">
import { computed, provide } from "vue";
import {
  buttonGroupKey,
  type NsButtonIntent,
  type NsButtonSize,
  type NsButtonVariant
} from "./button-context";

export type NsButtonGroupOrientation = "horizontal" | "vertical";

export interface NsButtonGroupProps {
  /** Accessible name of the group. */
  label?: string;
  /** Look given to every button that does not set its own. */
  variant?: NsButtonVariant;
  intent?: NsButtonIntent;
  size?: NsButtonSize;
  orientation?: NsButtonGroupOrientation;
  /** Joins the buttons: shared borders, outer corners only. */
  attached?: boolean;
  /** Fills the width, buttons sharing it equally. */
  block?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<NsButtonGroupProps>(), {
  variant: "outline",
  intent: "neutral",
  size: "md",
  orientation: "horizontal",
  attached: true,
  block: false,
  disabled: false
});

provide(
  buttonGroupKey,
  computed(() => ({
    variant: props.variant,
    intent: props.intent,
    size: props.size,
    disabled: props.disabled
  }))
);
</script>

<template>
  <div
    role="group"
    :aria-label="label"
    :aria-orientation="orientation === 'vertical' ? 'vertical' : undefined"
    :class="[
      'ns-button-group',
      `ns-button-group--${orientation}`,
      `ns-button-group--${variant}`,
      {
        'ns-button-group--attached': attached,
        'ns-button-group--block': block
      }
    ]"
  >
    <slot />
  </div>
</template>

<style>
.ns-button-group {
  display: inline-flex;
  gap: var(--ns-space-2);
  vertical-align: middle;
}

.ns-button-group--vertical {
  flex-direction: column;
  align-items: stretch;
}

.ns-button-group--block {
  display: flex;
}

.ns-button-group--block > *,
.ns-button-group--block > * > .ns-button {
  flex: 1 1 0%;
}

.ns-button-group--block > .ns-icon-button {
  flex: none;
}

/*
 * Attached: one control. Children may be a button or a wrapper around one (IconButton), so the
 * rules reach the .ns-button of each child.
 */
.ns-button-group--attached {
  gap: 0;
}

.ns-button-group--attached .ns-button {
  border-radius: 0;
}

.ns-button-group--attached
  > :is(:hover, :focus-within, .ns-button:hover, .ns-button:focus-visible) {
  position: relative;
  z-index: 1;
}

.ns-button-group--horizontal.ns-button-group--attached > :not(:first-child) {
  margin-inline-start: -1px;
}

.ns-button-group--vertical.ns-button-group--attached > :not(:first-child) {
  margin-block-start: -1px;
}

.ns-button-group--horizontal.ns-button-group--attached > :first-child .ns-button,
.ns-button-group--horizontal.ns-button-group--attached > .ns-button:first-child {
  border-start-start-radius: var(--ns-radius-control);
  border-end-start-radius: var(--ns-radius-control);
}

.ns-button-group--horizontal.ns-button-group--attached > :last-child .ns-button,
.ns-button-group--horizontal.ns-button-group--attached > .ns-button:last-child {
  border-start-end-radius: var(--ns-radius-control);
  border-end-end-radius: var(--ns-radius-control);
}

.ns-button-group--vertical.ns-button-group--attached > :first-child .ns-button,
.ns-button-group--vertical.ns-button-group--attached > .ns-button:first-child {
  border-start-start-radius: var(--ns-radius-control);
  border-start-end-radius: var(--ns-radius-control);
}

.ns-button-group--vertical.ns-button-group--attached > :last-child .ns-button,
.ns-button-group--vertical.ns-button-group--attached > .ns-button:last-child {
  border-end-start-radius: var(--ns-radius-control);
  border-end-end-radius: var(--ns-radius-control);
}

/* Solid buttons share one color: a light seam keeps them apart. */
.ns-button-group--horizontal.ns-button-group--attached > :not(:first-child) .ns-button--solid,
.ns-button-group--horizontal.ns-button-group--attached > .ns-button--solid:not(:first-child) {
  border-inline-start-color: color-mix(
    in srgb,
    var(--ns-button-on-tone) 30%,
    var(--ns-button-tone)
  );
}

.ns-button-group--vertical.ns-button-group--attached > :not(:first-child) .ns-button--solid,
.ns-button-group--vertical.ns-button-group--attached > .ns-button--solid:not(:first-child) {
  border-block-start-color: color-mix(in srgb, var(--ns-button-on-tone) 30%, var(--ns-button-tone));
}

/* Ghost buttons have no border to share: give the group one. */
.ns-button-group--ghost.ns-button-group--attached {
  border-radius: var(--ns-radius-control);
  box-shadow: inset 0 0 0 1px var(--ns-color-border);
}
</style>
