<script setup lang="ts">
import { NsBadge, NsBox, NsText } from "@nativesmart/vue";

defineOptions({ inheritAttrs: false });
</script>

<template>
  <NsBox padding="6" background="surface-muted" radius="lg" border class="demo-box" v-bind="$attrs">
    <NsText role="label">Box</NsText>
    <NsText tone="muted">Espacement, fond, rayon et bordure viennent des tokens.</NsText>
    <NsBadge label="padding 6" intent="info" />
  </NsBox>
</template>

<style>
.demo-box {
  display: grid;
  justify-items: start;
  gap: var(--ns-space-2);
  inline-size: 320px;
  max-inline-size: 100%;
}
</style>
