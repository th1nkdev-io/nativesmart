<script setup lang="ts">
import { computed, inject } from "vue";
import {
  buttonGroupKey,
  type NsButtonIntent,
  type NsButtonSize,
  type NsButtonVariant
} from "./button-context";
import NsIcon from "./NsIcon.vue";
import NsSpinner from "./NsSpinner.vue";

export type { NsButtonIntent, NsButtonSize, NsButtonVariant } from "./button-context";
export type NsButtonShape = "rounded" | "pill" | "sharp";

export interface NsButtonProps {
  /** Accessible label. A default slot replaces it visually. */
  label: string;
  /** Visual emphasis; inside a ButtonGroup, the group's unless set here. */
  variant?: NsButtonVariant;
  intent?: NsButtonIntent;
  size?: NsButtonSize;
  /** Corners: the brand radius, a pill or square. */
  shape?: NsButtonShape;
  /** Icon before the label. */
  icon?: string;
  /** Icon after the label, such as a chevron. */
  iconEnd?: string;
  loading?: boolean;
  /** Label shown beside the spinner while loading. */
  loadingText?: string;
  /** Takes the full width of its container. */
  block?: boolean;
  disabled?: boolean;
  /** Renders a link that looks like a button. */
  href?: string;
  type?: "button" | "submit" | "reset";
  /** Toggle state: set it to make a toggle button, announced with aria-pressed. */
  pressed?: boolean;
  /** Square button showing only its icon; the label stays its accessible name. */
  iconOnly?: boolean;
}

const props = withDefaults(defineProps<NsButtonProps>(), {
  shape: "rounded",
  loading: false,
  block: false,
  disabled: false,
  type: "button",
  pressed: undefined,
  iconOnly: false
});

const emit = defineEmits<{
  press: [event: MouseEvent];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

/* A group sets the look of the buttons it holds; a button's own props win. */
const group = inject(buttonGroupKey, undefined);
const variant = computed(() => props.variant ?? group?.value.variant ?? "solid");
const intent = computed(() => props.intent ?? group?.value.intent ?? "primary");
const size = computed(() => props.size ?? group?.value.size ?? "md");
const disabled = computed(() => props.disabled || Boolean(group?.value.disabled));

const isLink = computed(() => Boolean(props.href) && !disabled.value);

const iconSizes: Record<NsButtonSize, "xs" | "sm" | "md" | "lg"> = {
  xs: "xs",
  sm: "sm",
  md: "sm",
  lg: "md",
  xl: "md"
};
const iconSize = computed(() => iconSizes[size.value]);

function onClick(event: MouseEvent) {
  if (props.loading || disabled.value) {
    event.preventDefault();
    return;
  }
  emit("press", event);
}
</script>

<template>
  <component
    :is="isLink ? 'a' : 'button'"
    :href="isLink ? href : undefined"
    :type="isLink ? undefined : type"
    :class="[
      'ns-button',
      `ns-button--${variant}`,
      `ns-button--${intent}`,
      `ns-button--${size}`,
      `ns-button--shape-${shape}`,
      {
        'ns-button--loading': loading,
        'ns-button--loading-text': loading && loadingText,
        'ns-button--block': block,
        'ns-button--icon-only': iconOnly,
        'ns-button--pressed': pressed
      }
    ]"
    :disabled="isLink ? undefined : disabled"
    :aria-disabled="(isLink && disabled) || loading || undefined"
    :aria-busy="loading || undefined"
    :aria-pressed="pressed === undefined ? undefined : pressed"
    :aria-label="$slots.default || iconOnly ? label : undefined"
    @click="onClick"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  >
    <span v-if="loading && loadingText" class="ns-button__content">
      <NsSpinner class="ns-button__spinner-inline" :label="label" />
      <span class="ns-button__label">{{ loadingText }}</span>
    </span>
    <template v-else>
      <span class="ns-button__content">
        <slot name="leading"
          ><NsIcon v-if="icon" class="ns-button__icon" :name="icon" :size="iconSize"
        /></slot>
        <span v-if="!iconOnly || $slots.default" class="ns-button__label"
          ><slot>{{ label }}</slot></span
        >
        <slot name="trailing"
          ><NsIcon v-if="iconEnd" class="ns-button__icon" :name="iconEnd" :size="iconSize"
        /></slot>
      </span>
      <NsSpinner v-if="loading" class="ns-button__spinner" :label="label" />
    </template>
  </component>
