<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from "vue";
import NsIcon from "./NsIcon.vue";

export type NsFabTone = "primary" | "surface" | "inverse";
export type NsFabSize = "sm" | "md" | "lg";
export type NsFabShape = "circle" | "rounded";
export type NsFabPlacement = "bottom-end" | "bottom-start" | "bottom-center" | "top-end";
export type NsFabPosition = "fixed" | "absolute" | "static";
export type NsFabAction = { key: string; label: string; icon: string };

export interface NsFabProps {
  /** The action: its accessible name, and the text when extended. */
  label: string;
  icon?: string;
  tone?: NsFabTone;
  size?: NsFabSize;
  shape?: NsFabShape;
  placement?: NsFabPlacement;
  /** `fixed` to the window, `absolute` in its container, or `static`. */
  position?: NsFabPosition;
  /** Shows the label beside the icon. */
  extended?: boolean;
  /** A count on the corner. */
  badge?: string | number;
  /** Speed dial items, listed above the button. */
  actions?: readonly NsFabAction[];
  disabled?: boolean;
}

const props = withDefaults(defineProps<NsFabProps>(), {
  icon: "plus",
  tone: "primary",
  size: "md",
  shape: "circle",
  placement: "bottom-end",
  position: "fixed",
  extended: false,
  disabled: false
});

const open = defineModel<boolean>("open", { default: false });
const emit = defineEmits<{
  press: [event: MouseEvent];
  action: [key: string];
  "open-change": [open: boolean];
}>();

const hasActions = computed(() => Boolean(props.actions?.length));
const menuId = `ns-fab-${useId()}`;
const main = ref<HTMLButtonElement>();
const items = ref<HTMLButtonElement[]>([]);

function setOpen(value: boolean) {
  open.value = value;
  emit("open-change", value);
}

function onMain(event: MouseEvent) {
  if (props.disabled) return;
  if (hasActions.value) setOpen(!open.value);
  else emit("press", event);
}

function choose(key: string) {
  emit("action", key);
  setOpen(false);
  main.value?.focus();
}

/* Opening moves focus to the first action; the arrows walk the menu, Escape closes it. */
watch(open, async (value) => {
  if (!value || !hasActions.value) return;
  await nextTick();
  items.value[0]?.focus();
});

function onMenuKeydown(event: KeyboardEvent) {
  const index = items.value.indexOf(document.activeElement as HTMLButtonElement);
  if (event.key === "Escape") {
    event.preventDefault();
    setOpen(false);
    main.value?.focus();
  } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
    const step = event.key === "ArrowDown" ? 1 : -1;
    const next = (index + step + items.value.length) % items.value.length;
    items.value[next]?.focus();
  }
}

/* A click outside closes the menu. */
const root = ref<HTMLElement>();
function onOutside(event: PointerEvent) {
  if (open.value && !root.value?.contains(event.target as Node)) setOpen(false);
}
watch(open, (value) => {
  if (typeof document === "undefined") return;
  if (value) document.addEventListener("pointerdown", onOutside);
  else document.removeEventListener("pointerdown", onOutside);
});
onBeforeUnmount(() => document.removeEventListener("pointerdown", onOutside));

const iconSize = computed(() => (props.size === "lg" ? "lg" : props.size === "sm" ? "sm" : "md"));
</script>

