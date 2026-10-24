<script setup lang="ts">
import { NsDivider } from "@nativesmart/vue";

defineOptions({ inheritAttrs: false });
</script>

<template>
  <div
    :class="[
      'demo-divider',
      { 'demo-divider--vertical': ($attrs.orientation as string) === 'vertical' }
    ]"
  >
    <span>Envoyer</span>
    <NsDivider v-bind="$attrs" />
    <span>Recevoir</span>
  </div>
</template>

<style>
.demo-divider {
  display: grid;
  gap: var(--ns-space-3);
  inline-size: 240px;
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-body-sm-size);
}

.demo-divider--vertical {
  display: flex;
  align-items: center;
  inline-size: auto;
  block-size: 24px;
}
</style>
