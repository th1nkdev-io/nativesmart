<script setup lang="ts">
import type { ComponentContract } from "@nativesmart/contracts";
import { computed } from "vue";
import { state } from "../state";
import { technologies, type Technology } from "../technologies";

const props = defineProps<{ contract: ComponentContract; technology: Technology }>();

const priorities: Record<string, string> = {
  P0: "Indispensable : fait partie de la version 1.0",
  P1: "Nécessaire pour un vrai produit",
  P2: "À la demande, ou livré avec un kit métier"
};

const specified = computed(() => props.contract.status !== "draft");
const elsewhere = computed(() =>
  technologies.filter(
    (item) => item.id !== props.technology.id && item.implemented.has(props.contract.id)
  )
);

const steps = computed(() => [
  {
    done: true,
    label: "Inventorié",
    detail: `Catégorie et priorité ${props.contract.priority} fixées.`
  },
  {
    done: specified.value,
    label: "Contrat spécifié",
    detail: specified.value
      ? `${props.contract.properties.length} propriétés, ${props.contract.states.length} états, ${props.contract.events.length} événements.`
      : "Propriétés, états et accessibilité restent à écrire."
  },
  {
    done: false,
    label: `Implémenté en ${props.technology.name}`,
    detail: specified.value
      ? "Prêt à être codé : le contrat est complet."
      : "Possible une fois le contrat spécifié."
  },
  {
    done: false,
    label: "Testé dans le Lab",
    detail: "Playground, variations et accessibilité vérifiés."
  }
]);
</script>

<template>
  <div class="coming-soon">
    <div class="coming-soon__art" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
    <h2 class="coming-soon__title">
      {{ contract.name }} n'est pas encore disponible en {{ technology.name }}
    </h2>
    <p class="coming-soon__lead">
      {{ priorities[contract.priority] }}. L'aperçu apparaîtra ici dès que le composant sera
      implémenté.
    </p>

    <ol class="coming-soon__steps">
      <li v-for="step in steps" :key="step.label" :class="{ 'is-done': step.done }">
        <span class="coming-soon__check" aria-hidden="true">
          <svg v-if="step.done" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>
        </span>
        <span>
          <strong>{{ step.label }}</strong>
          <small>{{ step.detail }}</small>
        </span>
        <span class="sr-only">{{ step.done ? "fait" : "à faire" }}</span>
      </li>
    </ol>

    <p v-if="elsewhere.length" class="coming-soon__elsewhere">
      Déjà codé en {{ elsewhere.map((item) => item.name).join(", ") }}.
    </p>

    <button type="button" class="secondary-button" @click="state.tab = 'contract'">
      {{ specified ? "Lire le contrat" : "Voir le contrat réservé" }}
    </button>
  </div>
</template>
