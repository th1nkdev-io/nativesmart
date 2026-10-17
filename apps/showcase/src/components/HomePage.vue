<script setup lang="ts">
import { componentContracts } from "@nativesmart/contracts";
import { brandThemes } from "@nativesmart/tokens";
import { computed } from "vue";
import { openPage, state } from "../state";
import { getTechnology, technologies } from "../technologies";

const technology = computed(() => getTechnology(state.tech));
const specified = componentContracts.filter((contract) => contract.status !== "draft").length;
const implemented = computed(
  () =>
    componentContracts.filter((contract) => technology.value.implemented.has(contract.id)).length
);
const available = technologies.filter((tech) => tech.url !== null).length;
const availableLabel = `${available} disponible${available > 1 ? "s" : ""} aujourd'hui`;

const stats = computed(() => [
  { value: componentContracts.length, label: "composants inventoriés" },
  { value: specified, label: "contrats spécifiés" },
  { value: implemented.value, label: `implémentés en ${technology.value.name}` },
  { value: Object.keys(brandThemes).length, label: "identités visuelles" }
]);

const firstImplemented = computed(
  () => componentContracts.find((contract) => technology.value.implemented.has(contract.id))?.id
);
</script>

<template>
  <article class="page home">
    <header class="page__header">
      <p class="eyebrow">Nativesmart · Th1nkdev</p>
      <h1>Le laboratoire des composants</h1>
      <p class="lead">
        Testez chaque composant en direct : changez de technologie, d'identité visuelle, de mode
        clair ou sombre, de sens d'écriture et de largeur d'écran. Tout est généré depuis les
        contrats, les tokens et le registre des plateformes.
      </p>
      <p class="chips">
        <button
          v-if="firstImplemented"
          type="button"
          class="primary-button"
          @click="openPage(firstImplemented)"
        >
          Ouvrir le premier composant
        </button>
        <button type="button" class="secondary-button" @click="openPage('tokens')">
          Voir les tokens
        </button>
      </p>
    </header>

    <div class="stats">
      <div v-for="stat in stats" :key="stat.label" class="stat">
        <strong>{{ stat.value }}</strong>
        <span>{{ stat.label }}</span>
      </div>
    </div>

    <section class="card">
      <h2>Comment ça marche</h2>
      <ol>
        <li>
          <strong>Contrat</strong> : chaque composant décrit ses propriétés, états, événements et
          règles d'accessibilité, sans dépendre d'une technologie.
        </li>
        <li>
          <strong>Tokens</strong> : les couleurs, espacements et polices viennent de l'identité
          visuelle choisie, en clair et en sombre.
        </li>
        <li>
          <strong>Renderer</strong> : chaque technologie implémente le contrat. Le même aperçu est
          affiché pour toutes ({{ availableLabel }}).
        </li>
      </ol>
      <p class="muted">
        Dans la liste, un point plein signale un composant implémenté dans la technologie choisie,
        un point vide un contrat spécifié, un point pâle un contrat seulement réservé.
      </p>
    </section>
  </article>
</template>
