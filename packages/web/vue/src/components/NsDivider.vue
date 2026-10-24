<script setup lang="ts">
export type NsDividerOrientation = "horizontal" | "vertical";

export interface NsDividerProps {
  orientation?: NsDividerOrientation;
  /** Short text centred on a horizontal divider, such as « ou ». */
  label?: string;
  /** Purely visual: hidden from assistive tech. */
  decorative?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<NsDividerProps>(), {
  orientation: "horizontal",
  decorative: false,
  disabled: false
});
</script>

<template>
  <div
    :class="[
      'ns-divider',
      `ns-divider--${orientation}`,
      {
        'ns-divider--labelled': label && orientation === 'horizontal',
        'ns-divider--disabled': disabled
      }
    ]"
    :role="decorative ? 'none' : 'separator'"
    :aria-orientation="decorative ? undefined : orientation"
  >
    <span v-if="label && orientation === 'horizontal'" class="ns-divider__label">{{ label }}</span>
  </div>
</template>

<style>
.ns-divider {
  --ns-divider-color: var(--ns-color-border);
  --ns-divider-width: 1px;
  flex: none;
  align-self: stretch;
  border: 0;
  margin: 0;
}

.ns-divider--horizontal {
  inline-size: 100%;
  block-size: var(--ns-divider-width);
  background: var(--ns-divider-color);
}

.ns-divider--vertical {
  inline-size: var(--ns-divider-width);
  min-block-size: 1em;
  background: var(--ns-divider-color);
}

.ns-divider--labelled {
  display: flex;
  align-items: center;
  gap: var(--ns-space-3);
  block-size: auto;
  background: none;
  color: var(--ns-color-text-muted);
  font-family: var(--ns-font-sans);
  font-size: var(--ns-text-caption-size);
  line-height: var(--ns-text-caption-line-height);
}

.ns-divider--labelled::before,
.ns-divider--labelled::after {
  content: "";
  flex: 1;
  block-size: var(--ns-divider-width);
  background: var(--ns-divider-color);
}

.ns-divider--disabled {
  --ns-divider-color: var(--ns-color-border-disabled);
}
</style>
