<script setup lang="ts">
import { componentContracts, type ComponentContract } from "@nativesmart/contracts";
import { computed, ref } from "vue";
import { categoryNames } from "../labels";
import { openPage, state } from "../state";
import { getTechnology } from "../technologies";

type Status = "available" | "specified" | "planned";
type Filter = Status | "all";

const query = ref("");
const filter = ref<Filter>("available");
const technology = computed(() => getTechnology(state.tech));

function statusOf(contract: ComponentContract): Status {
  if (technology.value.implemented.has(contract.id)) return "available";
  return contract.status === "draft" ? "planned" : "specified";
}

const counts = computed(() => {
  const result = { available: 0, specified: 0, planned: 0, all: componentContracts.length };
  for (const contract of componentContracts) result[statusOf(contract)] += 1;
  return result;
});

const filters = computed(() => [
  {
    value: "available" as const,
    label: `Disponibles en ${technology.value.name}`,
    hint: "Codés et testables dans le Lab"
  },
  { value: "specified" as const, label: "Contrat prêt", hint: "Spécifiés, pas encore codés" },
  { value: "planned" as const, label: "Prévus", hint: "Réservés, contrat à écrire" },
  { value: "all" as const, label: "Tous", hint: "L'inventaire complet" }
]);

const groups = computed(() => {
  const search = query.value.trim().toLowerCase();
  const visible = componentContracts.filter((contract) => {
    if (filter.value !== "all" && statusOf(contract) !== filter.value) return false;
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

const visibleCount = computed(() =>
  groups.value.reduce((total, group) => total + group.items.length, 0)
);
</script>

<template>
  <nav class="sidenav" aria-label="Navigation">
    <div class="sidenav__links">
      <a
        href="#/"
        :aria-current="state.page === '' ? 'page' : undefined"
        @click.prevent="openPage('')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z" />
        </svg>
        Accueil
      </a>
      <a
        href="#/tokens"
        :aria-current="state.page.startsWith('tokens') ? 'page' : undefined"
        @click.prevent="openPage('tokens')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="13.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="10.5" r="2.5" />
          <circle cx="8.5" cy="7.5" r="2.5" />
          <circle cx="6.5" cy="12.5" r="2.5" />
          <path
            d="M12 2a10 10 0 0 0 0 20 2 2 0 0 0 2-2v-1a2 2 0 0 1 2-2h2a4 4 0 0 0 4-4 10 10 0 0 0-10-11Z"
          />
        </svg>
        Tokens
      </a>
    </div>

    <h2 class="sidenav__heading">Composants</h2>
    <input
      v-model="query"
      class="sidenav__search"
      type="search"
      placeholder="Rechercher un composant…"
      aria-label="Rechercher un composant"
    />

    <div class="status-filter" role="radiogroup" aria-label="Statut">
      <button
        v-for="item in filters"
        :key="item.value"
        type="button"
        role="radio"
        :aria-checked="filter === item.value"
        :title="item.hint"
        @click="filter = item.value"
      >
        <span :class="['dot', `dot--${item.value}`]" aria-hidden="true" />
        <span class="status-filter__label">{{ item.label }}</span>
        <span class="status-filter__count">{{ counts[item.value] }}</span>
      </button>
    </div>

    <section v-for="group in groups" :key="group.key" class="sidenav__group">
      <h3>{{ group.title }}</h3>
      <a
        v-for="contract in group.items"
        :key="contract.id"
        :href="`#/${contract.id}`"
        :aria-current="state.page === contract.id ? 'page' : undefined"
        @click.prevent="openPage(contract.id)"
      >
        <span :class="['dot', `dot--${statusOf(contract)}`]" aria-hidden="true" />
        {{ contract.name }}
      </a>
    </section>
    <p v-if="visibleCount === 0" class="sidenav__empty">
      Aucun composant ne correspond à cette recherche.
    </p>
  </nav>
</template>
