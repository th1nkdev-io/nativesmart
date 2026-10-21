<script setup lang="ts">
import { brandThemes, defaultBrandThemeId, semanticColorRoles } from "@nativesmart/tokens";
import ModeCompare from "../editorial/art/ModeCompare.vue";
import ThemeFanArt from "../editorial/art/ThemeFanArt.vue";
import EditorialPage from "../editorial/EditorialPage.vue";
import Icon from "../editorial/Icon.vue";
import type { IconName } from "../editorial/icons";
import PageHero from "../editorial/PageHero.vue";
import SectionHead from "../editorial/SectionHead.vue";
import { brandDescriptions } from "../labels";
import { openPage, state } from "../state";
import CodeBlock from "../ui/CodeBlock.vue";

const themes = Object.values(brandThemes);
const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

const layers: { icon: IconName; title: string; text: string; example: string }[] = [
  {
    icon: "droplet",
    title: "Primitives",
    text: "Les valeurs brutes : 19 gammes de couleurs, l'échelle d'espacement, les rayons, les ombres.",
    example: "blue-700 · #0a66cc"
  },
  {
    icon: "target",
    title: "Rôles sémantiques",
    text: `${semanticColorRoles.length} rôles nomment une intention plutôt qu'une couleur. C'est ici que l'identité choisit.`,
    example: "primary → blue-700"
  },
  {
    icon: "cube",
    title: "Composants",
    text: "Chaque composant lit des rôles, jamais des valeurs. Changer d'identité ne touche pas au code.",
    example: "--ns-button-background"
  }
];

const switching = `<!-- Mode sombre sur toute la page -->
<html class="dark">

<!-- Une zone en mode clair dans une page sombre -->
<section data-ns-theme="light">…</section>

<!-- Une zone plus dense, par exemple un tableau de bord -->
<section data-ns-density="compact">…</section>`;

const override = `/* Un seul composant, sans toucher au reste du thème */
.checkout .ns-button {
  --ns-button-radius: var(--ns-radius-full);
  --ns-button-height: var(--ns-control-height-lg);
}`;

const newTheme = `// packages/tokens/src/brands/acme.ts
import { palette } from "../primitives";
import { defineBrandTheme } from "./types";

export const acmeTheme = defineBrandTheme({
  id: "acme",
  name: "Acme",
  palette: { primary: palette.indigo, secondary: palette.amber, neutral: palette.slate },
  colors: { light: { /* les ${semanticColorRoles.length} rôles */ }, dark: { /* … */ } },
  typography: { fontFamily: { sans: ["Inter"], heading: ["Inter"], mono: ["ui-monospace"] } },
  shape: { control: "md", card: "lg", overlay: "xl", badge: "full" },
  shadowTint: { light: palette.slate[900], dark: "#000000" }
});`;

const guarantees = [
  {
    title: "Rôles complets",
    text: `Les ${semanticColorRoles.length} rôles existent en clair et en sombre.`
  },
  {
    title: "Contraste vérifié",
    text: "Chaque paire texte/fond respecte WCAG AA, sinon le build échoue."
  },
  { title: "Formes cohérentes", text: "Un rayon par usage : contrôles, cartes, surfaces, badges." },
  { title: "Une ligne pour l'activer", text: "Une feuille CSS générée, tokens/css/acme.css." }
];
</script>

