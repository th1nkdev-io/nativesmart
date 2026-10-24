<script setup lang="ts">
import { NsIcon, NsInput } from "@nativesmart/vue";

defineOptions({ inheritAttrs: false });
</script>

<template>
  <NsInput
    class="demo-input"
    description="Frais : 0 FCFA · arrivée immédiate"
    error="Le montant dépasse votre solde disponible."
    v-bind="$attrs"
  >
    <template #leading><NsIcon name="wallet" size="sm" /></template>
  </NsInput>
</template>

<style>
.demo-input {
  inline-size: 320px;
  max-inline-size: 100%;
}
</style>
