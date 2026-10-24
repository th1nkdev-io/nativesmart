<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { uniqueId } from "../utils/id";
import NsIcon from "./NsIcon.vue";

export type NsModalSize = "sm" | "md" | "lg";

export interface NsModalProps {
  /** Visibility, controlled by the parent: listen to `open-change` or use `v-model:open`. */
  open: boolean;
  /** Dialog title, announced when the dialog opens. */
  title?: string;
  description?: string;
  size?: NsModalSize;
  /** Escape, the backdrop and the close button close the dialog. */
  dismissible?: boolean;
  /** Accessible label of the close button. */
  closeLabel?: string;
}

const props = withDefaults(defineProps<NsModalProps>(), {
  size: "md",
  dismissible: true,
  closeLabel: "Close"
});

const emit = defineEmits<{
  "open-change": [open: boolean];
  "update:open": [open: boolean];
  dismiss: [];
}>();

const dialog = ref<HTMLDialogElement>();
const titleId = uniqueId("ns-modal-title");
const descriptionId = `${titleId}-description`;
let returnFocus: HTMLElement | null = null;

function show() {
  const element = dialog.value;
  if (!element || element.open) return;
  returnFocus = document.activeElement as HTMLElement | null;
  if (typeof element.showModal === "function") element.showModal();
  else element.setAttribute("open", "");
  document.documentElement.classList.add("ns-modal-open");
}

function hide() {
  const element = dialog.value;
  document.documentElement.classList.remove("ns-modal-open");
  if (!element?.open) return;
  if (typeof element.close === "function") element.close();
  else element.removeAttribute("open");
  returnFocus?.focus?.();
  returnFocus = null;
}

/** The parent owns `open`: the dialog only asks to close. */
function requestClose() {
  if (!props.dismissible) return;
  emit("dismiss");
  emit("open-change", false);
  emit("update:open", false);
}

function onCancel(event: Event) {
  event.preventDefault();
  requestClose();
}

/** A click on the dialog element itself, outside its panel, lands on the backdrop. */
function onClick(event: MouseEvent) {
  if (event.target === dialog.value) requestClose();
}

watch(
  () => props.open,
  (open) => (open ? show() : hide())
);
onMounted(() => props.open && show());
onBeforeUnmount(hide);
</script>

<template>
  <dialog
    ref="dialog"
    :class="['ns-modal', `ns-modal--${size}`]"
    :aria-labelledby="title ? titleId : undefined"
    :aria-describedby="description ? descriptionId : undefined"
    @cancel="onCancel"
    @click="onClick"
  >
    <div class="ns-modal__panel">
      <header v-if="title || $slots.header || dismissible" class="ns-modal__header">
        <div class="ns-modal__heading">
          <slot name="header">
            <h2 v-if="title" :id="titleId" class="ns-modal__title">{{ title }}</h2>
            <p v-if="description" :id="descriptionId" class="ns-modal__description">
              {{ description }}
            </p>
          </slot>
        </div>
        <button
          v-if="dismissible"
          type="button"
          class="ns-modal__close"
          :aria-label="closeLabel"
          @click="requestClose"
        >
          <NsIcon name="close" />
        </button>
      </header>
      <div v-if="$slots.default" class="ns-modal__content"><slot /></div>
      <footer v-if="$slots.actions" class="ns-modal__actions"><slot name="actions" /></footer>
    </div>
  </dialog>
</template>

<style>
html.ns-modal-open {
  overflow: hidden;
}

.ns-modal {
  --ns-modal-background: var(--ns-color-surface-floating);
  --ns-modal-radius: var(--ns-radius-overlay);
  --ns-modal-shadow: var(--ns-elevation-modal);
  --ns-modal-backdrop: color-mix(
    in srgb,
    var(--ns-color-overlay) calc(var(--ns-opacity-overlay) * 100%),
    transparent
  );
  --ns-modal-width: 520px;
  box-sizing: border-box;
  inline-size: min(var(--ns-modal-width), calc(100% - 2 * var(--ns-space-4)));
  max-inline-size: none;
  max-block-size: calc(100% - 2 * var(--ns-space-4));
  padding: 0;
  overflow: visible;
  border: 0;
  border-radius: var(--ns-modal-radius);
  background: transparent;
  color: var(--ns-color-text);
  font-family: var(--ns-font-sans);
}

.ns-modal::backdrop {
  background: var(--ns-modal-backdrop);
}

.ns-modal[open] {
  animation: ns-modal-enter var(--ns-duration-moderate) var(--ns-easing-emphasized-decelerate);
}

.ns-modal[open]::backdrop {
  animation: ns-modal-fade var(--ns-duration-moderate) var(--ns-easing-standard);
}

.ns-modal__panel {
  display: flex;
  flex-direction: column;
  max-block-size: inherit;
  overflow: hidden;
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: inherit;
  background: var(--ns-modal-background);
  box-shadow: var(--ns-modal-shadow);
}

.ns-modal__header {
  display: flex;
  align-items: flex-start;
  gap: var(--ns-space-3);
  padding: var(--ns-space-5) var(--ns-space-5) 0 var(--ns-space-6);
}

.ns-modal__heading {
  flex: 1;
  display: grid;
  gap: var(--ns-space-1);
  min-inline-size: 0;
  padding-block-start: var(--ns-space-1);
}

.ns-modal__title {
  margin: 0;
  font-family: var(--ns-text-title-lg-family);
  font-size: var(--ns-text-title-lg-size);
  font-weight: var(--ns-font-weight-semibold);
  line-height: var(--ns-text-title-lg-line-height);
  letter-spacing: var(--ns-text-title-lg-tracking);
}

.ns-modal__description {
  margin: 0;
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-body-sm-size);
  line-height: var(--ns-text-body-sm-line-height);
}

.ns-modal__close {
  display: inline-grid;
  flex: none;
  place-items: center;
  inline-size: 36px;
  block-size: 36px;
  border: 0;
  border-radius: var(--ns-radius-md);
  background: transparent;
  color: var(--ns-color-text-muted);
  cursor: pointer;
}

.ns-modal__close:hover {
  background: var(--ns-color-surface-hover);
  color: var(--ns-color-text);
}

.ns-modal__close:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
  outline-offset: 1px;
}

.ns-modal__content {
  overflow: auto;
  padding: var(--ns-space-4) var(--ns-space-6) var(--ns-space-6);
  font-size: var(--ns-text-body-md-size);
  line-height: var(--ns-text-body-md-line-height);
}

.ns-modal__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--ns-space-2);
  padding: var(--ns-space-4) var(--ns-space-6);
  border-block-start: 1px solid var(--ns-color-border-subtle);
  background: var(--ns-color-surface-muted);
}

.ns-modal__header + .ns-modal__actions {
  margin-block-start: var(--ns-space-6);
}

.ns-modal--sm {
  --ns-modal-width: 400px;
}

.ns-modal--lg {
  --ns-modal-width: 720px;
}

@keyframes ns-modal-enter {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.97);
  }
}

@keyframes ns-modal-fade {
  from {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ns-modal[open] {
    animation-name: ns-modal-fade;
  }
}
</style>
