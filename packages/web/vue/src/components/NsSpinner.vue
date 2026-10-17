<script setup lang="ts">
export interface NsSpinnerProps {
  /** Accessible loading label. */
  label?: string;
}

withDefaults(defineProps<NsSpinnerProps>(), { label: "Loading" });
</script>

<template>
  <span class="ns-spinner" role="progressbar" :aria-label="label" aria-busy="true" />
</template>

<style>
.ns-spinner {
  --ns-spinner-size: 1.25em;
  --ns-spinner-color: currentColor;
  display: inline-block;
  flex: none;
  inline-size: var(--ns-spinner-size);
  block-size: var(--ns-spinner-size);
  border: 0.15em solid var(--ns-spinner-color);
  border-inline-end-color: transparent;
  border-radius: var(--ns-radius-full);
  animation: ns-spinner-rotate 0.8s linear infinite;
}

@keyframes ns-spinner-rotate {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ns-spinner {
    animation-duration: 2.4s;
  }
}
</style>
