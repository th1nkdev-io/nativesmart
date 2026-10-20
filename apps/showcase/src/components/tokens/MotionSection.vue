<script setup lang="ts">
import { primitives } from "@nativesmart/tokens";
import { ref } from "vue";
import TokenCode from "./TokenCode.vue";

const played = ref(false);
const slowMotion = ref(false);
const { duration, easing } = primitives.motion;

const easingUsage: Record<string, string> = {
  standard: "Par défaut : la plupart des transitions",
  emphasized: "Mouvements expressifs, léger dépassement",
  decelerate: "Éléments qui entrent à l'écran",
  accelerate: "Éléments qui quittent l'écran",
  linear: "Rotations et indicateurs continus"
};

const durationUsage: Record<string, string> = {
  instant: "Changement immédiat",
  fast: "Survol, appui, petits éléments",
  normal: "Ouverture de menus, onglets",
  slow: "Modales, bottom sheets",
  slower: "Grandes transitions de page"
};

function replay() {
  played.value = false;
  requestAnimationFrame(() => requestAnimationFrame(() => (played.value = true)));
}
</script>

<template>
  <div class="token-sections" :class="{ 'motion--slow': slowMotion }">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Mouvement</h2>
        <p>
          Durées et courbes d'animation communes à tous les composants. Les animations respectent le
          réglage « réduire les animations » du système.
        </p>
        <div class="motion-actions">
          <button type="button" class="primary-button" @click="replay">Rejouer</button>
          <label class="motion-toggle">
            <input v-model="slowMotion" type="checkbox" class="switch" />
            Ralenti ×4
          </label>
        </div>
      </header>

      <h3 class="token-subtitle">Courbes</h3>
      <div class="motion-list">
        <div v-for="(value, key) in easing" :key="key" class="motion-row">
          <div class="motion-row__meta">
            <strong>{{ key }}</strong>
            <span class="muted">{{ easingUsage[key] }}</span>
            <TokenCode :value="`--ns-easing-${key}`" />
          </div>
          <div class="motion-track">
            <span
              :class="['motion-dot', { 'motion-dot--end': played }]"
              :style="{
                transitionDuration: `calc(var(--ns-duration-slower) * var(--motion-factor, 1))`,
                transitionTimingFunction: value
              }"
            />
          </div>
        </div>
      </div>

      <h3 class="token-subtitle">Durées</h3>
      <div class="motion-list">
        <div v-for="(value, key) in duration" :key="key" class="motion-row">
          <div class="motion-row__meta">
            <strong>{{ key }} · {{ value }}ms</strong>
            <span class="muted">{{ durationUsage[key] }}</span>
            <TokenCode :value="`--ns-duration-${key}`" />
          </div>
          <div class="motion-track">
            <span
              :class="['motion-dot', { 'motion-dot--end': played }]"
              :style="{
                transitionDuration: `calc(${value}ms * var(--motion-factor, 1))`,
                transitionTimingFunction: 'var(--ns-easing-standard)'
              }"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
