<script setup lang="ts">
import DocPage from "./DocPage.vue";

const phases = [
  {
    status: "done",
    title: "Fondations",
    items: [
      "Inventaire des 193 composants et un contrat par composant",
      "Tokens complets : couleurs, typographie, tailles, formes, élévation, mouvement",
      "Identités NativeSmart, Thinkdev et CV Action, contraste vérifié",
      "Registre des 13 technologies et des intégrations"
    ]
  },
  {
    status: "done",
    title: "NativeSmart Lab",
    items: [
      "Playground, variations et code dans chaque langage",
      "Identité, mode, densité, sens d'écriture et largeur en direct",
      "Pages Démarrer, Fondations et Ressources"
    ]
  },
  {
    status: "current",
    title: "Composants Vue, groupe par groupe",
    items: [
      "Formulaires : Input, Textarea, Select, Checkbox, Radio, Switch…",
      "Surfaces flottantes : Dialog, Drawer, Bottom Sheet, Popover, Tooltip, Menu",
      "Navigation, affichage de données, feedback",
      "Remplacement progressif des composants cva-* dans CV Action"
    ]
  },
  {
    status: "next",
    title: "Autres technologies",
    items: [
      "React et Next.js",
      "Web Components, puis Svelte et Angular",
      "React Native avec NativeWind, Flutter aligné sur les contrats",
      "Compose, SwiftUI et .NET MAUI à la demande"
    ]
  }
];

const statusLabels: Record<string, string> = {
  done: "Terminé",
  current: "En cours",
  next: "Ensuite"
};
</script>

<template>
  <DocPage
    eyebrow="Ressources"
    title="Feuille de route"
    lead="Une technologie complète d'abord (Vue), validée sur un vrai produit (CV Action), puis les autres sur des contrats et des tokens déjà stables."
  >
    <ol class="timeline">
      <li v-for="phase in phases" :key="phase.title" :class="`timeline__item--${phase.status}`">
        <span class="timeline__marker" aria-hidden="true" />
        <div class="timeline__body">
          <span :class="['tag', `tag--${phase.status}`]">{{ statusLabels[phase.status] }}</span>
          <h2>{{ phase.title }}</h2>
          <ul>
            <li v-for="item in phase.items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </li>
    </ol>
  </DocPage>
</template>
