<script setup lang="ts">
import { primitives } from "@nativesmart/tokens";
import { computed, ref } from "vue";
import { icons, type IconName } from "../../editorial/icons";
import TokenCode from "./TokenCode.vue";

const { iconography } = primitives;
const sizes = primitives.sizing.icon;

const stroke = ref<keyof typeof iconography.stroke>("regular");
const size = ref<keyof typeof sizes>("lg");
const names = Object.keys(icons) as IconName[];
const filter = ref("");
const shown = computed(() =>
  names.filter((name) => name.toLowerCase().includes(filter.value.trim().toLowerCase()))
);

const strokeText: Record<keyof typeof iconography.stroke, string> = {
  thin: "Fine · grandes tailles, illustrations",
  regular: "Normale · interface, par défaut",
  bold: "Épaisse · petites tailles, mise en avant"
};

const pairs = Object.entries(iconography.forText) as [
  keyof typeof primitives.typography.fontSize,
  keyof typeof sizes
][];

/** Live area of the grid, inside its padding. */
const live = iconography.grid - iconography.padding * 2;
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Grille de dessin</h2>
        <p>
          Chaque icône se dessine sur {{ iconography.grid }} unités, avec
          {{ iconography.padding }} unités de marge : la zone utile fait {{ live }} unités. Traits
          arrondis, coins de {{ iconography.cornerRadius }} unités, couleur héritée du texte.
        </p>
      </header>
      <div class="icon-anatomy">
        <svg viewBox="-1 -1 26 26" class="icon-anatomy__grid" aria-hidden="true">
          <defs>
            <pattern id="icon-cells" width="1" height="1" patternUnits="userSpaceOnUse">
              <path d="M1 0H0V1" class="icon-anatomy__cell" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="24" height="24" fill="url(#icon-cells)" />
          <rect x="2" y="2" width="20" height="20" class="icon-anatomy__live" />
          <circle cx="12" cy="12" r="10" class="icon-anatomy__keyline" />
          <rect x="3" y="3" width="18" height="18" rx="2" class="icon-anatomy__keyline" />
          <path :d="icons.shield" class="icon-anatomy__glyph" />
        </svg>
        <ul class="icon-anatomy__notes">
          <li><i class="is-live" /> Zone utile · {{ live }} × {{ live }}</li>
          <li><i class="is-keyline" /> Gabarits : cercle et carré arrondi</li>
          <li><i class="is-glyph" /> Trait {{ iconography.stroke.regular }} · extrémités rondes</li>
        </ul>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Épaisseurs et tailles</h2>
        <p>
          Trois épaisseurs de trait et huit tailles. Essayez-les sur la bibliothèque d'icônes du
          Lab.
        </p>
      </header>
      <div class="icon-controls">
        <div class="seg" role="radiogroup" aria-label="Épaisseur">
          <button
            v-for="(value, key) in iconography.stroke"
            :key="key"
            type="button"
            role="radio"
            :aria-checked="stroke === key"
            :title="strokeText[key]"
            @click="stroke = key"
          >
            {{ key }} · {{ value }}
          </button>
        </div>
        <div class="seg" role="radiogroup" aria-label="Taille">
          <button
            v-for="(value, key) in sizes"
            :key="key"
            type="button"
            role="radio"
            :aria-checked="size === key"
            @click="size = key"
          >
            {{ key }}
          </button>
        </div>
        <label class="icon-filter">
          <span class="sr-only">Filtrer les icônes</span>
          <input v-model="filter" type="search" placeholder="Filtrer…" />
        </label>
      </div>
      <div class="icon-library lab-preview">
        <figure v-for="name in shown" :key="name" class="icon-library__item">
          <svg
            viewBox="0 0 24 24"
            :width="sizes[size]"
            :height="sizes[size]"
            :style="{ strokeWidth: `var(--ns-icon-stroke-${stroke})` }"
            aria-hidden="true"
          >
            <path :d="icons[name]" />
          </svg>
          <figcaption>{{ name }}</figcaption>
        </figure>
        <p v-if="!shown.length" class="muted">Aucune icône pour « {{ filter }} ».</p>
      </div>
      <div class="token-inline">
        <TokenCode :value="`--ns-icon-stroke-${stroke}`" />
        <TokenCode :value="`--ns-icon-size-${size}`" />
        <span class="muted">{{ sizes[size] }} px · {{ strokeText[stroke] }}</span>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Icône et texte</h2>
        <p>
          À côté d'un libellé, l'icône prend la taille associée au texte et s'en écarte de
          {{ iconography.gap }} em. Elle s'aligne sur la hauteur des minuscules, pas sur la ligne de
          base.
        </p>
      </header>
      <div class="icon-pairs lab-preview">
        <div v-for="[text, icon] in pairs" :key="text" class="icon-pair">
          <span
            class="icon-pair__sample"
            :style="{ fontSize: `${primitives.typography.fontSize[text]}px` }"
          >
            <svg viewBox="0 0 24 24" :width="sizes[icon]" :height="sizes[icon]" aria-hidden="true">
              <path :d="icons.check" />
            </svg>
            Paiement validé
          </span>
          <small class="numeric">
            texte {{ text }} · {{ primitives.typography.fontSize[text] }} px → icône {{ icon }} ·
            {{ sizes[icon] }} px
          </small>
        </div>
      </div>
      <TokenCode value="--ns-icon-gap" />
    </section>
  </div>
</template>
