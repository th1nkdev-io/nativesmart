<script setup lang="ts">
import { componentContracts } from "@nativesmart/contracts";
import { rendererManifests } from "@nativesmart/platform-registry";
import { computed } from "vue";
import { state } from "../state";
import { technologies } from "../technologies";
import DocPage from "./DocPage.vue";

const statusLabels: Record<string, string> = {
  preview: "Aperçu",
  stable: "Stable",
  planned: "Prévu",
  deprecated: "Déprécié"
};
const familyLabels: Record<string, string> = { web: "Web", mobile: "Mobile", desktop: "Desktop" };

const rows = computed(() =>
  technologies.map((technology) => {
    const manifest = rendererManifests.find((item) => item.id === technology.id);
    return {
      ...technology,
      packageName: manifest?.packageName ?? "",
      styling: manifest?.styling ?? "",
      done: technology.implemented.size,
      percent: Math.round((technology.implemented.size / componentContracts.length) * 100)
    };
  })
);

const core = componentContracts.filter((contract) => contract.priority === "P0");
</script>

<template>
  <DocPage
    eyebrow="Ressources"
    title="Technologies"
    lead="Chaque technologie implémente les mêmes contrats avec les mêmes tokens. Ce tableau est calculé depuis le registre des plateformes."
  >
    <section class="doc__section">
      <h2>Couverture</h2>
      <div class="table-wrap">
        <table class="tech-table">
          <thead>
            <tr>
              <th>Technologie</th>
              <th>Statut</th>
              <th>Composants</th>
              <th>Paquet</th>
              <th>Lab</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.id">
              <td>
                <span class="tech-cell">
                  <svg v-if="row.icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path :d="row.icon.path" />
                  </svg>
                  <span>
                    <strong>{{ row.name }}</strong>
                    <small class="muted">{{ familyLabels[row.family] }}</small>
                  </span>
                </span>
              </td>
              <td>
                <span :class="['tag', `tag--${row.status}`]">{{ statusLabels[row.status] }}</span>
              </td>
              <td>
                <span class="progress" :title="`${row.done} sur ${componentContracts.length}`">
                  <span :style="{ inlineSize: `${Math.max(row.percent, row.done ? 2 : 0)}%` }" />
                </span>
                <small class="numeric">{{ row.done }}/{{ componentContracts.length }}</small>
              </td>
              <td>
                <code>{{ row.packageName }}</code>
              </td>
              <td>
                <button
                  v-if="row.url"
                  type="button"
                  class="ghost-button"
                  @click="state.tech = row.id"
                >
                  {{ state.tech === row.id ? "Active" : "Activer" }}
                </button>
                <span v-else class="muted">Bientôt</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="doc__section">
      <h2>Socle de la version 1.0</h2>
      <p>
        {{ core.length }} composants sont prioritaires (P0). La version 1.0 sera atteinte quand
        React Native et React les implémenteront tous, avec leurs états et leur accessibilité.
      </p>
    </section>
  </DocPage>
</template>
