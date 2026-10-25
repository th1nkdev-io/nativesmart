<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import NsIcon from "./NsIcon.vue";

export type NsSegmentedVariant = "surface" | "primary" | "underline";
export type NsSegmentedSize = "sm" | "md" | "lg";
export type NsSegmentedShape = "rounded" | "pill";
export type NsSegmentedOption =
  | string
  | { label: string; value?: string; icon?: string; disabled?: boolean };

export interface NsSegmentedControlProps {
  /** Choices, as text or with a value, an icon and a disabled flag. */
  options: readonly NsSegmentedOption[];
  /** Accessible name of the group. */
  label?: string;
  variant?: NsSegmentedVariant;
  size?: NsSegmentedSize;
  shape?: NsSegmentedShape;
  /** Fills the width, segments sharing it equally. */
  block?: boolean;
  /** Shows the icons only; labels become the accessible names. */
  iconOnly?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<NsSegmentedControlProps>(), {
  variant: "surface",
  size: "md",
  shape: "rounded",
  block: false,
  iconOnly: false,
  disabled: false
});

const model = defineModel<string>("value");
const emit = defineEmits<{ change: [value: string] }>();

const items = computed(() =>
  props.options.map((option) =>
    typeof option === "string"
      ? { label: option, value: option, icon: undefined, disabled: false }
      : {
          label: option.label,
          value: option.value ?? option.label,
          icon: option.icon,
          disabled: Boolean(option.disabled)
        }
  )
);

/* Without a value, the first option is selected, as a radio group always has one. */
const selected = computed(() => model.value ?? items.value[0]?.value);

function select(value: string) {
  if (value === selected.value) return;
  model.value = value;
  emit("change", value);
}

/* Arrows move and select, skipping disabled options; they follow the reading direction. */
const buttons = ref<HTMLButtonElement[]>([]);
function onKeydown(event: KeyboardEvent, index: number) {
  const rtl = getComputedStyle(event.currentTarget as Element).direction === "rtl";
  const forward = ["ArrowDown", rtl ? "ArrowLeft" : "ArrowRight"];
  const backward = ["ArrowUp", rtl ? "ArrowRight" : "ArrowLeft"];
  const enabled = items.value
    .map((item, position) => ({ item, position }))
    .filter(({ item }) => !item.disabled);
  if (!enabled.length) return;
  const current = enabled.findIndex(({ position }) => position === index);
  let next: number | undefined;
  if (forward.includes(event.key)) next = enabled[(current + 1) % enabled.length]!.position;
  else if (backward.includes(event.key))
    next = enabled[(current - 1 + enabled.length) % enabled.length]!.position;
  else if (event.key === "Home") next = enabled[0]!.position;
  else if (event.key === "End") next = enabled[enabled.length - 1]!.position;
  if (next === undefined) return;
  event.preventDefault();
  select(items.value[next]!.value);
  buttons.value[next]?.focus();
}

/* The indicator slides to the selected segment, measured after each layout change. */
const track = ref<HTMLElement>();
const indicator = ref<{ left: number; width: number }>();
let observer: ResizeObserver | undefined;

function measure() {
  const index = items.value.findIndex((item) => item.value === selected.value);
  const button = buttons.value[index];
  if (!button) return (indicator.value = undefined);
  indicator.value = { left: button.offsetLeft, width: button.offsetWidth };
}

