<script setup lang="ts">
export type NsBoxSpace = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12";
export type NsBoxBackground =
  | "none"
  | "background"
  | "surface"
  | "surface-muted"
  | "surface-raised"
  | "surface-sunken"
  | "surface-brand"
  | "surface-inverse";
export type NsBoxRadius = "none" | "sm" | "md" | "lg" | "xl" | "card" | "control" | "full";

export interface NsBoxProps {
  /** Rendered element: `section`, `article`, `li`… */
  as?: string;
  /** Inner spacing, a step of the spacing scale. */
  padding?: NsBoxSpace;
  background?: NsBoxBackground;
  radius?: NsBoxRadius;
  border?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<NsBoxProps>(), {
  as: "div",
  padding: "0",
  background: "none",
  radius: "none",
  border: false,
  disabled: false
});
</script>

<template>
  <component
    :is="as"
    :class="['ns-box', { 'ns-box--border': border, 'ns-box--disabled': disabled }]"
    :style="{
      '--ns-box-padding': `var(--ns-space-${padding})`,
      '--ns-box-background':
        background === 'none' ? 'transparent' : `var(--ns-color-${background})`,
      '--ns-box-radius': `var(--ns-radius-${radius})`
    }"
    :aria-disabled="disabled || undefined"
  >
    <slot />
  </component>
</template>

<style>
.ns-box {
  box-sizing: border-box;
  padding: var(--ns-box-padding);
  border-radius: var(--ns-box-radius);
  background: var(--ns-box-background);
  color: inherit;
}

.ns-box--border {
  border: 1px solid var(--ns-color-border);
}

.ns-box--disabled {
  opacity: var(--ns-opacity-disabled);
  pointer-events: none;
}
</style>
