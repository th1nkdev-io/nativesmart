<script setup lang="ts">
import { getComponentContract } from "@nativesmart/contracts";
import { brandThemes } from "@nativesmart/tokens";
import { computed } from "vue";
import { brandName, logoImage } from "../brand";
import { brandDescriptions, categoryNames } from "../labels";
import { paletteOpen, shortcutLabel } from "../lib/palette";
import { findDocPage, navSections, tokenSections } from "../pages";
import { openPage, state } from "../state";
import { getTechnology } from "../technologies";
import LabSelect from "../ui/LabSelect.vue";

defineEmits<{ toggleMenu: [] }>();

const logo = logoImage(32);
const technology = computed(() => getTechnology(state.tech));

const brandOptions = Object.values(brandThemes).map((theme) => ({
  value: theme.id,
  label: theme.name,
  description: brandDescriptions[theme.id] ?? theme.description,
  swatches: [theme.colors.light.primary, theme.colors.light.secondary]
}));

/** Where the page sits in the Lab, shown as a breadcrumb after the technology. */
const crumbs = computed(() => {
  const contract = getComponentContract(state.page);
  if (contract) {
    return ["Composants", categoryNames[contract.category] ?? contract.category, contract.name];
  }
  if (state.page.startsWith("tokens")) {
    const section = tokenSections.find((item) => state.page === `tokens/${item.id}`);
    return ["Fondations", "Tokens", ...(section ? [section.label] : [])];
  }
  const doc = findDocPage(state.page);
  const section = navSections.find((item) => item.items.some((entry) => entry.id === doc?.id));
  return doc && section ? [section.label, doc.label] : ["Accueil"];
});

const densities = [
  { value: "compact", label: "Densité compacte", icon: "M4 5h16M4 9.5h16M4 14h16M4 18.5h16" },
  { value: "comfortable", label: "Densité confortable", icon: "M4 6h16M4 12h16M4 18h16" },
  { value: "spacious", label: "Densité spacieuse", icon: "M4 7h16M4 17h16" }
] as const;

const directions = [
  { value: "ltr", label: "Gauche à droite", icon: "M4 6h16M4 11h10M4 18h12M13 15l3 3-3 3" },
  {
    value: "rtl",
    label: "Droite à gauche (arabe, hébreu)",
    icon: "M20 6H4M20 11H10M20 18H8M11 15l-3 3 3 3"
  }
] as const;

const viewports = [
  { value: "mobile", label: "Mobile · 375 px" },
  { value: "tablet", label: "Tablette · 768 px" },
  { value: "desktop", label: "Desktop · pleine largeur" }
] as const;
</script>

<template>
  <header class="topbar">
    <button
      class="topbar__menu icon-button"
      type="button"
      aria-label="Menu"
      @click="$emit('toggleMenu')"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10" /></svg>
    </button>

    <a
      class="topbar__brand"
      href="#/"
      :aria-label="`${brandName} Lab, accueil`"
      @click.prevent="openPage('')"
    >
      <img class="topbar__logo" v-bind="logo" alt="" />
      <span class="topbar__name">{{ brandName }}</span>
      <span class="topbar__lab">Lab</span>
    </a>

    <nav class="crumbs" aria-label="Fil d'Ariane">
      <span class="crumbs__tech" :title="`Technologie active : ${technology.name}`">
        <svg v-if="technology.icon" viewBox="0 0 24 24" aria-hidden="true">
          <path :d="technology.icon.path" />
        </svg>
        {{ technology.name }}
      </span>
      <template v-for="(crumb, index) in crumbs" :key="index">
        <svg class="crumbs__sep" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 6 6 6-6 6" />
        </svg>
        <span
          :class="['crumbs__item', { 'crumbs__item--current': index === crumbs.length - 1 }]"
          :aria-current="index === crumbs.length - 1 ? 'page' : undefined"
        >
          {{ crumb }}
        </span>
      </template>
    </nav>

    <button type="button" class="search-trigger" @click="paletteOpen = true">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <span class="search-trigger__label">Rechercher…</span>
      <kbd>{{ shortcutLabel }}</kbd>
    </button>

    <div class="dock" role="toolbar" aria-label="Réglages de l'aperçu">
      <LabSelect
        v-model="state.brand"
        class="dock__identity"
        label="Identité des composants"
        size="sm"
        :options="brandOptions"
      />

      <span class="dock__sep" aria-hidden="true" />

      <button
        type="button"
        :class="['icon-button', 'mode-toggle', `mode-toggle--${state.mode}`]"
        :aria-label="state.mode === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'"
        :data-tip="state.mode === 'dark' ? 'Mode clair' : 'Mode sombre'"
        @click="state.mode = state.mode === 'dark' ? 'light' : 'dark'"
      >
        <svg class="mode-toggle__sun" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
          />
        </svg>
        <svg class="mode-toggle__moon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>

      <span class="dock__sep dock__optional" aria-hidden="true" />

      <div class="dock__group dock__optional" role="group" aria-label="Densité">
        <button
          v-for="item in densities"
          :key="item.value"
          type="button"
          :aria-pressed="state.density === item.value"
          :aria-label="item.label"
          :data-tip="item.label"
          @click="state.density = item.value"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="item.icon" /></svg>
        </button>
      </div>

      <div class="dock__group dock__optional" role="group" aria-label="Sens d'écriture">
        <button
          v-for="item in directions"
          :key="item.value"
          type="button"
          :aria-pressed="state.dir === item.value"
          :aria-label="item.label"
          :data-tip="item.value.toUpperCase()"
          @click="state.dir = item.value"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="item.icon" /></svg>
        </button>
      </div>

      <div class="dock__group dock__viewports" role="group" aria-label="Largeur d'écran">
        <button
          v-for="item in viewports"
          :key="item.value"
          type="button"
          :aria-pressed="state.viewport === item.value"
          :aria-label="item.label"
          :data-tip="item.label"
          @click="state.viewport = item.value"
        >
          <svg v-if="item.value === 'mobile'" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
            <path d="M11 18.5h2" />
          </svg>
          <svg v-else-if="item.value === 'tablet'" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="2.5" width="16" height="19" rx="2.5" />
            <path d="M11 18.5h2" />
          </svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <rect x="2.5" y="3.5" width="19" height="13" rx="2" />
            <path d="M8 20.5h8M12 16.5v4" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>
