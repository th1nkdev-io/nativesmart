<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import NsIcon from "./NsIcon.vue";

export type NsToastIntent = "info" | "success" | "warning" | "danger";

export interface NsToastProps {
  message: string;
  intent?: NsToastIntent;
  title?: string;
  /** Text of the optional action button, such as « Annuler ». */
  actionLabel?: string;
  dismissible?: boolean;
  /** Accessible label of the close button. */
  closeLabel?: string;
  /** Milliseconds before `dismiss` fires on its own; 0 keeps the toast. Paused on hover and focus. */
  duration?: number;
}

const props = withDefaults(defineProps<NsToastProps>(), {
  intent: "info",
  dismissible: true,
  closeLabel: "Dismiss",
  duration: 0
});

const emit = defineEmits<{ dismiss: []; action: [] }>();

const icon = computed(
  () =>
    ({
      info: "info",
      success: "check-circle",
      warning: "alert-triangle",
      danger: "alert-circle"
    })[props.intent]
);

/* Danger interrupts: it is announced at once. The others wait for a pause. */
const role = computed(() => (props.intent === "danger" ? "alert" : "status"));

let timer: ReturnType<typeof setTimeout> | undefined;
let remaining = props.duration;
let startedAt = 0;
const paused = ref(false);

function start() {
  if (props.duration <= 0 || remaining <= 0) return;
  startedAt = Date.now();
  timer = setTimeout(() => emit("dismiss"), remaining);
}

function pause() {
  if (!timer) return;
  clearTimeout(timer);
  timer = undefined;
  remaining -= Date.now() - startedAt;
  paused.value = true;
}

function resume() {
  paused.value = false;
  start();
}

onMounted(start);
onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <div
    :class="['ns-toast', `ns-toast--${intent}`]"
    :role="role"
    :aria-live="role === 'alert' ? 'assertive' : 'polite'"
    aria-atomic="true"
    @mouseenter="pause"
    @mouseleave="resume"
    @focusin="pause"
    @focusout="resume"
  >
    <NsIcon class="ns-toast__icon" :name="icon" />
    <div class="ns-toast__body">
      <p v-if="title" class="ns-toast__title">{{ title }}</p>
      <p class="ns-toast__message">{{ message }}</p>
    </div>
    <button v-if="actionLabel" type="button" class="ns-toast__action" @click="emit('action')">
      {{ actionLabel }}
    </button>
    <button
      v-if="dismissible"
      type="button"
      class="ns-toast__close"
      :aria-label="closeLabel"
      @click="emit('dismiss')"
    >
      <NsIcon name="close" size="sm" />
    </button>
  </div>
</template>

<style>
.ns-toast {
  --ns-toast-background: var(--ns-color-surface-floating);
  --ns-toast-foreground: var(--ns-color-text);
  --ns-toast-accent: var(--ns-color-info);
  --ns-toast-radius: var(--ns-radius-lg);
  --ns-toast-shadow: var(--ns-elevation-toast);
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  gap: var(--ns-space-3);
  inline-size: min(100%, 420px);
  padding: var(--ns-space-3) var(--ns-space-3) var(--ns-space-3) var(--ns-space-4);
  border: 1px solid var(--ns-color-border-subtle);
  border-inline-start: 3px solid var(--ns-toast-accent);
  border-radius: var(--ns-toast-radius);
  background: var(--ns-toast-background);
  box-shadow: var(--ns-toast-shadow);
  color: var(--ns-toast-foreground);
  font-family: var(--ns-font-sans);
  animation: ns-toast-enter var(--ns-duration-moderate) var(--ns-easing-emphasized-decelerate);
}

.ns-toast__icon {
  margin-block-start: 1px;
  color: var(--ns-toast-accent);
}

.ns-toast__body {
  flex: 1;
  min-inline-size: 0;
  display: grid;
  gap: 2px;
  padding-block: 1px;
}

.ns-toast__title,
.ns-toast__message {
  margin: 0;
  font-size: var(--ns-text-body-sm-size);
  line-height: var(--ns-text-body-sm-line-height);
}

.ns-toast__title {
  font-weight: var(--ns-font-weight-semibold);
}

.ns-toast__title + .ns-toast__message {
  color: var(--ns-color-text-muted);
}

.ns-toast__action,
.ns-toast__close {
  flex: none;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.ns-toast__action {
  padding: var(--ns-space-1) var(--ns-space-2);
  border-radius: var(--ns-radius-sm);
  color: var(--ns-color-text-link);
  font-size: var(--ns-text-label-md-size);
  font-weight: var(--ns-font-weight-semibold);
}

.ns-toast__close {
  display: inline-grid;
  place-items: center;
  inline-size: 28px;
  block-size: 28px;
  margin: -2px -2px -2px 0;
  border-radius: var(--ns-radius-sm);
  color: var(--ns-color-text-muted);
}

.ns-toast__action:hover,
.ns-toast__close:hover {
  background: var(--ns-color-surface-hover);
}

.ns-toast__action:focus-visible,
.ns-toast__close:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
  outline-offset: 1px;
}

.ns-toast--success {
  --ns-toast-accent: var(--ns-color-success);
}

.ns-toast--warning {
  --ns-toast-accent: var(--ns-color-warning);
}

.ns-toast--danger {
  --ns-toast-accent: var(--ns-color-danger);
}

@keyframes ns-toast-enter {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ns-toast {
    animation-name: ns-toast-fade;
  }

  @keyframes ns-toast-fade {
    from {
      opacity: 0;
    }
  }
}
</style>
