<script setup lang="ts">
import type { ComponentContract } from "@nativesmart/contracts";
import { computed } from "vue";
import { state } from "../state";
import { technologyFamilies } from "../technologies";

const props = defineProps<{ contract: ComponentContract }>();

type Status = "lab" | "coded" | "planned";
const statusLabels: Record<Status, string> = {
  lab: "Dans le Lab",
  coded: "Codé",
  planned: "Prévu"
};

const families = computed(() =>
  technologyFamilies.map((family) => ({
    ...family,
    items: family.items.map((technology) => {
      const coded = technology.implemented.has(props.contract.id);
      const status: Status = coded ? (technology.url ? "lab" : "coded") : "planned";
      return { technology, status };
    })
  }))
);

const all = computed(() => families.value.flatMap((family) => family.items));
const counts = computed(() => ({
  lab: all.value.filter((item) => item.status === "lab").length,
  coded: all.value.filter((item) => item.status === "coded").length,
  planned: all.value.filter((item) => item.status === "planned").length
}));
const ready = computed(() => counts.value.lab + counts.value.coded);
</script>

<template>
  <section class="aside-card availability-card" aria-labelledby="availability-title">
    <header class="aside-card__head">
      <h2 id="availability-title" class="aside__title">Disponibilité</h2>
      <span class="aside-card__count">{{ ready }}/{{ all.length }}</span>
    </header>

    <div class="availability-card__summary">
      <div class="availability-card__bar" aria-hidden="true">
        <i
          v-for="status in ['lab', 'coded', 'planned'] as const"
          :key="status"
          :class="`is-${status}`"
          :style="{ flexGrow: counts[status] }"
        />
      </div>
      <p>
        <span class="is-lab">{{ counts.lab }} dans le Lab</span>
        <span v-if="counts.coded" class="is-coded"
          >{{ counts.coded }} codé{{ counts.coded > 1 ? "s" : "" }}</span
        >
        <span class="is-planned"
          >{{ counts.planned }} prévu{{ counts.planned > 1 ? "s" : "" }}</span
        >
      </p>
    </div>

    <div class="availability-card__families">
      <section v-for="family in families" :key="family.family" class="availability-card__family">
        <h3>{{ family.label }}</h3>
        <ul>
          <li v-for="{ technology, status } in family.items" :key="technology.id">
            <button
              type="button"
              :class="[
                'availability-row',
                `is-${status}`,
                { 'is-current': state.tech === technology.id }
              ]"
              :aria-current="state.tech === technology.id || undefined"
              :title="`Voir ${contract.name} en ${technology.name}`"
              @click="state.tech = technology.id"
            >
              <svg
                v-if="technology.icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                :style="{ color: `#${technology.icon.hex}` }"
              >
                <path :d="technology.icon.path" />
              </svg>
              <span class="availability-row__name">{{ technology.name }}</span>
              <span class="availability-row__status">{{ statusLabels[status] }}</span>
            </button>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>
