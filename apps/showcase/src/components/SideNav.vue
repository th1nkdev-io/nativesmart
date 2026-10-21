<script setup lang="ts">
import { componentContracts, type ComponentContract } from "@nativesmart/contracts";
import { computed, ref, watch } from "vue";
import { categoryNames } from "../labels";
import { navSections } from "../pages";
import { openPage, state } from "../state";
import { getTechnology } from "../technologies";

type Status = "available" | "specified" | "planned";

const query = ref("");
const filter = ref<Status | null>(null);
const collapsed = ref(new Set<string>());
const technology = computed(() => getTechnology(state.tech));

function statusOf(contract: ComponentContract): Status {
  if (technology.value.implemented.has(contract.id)) return "available";
  return contract.status === "draft" ? "planned" : "specified";
}

const counts = computed(() => {
  const result: Record<Status, number> = { available: 0, specified: 0, planned: 0 };
  for (const contract of componentContracts) result[statusOf(contract)] += 1;
  return result;
});

const legend = computed(() => [
  {
    value: "available" as const,
    label: "Disponibles",
    short: "disponibles",
    hint: `Codés en ${technology.value.name} et testables`
  },
  {
    value: "specified" as const,
    label: "Contrat prêt",
    short: "contrats",
    hint: "Spécifiés, pas encore codés"
  },
  {
    value: "planned" as const,
    label: "Prévus",
    short: "prévus",
    hint: "Réservés, contrat à écrire"
  }
]);

function groupKey(contract: ComponentContract) {
  return `${contract.layer}:${contract.category}`;
}

const groups = computed(() => {
  const search = query.value.trim().toLowerCase();
  const visible = componentContracts.filter((contract) => {
    if (filter.value && statusOf(contract) !== filter.value) return false;
    return !search || `${contract.name} ${contract.id}`.toLowerCase().includes(search);
  });
  const byCategory = new Map<string, ComponentContract[]>();
  for (const contract of visible) {
    byCategory.set(groupKey(contract), [...(byCategory.get(groupKey(contract)) ?? []), contract]);
  }
  return [...byCategory.entries()].map(([key, items]) => {
    const [layer, category] = key.split(":");
    const all = componentContracts.filter((contract) => groupKey(contract) === key);
    return {
      key,
      title: `${layer === "business" ? "Métier · " : ""}${categoryNames[category] ?? category}`,
      done: all.filter((contract) => statusOf(contract) === "available").length,
      total: all.length,
      items: [...items].sort((a, b) => a.name.localeCompare(b.name))
    };
  });
});

// Opening a component unfolds its category once; the user can fold it again afterwards.
watch(
  () => state.page,
  (page) => {
    const contract = componentContracts.find((item) => item.id === page);
    if (contract && collapsed.value.has(groupKey(contract))) {
      const next = new Set(collapsed.value);
      next.delete(groupKey(contract));
      collapsed.value = next;
    }
  },
  { immediate: true }
);

function isOpen(key: string) {
  return query.value.trim() !== "" || !collapsed.value.has(key);
}

function toggle(key: string) {
  const next = new Set(collapsed.value);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  collapsed.value = next;
}

function isCurrent(id: string) {
  return id === "tokens" ? state.page.startsWith("tokens") : state.page === id;
}

const visibleCount = computed(() =>
  groups.value.reduce((total, group) => total + group.items.length, 0)
);
</script>

<template>
  <nav class="sidenav" aria-label="Navigation">
    <section v-for="section in navSections" :key="section.id" class="sidenav__section">
      <h2 class="sidenav__heading">{{ section.label }}</h2>
      <a
        v-for="item in section.items"
        :key="item.id"
        :href="`#/${item.id}`"
        :aria-current="isCurrent(item.id) ? 'page' : undefined"
        @click.prevent="openPage(item.id)"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="item.icon" /></svg>
        <span>{{ item.label }}</span>
      </a>
    </section>

    <section class="sidenav__section sidenav__components">
      <div class="sidenav__tools">
        <h2 class="sidenav__heading">
          Composants <span class="sidenav__total">{{ componentContracts.length }}</span>
        </h2>

        <div
          class="coverage"
          role="img"
          :aria-label="`${counts.available} disponibles en ${technology.name}, ${counts.specified} contrats prêts, ${counts.planned} prévus`"
        >
          <span
            v-for="item in legend"
            :key="item.value"
            :class="['coverage__part', `coverage__part--${item.value}`]"
            :style="{ flexGrow: counts[item.value] }"
          />
        </div>

        <div class="filter-field">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            v-model="query"
            type="search"
            placeholder="Filtrer la liste"
            aria-label="Filtrer les composants"
          />
          <button
            v-if="query"
            type="button"
            class="filter-field__clear"
            aria-label="Effacer le filtre"
            @click="query = ''"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>

        <div class="status-legend" role="group" aria-label="Filtrer par statut">
          <button
            v-for="item in legend"
            :key="item.value"
            type="button"
            :aria-pressed="filter === item.value"
            :title="`${item.hint}. Cliquez pour ${filter === item.value ? 'tout afficher' : 'filtrer'}.`"
            @click="filter = filter === item.value ? null : item.value"
          >
            <span class="status-legend__count">
              <span :class="['dot', `dot--${item.value}`]" aria-hidden="true" />
              {{ counts[item.value] }}
            </span>
            <span class="status-legend__label">{{ item.short }}</span>
          </button>
        </div>
      </div>

      <div v-for="group in groups" :key="group.key" class="sidenav__group">
        <h3>
          <button
            type="button"
            class="sidenav__group-toggle"
            :aria-expanded="isOpen(group.key)"
            @click="toggle(group.key)"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
            <span class="sidenav__group-title">{{ group.title }}</span>
            <span
              :class="['sidenav__group-count', { 'is-started': group.done > 0 }]"
              :title="`${group.done} disponible(s) sur ${group.total}`"
            >
              {{ group.done }}/{{ group.total }}
            </span>
          </button>
        </h3>
        <div v-if="isOpen(group.key)" class="sidenav__items">
          <a
            v-for="contract in group.items"
            :key="contract.id"
            :href="`#/${contract.id}`"
            :aria-current="state.page === contract.id ? 'page' : undefined"
            @click.prevent="openPage(contract.id)"
          >
            <span :class="['dot', `dot--${statusOf(contract)}`]" aria-hidden="true" />
            <span class="sidenav__name" :title="contract.name">{{ contract.name }}</span>
          </a>
        </div>
      </div>
      <p v-if="visibleCount === 0" class="sidenav__empty">
        Aucun composant ne correspond à ce filtre.
      </p>
    </section>
  </nav>
</template>
