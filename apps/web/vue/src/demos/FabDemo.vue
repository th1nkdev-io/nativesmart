<script setup lang="ts">
import { NsFab, type NsFabPosition } from "@nativesmart/vue";
import { computed, ref, useAttrs, watch } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

const actions = [
  { key: "send", label: "Envoyer", icon: "send" },
  { key: "request", label: "Demander", icon: "download" },
  { key: "contact", label: "Nouveau contact", icon: "user" }
];

/* Inside the phone the button floats in the screen, not in the Lab window. */
const fabAttrs = computed(() => ({
  ...attrs,
  label: String(attrs.label ?? "Nouveau transfert"),
  position: (attrs.position === "static" ? "static" : "absolute") as NsFabPosition
}));

/* The panel sets whether the menu starts open; the button then opens and closes it. */
const open = ref(Boolean(attrs.open));
watch(
  () => attrs.open,
  (value) => (open.value = Boolean(value))
);

const chosen = ref<string>();
const rows = [
  { who: "Aïcha Diallo", what: "Reçu", amount: "+25 000" },
  { who: "Moussa Traoré", what: "Envoyé", amount: "−8 500" },
  { who: "Awa Koné", what: "Reçu", amount: "+12 000" },
  { who: "Yao Kouassi", what: "Envoyé", amount: "−4 000" },
  { who: "Fatou Ndiaye", what: "Reçu", amount: "+30 000" }
];
</script>

<template>
  <div v-if="variation" class="demo-fab-tile">
    <span v-for="row in rows.slice(0, 3)" :key="row.who" class="demo-fab__line" />
    <NsFab v-bind="fabAttrs" v-model:open="open" :actions="actions" size="sm" />
  </div>

  <div v-else class="demo-fab">
    <div class="demo-fab__phone">
      <header>
        <small>Solde</small>
        <strong>125 000 FCFA</strong>
      </header>
      <ul>
        <li v-for="row in rows" :key="row.who">
          <span class="demo-fab__avatar">{{ row.who.slice(0, 1) }}</span>
          <span>
            <b>{{ row.who }}</b>
            <small>{{ row.what }}</small>
          </span>
          <em :class="{ 'is-in': row.amount.startsWith('+') }">{{ row.amount }}</em>
        </li>
      </ul>
      <NsFab
        v-bind="fabAttrs"
        v-model:open="open"
        :actions="actions"
        @action="(key) => (chosen = key)"
      />
    </div>
    <p class="demo-fab__note">
      {{
        chosen
          ? `Action choisie : ${actions.find((action) => action.key === chosen)?.label}`
          : "Ouvrez le bouton : Échap ferme, les flèches parcourent les actions."
      }}
    </p>
  </div>
</template>

<style>
.demo-fab {
  display: grid;
  justify-items: center;
  gap: var(--ns-space-3);
}

.demo-fab__phone {
  position: relative;
  overflow: hidden;
  inline-size: 320px;
  block-size: 520px;
  max-inline-size: 100%;
  border: 8px solid var(--ns-color-surface-inverse);
  border-radius: 36px;
  background: var(--ns-color-background);
  color: var(--ns-color-text);
  font-size: var(--ns-text-body-sm-size);
}

.demo-fab__phone header {
  display: grid;
  padding: var(--ns-space-8) var(--ns-space-5) var(--ns-space-5);
  background: var(--ns-color-surface-brand);
  color: var(--ns-color-text-on-brand);
}

.demo-fab__phone header small {
  opacity: 0.8;
}

.demo-fab__phone header strong {
  font-size: var(--ns-text-title-md-size);
}

.demo-fab__phone ul {
  display: grid;
  margin: 0;
  padding: var(--ns-space-2) var(--ns-space-3);
  list-style: none;
}

.demo-fab__phone li {
  display: flex;
  align-items: center;
  gap: var(--ns-space-3);
  padding: var(--ns-space-2-5) var(--ns-space-2);
  border-block-end: 1px solid var(--ns-color-border-subtle);
}

.demo-fab__phone li > span:nth-child(2) {
  display: grid;
  flex: 1;
}

.demo-fab__phone li small {
  color: var(--ns-color-text-muted);
}

.demo-fab__phone li em {
  font-style: normal;
  font-variant-numeric: tabular-nums;
  font-weight: var(--ns-font-weight-semibold);
}

.demo-fab__phone li em.is-in {
  color: var(--ns-color-success-text);
}

.demo-fab__avatar {
  display: grid;
  place-items: center;
  inline-size: 32px;
  block-size: 32px;
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-primary-muted);
  color: var(--ns-color-on-primary-muted);
  font-weight: var(--ns-font-weight-semibold);
}

.demo-fab__note {
  margin: 0;
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
}

/* Tiles: a small screen, the button in its corner. */
.demo-fab-tile {
  position: relative;
  display: grid;
  align-content: start;
  gap: var(--ns-space-2);
  inline-size: 100%;
  block-size: 220px;
  padding: var(--ns-space-3);
  box-sizing: border-box;
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-lg);
  background: var(--ns-color-surface);
}

.demo-fab-tile .ns-fab {
  --ns-fab-offset: var(--ns-space-3);
}

.demo-fab__line {
  block-size: 10px;
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-surface-muted);
}

.demo-fab__line:nth-child(2) {
  inline-size: 70%;
}
</style>