</template>

<style>
.ns-button {
  --ns-button-tone: var(--ns-color-primary);
  --ns-button-tone-hover: var(--ns-color-primary-hover);
  --ns-button-tone-pressed: var(--ns-color-primary-pressed);
  --ns-button-on-tone: var(--ns-color-on-primary);
  --ns-button-tone-muted: var(--ns-color-primary-muted);
  --ns-button-tone-muted-hover: var(--ns-color-primary-muted-hover);
  --ns-button-tone-text: var(--ns-color-primary-text);
  --ns-button-radius: var(--ns-radius-control);
  --ns-button-height: var(--ns-control-height-md);
  --ns-button-padding-inline: var(--ns-space-4);
  --ns-button-font-size: var(--ns-text-label-md-size);
  --ns-button-focus-ring: var(--ns-color-focus-ring);
  --ns-button-background: var(--ns-button-tone);
  --ns-button-foreground: var(--ns-button-on-tone);
  --ns-button-border: var(--ns-button-tone);
  position: relative;
  box-sizing: border-box;
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
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition:
    background-color var(--ns-duration-fast) var(--ns-easing-standard),
    border-color var(--ns-duration-fast) var(--ns-easing-standard),
    color var(--ns-duration-fast) var(--ns-easing-standard),
    box-shadow var(--ns-duration-fast) var(--ns-easing-standard),
    transform var(--ns-duration-fast) var(--ns-easing-standard);
}

.ns-button__content {
  display: inline-flex;
  align-items: center;
  gap: var(--ns-space-2);
  min-inline-size: 0;
}

.ns-button__label {
  overflow: hidden;
  text-overflow: ellipsis;
}

.ns-button__spinner {
  position: absolute;
  inset: 0;
  margin: auto;
}

.ns-button__spinner-inline {
  inline-size: 1em;
  block-size: 1em;
}

.ns-button--loading:not(.ns-button--loading-text) .ns-button__content {
  visibility: hidden;
}

.ns-button:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-button-focus-ring);
  outline-offset: var(--ns-focus-ring-offset);
}

.ns-button:not(:disabled, [aria-busy="true"], [aria-disabled="true"]):active {
  transform: translateY(1px);
}

/* Sizes */
.ns-button--xs {
  --ns-button-height: var(--ns-control-height-xs);
  --ns-button-padding-inline: var(--ns-space-2-5);
  --ns-button-font-size: var(--ns-text-label-xs-size);
}

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

.ns-button--xl {
  --ns-button-height: var(--ns-control-height-xl);
  --ns-button-padding-inline: var(--ns-space-7);
  --ns-button-font-size: var(--ns-text-label-lg-size);
}

/* Shapes and widths */
.ns-button--shape-pill {
  --ns-button-radius: var(--ns-radius-full);
}

.ns-button--shape-sharp {
  --ns-button-radius: var(--ns-radius-xs);
}

.ns-button--block {
  display: flex;
  inline-size: 100%;
}

.ns-button--icon-only {
  --ns-button-padding-inline: 0;
  inline-size: var(--ns-button-height);
}

/* Intents */
.ns-button--neutral {
  --ns-button-tone: var(--ns-color-neutral);
  --ns-button-tone-hover: var(--ns-color-neutral-hover);
  --ns-button-tone-pressed: var(--ns-color-neutral-pressed);
  --ns-button-on-tone: var(--ns-color-on-neutral);
  --ns-button-tone-muted: var(--ns-color-neutral-muted);
  --ns-button-tone-muted-hover: var(--ns-color-neutral-muted-hover);
  --ns-button-tone-text: var(--ns-color-text);
}

.ns-button--success {
  --ns-button-tone: var(--ns-color-success);
  --ns-button-tone-hover: var(--ns-color-success-hover);
  --ns-button-tone-pressed: var(--ns-color-success-pressed);
  --ns-button-on-tone: var(--ns-color-on-success);
  --ns-button-tone-muted: var(--ns-color-success-muted);
  --ns-button-tone-muted-hover: var(--ns-color-success-muted-hover);
  --ns-button-tone-text: var(--ns-color-success-text);
}

