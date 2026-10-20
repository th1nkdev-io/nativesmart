<script setup lang="ts">
import CodeBlock from "../ui/CodeBlock.vue";
import DocPage from "./DocPage.vue";

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

const usage = `<template>
  <NsButton label="Envoyer" :loading="sending" @press="send" />
</template>`;

const tailwind = `// tailwind.config.js
import { nativesmartPreset } from "@nativesmart/tailwind-preset";

export default {
  presets: [nativesmartPreset],
  darkMode: "class"
};`;

const local = `# Depuis le dépôt nativesmart
pnpm install
pnpm --filter @nativesmart/tokens --filter @nativesmart/vue build

# Depuis votre application (exemple : CV Action)
pnpm add ../nativesmart/packages/tokens ../nativesmart/packages/web/vue`;
</script>

<template>
  <DocPage
    eyebrow="Démarrer"
    title="Installation"
    lead="Ajoutez NativeSmart à une application Vue ou Nuxt en trois étapes : les tokens, les composants, puis le thème. Les autres technologies suivront le même schéma."
  >
    <section class="doc__section">
      <h2>Avant de commencer</h2>
      <p class="notice">
        Les paquets ne sont pas encore publiés sur npm. En attendant, installez-les depuis une copie
        locale du dépôt (dernière section). Les commandes <code>pnpm add</code> ci-dessous
        fonctionneront telles quelles après la publication.
      </p>
    </section>

    <section class="doc__section">
      <h2>1. Installer les paquets</h2>
      <CodeBlock language="Terminal" code="pnpm add @nativesmart/tokens @nativesmart/vue" />
      <p>
        <code>@nativesmart/tokens</code> fournit les feuilles de style des identités visuelles,
        <code>@nativesmart/vue</code> les composants.
      </p>
    </section>

    <section class="doc__section">
      <h2>2. Charger le thème et les composants</h2>
      <h3>Nuxt 4</h3>
      <CodeBlock language="TypeScript" :code="nuxt" />
      <CodeBlock language="TypeScript" :code="plugin" />
      <h3>Vue 3 avec Vite</h3>
      <CodeBlock language="TypeScript" :code="vite" />
      <p>
        Remplacez <code>nativesmart.css</code> par <code>cv-action.css</code> ou
        <code>thinkdev.css</code> pour changer d'identité. Le mode sombre s'active avec la classe
        <code>.dark</code> sur <code>&lt;html&gt;</code>, comme avec Nuxt color-mode.
      </p>
    </section>

    <section class="doc__section">
      <h2>3. Utiliser un composant</h2>
      <CodeBlock language="Vue" :code="usage" />
      <p>
        Chaque page de composant du Lab affiche le code correspondant à vos réglages, dans chaque
        langage.
      </p>
    </section>

    <section class="doc__section">
      <h2>Avec Tailwind CSS</h2>
      <p>
        Le preset expose les mêmes tokens sous forme de classes (<code>bg-ns-primary</code>,
        <code>rounded-ns-card</code>…). Votre interface Tailwind et les composants restent ainsi
        synchronisés sur l'identité active.
      </p>
      <CodeBlock language="JavaScript" :code="tailwind" />
    </section>

    <section class="doc__section">
      <h2>Installer depuis une copie locale</h2>
      <CodeBlock language="Terminal" :code="local" />
    </section>
  </DocPage>
</template>
