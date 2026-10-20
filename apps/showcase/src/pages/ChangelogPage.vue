<script setup lang="ts">
import DocPage from "./DocPage.vue";

const releases = [
  {
    date: "20 octobre 2026",
    title: "Identité NativeSmart et Lab complet",
    changes: [
      { kind: "Nouveau", text: "Identité NativeSmart par défaut, construite à partir du logo" },
      { kind: "Nouveau", text: "Logo officiel dans le Lab et les Kitchen Sink mobiles" },
      { kind: "Nouveau", text: "Kit de contrôles du Lab : listes, interrupteurs, segments" },
      { kind: "Nouveau", text: "Les 193 composants listés, avec un état « bientôt »" },
      { kind: "Nouveau", text: "Pages de documentation" },
      {
        kind: "Nouveau",
        text: "Recherche globale ⌘K / Ctrl K dans les pages et les 193 composants"
      },
      { kind: "Nouveau", text: "Barre du haut, rail des technologies et navigation redessinés" },
      { kind: "Nouveau", text: "Aperçu et code réunis, onglets Aperçu, Variations et API" },
      { kind: "Nouveau", text: "Code de la technologie active, avec ses syntaxes (Nuxt, Vue…)" },
      { kind: "Nouveau", text: "Toutes les technologies sélectionnables, avec leur API prévue" },
      {
        kind: "Corrigé",
        text: "Le Lab garde l'identité NativeSmart, l'identité choisie habille les composants"
      },
      { kind: "Corrigé", text: "Barres de défilement cohérentes dans tout le Lab" }
    ]
  },
  {
    date: "17 octobre 2026",
    title: "Tokens et premier renderer",
    changes: [
      { kind: "Nouveau", text: "Tokens complets et vérification du contraste WCAG" },
      { kind: "Nouveau", text: "Identité CV Action, sortie CSS et preset Tailwind" },
      { kind: "Nouveau", text: "@nativesmart/vue : Button, Badge et Spinner" },
      { kind: "Nouveau", text: "NativeSmart Lab avec rail des technologies" }
    ]
  },
  {
    date: "16 octobre 2026",
    title: "Contrats et plateformes",
    changes: [
      { kind: "Nouveau", text: "Inventaire de 193 composants, un contrat par composant" },
      { kind: "Nouveau", text: "Contrats des formulaires spécifiés" },
      { kind: "Nouveau", text: "Registre de 13 technologies et 14 intégrations" }
    ]
  }
];
</script>

<template>
  <DocPage
    eyebrow="Ressources"
    title="Journal des modifications"
    lead="Les évolutions de NativeSmart, des plus récentes aux plus anciennes. Aucune version n'est encore publiée : tout fait partie de la 0.1.0 en préparation."
  >
    <section v-for="release in releases" :key="release.date" class="doc__section release">
      <p class="release__date">{{ release.date }}</p>
      <h2>{{ release.title }}</h2>
      <ul class="release__changes">
        <li v-for="change in release.changes" :key="change.text">
          <span :class="['tag', change.kind === 'Corrigé' ? 'tag--fixed' : 'tag--new']">
            {{ change.kind }}
          </span>
          {{ change.text }}
        </li>
      </ul>
    </section>
  </DocPage>
</template>
