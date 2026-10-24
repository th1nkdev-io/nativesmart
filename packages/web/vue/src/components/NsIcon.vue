<script setup lang="ts">
import { computed } from "vue";
import { iconPath } from "../icons";

export type NsIconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface NsIconProps {
  /** Icon identifier from the built-in set or one added with `registerIcons`. */
  name: string;
  /** Meaning when the icon is not decorative. Without it the icon is hidden from assistive tech. */
  label?: string;
  size?: NsIconSize;
}

const props = withDefaults(defineProps<NsIconProps>(), { size: "md" });

const path = computed(() => iconPath(props.name));
/** Arrows and chevrons that point sideways flip in right-to-left layouts. */
const directional = computed(() => /^(arrow|chevron)-(left|right)$/.test(props.name));
</script>

<template>
  <svg
    :class="['ns-icon', `ns-icon--${size}`, { 'ns-icon--missing': !path }]"
    viewBox="0 0 24 24"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
    :data-directional="directional || undefined"
    focusable="false"
  >
    <path v-if="path" :d="path" />
    <rect v-else x="4" y="4" width="16" height="16" rx="3" stroke-dasharray="3 3" />
  </svg>
</template>

<style>
.ns-icon {
  --ns-icon-size: var(--ns-icon-size-md);
  --ns-icon-color: currentColor;
  --ns-icon-stroke: var(--ns-icon-stroke-regular);
  display: inline-block;
  flex: none;
  inline-size: var(--ns-icon-size);
  block-size: var(--ns-icon-size);
  fill: none;
  stroke: var(--ns-icon-color);
  stroke-width: var(--ns-icon-stroke);
  stroke-linecap: round;
  stroke-linejoin: round;
  vertical-align: middle;
}

.ns-icon--xs {
  --ns-icon-size: var(--ns-icon-size-xs);
}

.ns-icon--sm {
  --ns-icon-size: var(--ns-icon-size-sm);
}

.ns-icon--lg {
  --ns-icon-size: var(--ns-icon-size-lg);
}

.ns-icon--xl {
  --ns-icon-size: var(--ns-icon-size-xl);
  --ns-icon-stroke: var(--ns-icon-stroke-thin);
}

.ns-icon--missing {
  opacity: var(--ns-opacity-muted);
}

/* Icons mirror in right-to-left layouts only when they point somewhere. */
[dir="rtl"] .ns-icon[data-directional] {
  transform: scaleX(-1);
}
</style>
