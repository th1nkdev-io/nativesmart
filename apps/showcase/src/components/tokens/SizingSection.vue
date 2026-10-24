<script setup lang="ts">
import { primitives } from "@nativesmart/tokens";
import ScaleRows from "./ScaleRows.vue";
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

const controlUsage: Record<keyof typeof control, string> = {
  xs: "Puces, petits filtres",
  sm: "Barres d'outils, tableaux denses",
  md: "Par défaut : boutons, champs",
  lg: "Formulaires mobiles, actions principales",
  xl: "Écrans d'accueil, appels à l'action"
};
const controlRows = (Object.keys(control) as (keyof typeof control)[]).map((key) => ({
  id: key,
  name: key,
  value: `${control[key]} px`,
  note: controlUsage[key],
  token: `--ns-control-height-${key}`
}));

const iconUsage: Record<keyof typeof icon, string> = {
  "2xs": "Pastilles, indicateurs",
  xs: "Dans un badge",
  sm: "Avec un texte de 14 px",
  md: "Par défaut : boutons, menus",
  lg: "Barres d'outils, navigation",
  xl: "Cartes, états vides",
  "2xl": "Mises en avant",
  "3xl": "Illustrations"
};
const iconRows = (Object.keys(icon) as (keyof typeof icon)[]).map((key) => ({
  id: key,
  name: key,
  value: `${icon[key]} px`,
  note: iconUsage[key],
  token: `--ns-icon-size-${key}`
}));

const avatarUsage: Record<keyof typeof avatar, string> = {
  xs: "Mentions, listes denses",
  sm: "Commentaires",
  md: "Par défaut : listes, en-têtes",
  lg: "Cartes de contact",
  xl: "Fiches, conversations",
  "2xl": "Page de profil"
};
const avatarRows = (Object.keys(avatar) as (keyof typeof avatar)[]).map((key, index) => ({
  id: key,
  index,
  name: key,
  value: `${avatar[key]} px`,
  note: avatarUsage[key],
  token: `--ns-avatar-size-${key}`
}));
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
      <ScaleRows :rows="controlRows" sample="200px">
        <template #sample="{ row }">
          <span class="sample-control" :style="{ blockSize: `var(--ns-control-height-${row.id})` }">
            Continuer
          </span>
        </template>
      </ScaleRows>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Icônes et avatars</h2>
        <p>Des tailles alignées sur le texte et les contrôles, pour que tout tombe juste.</p>
      </header>
      <div class="token-group">
        <div class="token-group__title">
          <h3>Icônes</h3>
          <p>Huit tailles, de l'indicateur de 10 px à l'illustration de 48 px.</p>
        </div>
        <ScaleRows :rows="iconRows" sample="72px">
          <template #sample="{ row }">
            <svg
              class="sample-icon"
              :width="icon[row.id as keyof typeof icon]"
              :height="icon[row.id as keyof typeof icon]"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </template>
        </ScaleRows>
      </div>
      <div class="token-group">
        <div class="token-group__title">
          <h3>Avatars</h3>
          <p>Six tailles, de la mention dans un fil à la page de profil.</p>
        </div>
        <ScaleRows :rows="avatarRows" sample="112px">
          <template #sample="{ row }">
            <span
              class="avatar"
              :style="{
                inlineSize: `var(--ns-avatar-size-${row.id})`,
                blockSize: `var(--ns-avatar-size-${row.id})`,
                fontSize: `${Math.max(10, avatar[row.id as keyof typeof avatar] * 0.38)}px`,
                background: `var(--ns-avatar-${row.index + 1}-bg)`,
                color: `var(--ns-avatar-${row.index + 1}-fg)`
              }"
            >
              {{ people[row.index] }}
            </span>
          </template>
        </ScaleRows>
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
