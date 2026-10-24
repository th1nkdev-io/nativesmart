<script setup lang="ts">
import { NsText, type NsTextRole } from "@nativesmart/vue";
import { computed, useAttrs } from "vue";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const samples: Record<NsTextRole, string> = {
  display: "Envoyez sans frontières",
  heading: "Vos dernières transactions",
  body: "Votre transfert de 25 000 FCFA est arrivé. Le bénéficiaire a été prévenu par SMS.",
  label: "Montant à envoyer",
  caption: "Mis à jour il y a 2 minutes"
};
const text = computed(() => samples[(attrs.role as NsTextRole) ?? "body"] ?? samples.body);
</script>

<template>
  <NsText class="demo-text" v-bind="$attrs">{{ text }}</NsText>
</template>

<style>
.demo-text {
  max-inline-size: 420px;
}
</style>
