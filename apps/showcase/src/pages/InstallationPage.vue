<script setup lang="ts">
import { ref } from "vue";
import TerminalArt from "../editorial/art/TerminalArt.vue";
import EditorialPage from "../editorial/EditorialPage.vue";
import Icon from "../editorial/Icon.vue";
import type { IconName } from "../editorial/icons";
import PageHero from "../editorial/PageHero.vue";
import SectionHead from "../editorial/SectionHead.vue";
import { openPage } from "../state";
import CodeBlock from "../ui/CodeBlock.vue";

const framework = ref<"nuxt" | "vite">("nuxt");

const requirements: { icon: IconName; title: string; text: string }[] = [
  { icon: "zap", title: "Node.js 20 ou plus", text: "La version LTS actuelle suffit." },
  { icon: "package", title: "pnpm, npm ou yarn", text: "Les exemples utilisent pnpm 9." },
  { icon: "layers", title: "Vue 3.5 ou Nuxt 4", text: "Les autres technologies suivront." }
];

const install = "pnpm add @nativesmart/tokens @nativesmart/vue";

const nuxt = `// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    "@nativesmart/tokens/css/nativesmart.css",
    "@nativesmart/vue/style.css"
  ]
});`;

const plugin = `// plugins/nativesmart.ts
import { Nativesmart } from "@nativesmart/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Nativesmart);
});`;

const vite = `// main.ts
import { createApp } from "vue";
import { Nativesmart } from "@nativesmart/vue";
import "@nativesmart/tokens/css/nativesmart.css";
import "@nativesmart/vue/style.css";
import App from "./App.vue";

createApp(App).use(Nativesmart).mount("#app");`;

const usage = `<script setup lang="ts">
const sending = ref(false);
<\/script>

<template>
  <NsButton label="Envoyer" :loading="sending" @press="send" />
  <NsBadge label="Payé" intent="success" />
</template>`;

const tailwind = `// tailwind.config.js
import { nativesmartPreset } from "@nativesmart/tailwind-preset";

export default {
  presets: [nativesmartPreset],
  darkMode: "class"
};`;

const local = `# Dans le dépôt nativesmart
pnpm install
pnpm --filter @nativesmart/tokens --filter @nativesmart/vue build

# Dans votre application (par exemple CV Action)
pnpm add ../nativesmart/packages/tokens ../nativesmart/packages/web/vue`;

const next: { icon: IconName; title: string; text: string; page: string }[] = [
  {
    icon: "palette",
    title: "Choisir une identité",
    text: "NativeSmart, Thinkdev ou CV Action, ou la vôtre.",
    page: "docs/theming"
  },
  {
    icon: "eye",
    title: "Explorer les composants",
    text: "Aperçu, variations, API et code prêt à copier.",
    page: "button"
  },
  {
    icon: "shield",
    title: "Comprendre l'accessibilité",
    text: "Ce qui est garanti, et comment le vérifier.",
    page: "docs/accessibility"
  }
];
</script>

