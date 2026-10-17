<script setup lang="ts">
export type NsBadgeIntent = "neutral" | "info" | "success" | "warning" | "danger";

export interface NsBadgeProps {
  /** Badge content. A default slot replaces it visually. */
  label: string;
  intent?: NsBadgeIntent;
}

withDefaults(defineProps<NsBadgeProps>(), { intent: "neutral" });
</script>

<template>
  <span :class="['ns-badge', `ns-badge--${intent}`]">
    <slot>{{ label }}</slot>
  </span>
</template>

<style>
.ns-badge {
  --ns-badge-background: var(--ns-color-surface-muted);
  --ns-badge-foreground: var(--ns-color-text);
  --ns-badge-radius: var(--ns-radius-full);
  display: inline-flex;
  align-items: center;
  gap: var(--ns-space-1);
  padding: 2px var(--ns-space-2);
  border-radius: var(--ns-badge-radius);
  background: var(--ns-badge-background);
  color: var(--ns-badge-foreground);
  font-family: var(--ns-font-sans);
  font-size: var(--ns-font-size-xs);
  font-weight: var(--ns-font-weight-medium);
  line-height: var(--ns-line-height-xs);
  white-space: nowrap;
}

.ns-badge--info {
  --ns-badge-background: var(--ns-color-info-muted);
  --ns-badge-foreground: var(--ns-color-info);
}

.ns-badge--success {
  --ns-badge-background: var(--ns-color-success-muted);
  --ns-badge-foreground: var(--ns-color-success);
}

.ns-badge--warning {
  --ns-badge-background: var(--ns-color-warning-muted);
  --ns-badge-foreground: var(--ns-color-warning);
}

.ns-badge--danger {
  --ns-badge-background: var(--ns-color-danger-muted);
  --ns-badge-foreground: var(--ns-color-danger);
}
</style>
