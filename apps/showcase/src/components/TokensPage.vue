<script setup lang="ts">
import { brandThemes, semanticColorRoles, textStyles } from "@nativesmart/tokens";
import { computed, type Component } from "vue";
import { openPage, state } from "../state";
import ColorsSection from "./tokens/ColorsSection.vue";
import ElevationSection from "./tokens/ElevationSection.vue";
import MotionSection from "./tokens/MotionSection.vue";
import ShapeSection from "./tokens/ShapeSection.vue";
import SizingSection from "./tokens/SizingSection.vue";
import SpacingSection from "./tokens/SpacingSection.vue";
import SystemSection from "./tokens/SystemSection.vue";
import TypographySection from "./tokens/TypographySection.vue";

const sections: { id: string; label: string; component: Component }[] = [
  { id: "colors", label: "Couleurs", component: ColorsSection },
  { id: "typography", label: "Typographie", component: TypographySection },
  { id: "spacing", label: "Espacements", component: SpacingSection },
  { id: "sizing", label: "Tailles", component: SizingSection },
  { id: "shape", label: "Formes", component: ShapeSection },
  { id: "elevation", label: "Élévation", component: ElevationSection },
  { id: "motion", label: "Mouvement", component: MotionSection },
  { id: "system", label: "Système", component: SystemSection }
];

const theme = computed(() => brandThemes[state.brand]);
const current = computed(
  () => sections.find((section) => state.page === `tokens/${section.id}`) ?? sections[0]
);
</script>

<template>
  <article class="page tokens-page">
    <header class="page__header">
      <p class="ns-text-overline eyebrow">Fondations · {{ theme.name }}</p>
      <h1 class="ns-text-h1">Tokens</h1>
      <p class="lead">
        Les décisions visuelles de NativeSmart : {{ semanticColorRoles.length }} rôles de couleur,
        {{ Object.keys(textStyles).length }} styles de texte, des échelles d'espacement, de taille,
        de forme, d'élévation et de mouvement. Les aperçus suivent l'identité et le mode choisis
        dans la barre du haut ; le Lab, lui, garde l'identité NativeSmart.
      </p>
    </header>

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
