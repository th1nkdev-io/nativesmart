<script setup lang="ts">
import { primitives } from "@nativesmart/tokens";
import TokenCode from "./TokenCode.vue";

const { control, icon, avatar, touchTargets, dialog, floating } = primitives.sizing;
const ratios = primitives.aspectRatios;

const targetText: Record<keyof typeof touchTargets, { label: string; source: string }> = {
  minimum: { label: "Minimum", source: "WCAG 2.2 AA · 2.5.8" },
  comfortable: { label: "Confortable", source: "Apple HIG · WCAG AAA" },
  android: { label: "Android", source: "Material Design" }
};

const floatingText: Record<keyof typeof floating, string> = {
  tooltip: "Infobulle",
  popover: "Popover",
  menu: "Menu",
  toast: "Notification"
};

const ratioText: Record<keyof typeof ratios, string> = {
  square: "Carré · avatars, vignettes",
  photo: "Photo · cartes produit",
  video: "Vidéo · lecteurs, bannières",
  wide: "Panoramique · héros",
  portrait: "Portrait · profils",
  story: "Story · formats verticaux"
};

/** Dialog widths drawn inside a 1280px screen. */
const screen = 1280;
const people = ["AN", "KM", "CW", "DR", "EM", "FA"];
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Hauteur des contrôles</h2>
        <p>
          Boutons, champs, listes déroulantes et onglets partagent les mêmes hauteurs, ajustées par
          la densité.
        </p>
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
        <h2>Icônes et avatars</h2>
        <p>Huit tailles d'icônes et six d'avatars, alignées sur le texte et les contrôles.</p>
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
      <div class="avatar-sizes lab-preview">
        <div v-for="(value, key, index) in avatar" :key="key" class="avatar-sizes__item">
          <span
            class="avatar"
            :style="{
              inlineSize: `${value}px`,
              blockSize: `${value}px`,
              fontSize: `${Math.max(10, value * 0.38)}px`,
              background: `var(--ns-avatar-${index + 1}-bg)`,
              color: `var(--ns-avatar-${index + 1}-fg)`
            }"
          >
            {{ people[index] }}
          </span>
          <strong>{{ key }}</strong>
          <small>{{ value }}px</small>
          <TokenCode :value="`--ns-avatar-size-${key}`" />
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Zones tactiles</h2>
        <p>
          La zone qu'on peut toucher compte plus que le dessin. Pointillés : surface active ; carré
          plein : icône de 20 px.
        </p>
      </header>
      <div class="target-grid">
        <article v-for="(value, key) in touchTargets" :key="key" class="target">
          <span class="target__area" :style="{ inlineSize: `${value}px`, blockSize: `${value}px` }">
            <span class="target__icon" />
          </span>
          <strong>{{ targetText[key].label }} · {{ value }} px</strong>
          <small class="muted">{{ targetText[key].source }}</small>
          <TokenCode :value="`--ns-touch-target-${key}`" />
        </article>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Dialogues et contenus flottants</h2>
        <p>
          Quatre largeurs de dialogue, dessinées ici dans un écran de {{ screen }} px. Sur
          téléphone, un dialogue prend toute la largeur.
        </p>
      </header>
      <div class="dialog-stage">
        <span
          v-for="(value, key) in dialog"
          :key="key"
          class="dialog-stage__box"
          :style="{ inlineSize: `${(value / screen) * 100}%` }"
        >
          <span>{{ key }} · {{ value }} px</span>
        </span>
      </div>
      <div class="floating-list">
        <div v-for="(value, key) in floating" :key="key" class="floating-row">
          <strong>{{ floatingText[key] }}</strong>
          <span class="floating-row__track">
            <span :style="{ inlineSize: `${(value / 400) * 100}%` }">{{ value }} px max</span>
          </span>
          <TokenCode :value="`--ns-${key}-max-width`" />
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Ratios</h2>
        <p>Six formats pour les images et les vidéos, en CSS <code>aspect-ratio</code>.</p>
      </header>
      <div class="ratio-grid lab-preview">
        <figure v-for="(value, key) in ratios" :key="key" class="ratio">
          <span class="ratio__box" :style="{ aspectRatio: `var(--ns-aspect-${key})` }">
            {{ value.replace(/ /g, "") }}
          </span>
          <figcaption>
            <strong>{{ key }}</strong>
            <small class="muted">{{ ratioText[key] }}</small>
            <TokenCode :value="`--ns-aspect-${key}`" />
          </figcaption>
        </figure>
      </div>
    </section>
  </div>
</template>
