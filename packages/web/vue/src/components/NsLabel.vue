<script setup lang="ts">
import { computed, useId } from "vue";
import NsIcon from "./NsIcon.vue";

export type NsLabelSize = "sm" | "md" | "lg";

export interface NsLabelProps {
  /** The label. The default slot can hold it instead. */
  text?: string;
  /** Id of the control it names. */
  for?: string;
  size?: NsLabelSize;
  /** Shows an asterisk; the control carries `required` itself. */
  required?: boolean;
  /** Shows a muted optional mention. */
  optional?: boolean;
  /** Hint under the label. Its id is `descriptionId`, for the control's aria-describedby. */
  description?: string;
  /** Id of the description; derived from `for` when not set. */
  descriptionId?: string;
  /** Extra help behind an info icon. */
  info?: string;
  /** Text at the end of the line, such as `12/80`. */
  counter?: string;
  invalid?: boolean;
  disabled?: boolean;
  /** `label`, or `legend` to name a fieldset, or `span`. */
  as?: "label" | "legend" | "span";
  optionalLabel?: string;
  requiredLabel?: string;
}

const props = withDefaults(defineProps<NsLabelProps>(), {
  size: "md",
  required: false,
  optional: false,
  invalid: false,
  disabled: false,
  as: "label",
  optionalLabel: "Optional",
  requiredLabel: "Required"
});

const generated = useId();
const hintId = computed(
  () => props.descriptionId ?? (props.for ? `${props.for}-description` : `ns-label-${generated}`)
);

const textStyle = computed(() => `label-${props.size}`);

/* A legend must be the fieldset's first child, so it becomes the root and holds only spans. */
const root = computed(() => (props.as === "legend" ? "legend" : "div"));
</script>

<template>
  <component
    :is="root"
    :class="[
      'ns-label',
      `ns-label--${size}`,
      { 'ns-label--invalid': invalid, 'ns-label--disabled': disabled }
    ]"
    :style="{
      '--ns-label-size': `var(--ns-text-${textStyle}-size)`,
      '--ns-label-line-height': `var(--ns-text-${textStyle}-line-height)`,
      '--ns-label-weight': `var(--ns-text-${textStyle}-weight)`
    }"
  >
    <span class="ns-label__line">
      <component
        :is="as === 'label' ? 'label' : 'span'"
        class="ns-label__text"
        :for="as === 'label' ? props.for : undefined"
      >
        <slot>{{ text }}</slot>
        <span v-if="required" class="ns-label__required" aria-hidden="true" :title="requiredLabel"
          >*</span
        >
        <span v-else-if="optional" class="ns-label__optional">({{ optionalLabel }})</span>
      </component>
      <button v-if="info" type="button" class="ns-label__info" :aria-label="info" :data-tip="info">
        <NsIcon name="info" size="xs" />
      </button>
      <span v-if="counter || $slots.end" class="ns-label__end">
        <slot name="end"
          ><span class="ns-label__counter">{{ counter }}</span></slot
        >
      </span>
    </span>
    <span v-if="description" :id="hintId" class="ns-label__description">{{ description }}</span>
  </component>
</template>

<style>
.ns-label {
  --ns-label-color: var(--ns-color-text);
  display: grid;
  gap: 2px;
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  font-family: var(--ns-font-sans);
}

.ns-label__line {
  display: flex;
  align-items: center;
  gap: var(--ns-space-1-5);
  min-inline-size: 0;
}

.ns-label__text {
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  color: var(--ns-label-color);
  font-size: var(--ns-label-size);
  font-weight: var(--ns-label-weight);
  line-height: var(--ns-label-line-height);
  cursor: default;
}

label.ns-label__text {
  cursor: pointer;
}

.ns-label__required {
  margin-inline-start: 2px;
  color: var(--ns-color-danger-text);
  font-weight: var(--ns-font-weight-bold);
}

.ns-label__optional {
  margin-inline-start: var(--ns-space-1);
  color: var(--ns-color-text-subtle);
  font-weight: var(--ns-font-weight-regular);
}

/* Info: the help shows in a bubble on hover and keyboard focus. */
.ns-label__info {
  position: relative;
  display: inline-grid;
  flex: none;
  place-items: center;
  inline-size: 18px;
  block-size: 18px;
  padding: 0;
  border: 0;
  border-radius: var(--ns-radius-full);
  background: none;
  color: var(--ns-color-text-subtle);
  cursor: help;
}

.ns-label__info:hover,
.ns-label__info:focus-visible {
  color: var(--ns-color-primary-text);
}

.ns-label__info:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
  outline-offset: 1px;
}

.ns-label__info::after {
  position: absolute;
  inset-block-end: calc(100% + 6px);
  inset-inline-start: 50%;
  z-index: 10;
  inline-size: max-content;
  max-inline-size: 240px;
  padding: var(--ns-space-1-5) var(--ns-space-2-5);
  border-radius: var(--ns-radius-md);
  background: var(--ns-color-surface-inverse);
  color: var(--ns-color-text-inverse);
  content: attr(data-tip);
  font-size: var(--ns-text-caption-size);
  font-weight: var(--ns-font-weight-regular);
  line-height: 1.4;
  text-align: start;
  white-space: normal;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 4px);
  transition:
    opacity var(--ns-duration-fast) var(--ns-easing-standard),
    transform var(--ns-duration-fast) var(--ns-easing-standard);
}

[dir="rtl"] .ns-label__info::after {
  transform: translate(50%, 4px);
}

.ns-label__info:hover::after,
.ns-label__info:focus-visible::after {
  opacity: 1;
  transform: translate(-50%, 0);
}

[dir="rtl"] .ns-label__info:hover::after,
[dir="rtl"] .ns-label__info:focus-visible::after {
  transform: translate(50%, 0);
}

.ns-label__end {
  display: inline-flex;
  align-items: center;
  margin-inline-start: auto;
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
}

.ns-label__counter {
  font-variant-numeric: tabular-nums;
}

.ns-label__description {
  display: block;
  margin: 0;
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
  line-height: var(--ns-text-caption-line-height);
}

/* States */
.ns-label--invalid {
  --ns-label-color: var(--ns-color-danger-text);
}

.ns-label--invalid .ns-label__counter {
  color: var(--ns-color-danger-text);
}

.ns-label--disabled {
  --ns-label-color: var(--ns-color-text-disabled);
}

.ns-label--disabled .ns-label__description,
.ns-label--disabled .ns-label__required,
.ns-label--disabled .ns-label__end {
  color: var(--ns-color-text-disabled);
}

.ns-label--disabled label.ns-label__text {
  cursor: not-allowed;
}
</style>
