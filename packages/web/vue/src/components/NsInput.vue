<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { uniqueId } from "../utils/id";

export type NsInputType = "text" | "email" | "password" | "search" | "tel" | "url" | "number";
export type NsInputSize = "sm" | "md" | "lg";

export interface NsInputProps {
  label?: string;
  /** Controlled value. `v-model` works too. */
  value?: string;
  modelValue?: string;
  placeholder?: string;
  /** Help text under the field. */
  description?: string;
  /** Error message, shown while `invalid` is true. */
  error?: string;
  invalid?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  type?: NsInputType;
  size?: NsInputSize;
  name?: string;
  autocomplete?: string;
  id?: string;
}

const props = withDefaults(defineProps<NsInputProps>(), {
  invalid: false,
  disabled: false,
  readonly: false,
  required: false,
  type: "text",
  size: "md"
});

const emit = defineEmits<{
  change: [value: string];
  "update:modelValue": [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  submit: [value: string];
}>();

const fieldId = props.id ?? uniqueId("ns-input");
const descriptionId = `${fieldId}-description`;
const errorId = `${fieldId}-error`;

const current = ref(props.modelValue ?? props.value ?? "");
watch(
  () => props.modelValue ?? props.value,
  (next) => {
    if (next !== undefined) current.value = next;
  }
);

const showError = computed(() => props.invalid && Boolean(props.error));
const describedBy = computed(
  () =>
    [props.description ? descriptionId : "", showError.value ? errorId : ""]
      .filter(Boolean)
      .join(" ") || undefined
);

function onInput(event: Event) {
  current.value = (event.target as HTMLInputElement).value;
  emit("update:modelValue", current.value);
  emit("change", current.value);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Enter" && !event.isComposing) emit("submit", current.value);
}
</script>

<template>
  <div
    :class="[
      'ns-input',
      `ns-input--${size}`,
      {
        'ns-input--invalid': invalid,
        'ns-input--disabled': disabled,
        'ns-input--readonly': readonly
      }
    ]"
  >
    <label v-if="label" class="ns-input__label" :for="fieldId">
      {{ label }}<span v-if="required" class="ns-input__required" aria-hidden="true">*</span>
    </label>
    <div class="ns-input__control">
      <span v-if="$slots.leading" class="ns-input__slot"><slot name="leading" /></span>
      <input
        :id="fieldId"
        class="ns-input__field"
        :type="type"
        :name="name"
        :value="current"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :aria-invalid="invalid || undefined"
        :aria-describedby="describedBy"
        @input="onInput"
        @keydown="onKeydown"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />
      <span v-if="$slots.trailing" class="ns-input__slot"><slot name="trailing" /></span>
    </div>
    <p v-if="description" :id="descriptionId" class="ns-input__description">{{ description }}</p>
    <p v-if="showError" :id="errorId" class="ns-input__error">{{ error }}</p>
  </div>
</template>

<style>
.ns-input {
  --ns-input-height: var(--ns-control-height-md);
  --ns-input-padding-inline: var(--ns-space-3);
  --ns-input-font-size: var(--ns-text-body-md-size);
  --ns-input-background: var(--ns-color-surface);
  --ns-input-foreground: var(--ns-color-text);
  --ns-input-border: var(--ns-color-border-input);
  --ns-input-border-hover: var(--ns-color-border-input-hover);
  --ns-input-radius: var(--ns-radius-input);
  --ns-input-focus-ring: var(--ns-color-focus-ring);
  --ns-input-error: var(--ns-color-danger-text);
  display: grid;
  /* A native input has an intrinsic width: without this the field overflows narrow containers. */
  grid-template-columns: minmax(0, 1fr);
  gap: var(--ns-space-1-5);
  min-inline-size: 0;
  font-family: var(--ns-font-sans);
}

.ns-input__label {
  color: var(--ns-color-text);
  font-size: var(--ns-text-label-md-size);
  font-weight: var(--ns-text-label-md-weight);
  line-height: var(--ns-text-label-md-line-height);
  letter-spacing: var(--ns-text-label-md-tracking);
}

.ns-input__required {
  margin-inline-start: 2px;
  color: var(--ns-input-error);
}

.ns-input__control {
  display: flex;
  align-items: center;
  gap: var(--ns-space-2);
  min-block-size: var(--ns-input-height);
  padding-inline: var(--ns-input-padding-inline);
  border: 1px solid var(--ns-input-border);
  border-radius: var(--ns-input-radius);
  background: var(--ns-input-background);
  color: var(--ns-input-foreground);
  transition:
    border-color var(--ns-duration-fast) var(--ns-easing-standard),
    box-shadow var(--ns-duration-fast) var(--ns-easing-standard);
}

.ns-input:not(.ns-input--disabled, .ns-input--readonly) .ns-input__control:hover {
  border-color: var(--ns-input-border-hover);
}

.ns-input__control:focus-within {
  border-color: var(--ns-color-border-focus);
  outline: var(--ns-focus-ring-width) solid var(--ns-input-focus-ring);
  outline-offset: 0;
}

.ns-input__field {
  flex: 1;
  inline-size: 100%;
  min-inline-size: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: var(--ns-input-font-size);
  outline: none;
}

.ns-input__field::placeholder {
  color: var(--ns-color-text-placeholder);
}

.ns-input__slot {
  display: inline-flex;
  flex: none;
  color: var(--ns-color-text-muted);
}

.ns-input__description,
.ns-input__error {
  margin: 0;
  font-size: var(--ns-text-caption-size);
  line-height: var(--ns-text-caption-line-height);
}

.ns-input__description {
  color: var(--ns-color-text-muted);
}

.ns-input__error {
  color: var(--ns-input-error);
  font-weight: var(--ns-font-weight-medium);
}

/* Sizes */
.ns-input--sm {
  --ns-input-height: var(--ns-control-height-sm);
  --ns-input-padding-inline: var(--ns-space-2-5);
  --ns-input-font-size: var(--ns-text-body-sm-size);
}

.ns-input--lg {
  --ns-input-height: var(--ns-control-height-lg);
  --ns-input-padding-inline: var(--ns-space-4);
  --ns-input-font-size: var(--ns-text-body-lg-size);
}

/* States */
.ns-input--invalid {
  --ns-input-border: var(--ns-color-danger);
  --ns-input-border-hover: var(--ns-color-danger-hover);
  --ns-input-focus-ring: var(--ns-color-danger);
}

.ns-input--readonly {
  --ns-input-background: var(--ns-color-surface-muted);
}

.ns-input--disabled {
  --ns-input-background: var(--ns-color-surface-disabled);
  --ns-input-border: var(--ns-color-border-disabled);
  --ns-input-foreground: var(--ns-color-text-disabled);
  cursor: not-allowed;
}

.ns-input--disabled .ns-input__field {
  cursor: not-allowed;
}
</style>