.ns-button--warning {
  --ns-button-tone: var(--ns-color-warning);
  --ns-button-tone-hover: var(--ns-color-warning-hover);
  --ns-button-tone-pressed: var(--ns-color-warning-pressed);
  --ns-button-on-tone: var(--ns-color-on-warning);
  --ns-button-tone-muted: var(--ns-color-warning-muted);
  --ns-button-tone-muted-hover: var(--ns-color-warning-muted-hover);
  --ns-button-tone-text: var(--ns-color-warning-text);
}

.ns-button--danger {
  --ns-button-tone: var(--ns-color-danger);
  --ns-button-tone-hover: var(--ns-color-danger-hover);
  --ns-button-tone-pressed: var(--ns-color-danger-pressed);
  --ns-button-on-tone: var(--ns-color-on-danger);
  --ns-button-tone-muted: var(--ns-color-danger-muted);
  --ns-button-tone-muted-hover: var(--ns-color-danger-muted-hover);
  --ns-button-tone-text: var(--ns-color-danger-text);
  --ns-button-focus-ring: var(--ns-color-danger);
}

/* Variants */
.ns-button--solid:not(:disabled, [aria-busy="true"], [aria-disabled="true"]):hover {
  --ns-button-background: var(--ns-button-tone-hover);
  --ns-button-border: var(--ns-button-tone-hover);
}

.ns-button--solid:not(:disabled, [aria-busy="true"], [aria-disabled="true"]):active {
  --ns-button-background: var(--ns-button-tone-pressed);
  --ns-button-border: var(--ns-button-tone-pressed);
}

.ns-button--soft {
  --ns-button-background: var(--ns-button-tone-muted);
  --ns-button-foreground: var(--ns-button-tone-text);
  --ns-button-border: transparent;
}

.ns-button--soft:not(:disabled, [aria-busy="true"], [aria-disabled="true"]):hover {
  --ns-button-background: var(--ns-button-tone-muted-hover);
}

.ns-button--outline {
  --ns-button-background: transparent;
  --ns-button-foreground: var(--ns-button-tone-text);
}

.ns-button--neutral.ns-button--outline {
  --ns-button-border: var(--ns-color-border-strong);
}

.ns-button--ghost {
  --ns-button-background: transparent;
  --ns-button-foreground: var(--ns-button-tone-text);
  --ns-button-border: transparent;
}

.ns-button--outline:not(:disabled, [aria-busy="true"], [aria-disabled="true"]):hover,
.ns-button--ghost:not(:disabled, [aria-busy="true"], [aria-disabled="true"]):hover {
  --ns-button-background: var(--ns-button-tone-muted);
}

.ns-button--link {
  --ns-button-background: transparent;
  --ns-button-foreground: var(--ns-button-tone-text);
  --ns-button-border: transparent;
  --ns-button-padding-inline: 0;
  min-block-size: auto;
  text-underline-offset: 3px;
}

.ns-button--link:not(:disabled, [aria-busy="true"], [aria-disabled="true"]):hover {
  text-decoration: underline;
}

/* Pressed toggle: the intent's tint and border, whatever the variant. */
.ns-button--pressed:not(.ns-button--solid) {
  --ns-button-background: var(--ns-button-tone-muted);
  --ns-button-foreground: var(--ns-button-tone-text);
  --ns-button-border: var(--ns-button-tone);
}

.ns-button--pressed.ns-button--solid {
  box-shadow: inset 0 2px 4px rgb(0 0 0 / 0.2);
  --ns-button-background: var(--ns-button-tone-pressed);
  --ns-button-border: var(--ns-button-tone-pressed);
}

/* States */
.ns-button:disabled,
.ns-button[aria-disabled="true"]:not([aria-busy="true"]) {
  opacity: var(--ns-opacity-disabled);
  cursor: not-allowed;
}

.ns-button[aria-busy="true"] {
  cursor: progress;
}

@media (prefers-reduced-motion: reduce) {
  .ns-button:active {
    transform: none;
  }
}
</style>
