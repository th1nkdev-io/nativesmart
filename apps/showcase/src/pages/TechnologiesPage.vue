<script setup lang="ts">
import { componentContracts } from "@nativesmart/contracts";
import { rendererManifests } from "@nativesmart/platform-registry";
import { computed } from "vue";
import OrbitArt from "../editorial/art/OrbitArt.vue";
import EditorialPage from "../editorial/EditorialPage.vue";
import Icon from "../editorial/Icon.vue";
import type { IconName } from "../editorial/icons";
import PageHero from "../editorial/PageHero.vue";
import SectionHead from "../editorial/SectionHead.vue";
import { openPage, state } from "../state";
import { technologies, technologyFamilies } from "../technologies";

const statusLabels: Record<string, string> = {
  preview: "Aperçu",
  stable: "Stable",
  planned: "Prévu",
  deprecated: "Déprécié"
};

const familyInfo: Record<string, { icon: IconName; text: string }> = {
  web: { icon: "globe", text: "Applications et sites, rendus côté client ou serveur." },
  mobile: { icon: "smartphone", text: "iOS et Android, en natif ou multi-plateforme." },
  desktop: { icon: "monitor", text: "Applications de bureau construites sur le web." }
};

const rows = computed(() =>
  technologies.map((technology) => {
    const manifest = rendererManifests.find((item) => item.id === technology.id);
    return {
      ...technology,
      packageName: manifest?.packageName ?? "",
      done: technology.implemented.size,
      percent: Math.round((technology.implemented.size / componentContracts.length) * 100)
    };
  })
);

const inLab = technologies.filter((technology) => technology.url).length;
const core = componentContracts.filter((contract) => contract.priority === "P0");

function activate(id: string) {
  state.tech = id;
}
</script>

<template>
  <EditorialPage>
    <PageHero
      eyebrow="Technologies"
      icon="globe"
      lead="Chaque technologie implémente les mêmes contrats avec les mêmes tokens : même nom de composant, mêmes propriétés, même comportement. Choisissez la vôtre, le Lab s'adapte."
    >
      <template #title>
        Une API. <span class="ed-gradient">{{ technologies.length }} technologies.</span>
      </template>
      <template #meta>
        <span
          ><Icon name="check" :size="16" /> {{ inLab }} testable{{ inLab > 1 ? "s" : "" }} dans le
          Lab</span
        >
        <span><Icon name="check" :size="16" /> Code prévu pour toutes</span>
      </template>
      <template #art>
        <OrbitArt />
      </template>
    </PageHero>

    <section class="ed-section">
      <SectionHead
        kicker="Familles"
        icon="layers"
        title="Web, mobile et desktop"
        lead="Trois familles, un seul langage commun. Cliquez sur un logo pour activer la technologie dans tout le Lab."
      />
      <div class="ed-grid">
        <article
          v-for="(group, index) in technologyFamilies"
          :key="group.family"
          v-reveal="index * 120"
          v-spotlight
          class="ed-card family-card"
        >
          <span class="ed-tile"><Icon :name="familyInfo[group.family].icon" :size="22" /></span>
          <h3>
            {{ group.label }} <small>{{ group.items.length }}</small>
          </h3>
          <p>{{ familyInfo[group.family].text }}</p>
          <span class="family-card__logos">
            <button
              v-for="technology in group.items"
              :key="technology.id"
              type="button"
              :class="{ 'is-active': state.tech === technology.id }"
              :title="technology.name"
              :aria-label="`Activer ${technology.name}`"
              @click="activate(technology.id)"
            >
              <svg v-if="technology.icon" viewBox="0 0 24 24" aria-hidden="true">
                <path :d="technology.icon.path" :style="{ fill: `#${technology.icon.hex}` }" />
              </svg>
              <b v-else>{{ technology.name.slice(0, 2) }}</b>
            </button>
          </span>
        </article>
      </div>
    </section>

    <section class="ed-section">
      <SectionHead
        kicker="Couverture"
        icon="gauge"
        title="Où en est chaque technologie"
        lead="Calculé depuis le registre des plateformes, à chaque build."
      />
      <div v-reveal class="coverage-table">
        <div
          v-for="row in rows"
          :key="row.id"
          :class="['coverage-row', { 'is-active': state.tech === row.id }]"
        >
          <span class="coverage-row__tech">
            <span class="coverage-row__logo">
              <svg v-if="row.icon" viewBox="0 0 24 24" aria-hidden="true">
                <path :d="row.icon.path" :style="{ fill: `#${row.icon.hex}` }" />
              </svg>
            </span>
            <span>
              <strong>{{ row.name }}</strong>
              <code>{{ row.packageName }}</code>
            </span>
          </span>
          <span :class="['tag', `tag--${row.status}`]">{{ statusLabels[row.status] }}</span>
          <span class="coverage-row__bar" :title="`${row.done} sur ${componentContracts.length}`">
            <span :style="{ inlineSize: `${Math.max(row.percent, row.done ? 2 : 0)}%` }" />
          </span>
          <small class="numeric">{{ row.done }}/{{ componentContracts.length }}</small>
          <button type="button" class="ed-inline-link" @click="activate(row.id)">
            {{ state.tech === row.id ? "Active" : "Activer" }}
          </button>
        </div>
      </div>
    </section>

    <section v-reveal:scale class="ed-cta">
      <h2>{{ core.length }} composants pour la version 1.0.</h2>
      <p>
        Le socle prioritaire (P0) : quand React Native et React les implémenteront tous, avec leurs
        états et leur accessibilité, NativeSmart passera en 1.0.
      </p>
      <button type="button" class="ed-button ed-button--primary" @click="openPage('docs/roadmap')">
        Voir la feuille de route
        <Icon name="arrowRight" :size="18" />
      </button>
    </section>
  </EditorialPage>
</template>
