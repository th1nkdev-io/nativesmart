<script setup lang="ts">
import { brandThemes, defaultBrandThemeId, semanticColorRoles } from "@nativesmart/tokens";
import { brandDescriptions } from "../labels";
import { openPage, state } from "../state";
import CodeBlock from "../ui/CodeBlock.vue";
import DocPage from "./DocPage.vue";

const themes = Object.values(brandThemes);

const switching = `<!-- Mode sombre sur toute la page -->
<html class="dark">

<!-- Une zone en mode clair dans une page sombre -->
<section data-ns-theme="light">…</section>

<!-- Une zone plus dense, par exemple un tableau de bord -->
<section data-ns-density="compact">…</section>`;

const newTheme = `// packages/tokens/src/brands/acme.ts
import { palette } from "../primitives";
import { defineBrandTheme } from "./types";

export const acmeTheme = defineBrandTheme({
  id: "acme",
  name: "Acme",
  description: "Acme identity: indigo primary, amber secondary.",
  palette: { primary: palette.indigo, secondary: palette.amber, neutral: palette.slate },
  colors: { light: { /* les ${semanticColorRoles.length} rôles */ }, dark: { /* … */ } },
  typography: { fontFamily: { sans: ["Inter"], heading: ["Inter"], mono: ["ui-monospace"] } },
  shape: { control: "md", card: "lg", overlay: "xl", badge: "full" },
  shadowTint: { light: palette.slate[900], dark: "#000000" }
});`;

const override = `/* Un seul composant, sans toucher au reste du thème */
.checkout .ns-button {
  --ns-button-radius: var(--ns-radius-full);
  --ns-button-height: var(--ns-control-height-lg);
}`;
</script>

<template>
  <DocPage
    eyebrow="Démarrer"
    title="Thèmes et identités"
    lead="Une identité visuelle donne une valeur à chaque token : couleurs, polices, arrondis et ombres, en mode clair et sombre. Les composants ne changent jamais, seules ces valeurs changent."
  >
    <section class="doc__section">
      <h2>Identités disponibles</h2>
      <div class="theme-grid">
        <button
          v-for="theme in themes"
          :key="theme.id"
          type="button"
          :class="['theme-card', { 'is-active': state.brand === theme.id }]"
          @click="state.brand = theme.id"
        >
          <span class="theme-card__swatches" aria-hidden="true">
            <span :style="{ background: theme.colors.light.primary }" />
            <span :style="{ background: theme.colors.light.secondary }" />
            <span :style="{ background: theme.colors.dark.background }" />
          </span>
          <strong>
            {{ theme.name }}
            <small v-if="theme.id === defaultBrandThemeId" class="tag">par défaut</small>
          </strong>
          <span class="muted">{{ brandDescriptions[theme.id] }}</span>
          <code>tokens/css/{{ theme.id }}.css</code>
        </button>
      </div>
      <p>
        Cliquez sur une identité pour l'appliquer aux composants et aux aperçus. Le Lab lui-même
        garde toujours l'identité NativeSmart. Ouvrez la page
        <a href="#/tokens" @click.prevent="openPage('tokens')">Tokens</a> pour voir toutes ses
        valeurs.
      </p>
    </section>

    <section class="doc__section">
      <h2>Mode sombre, zones et densité</h2>
      <p>
        Chaque feuille d'identité contient le mode clair et le mode sombre. Le choix se fait avec
        des classes et des attributs, sans JavaScript :
      </p>
      <CodeBlock language="HTML" :code="switching" />
    </section>

    <section class="doc__section">
      <h2>Personnaliser un composant</h2>
      <p>
        Chaque composant expose ses propres variables (<code>--ns-button-*</code>,
        <code>--ns-badge-*</code>…). Modifiez-les sur un conteneur pour ajuster un composant à un
        endroit précis.
      </p>
      <CodeBlock language="CSS" :code="override" />
    </section>

    <section class="doc__section">
      <h2>Créer une identité</h2>
      <p>
        Une identité se déclare dans <code>packages/tokens/src/brands/</code>. La validation vérifie
        que les {{ semanticColorRoles.length }} rôles sont présents et que chaque paire texte/fond
        respecte le contraste WCAG AA, sinon le build échoue.
      </p>
      <CodeBlock language="TypeScript" :code="newTheme" />
    </section>
  </DocPage>
</template>