<template>
  <EditorialPage>
    <PageHero
      eyebrow="Thèmes et identités"
      icon="palette"
      lead="Une identité visuelle donne une valeur à chaque décision : couleurs, polices, arrondis, ombres, en clair comme en sombre. Les composants, eux, ne changent jamais. Cliquez sur une carte pour l'essayer."
    >
      <template #title> Votre marque. <span class="ed-gradient">Nos composants.</span> </template>
      <template #meta>
        <span><Icon name="check" :size="16" /> {{ themes.length }} identités prêtes</span>
        <span><Icon name="check" :size="16" /> Clair et sombre inclus</span>
        <span><Icon name="check" :size="16" /> Sans JavaScript</span>
      </template>
      <template #art>
        <ThemeFanArt />
      </template>
    </PageHero>

    <section class="ed-section">
      <SectionHead
        kicker="Le principe"
        icon="layers"
        title="Trois niveaux de décision"
        lead="Une valeur ne va jamais directement dans un composant. Elle passe par un rôle, qui porte l'intention. C'est ce qui rend les identités interchangeables."
      />
      <ol class="layer-flow">
        <li
          v-for="(layer, index) in layers"
          :key="layer.title"
          v-reveal="index * 140"
          v-spotlight
          class="ed-card"
        >
          <span class="ed-tile"><Icon :name="layer.icon" :size="22" /></span>
          <h3>{{ layer.title }}</h3>
          <p>{{ layer.text }}</p>
          <code class="home-step__sample">{{ layer.example }}</code>
        </li>
      </ol>
    </section>

    <section class="ed-section">
      <SectionHead
        kicker="Identités disponibles"
        icon="sparkles"
        title="Choisissez, comparez, adoptez"
        lead="L'identité choisie habille les composants et les aperçus du Lab. Le Lab lui-même garde toujours l'identité NativeSmart."
      />
      <div class="identity-grid">
        <button
          v-for="(theme, index) in themes"
          :key="theme.id"
          v-reveal="index * 120"
          v-spotlight
          type="button"
          :class="['ed-card', 'identity-card', { 'is-active': state.brand === theme.id }]"
          :aria-pressed="state.brand === theme.id"
          @click="state.brand = theme.id"
        >
          <span class="identity-card__scale" aria-hidden="true">
            <i
              v-for="step in steps"
              :key="step"
              :style="{ background: theme.palette.primary[step] }"
            />
          </span>
          <span class="identity-card__name">
            {{ theme.name }}
            <small v-if="theme.id === defaultBrandThemeId">par défaut</small>
          </span>
          <span class="identity-card__text">{{ brandDescriptions[theme.id] }}</span>
          <span class="identity-card__specs">
            <span><b>Police</b> {{ theme.typography.fontFamily.sans[0] }}</span>
            <span><b>Contrôles</b> rayon {{ theme.shape.control }}</span>
          </span>
          <span class="identity-card__foot">
            <code>tokens/css/{{ theme.id }}.css</code>
            <span class="identity-card__state">
              <Icon :name="state.brand === theme.id ? 'check' : 'arrowRight'" :size="16" />
              {{ state.brand === theme.id ? "Active" : "Essayer" }}
            </span>
          </span>
        </button>
      </div>
    </section>

    <section class="ed-split">
      <div class="ed-section">
        <SectionHead
          kicker="Clair et sombre"
          icon="moon"
          title="Deux modes, une seule feuille"
          lead="Chaque identité livre ses deux modes, avec des ombres renforcées dans le noir. Faites glisser la poignée pour comparer."
        />
        <div v-reveal>
          <CodeBlock language="HTML" :code="switching" />
        </div>
      </div>
      <div v-reveal:right>
        <ModeCompare />
      </div>
    </section>

    <section class="ed-split ed-split--reverse">
      <div class="ed-section">
        <SectionHead
          kicker="Sur mesure"
          icon="wand"
          title="Ajuster un composant, pas tout le thème"
          lead="Chaque composant expose ses variables (--ns-button-*, --ns-badge-*…). Changez-les sur un conteneur pour un écran précis, sans effet ailleurs."
        />
      </div>
      <div v-reveal:left>
        <CodeBlock language="CSS" :code="override" />
      </div>
    </section>

    <section class="ed-section">
      <SectionHead
        kicker="Votre identité"
        icon="star"
        title="Créer une identité en un fichier"
        lead="Déclarez votre palette, vos rôles et vos formes. La validation fait le reste."
      />
      <div class="ed-split">
        <ul v-reveal class="ed-list">
          <li v-for="item in guarantees" :key="item.title">
            <span class="ed-check"><Icon name="check" :size="14" /></span>
            <span>
              <strong>{{ item.title }}</strong>
              {{ item.text }}
            </span>
          </li>
        </ul>
        <div v-reveal:right>
          <CodeBlock language="TypeScript" :code="newTheme" />
        </div>
      </div>
    </section>

    <section v-reveal:scale class="ed-cta">
      <h2>Toutes les valeurs, sous vos yeux.</h2>
      <p>La page Tokens montre chaque couleur, taille, ombre et animation de l'identité active.</p>
      <button type="button" class="ed-button ed-button--primary" @click="openPage('tokens')">
        Voir les tokens
        <Icon name="arrowRight" :size="18" />
      </button>
    </section>
  </EditorialPage>
</template>
