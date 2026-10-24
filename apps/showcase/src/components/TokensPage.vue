<script setup lang="ts">
import { brandThemes, semanticColorRoles, textStyles } from "@nativesmart/tokens";
import { computed, type Component } from "vue";
import TokenFlowArt from "../editorial/art/TokenFlowArt.vue";
import Icon from "../editorial/Icon.vue";
import PageHero from "../editorial/PageHero.vue";
import { tokenSections } from "../pages";
import { referenceFor, tokenPlatform } from "../lib/tokenPlatform";
import { state } from "../state";
import { getTechnology } from "../technologies";
import AccessibilitySection from "./tokens/AccessibilitySection.vue";
import ColorsSection from "./tokens/ColorsSection.vue";
import DataSection from "./tokens/DataSection.vue";
import ElevationSection from "./tokens/ElevationSection.vue";
import ExportsSection from "./tokens/ExportsSection.vue";
import IconsSection from "./tokens/IconsSection.vue";
import LayoutSection from "./tokens/LayoutSection.vue";
import MotionSection from "./tokens/MotionSection.vue";
import PersonalitySection from "./tokens/PersonalitySection.vue";
import ShapeSection from "./tokens/ShapeSection.vue";
import SizingSection from "./tokens/SizingSection.vue";
import SpacingSection from "./tokens/SpacingSection.vue";
import StatesSection from "./tokens/StatesSection.vue";
import SystemSection from "./tokens/SystemSection.vue";
import TokenRail from "./tokens/TokenRail.vue";
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
  personality: PersonalitySection,
  exports: ExportsSection,
  system: SystemSection
};
const sections = tokenSections.map((section) => ({
  ...section,
  component: components[section.id]
}));

const theme = computed(() => brandThemes[state.brand]);
const technology = computed(() => getTechnology(state.tech));
const sample = computed(() => referenceFor("--ns-color-primary"));
const current = computed(
  () => sections.find((section) => state.page === `tokens/${section.id}`) ?? sections[0]
);
</script>

<template>
  <article class="page tokens-page">
    <PageHero
      :eyebrow="`Fondations · ${theme.name}`"
      icon="droplet"
      :lead="`Les décisions visuelles de NativeSmart : ${semanticColorRoles.length} rôles de couleur, ${Object.keys(textStyles).length} styles de texte, l'espace, la mise en page, les formes, l'élévation, le mouvement et l'accessibilité, réglés par la personnalité de chaque identité et livrés en CSS, Tailwind, W3C, Swift, Kotlin et Dart. Les aperçus suivent l'identité et le mode choisis ; le Lab, lui, garde l'identité NativeSmart.`"
    >
      <template #title> Chaque décision, <span class="ed-gradient">une variable.</span> </template>
      <template #art>
        <TokenFlowArt />
      </template>
    </PageHero>

    <TokenRail :current="current.id" />

    <aside class="token-format" aria-label="Format des noms">
      <span class="token-format__icon" aria-hidden="true">
        <Icon name="code" :size="18" />
      </span>
      <div class="token-format__body">
        <p>
          Noms affichés pour
          <span class="token-format__tech">
            <svg v-if="technology.icon" viewBox="0 0 24 24" aria-hidden="true">
              <path :d="technology.icon.path" />
            </svg>
            {{ technology.name }}
          </span>
          : <code>{{ sample }}</code>
        </p>
        <small v-if="tokenPlatform === 'css'">
          Choisissez SwiftUI, Compose, Flutter ou React Native dans la barre de gauche pour voir les
          tokens dans leur langage.
        </small>
        <small v-else>Les tokens propres au web sont marqués « web ».</small>
      </div>
    </aside>

    <Transition name="section" mode="out-in">
      <component :is="current.component" :key="current.id" />
    </Transition>
  </article>
</template>