<template>
  <EditorialPage>
    <PageHero
      eyebrow="Démarrer"
      icon="terminal"
      lead="Deux paquets, une feuille de style, un plugin. En moins de cinq minutes, vos écrans utilisent les composants NativeSmart avec votre identité, en clair et en sombre."
    >
      <template #title> Opérationnel en <span class="ed-gradient">trois étapes.</span> </template>
      <template #meta>
        <span><Icon name="check" :size="16" /> Vue est la seule dépendance</span>
        <span><Icon name="check" :size="16" /> Tailwind facultatif</span>
        <span><Icon name="check" :size="16" /> Typé de bout en bout</span>
      </template>
      <template #art>
        <TerminalArt />
      </template>
    </PageHero>

    <div v-reveal class="ed-note">
      <Icon name="flag" :size="20" />
      <p>
        <strong>Avant la première version publique.</strong> Les paquets ne sont pas encore sur npm
        : installez-les depuis une copie locale (dernière section). Les commandes
        <code>pnpm add</code> fonctionneront telles quelles dès la publication.
      </p>
    </div>

    <section class="ed-section">
      <SectionHead kicker="Prérequis" icon="check" title="Ce qu'il vous faut" />
      <div class="ed-grid">
        <article
          v-for="(item, index) in requirements"
          :key="item.title"
          v-reveal="index * 100"
          v-spotlight
          class="ed-card"
        >
          <span class="ed-tile"><Icon :name="item.icon" :size="22" /></span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="ed-section">
      <SectionHead
        kicker="Pas à pas"
        icon="rocket"
        title="Installer NativeSmart"
        lead="Choisissez votre framework : les étapes s'adaptent."
      />
      <div v-reveal class="framework-switch" role="radiogroup" aria-label="Framework">
        <button
          type="button"
          role="radio"
          :aria-checked="framework === 'nuxt'"
          @click="framework = 'nuxt'"
        >
          Nuxt 4
        </button>
        <button
          type="button"
          role="radio"
          :aria-checked="framework === 'vite'"
          @click="framework = 'vite'"
        >
          Vue 3 + Vite
        </button>
      </div>

      <ol class="stepper">
        <li v-reveal class="stepper__step">
          <span class="stepper__dot">1</span>
          <div class="stepper__body">
            <h3>Ajouter les paquets</h3>
            <p>
              <code>@nativesmart/tokens</code> apporte les feuilles de style des identités,
              <code>@nativesmart/vue</code> les composants.
            </p>
            <CodeBlock language="Terminal" :code="install" />
          </div>
        </li>
        <li v-reveal class="stepper__step">
          <span class="stepper__dot">2</span>
          <div class="stepper__body">
            <h3>Charger le thème et les composants</h3>
            <template v-if="framework === 'nuxt'">
              <p>Déclarez les deux feuilles de style, puis enregistrez le plugin.</p>
              <CodeBlock language="TypeScript" :code="nuxt" />
              <CodeBlock language="TypeScript" :code="plugin" />
            </template>
            <template v-else>
              <p>Importez les styles et installez le plugin dans votre point d'entrée.</p>
              <CodeBlock language="TypeScript" :code="vite" />
            </template>
            <p>
              Remplacez <code>nativesmart.css</code> par <code>cv-action.css</code> ou
              <code>thinkdev.css</code> pour changer d'identité. Le mode sombre s'active avec la
              classe <code>.dark</code> sur <code>&lt;html&gt;</code>.
            </p>
          </div>
        </li>
        <li v-reveal class="stepper__step">
          <span class="stepper__dot">3</span>
          <div class="stepper__body">
            <h3>Utiliser un composant</h3>
            <p>
              Les noms et les propriétés sont ceux du contrat, identiques sur chaque plateforme.
            </p>
            <CodeBlock language="Vue" :code="usage" />
          </div>
        </li>
        <li v-reveal class="stepper__step stepper__step--done">
          <span class="stepper__dot"><Icon name="check" :size="16" /></span>
          <div class="stepper__body">
            <h3>C'est prêt</h3>
            <p>
              Chaque page de composant du Lab affiche le code exact de vos réglages, à copier en un
              clic.
            </p>
          </div>
        </li>
      </ol>
    </section>

    <section class="ed-split">
      <div class="ed-section">
        <SectionHead
          kicker="Tailwind CSS"
          icon="wand"
          title="Vos classes, les mêmes tokens"
          lead="Le preset expose chaque token en classe utilitaire : bg-ns-primary, rounded-ns-card, shadow-ns-elevation-2… Votre interface Tailwind et les composants restent synchronisés sur l'identité active."
        />
      </div>
      <div v-reveal:right>
        <CodeBlock language="JavaScript" :code="tailwind" />
      </div>
    </section>

    <section class="ed-split ed-split--reverse">
      <div class="ed-section">
        <SectionHead
          kicker="En attendant npm"
          icon="gitBranch"
          title="Installer depuis une copie locale"
          lead="Construisez les paquets dans le dépôt, puis référencez-les depuis votre application. C'est ainsi que CV Action les utilise aujourd'hui."
        />
      </div>
      <div v-reveal:left>
        <CodeBlock language="Terminal" :code="local" />
      </div>
    </section>

    <section class="ed-section">
      <SectionHead kicker="Et ensuite" icon="compass" title="Allez plus loin" />
      <div class="ed-grid">
        <button
          v-for="(item, index) in next"
          :key="item.title"
          v-reveal="index * 100"
          v-spotlight
          type="button"
          class="ed-card ed-link-card"
          @click="openPage(item.page)"
        >
          <span class="ed-tile"><Icon :name="item.icon" :size="22" /></span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
          <span class="ed-link-card__more">Ouvrir <Icon name="arrowRight" :size="16" /></span>
        </button>
      </div>
    </section>
  </EditorialPage>
</template>