onMounted(() => {
  measure();
  if (typeof ResizeObserver !== "undefined" && track.value) {
    observer = new ResizeObserver(measure);
    observer.observe(track.value);
  }
});
watch([selected, items, () => props.size, () => props.iconOnly], async () => {
  await nextTick();
  measure();
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <div
    ref="track"
    role="radiogroup"
    :aria-label="label"
    :aria-disabled="disabled || undefined"
    :class="[
      'ns-segmented',
      `ns-segmented--${variant}`,
      `ns-segmented--${size}`,
      `ns-segmented--${shape}`,
      { 'ns-segmented--block': block, 'ns-segmented--icon-only': iconOnly }
    ]"
  >
    <span
      v-if="indicator"
      class="ns-segmented__indicator"
      aria-hidden="true"
      :style="{ left: `${indicator.left}px`, width: `${indicator.width}px` }"
    />
    <button
      v-for="(item, index) in items"
      :key="item.value"
      :ref="(element) => (buttons[index] = element as HTMLButtonElement)"
      type="button"
      role="radio"
      class="ns-segmented__segment"
      :aria-checked="item.value === selected"
      :aria-label="iconOnly ? item.label : undefined"
      :title="iconOnly ? item.label : undefined"
      :tabindex="item.value === selected ? 0 : -1"
      :disabled="disabled || item.disabled"
      @click="select(item.value)"
      @keydown="onKeydown($event, index)"
    >
      <NsIcon v-if="item.icon" :name="item.icon" :size="size === 'lg' ? 'md' : 'sm'" />
      <span v-if="!iconOnly" class="ns-segmented__label">{{ item.label }}</span>
    </button>
  </div>
</template>

<style>
.ns-segmented {
  --ns-segmented-height: var(--ns-control-height-md);
  --ns-segmented-radius: var(--ns-radius-control);
  --ns-segmented-pad: 3px;
  --ns-segmented-font: var(--ns-text-label-md-size);
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  max-inline-size: 100%;
  padding: var(--ns-segmented-pad);
  border-radius: var(--ns-segmented-radius);
  background: var(--ns-color-surface-muted);
  font-family: var(--ns-font-sans);
  isolation: isolate;
  vertical-align: middle;
}

.ns-segmented--sm {
  --ns-segmented-height: var(--ns-control-height-sm);
  --ns-segmented-font: var(--ns-text-label-sm-size);
}

.ns-segmented--lg {
  --ns-segmented-height: var(--ns-control-height-lg);
  --ns-segmented-font: var(--ns-text-label-lg-size);
}

.ns-segmented--pill {
  --ns-segmented-radius: var(--ns-radius-full);
}

.ns-segmented--block {
  display: flex;
}

.ns-segmented__segment {
  position: relative;
  z-index: 1;
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: var(--ns-space-1-5);
  min-block-size: calc(var(--ns-segmented-height) - var(--ns-segmented-pad) * 2);
  padding-inline: var(--ns-space-3-5);
  border: 0;
  border-radius: calc(var(--ns-segmented-radius) - var(--ns-segmented-pad));
  background: none;
  color: var(--ns-color-text-muted);
  font: inherit;
  font-size: var(--ns-segmented-font);
  font-weight: var(--ns-font-weight-semibold);
  white-space: nowrap;
  cursor: pointer;
  transition: color var(--ns-duration-fast) var(--ns-easing-standard);
}

.ns-segmented--block .ns-segmented__segment {
  flex: 1 1 0%;
  min-inline-size: 0;
}

.ns-segmented--icon-only .ns-segmented__segment {
  padding-inline: 0;
  inline-size: calc(var(--ns-segmented-height) + 4px);
}

.ns-segmented__label {
  overflow: hidden;
  text-overflow: ellipsis;
}

.ns-segmented__segment:hover:not(:disabled, [aria-checked="true"]) {
  color: var(--ns-color-text);
}

.ns-segmented__segment[aria-checked="true"] {
  color: var(--ns-color-text);
}

.ns-segmented__segment:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
  outline-offset: 1px;
}

.ns-segmented__segment:disabled {
  color: var(--ns-color-text-disabled);
  cursor: not-allowed;
}

/* Indicator: drawn once and slid to the selected segment. */
.ns-segmented__indicator {
  position: absolute;
  inset-block: var(--ns-segmented-pad);
  z-index: 0;
  border-radius: calc(var(--ns-segmented-radius) - var(--ns-segmented-pad));
  background: var(--ns-color-surface);
  box-shadow: var(--ns-elevation-card);
  transition:
    left var(--ns-duration-normal) var(--ns-easing-emphasized),
    width var(--ns-duration-normal) var(--ns-easing-emphasized);
}

.ns-segmented--primary .ns-segmented__indicator {
  background: var(--ns-color-primary);
  box-shadow: none;
}

.ns-segmented--primary .ns-segmented__segment[aria-checked="true"] {
  color: var(--ns-color-on-primary);
}

/* Underline: no track, a line under the selected option. */
.ns-segmented--underline {
  --ns-segmented-pad: 0px;
  border-radius: 0;
  background: none;
  box-shadow: inset 0 -1px 0 var(--ns-color-border);
}

.ns-segmented--underline .ns-segmented__indicator {
  inset-block: auto 0;
  block-size: 2px;
  border-radius: 2px;
  background: var(--ns-color-primary);
  box-shadow: none;
}

.ns-segmented--underline .ns-segmented__segment[aria-checked="true"] {
  color: var(--ns-color-primary-text);
}

.ns-segmented[aria-disabled="true"] {
  opacity: var(--ns-opacity-disabled);
}

@media (prefers-reduced-motion: reduce) {
  .ns-segmented__indicator {
    transition: none;
  }
}
</style>
