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
  --ns-badge-background: var(--ns-color-neutral-muted);
  --ns-badge-foreground: var(--ns-color-on-neutral-muted);
  --ns-badge-radius: var(--ns-radius-badge);
  display: inline-flex;
  align-items: center;
  gap: var(--ns-space-1);
  padding: 2px var(--ns-space-2);
  border-radius: var(--ns-badge-radius);
  background: var(--ns-badge-background);
  color: var(--ns-badge-foreground);
  font-family: var(--ns-font-sans);
  font-size: var(--ns-text-label-sm-size);
  font-weight: var(--ns-text-label-sm-weight);
  line-height: var(--ns-text-label-sm-line-height);
  letter-spacing: var(--ns-text-label-sm-tracking);
  white-space: nowrap;
}

.ns-badge--info {
  --ns-badge-background: var(--ns-color-info-muted);
  --ns-badge-foreground: var(--ns-color-on-info-muted);
}

.ns-badge--success {
  --ns-badge-background: var(--ns-color-success-muted);
  --ns-badge-foreground: var(--ns-color-on-success-muted);
}

.ns-badge--warning {
  --ns-badge-background: var(--ns-color-warning-muted);
  --ns-badge-foreground: var(--ns-color-on-warning-muted);
}

.ns-badge--danger {
  --ns-badge-background: var(--ns-color-danger-muted);
  --ns-badge-foreground: var(--ns-color-on-danger-muted);
}
</style>
