<script setup lang="ts">
import { NsList, type NsListItem } from "@nativesmart/vue";
import { computed, useAttrs } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

/* Steps read better with a line of detail under each title. */
const details: Record<string, string> = {
  "Créez votre compte": "Un numéro de téléphone suffit.",
  "Ajoutez un bénéficiaire": "Kofi, Aïcha ou Moussa, en un geste.",
  "Envoyez en un geste": "L'argent arrive en quelques secondes."
};

const columnsItems = [
  "Mobile Money",
  "Carte bancaire",
  "Virement",
  "Agence partenaire",
  "Portefeuille",
  "Code marchand"
];

const items = computed<NsListItem[]>(() => {
  if (variation?.group === "columns") return columnsItems;
  const list = (attrs.items as string[] | undefined) ?? Object.keys(details);
  if (attrs.marker !== "steps" || variation) return list;
  return list.map((title) => ({ title, description: details[title] }));
});
</script>

<template>
  <div v-if="variation" class="demo-list-tile">
    <NsList v-bind="attrs" :items="items" />
  </div>

  <article v-else class="demo-list">
    <header>
      <small>Guide</small>
      <strong>Comment envoyer de l'argent</strong>
    </header>
    <NsList v-bind="attrs" :items="items" />
  </article>
</template>

<style>
.demo-list {
  display: grid;
  gap: var(--ns-space-4);
  inline-size: 460px;
  max-inline-size: 100%;
  padding: var(--ns-space-6);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface);
  box-shadow: var(--ns-elevation-card);
  color: var(--ns-color-text);
}

.demo-list header {
  display: grid;
  gap: 2px;
}

.demo-list header small {
  color: var(--ns-color-primary-text);
  font-size: var(--ns-text-overline-size);
  font-weight: var(--ns-font-weight-semibold);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.demo-list header strong {
  font-size: var(--ns-text-title-sm-size);
}

.demo-list-tile {
  inline-size: 100%;
}
</style>
