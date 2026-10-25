<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import NsButton from "./NsButton.vue";
import NsIconButton from "./NsIconButton.vue";

export type NsCopyButtonDisplay = "field" | "button" | "icon";
export type NsCopyButtonSize = "sm" | "md" | "lg";

export interface NsCopyButtonProps {
  /** Text copied to the clipboard. */
  value: string;
  /** The value in a field with its button, a labelled button or an icon. */
  display?: NsCopyButtonDisplay;
  /** Name of the value, above the field. */
  caption?: string;
  size?: NsCopyButtonSize;
  /** Shows only the last four characters; the whole value is copied. */
  mask?: boolean;
  /** Milliseconds the confirmation stays. */
  timeout?: number;
  label?: string;
  copiedLabel?: string;
  failedLabel?: string;
  /** Spoken in place of a masked value. */
  maskedLabel?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<NsCopyButtonProps>(), {
  display: "field",
  size: "md",
  mask: false,
  timeout: 2000,
  label: "Copy",
  copiedLabel: "Copied",
  failedLabel: "Copy failed",
  maskedLabel: "hidden, ending in",
  disabled: false
});

const emit = defineEmits<{ copy: [value: string]; error: [error: unknown] }>();

type State = "idle" | "copied" | "failed";
const state = ref<State>("idle");
let timer: ReturnType<typeof setTimeout> | undefined;

/* The clipboard API first; the older selection command where it is missing or refused. */
async function write(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      /* falls through to the selection command */
    }
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.cssText = "position:fixed;inset-block-start:-100px;opacity:0";
  document.body.append(area);
  area.select();
  const done = document.execCommand?.("copy");
  area.remove();
  if (!done) throw new Error("Clipboard unavailable");
}

async function copy() {
  clearTimeout(timer);
  try {
    await write(props.value);
    state.value = "copied";
    emit("copy", props.value);
  } catch (error) {
    state.value = "failed";
    emit("error", error);
  }
  timer = setTimeout(() => (state.value = "idle"), props.timeout);
}

onBeforeUnmount(() => clearTimeout(timer));

const icon = computed(() =>
  state.value === "copied" ? "check" : state.value === "failed" ? "alert-triangle" : "copy"
);
const shownLabel = computed(() =>
  state.value === "copied"
    ? props.copiedLabel
    : state.value === "failed"
      ? props.failedLabel
      : props.label
);
const name = computed(() => (props.caption ? `${props.label} : ${props.caption}` : props.label));
const announcement = computed(() =>
  state.value === "copied" ? props.copiedLabel : state.value === "failed" ? props.failedLabel : ""
);

const tail = computed(() => props.value.replace(/\s/g, "").slice(-4));
const shown = computed(() => (props.mask ? `•••• ${tail.value}` : props.value));
</script>

<template>
  <div
    :class="[
      'ns-copy-button',
      `ns-copy-button--${display}`,
      `ns-copy-button--${size}`,
      `ns-copy-button--${state}`,
      { 'ns-copy-button--disabled': disabled }
    ]"
  >
    <template v-if="display === 'field'">
      <span v-if="caption" class="ns-copy-button__caption">{{ caption }}</span>
      <span class="ns-copy-button__field">
        <span class="ns-copy-button__value">
          <span :aria-hidden="mask || undefined">{{ shown }}</span>
          <span v-if="mask" class="ns-copy-button__spoken">{{ maskedLabel }} {{ tail }}</span>
        </span>
        <NsIconButton
          :icon="icon"
          :label="state === 'idle' ? name : shownLabel"
          :size="size === 'lg' ? 'md' : 'sm'"
          :disabled="disabled"
          :tooltip="true"
          @press="copy"
        />
      </span>
    </template>

    <NsIconButton
      v-else-if="display === 'icon'"
      :icon="icon"
      :label="state === 'idle' ? name : shownLabel"
      :size="size"
      :disabled="disabled"
      @press="copy"
    />

    <NsButton
      v-else
      :label="shownLabel"
      :icon="icon"
      variant="outline"
      intent="neutral"
      :size="size"
      :disabled="disabled"
      @press="copy"
    />

    <span class="ns-copy-button__spoken" role="status" aria-live="polite">{{ announcement }}</span>
  </div>
</template>

<style>
.ns-copy-button {
  display: inline-grid;
  gap: var(--ns-space-1-5);
  min-inline-size: 0;
  font-family: var(--ns-font-sans);
}

.ns-copy-button--field {
  display: grid;
}

.ns-copy-button__caption {
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
  font-weight: var(--ns-font-weight-medium);
}

.ns-copy-button__field {
  display: flex;
  min-inline-size: 0;
  align-items: center;
  gap: var(--ns-space-2);
  min-block-size: var(--ns-control-height-md);
  padding-inline: var(--ns-space-3) var(--ns-space-1);
  border: 1px solid var(--ns-color-border);
  border-radius: var(--ns-radius-control);
  background: var(--ns-color-surface-sunken);
  transition: border-color var(--ns-duration-fast) var(--ns-easing-standard);
}

.ns-copy-button--sm .ns-copy-button__field {
  min-block-size: var(--ns-control-height-sm);
}

.ns-copy-button--lg .ns-copy-button__field {
  min-block-size: var(--ns-control-height-lg);
  padding-inline-start: var(--ns-space-4);
}

.ns-copy-button__value {
  overflow: hidden;
  flex: 1;
  min-inline-size: 0;
  color: var(--ns-color-text);
  font-family: var(--ns-font-mono);
  font-size: var(--ns-text-code-size);
  font-variant-numeric: tabular-nums;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: all;
}

.ns-copy-button--lg .ns-copy-button__value {
  font-size: var(--ns-text-body-md-size);
}

/* Feedback */
.ns-copy-button--copied .ns-copy-button__field {
  border-color: var(--ns-color-success-border);
}

.ns-copy-button--copied .ns-button {
  --ns-button-foreground: var(--ns-color-success-text);
}

.ns-copy-button--failed .ns-copy-button__field {
  border-color: var(--ns-color-danger-border);
}

.ns-copy-button--failed .ns-button {
  --ns-button-foreground: var(--ns-color-danger-text);
}

.ns-copy-button--copied .ns-icon {
  animation: ns-copy-pop var(--ns-duration-normal) var(--ns-easing-emphasized);
}

@keyframes ns-copy-pop {
  from {
    transform: scale(0.6);
  }
}

.ns-copy-button--disabled .ns-copy-button__value {
  color: var(--ns-color-text-muted);
}

.ns-copy-button__spoken {
  position: absolute;
  overflow: hidden;
  clip-path: inset(50%);
  inline-size: 1px;
  block-size: 1px;
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .ns-copy-button--copied .ns-icon {
    animation: none;
  }
}
</style>
