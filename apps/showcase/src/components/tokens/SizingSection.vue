<script setup lang="ts">
import { primitives } from "@nativesmart/tokens";
import TokenCode from "./TokenCode.vue";

const { control, icon, touchTarget, container } = primitives.sizing;
const widest = Math.max(...Object.values(container));
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Hauteur des contrôles</h2>
        <p>Boutons, champs, listes déroulantes et onglets partagent les mêmes hauteurs.</p>
      </header>
      <div class="controls-demo">
        <div v-for="(value, key) in control" :key="key" class="controls-demo__item">
          <span
            class="controls-demo__box"
            :style="{ blockSize: `var(--ns-control-height-${key})` }"
          >
            {{ key }}
          </span>
          <small>{{ value }}px</small>
          <TokenCode :value="`--ns-control-height-${key}`" />
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Icônes</h2>
        <p>Tailles d'icônes, alignées sur les hauteurs de texte et de contrôles.</p>
      </header>
      <div class="icon-demo">
        <div v-for="(value, key) in icon" :key="key" class="icon-demo__item">
          <svg
            :width="value"
            :height="value"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <strong>{{ key }}</strong>
          <small>{{ value }}px</small>
          <TokenCode :value="`--ns-icon-size-${key}`" />
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Zone tactile</h2>
        <p>
          Toute zone interactive mesure au moins {{ touchTarget }} × {{ touchTarget }} px (Apple
          HIG, WCAG 2.2), même si son dessin est plus petit.
        </p>
      </header>
      <div class="touch-demo">
        <span class="touch-demo__area">
          <span class="touch-demo__icon" />
        </span>
        <div>
          <strong>{{ touchTarget }} px</strong>
          <p class="muted">Zone pointillée : surface cliquable. Carré plein : icône de 20 px.</p>
          <TokenCode value="--ns-touch-target" />
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Conteneurs</h2>
        <p>Largeurs maximales du contenu selon la taille d'écran.</p>
      </header>
      <div class="container-demo">
        <div v-for="(value, key) in container" :key="key" class="container-demo__row">
          <strong>{{ key }}</strong>
          <span class="container-demo__track">
            <span :style="{ inlineSize: `${(value / widest) * 100}%` }" />
          </span>
          <small class="numeric">{{ value }}px</small>
          <TokenCode :value="`--ns-container-${key}`" />
        </div>
      </div>
    </section>
  </div>
</template>
