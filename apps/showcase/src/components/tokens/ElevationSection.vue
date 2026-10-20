<script setup lang="ts">
import { primitives } from "@nativesmart/tokens";

import TokenCode from "./TokenCode.vue";

const levels = Object.keys(primitives.elevation);
const usages: Record<string, string> = {
  "0": "À plat : page, éléments intégrés",
  "1": "Cartes, champs",
  "2": "Cartes au survol, barres collantes",
  "3": "Menus, listes déroulantes, popovers",
  "4": "Toasts, bottom sheets",
  "5": "Modales et dialogues"
};
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Élévation</h2>
        <p>
          Six niveaux d'ombres. Leur teinte vient de l'identité, et elles sont renforcées en mode
          sombre où les ombres se voient moins. Basculez en mode sombre pour comparer.
        </p>
      </header>
      <div class="elevation-grid">
        <article
          v-for="level in levels"
          :key="level"
          class="elevation"
          :style="{ boxShadow: `var(--ns-elevation-${level})` }"
        >
          <strong>{{ level }}</strong>
          <span class="muted">{{ usages[level] }}</span>
          <TokenCode :value="`--ns-elevation-${level}`" />
        </article>
      </div>
    </section>
  </div>
</template>
