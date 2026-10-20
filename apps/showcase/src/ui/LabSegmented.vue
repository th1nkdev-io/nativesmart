<script setup lang="ts" generic="T extends string">
export type LabSegment<V extends string = string> = { value: V; label: string };

const props = defineProps<{ options: readonly LabSegment<T>[]; label: string }>();
const model = defineModel<T | undefined>();

function onKeydown(event: KeyboardEvent, index: number) {
  const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
  if (!step) return;
  event.preventDefault();
  const next = (index + step + props.options.length) % props.options.length;
  model.value = props.options[next].value;
  const group = (event.currentTarget as HTMLElement).parentElement;
  group?.querySelectorAll<HTMLElement>("[role=radio]")[next]?.focus();
}
</script>

<template>
  <div class="lab-segmented" role="radiogroup" :aria-label="label">
    <button
      v-for="(option, index) in options"
      :key="option.value"
      type="button"
      role="radio"
      :aria-checked="option.value === model"
      :tabindex="option.value === model || (model === undefined && index === 0) ? 0 : -1"
      @click="model = option.value"
      @keydown="onKeydown($event, index)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