<template>
  <div
    ref="root"
    :class="[
      'ns-fab',
      `ns-fab--${tone}`,
      `ns-fab--${size}`,
      `ns-fab--${shape}`,
      `ns-fab--${placement}`,
      `ns-fab--${position}`,
      { 'ns-fab--extended': extended, 'ns-fab--open': open && hasActions }
    ]"
  >
    <span v-if="hasActions && open" class="ns-fab__scrim" aria-hidden="true" />
    <ul
      v-if="hasActions"
      v-show="open"
      :id="menuId"
      class="ns-fab__actions"
      role="menu"
      :aria-label="label"
      @keydown="onMenuKeydown"
    >
      <li
        v-for="(action, index) in actions"
        :key="action.key"
        role="none"
        :style="{ '--ns-fab-delay': `${(actions!.length - index - 1) * 30}ms` }"
      >
        <span class="ns-fab__action-label" aria-hidden="true">{{ action.label }}</span>
        <button
          :ref="(element) => (items[index] = element as HTMLButtonElement)"
          type="button"
          role="menuitem"
          class="ns-fab__action"
          :aria-label="action.label"
          @click="choose(action.key)"
        >
          <NsIcon :name="action.icon" size="sm" />
        </button>
      </li>
    </ul>

    <button
      ref="main"
      type="button"
      class="ns-fab__button"
      :aria-label="extended ? undefined : label"
      :aria-expanded="hasActions ? open : undefined"
      :aria-haspopup="hasActions ? 'menu' : undefined"
      :aria-controls="hasActions ? menuId : undefined"
      :disabled="disabled"
      @click="onMain"
      @keydown.escape="open && setOpen(false)"
    >
      <NsIcon class="ns-fab__icon" :name="icon" :size="iconSize" />
      <span v-if="extended" class="ns-fab__label">{{ label }}</span>
      <span v-if="badge !== undefined" class="ns-fab__badge" aria-hidden="true">{{ badge }}</span>
    </button>
  </div>
</template>

<style>
.ns-fab {
  --ns-fab-size: 56px;
  --ns-fab-offset: var(--ns-space-6);
  --ns-fab-background: var(--ns-color-primary);
  --ns-fab-hover: var(--ns-color-primary-hover);
  --ns-fab-foreground: var(--ns-color-on-primary);
  --ns-fab-radius: var(--ns-radius-full);
  z-index: var(--ns-z-sticky);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--ns-space-3);
  font-family: var(--ns-font-sans);
}

.ns-fab--fixed {
  position: fixed;
}

.ns-fab--absolute {
  position: absolute;
}

.ns-fab--static {
  position: relative;
  display: inline-flex;
}

/* Placement: logical corners, so it moves to the other side in right-to-left layouts. */
.ns-fab--bottom-end:not(.ns-fab--static) {
  inset-block-end: var(--ns-fab-offset);
  inset-inline-end: var(--ns-fab-offset);
}

.ns-fab--bottom-start:not(.ns-fab--static) {
  inset-block-end: var(--ns-fab-offset);
  inset-inline-start: var(--ns-fab-offset);
}

.ns-fab--bottom-start {
  align-items: flex-start;
}

.ns-fab--bottom-center:not(.ns-fab--static) {
  inset-block-end: var(--ns-fab-offset);
  inset-inline-start: 50%;
  transform: translateX(-50%);
}

.ns-fab--bottom-center {
  align-items: center;
}

.ns-fab--top-end:not(.ns-fab--static) {
  inset-block-start: var(--ns-fab-offset);
  inset-inline-end: var(--ns-fab-offset);
  flex-direction: column-reverse;
}

/* Sizes, shapes and tones */
.ns-fab--sm {
  --ns-fab-size: 40px;
}

.ns-fab--lg {
  --ns-fab-size: 72px;
}

.ns-fab--rounded {
  --ns-fab-radius: var(--ns-radius-xl);
}

.ns-fab--lg.ns-fab--rounded {
  --ns-fab-radius: var(--ns-radius-2xl);
}

.ns-fab--surface {
  --ns-fab-background: var(--ns-color-surface-raised);
  --ns-fab-hover: var(--ns-color-surface-hover);
  --ns-fab-foreground: var(--ns-color-primary-text);
}

.ns-fab--inverse {
  --ns-fab-background: var(--ns-color-surface-inverse);
  --ns-fab-hover: color-mix(
    in srgb,
    var(--ns-color-surface-inverse) 88%,
    var(--ns-color-text-inverse)
  );
  --ns-fab-foreground: var(--ns-color-text-inverse);
}

.ns-fab__button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ns-space-2);
  box-sizing: border-box;
  min-inline-size: var(--ns-fab-size);
  block-size: var(--ns-fab-size);
  padding: 0;
  border: 0;
  border-radius: var(--ns-fab-radius);
  background: var(--ns-fab-background);
  box-shadow: var(--ns-elevation-raised);
  color: var(--ns-fab-foreground);
  font: inherit;
  font-size: var(--ns-text-label-lg-size);
  font-weight: var(--ns-font-weight-semibold);
  white-space: nowrap;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    background-color var(--ns-duration-fast) var(--ns-easing-standard),
    box-shadow var(--ns-duration-normal) var(--ns-easing-standard),
    transform var(--ns-duration-fast) var(--ns-easing-standard);
}

