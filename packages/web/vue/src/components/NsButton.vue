<script setup lang="ts">
import NsSpinner from "./NsSpinner.vue";

export type NsButtonVariant = "solid" | "outline" | "ghost" | "link";
export type NsButtonIntent = "primary" | "neutral" | "danger";
export type NsButtonSize = "sm" | "md" | "lg";

export interface NsButtonProps {
  /** Accessible label. A default slot replaces it visually. */
  label: string;
  variant?: NsButtonVariant;
  intent?: NsButtonIntent;
  size?: NsButtonSize;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const props = withDefaults(defineProps<NsButtonProps>(), {
  variant: "solid",
  intent: "primary",
  size: "md",
  loading: false,
  disabled: false,
  type: "button"
});

const emit = defineEmits<{
  press: [event: MouseEvent];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

function onClick(event: MouseEvent) {
  if (props.loading || props.disabled) {
    event.preventDefault();
    return;
  }
  emit("press", event);
}
</script>

<template>
  <button
    :type="type"
    :class="[
      'ns-button',
      `ns-button--${variant}`,
      `ns-button--${intent}`,
      `ns-button--${size}`,
      { 'ns-button--loading': loading }
    ]"
    :disabled="disabled"
    :aria-disabled="loading || undefined"
    :aria-busy="loading || undefined"
    :aria-label="$slots.default ? label : undefined"
    @click="onClick"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  >
    <span class="ns-button__content">
      <slot name="leading" />
      <span class="ns-button__label"
        ><slot>{{ label }}</slot></span
      >
      <slot name="trailing" />
    </span>
    <NsSpinner v-if="loading" class="ns-button__spinner" :label="label" />
  </button>
</template>

<style>
.ns-button {
  --ns-button-tone: var(--ns-color-primary);
  --ns-button-tone-hover: var(--ns-color-primary-hover);
  --ns-button-tone-pressed: var(--ns-color-primary-pressed);
  --ns-button-on-tone: var(--ns-color-on-primary);
  --ns-button-tone-muted: var(--ns-color-primary-muted);
  --ns-button-radius: var(--ns-radius-control);
  --ns-button-height: var(--ns-control-height-md);
  --ns-button-padding-inline: var(--ns-space-4);
  --ns-button-font-size: var(--ns-text-label-md-size);
  --ns-button-focus-ring: var(--ns-color-focus-ring);
  --ns-button-background: var(--ns-button-tone);
  --ns-button-foreground: var(--ns-button-on-tone);
  --ns-button-border: var(--ns-button-tone);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-block-size: var(--ns-button-height);
  padding-inline: var(--ns-button-padding-inline);
  border: 1px solid var(--ns-button-border);
  border-radius: var(--ns-button-radius);
  background: var(--ns-button-background);
  color: var(--ns-button-foreground);
  font-family: var(--ns-font-sans);
  font-size: var(--ns-button-font-size);
  font-weight: var(--ns-font-weight-semibold);
  letter-spacing: var(--ns-text-label-md-tracking);
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition:
    background-color var(--ns-duration-fast) var(--ns-easing-standard),
    border-color var(--ns-duration-fast) var(--ns-easing-standard),
    color var(--ns-duration-fast) var(--ns-easing-standard);
}

.ns-button__content {
  display: inline-flex;
  align-items: center;
  gap: var(--ns-space-2);
}

.ns-button__spinner {
  position: absolute;
  inset: 0;
  margin: auto;
}

.ns-button--loading .ns-button__content {
  visibility: hidden;
}

.ns-button:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-button-focus-ring);
  outline-offset: var(--ns-focus-ring-offset);
}

/* Sizes */
.ns-button--sm {
  --ns-button-height: var(--ns-control-height-sm);
  --ns-button-padding-inline: var(--ns-space-3);
  --ns-button-font-size: var(--ns-text-label-sm-size);
}

.ns-button--lg {
  --ns-button-height: var(--ns-control-height-lg);
  --ns-button-padding-inline: var(--ns-space-6);
  --ns-button-font-size: var(--ns-text-label-lg-size);
}

/* Intents */
.ns-button--neutral {
  --ns-button-tone: var(--ns-color-text);
  --ns-button-tone-hover: var(--ns-color-text-muted);
  --ns-button-tone-pressed: var(--ns-color-text);
  --ns-button-on-tone: var(--ns-color-surface);
  --ns-button-tone-muted: var(--ns-color-surface-muted);
}

.ns-button--danger {
  --ns-button-tone: var(--ns-color-danger);
  --ns-button-tone-hover: var(--ns-color-danger-hover);
  --ns-button-tone-pressed: var(--ns-color-danger-hover);
  --ns-button-on-tone: var(--ns-color-on-danger);
  --ns-button-tone-muted: var(--ns-color-danger-muted);
  --ns-button-focus-ring: var(--ns-color-danger);
}

/* Variants */
.ns-button--solid:not(:disabled, [aria-busy="true"]):hover {
  --ns-button-background: var(--ns-button-tone-hover);
  --ns-button-border: var(--ns-button-tone-hover);
}

.ns-button--solid:not(:disabled, [aria-busy="true"]):active {
  --ns-button-background: var(--ns-button-tone-pressed);
  --ns-button-border: var(--ns-button-tone-pressed);
}

.ns-button--outline {
  --ns-button-background: transparent;
  --ns-button-foreground: var(--ns-button-tone);
}

.ns-button--ghost {
  --ns-button-background: transparent;
  --ns-button-foreground: var(--ns-button-tone);
  --ns-button-border: transparent;
}

.ns-button--outline:not(:disabled, [aria-busy="true"]):hover,
.ns-button--ghost:not(:disabled, [aria-busy="true"]):hover {
  --ns-button-background: var(--ns-button-tone-muted);
}

.ns-button--link {
  --ns-button-background: transparent;
  --ns-button-foreground: var(--ns-button-tone);
  --ns-button-border: transparent;
  --ns-button-padding-inline: 0;
  min-block-size: auto;
  text-underline-offset: 3px;
}

.ns-button--link:not(:disabled, [aria-busy="true"]):hover {
  text-decoration: underline;
}

/* States */
.ns-button:disabled {
  opacity: var(--ns-opacity-disabled);
  cursor: not-allowed;
}

.ns-button[aria-busy="true"] {
  cursor: progress;
}
</style>
