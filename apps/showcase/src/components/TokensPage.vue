<script setup lang="ts">
import { brandThemes, semanticColorRoles, textStyles } from "@nativesmart/tokens";
import { computed, type Component } from "vue";
import TokenFlowArt from "../editorial/art/TokenFlowArt.vue";
import PageHero from "../editorial/PageHero.vue";
import { tokenSections } from "../pages";
import { openPage, state } from "../state";
import ColorsSection from "./tokens/ColorsSection.vue";
import ElevationSection from "./tokens/ElevationSection.vue";
import MotionSection from "./tokens/MotionSection.vue";
import ShapeSection from "./tokens/ShapeSection.vue";
import SizingSection from "./tokens/SizingSection.vue";
import SpacingSection from "./tokens/SpacingSection.vue";
import SystemSection from "./tokens/SystemSection.vue";
import TypographySection from "./tokens/TypographySection.vue";

const components: Record<(typeof tokenSections)[number]["id"], Component> = {
  colors: ColorsSection,
  typography: TypographySection,
  spacing: SpacingSection,
  sizing: SizingSection,
  shape: ShapeSection,
  elevation: ElevationSection,
  motion: MotionSection,
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
      :lead="`Les décisions visuelles de NativeSmart : ${semanticColorRoles.length} rôles de couleur, ${Object.keys(textStyles).length} styles de texte, des échelles d'espacement, de taille, de forme, d'élévation et de mouvement. Les aperçus suivent l'identité et le mode choisis ; le Lab, lui, garde l'identité NativeSmart.`"
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