.ns-fab--extended .ns-fab__button {
  padding-inline: var(--ns-space-5) var(--ns-space-6);
}

/* Extended, a circle becomes a pill; a rounded square keeps its corners. */
.ns-fab--extended.ns-fab--circle .ns-fab__button {
  border-radius: calc(var(--ns-fab-size) / 2);
}

.ns-fab__button:hover:not(:disabled) {
  background: var(--ns-fab-hover);
  box-shadow: var(--ns-elevation-modal);
}

.ns-fab__button:active:not(:disabled) {
  transform: scale(0.96);
}

.ns-fab__button:focus-visible,
.ns-fab__action:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
  outline-offset: var(--ns-focus-ring-offset);
}

.ns-fab__button:disabled {
  opacity: var(--ns-opacity-disabled);
  box-shadow: none;
  cursor: not-allowed;
}

/* The plus turns into a close cross while the actions are open. */
.ns-fab__icon {
  transition: transform var(--ns-duration-normal) var(--ns-easing-emphasized);
}

.ns-fab--open .ns-fab__icon {
  transform: rotate(45deg);
}

.ns-fab__badge {
  position: absolute;
  inset-block-start: -2px;
  inset-inline-end: -2px;
  display: grid;
  place-items: center;
  min-inline-size: 20px;
  block-size: 20px;
  padding-inline: 5px;
  box-sizing: border-box;
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-danger);
  box-shadow: 0 0 0 2px var(--ns-color-surface);
  color: var(--ns-color-on-danger);
  font-size: 11px;
  font-weight: var(--ns-font-weight-bold);
}

/*
 * Scrim: a huge shadow around the button veils the page while the actions are open. It covers the
 * window when fixed, and stops at a container that clips its overflow.
 */
.ns-fab__scrim {
  position: absolute;
  inset-block-end: 0;
  inset-inline-end: 0;
  z-index: -1;
  inline-size: 1px;
  block-size: 1px;
  box-shadow: 0 0 0 200vmax color-mix(in srgb, var(--ns-color-background) 72%, transparent);
  pointer-events: none;
  animation: ns-fab-scrim var(--ns-duration-normal) var(--ns-easing-standard);
}

@keyframes ns-fab-scrim {
  from {
    opacity: 0;
  }
}

/* Speed dial */
.ns-fab__actions {
  display: grid;
  justify-items: end;
  gap: var(--ns-space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.ns-fab--bottom-start .ns-fab__actions {
  justify-items: start;
}

.ns-fab--bottom-center .ns-fab__actions {
  justify-items: center;
}

.ns-fab__actions li {
  display: flex;
  align-items: center;
  gap: var(--ns-space-3);
  padding-inline-end: calc((var(--ns-fab-size) - 40px) / 2);
  animation: ns-fab-in var(--ns-duration-normal) var(--ns-easing-emphasized) both;
  animation-delay: var(--ns-fab-delay);
}

.ns-fab--bottom-start .ns-fab__actions li {
  flex-direction: row-reverse;
  padding-inline: calc((var(--ns-fab-size) - 40px) / 2) 0;
}

.ns-fab__action-label {
  padding: var(--ns-space-1) var(--ns-space-2-5);
  border-radius: var(--ns-radius-md);
  background: var(--ns-color-surface-raised);
  box-shadow: var(--ns-elevation-card);
  color: var(--ns-color-text);
  font-size: var(--ns-text-caption-size);
  font-weight: var(--ns-font-weight-semibold);
  white-space: nowrap;
}

.ns-fab__action {
  display: grid;
  place-items: center;
  inline-size: 40px;
  block-size: 40px;
  border: 0;
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-surface-raised);
  box-shadow: var(--ns-elevation-raised);
  color: var(--ns-color-primary-text);
  cursor: pointer;
}

.ns-fab__action:hover {
  background: var(--ns-color-primary-muted);
}

@keyframes ns-fab-in {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.9);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ns-fab__actions li,
  .ns-fab__icon,
  .ns-fab__button {
    animation: none;
    transition: none;
  }
}
</style>
