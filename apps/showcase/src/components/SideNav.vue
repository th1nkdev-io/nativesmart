<script setup lang="ts">
import { componentContracts, type ComponentContract } from "@nativesmart/contracts";
import { computed, ref } from "vue";
import { openPage, state } from "../state";
import { getTechnology } from "../technologies";

type Filter = "implemented" | "specified" | "all";

const query = ref("");
const filter = ref<Filter>("implemented");
const technology = computed(() => getTechnology(state.tech));

const categoryNames: Record<string, string> = {
  layout: "Layout",
  typography: "Typographie",
  actions: "Actions",
  forms: "Formulaires",
  feedback: "Feedback",
  overlays: "Overlays",
  navigation: "Navigation",
  "data-display": "Affichage de données",
  media: "Médias",
  utilities: "Utilitaires",
  identity: "Identité",
  payments: "Paiements",
  connectivity: "Connectivité",
  commerce: "Commerce",
  delivery: "Livraison",
  saas: "SaaS",
  "public-services": "Services publics"
};

function statusOf(contract: ComponentContract) {
  if (technology.value.implemented.has(contract.id)) return "implemented";
  return contract.status === "draft" ? "draft" : "specified";
}

const groups = computed(() => {
  const search = query.value.trim().toLowerCase();
  const visible = componentContracts.filter((contract) => {
    const status = statusOf(contract);
    if (filter.value === "implemented" && status !== "implemented") return false;
    if (filter.value === "specified" && status === "draft") return false;
    return !search || `${contract.name} ${contract.id}`.toLowerCase().includes(search);
  });
  const byCategory = new Map<string, ComponentContract[]>();
  for (const contract of visible) {
    const key = `${contract.layer}:${contract.category}`;
    byCategory.set(key, [...(byCategory.get(key) ?? []), contract]);
  }
  return [...byCategory.entries()].map(([key, items]) => {
    const [layer, category] = key.split(":");
    return {
      key,
      title: `${layer === "business" ? "Métier · " : ""}${categoryNames[category] ?? category}`,
      items: [...items].sort((a, b) => a.name.localeCompare(b.name))
    };
  });
});

const count = computed(() => groups.value.reduce((total, group) => total + group.items.length, 0));
</script>

<template>
  <nav class="sidenav" aria-label="Composants">
    <div class="sidenav__links">
      <a
        href="#/"
        :aria-current="state.page === '' ? 'page' : undefined"
        @click.prevent="openPage('')"
      >
        Accueil
      </a>
      <a
        href="#/tokens"
        :aria-current="state.page === 'tokens' ? 'page' : undefined"
        @click.prevent="openPage('tokens')"
      >
        Tokens
      </a>
    </div>

    <input v-model="query" class="sidenav__search" type="search" placeholder="Rechercher…" />
    <div class="segmented segmented--full" role="group" aria-label="Filtre">
      <button
        type="button"
        :aria-pressed="filter === 'implemented'"
        @click="filter = 'implemented'"
      >
        {{ technology.name }}
      </button>
      <button type="button" :aria-pressed="filter === 'specified'" @click="filter = 'specified'">
        Spécifiés
      </button>
      <button type="button" :aria-pressed="filter === 'all'" @click="filter = 'all'">Tous</button>
    </div>
    <p class="sidenav__count">{{ count }} composant{{ count > 1 ? "s" : "" }}</p>

    <section v-for="group in groups" :key="group.key" class="sidenav__group">
      <h2>{{ group.title }}</h2>
      <a
        v-for="contract in group.items"
        :key="contract.id"
        :href="`#/${contract.id}`"
        :aria-current="state.page === contract.id ? 'page' : undefined"
        @click.prevent="openPage(contract.id)"
      >
        <span :class="['dot', `dot--${statusOf(contract)}`]" />
        {{ contract.name }}
      </a>
    </section>
    <p v-if="count === 0" class="sidenav__empty">Aucun composant pour ce filtre.</p>
  </nav>
</template>
