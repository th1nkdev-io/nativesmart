<script setup lang="ts">
import { NsText, type NsTextRole } from "@nativesmart/vue";
import { computed, useAttrs } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

const samples: Record<NsTextRole, string> = {
  display: "Envoyez sans frontières",
  heading: "Vos dernières transactions",
  lead: "Kofi, Aïcha et Moussa reçoivent leur argent en quelques secondes, partout en Afrique de l'Ouest.",
  body: "Votre transfert de 25 000 FCFA est arrivé. Aïcha Diallo a été prévenue par SMS et peut retirer l'argent dans n'importe quelle agence partenaire, sans frais supplémentaires.",
  label: "Montant à envoyer",
  caption: "Mis à jour il y a 2 minutes",
  overline: "Transferts",
  quote: "« Mon argent est arrivé avant même que j'aie raccroché. » — Awa Koné"
};

const role = computed(() => (attrs.role as NsTextRole | undefined) ?? "body");
const text = computed(() => samples[role.value] ?? samples.body);

/* The specimen: every role at once, the current one highlighted. */
const scale: NsTextRole[] = [
  "overline",
  "display",
  "heading",
  "lead",
  "body",
  "label",
  "caption",
  "quote"
];
const short: Record<NsTextRole, string> = {
  overline: "Transferts",
  display: "Envoyez",
  heading: "Transactions",
  lead: "En quelques secondes.",
  body: "Votre transfert est arrivé.",
  label: "Montant à envoyer",
  caption: "Il y a 2 minutes",
  quote: "« Déjà arrivé ! »"
};

/* Expanding needs a clamp to open. */
const tileAttrs = computed(() =>
  attrs.expandable && attrs.lines === undefined ? { ...attrs, lines: 3 } : attrs
);
</script>

<template>
  <div v-if="variation" class="demo-text-tile">
    <NsText v-bind="tileAttrs">{{ text }}</NsText>
  </div>

  <div v-else class="demo-text">
    <article class="demo-text__page">
      <NsText v-bind="attrs">{{ text }}</NsText>
    </article>

    <aside class="demo-text__scale" aria-label="Échelle des rôles">
      <small>Échelle</small>
      <ul>
        <li v-for="item in scale" :key="item" :class="{ 'is-current': item === role }">
          <b>{{ item }}</b>
          <NsText :role="item" :level="3" truncate>{{ short[item] }}</NsText>
        </li>
      </ul>
    </aside>
  </div>
</template>

<style>
.demo-text {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--ns-space-5);
  align-items: start;
  inline-size: 780px;
  max-inline-size: 100%;
}

.demo-text__page {
  padding: var(--ns-space-6);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface);
  box-shadow: var(--ns-elevation-card);
}

.demo-text__scale {
  display: grid;
  gap: var(--ns-space-2);
  padding: var(--ns-space-4);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface-sunken);
}

.demo-text__scale > small {
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
  font-weight: var(--ns-font-weight-semibold);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.demo-text__scale ul {
  display: grid;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.demo-text__scale li {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: var(--ns-space-3);
  align-items: baseline;
  padding: var(--ns-space-1-5) var(--ns-space-2);
  border-radius: var(--ns-radius-md);
}

.demo-text__scale li.is-current {
  background: var(--ns-color-primary-muted);
  box-shadow: inset 2px 0 0 var(--ns-color-primary);
}

.demo-text__scale li b {
  color: var(--ns-color-text-subtle);
  font-family: var(--ns-font-mono);
  font-size: 10px;
  font-weight: var(--ns-font-weight-medium);
}

.demo-text__scale li .ns-text--quote {
  padding-inline-start: var(--ns-space-2);
}

.demo-text-tile {
  inline-size: 100%;
}

@media (max-width: 640px) {
  .demo-text {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
