<script setup lang="ts">
import { brandThemes, semanticColorRoles, textStyles } from "@nativesmart/tokens";
import { computed, type Component } from "vue";
import TokenFlowArt from "../editorial/art/TokenFlowArt.vue";
import PageHero from "../editorial/PageHero.vue";
import { tokenSections } from "../pages";
import { openPage, state } from "../state";
import AccessibilitySection from "./tokens/AccessibilitySection.vue";
import ColorsSection from "./tokens/ColorsSection.vue";
import DataSection from "./tokens/DataSection.vue";
import ElevationSection from "./tokens/ElevationSection.vue";
import IconsSection from "./tokens/IconsSection.vue";
import LayoutSection from "./tokens/LayoutSection.vue";
import MotionSection from "./tokens/MotionSection.vue";
import ShapeSection from "./tokens/ShapeSection.vue";
import SizingSection from "./tokens/SizingSection.vue";
import SpacingSection from "./tokens/SpacingSection.vue";
import StatesSection from "./tokens/StatesSection.vue";
import SystemSection from "./tokens/SystemSection.vue";
import TypographySection from "./tokens/TypographySection.vue";

const components: Record<(typeof tokenSections)[number]["id"], Component> = {
  colors: ColorsSection,
  states: StatesSection,
  data: DataSection,
  typography: TypographySection,
  spacing: SpacingSection,
  layout: LayoutSection,
  sizing: SizingSection,
  shape: ShapeSection,
  elevation: ElevationSection,
  motion: MotionSection,
  icons: IconsSection,
  accessibility: AccessibilitySection,
  system: SystemSection
};
const sections = tokenSections.map((section) => ({
  ...section,
  component: components[section.id]
}));

const theme = computed(() => brandThemes[state.brand]);
const current = computed(
  () => sections.find((section) => state.page === `tokens/${section.id}`) ?? sections[0]
);
</script>

<template>
  <article class="page tokens-page">
    <PageHero
      :eyebrow="`Fondations · ${theme.name}`"
      icon="droplet"
      :lead="`Les décisions visuelles de NativeSmart : ${semanticColorRoles.length} rôles de couleur en sept intentions, des états d'interaction, des couleurs de données, ${Object.keys(textStyles).length} styles de texte dont des titres fluides, des espacements par intention, une grille responsive et les échelles de taille, de forme, d'élévation et de mouvement. Les aperçus suivent l'identité et le mode choisis ; le Lab, lui, garde l'identité NativeSmart.`"
    >
      <template #title> Chaque décision, <span class="ed-gradient">une variable.</span> </template>
      <template #art>
        <TokenFlowArt />
      </template>
    </PageHero>

    <nav class="subnav" aria-label="Sections des tokens">
      <a
        v-for="section in sections"
        :key="section.id"
        :href="`#/tokens/${section.id}`"
        :aria-current="current.id === section.id ? 'page' : undefined"
        @click.prevent="openPage(`tokens/${section.id}`)"
      >
        {{ section.label }}
      </a>
    </nav>

    <component :is="current.component" />
  </article>
</template>
