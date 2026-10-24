<script setup lang="ts">
import { NsBadge, NsButton, NsCard } from "@nativesmart/vue";

defineOptions({ inheritAttrs: false });
</script>

<template>
  <NsCard
    class="demo-card"
    title="Compte principal"
    description="Solde disponible au 24 octobre"
    v-bind="$attrs"
  >
    <p class="demo-card__amount">1 250 000 <small>FCFA</small></p>
    <NsBadge label="+ 12 % ce mois" intent="success" />
    <template #footer>
      <NsButton label="Relevé" variant="ghost" intent="neutral" size="sm" />
      <NsButton label="Envoyer" size="sm" />
    </template>
  </NsCard>
</template>

<style>
.demo-card {
  inline-size: 320px;
  max-inline-size: 100%;
}

.demo-card__amount {
  margin: 0 0 var(--ns-space-2);
  font-size: var(--ns-text-title-lg-size);
  font-weight: var(--ns-font-weight-bold);
  letter-spacing: -0.01em;
}

.demo-card__amount small {
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-body-sm-size);
  font-weight: var(--ns-font-weight-medium);
}
</style>
