<script setup lang="ts" generic="T extends string | number">
import Icon from "../../editorial/Icon.vue";
import type { IconName } from "../../editorial/icons";

export type SegOption<V> = { value: V; label: string; icon?: IconName; hint?: string };

defineProps<{
  options: readonly SegOption<T>[];
  label: string;
  /** Hides the labels on narrow screens, keeping the icons. */
  compact?: boolean;
}>();
const model = defineModel<T>({ required: true });

/** Arrow keys move the choice, as in a native radio group. */
function move(event: KeyboardEvent, options: readonly SegOption<T>[]) {
  const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
  if (!step) return;
  event.preventDefault();
  const rtl = getComputedStyle(event.currentTarget as HTMLElement).direction === "rtl";
  const horizontal = event.key === "ArrowLeft" || event.key === "ArrowRight";
  const index = options.findIndex((option) => option.value === model.value);
  const next =
    options[(index + (rtl && horizontal ? -step : step) + options.length) % options.length];
  model.value = next.value;
  const group = event.currentTarget as HTMLElement;
  requestAnimationFrame(() => group.querySelector<HTMLElement>('[aria-checked="true"]')?.focus());
}
</script>

<template>
  <div
    :class="['seg', { 'seg--compact': compact }]"
    role="radiogroup"
    :aria-label="label"
    @keydown="move($event, options)"
  >
    <button
      v-for="(option, index) in options"
      :key="option.value"
      type="button"
      role="radio"
      :aria-checked="model === option.value"
      :tabindex="
        model === option.value || (index === 0 && !options.some((item) => item.value === model))
          ? 0
          : -1
      "
      :title="option.hint"
      @click="model = option.value"
    >
      <Icon v-if="option.icon" :name="option.icon" :size="16" />
      <span class="seg__label">{{ option.label }}</span>
    </button>
  </div>
</template>
