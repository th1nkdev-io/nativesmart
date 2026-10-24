<script setup lang="ts">
import { primitives } from "@nativesmart/tokens";
import { onBeforeUnmount, ref } from "vue";
import Icon from "../../editorial/Icon.vue";
import type { IconName } from "../../editorial/icons";
import TokenCode from "./TokenCode.vue";

const { zIndex, opacity, breakpoints, density, sizing } = primitives;
const screens = Object.entries(breakpoints).filter(([key]) => !["phone", "tablet"].includes(key));
const densities = [
  { key: "compact", label: "Compacte", factor: density.compact },
  { key: "comfortable", label: "Confortable", factor: density.comfortable },
  { key: "spacious", label: "Spacieuse", factor: density.spacious }
];

const layers = Object.entries(zIndex) as [keyof typeof zIndex, number][];
const hovered = ref<string>("modal");

/* Breakpoints on a ruler from 0 to 1600 px, with the current window marked. */
const rulerMax = 1600;
const devices: Record<string, { label: string; icon: IconName }> = {
  base: { label: "Téléphones", icon: "smartphone" },
  sm: { label: "Grands téléphones", icon: "smartphone" },
  md: { label: "Tablettes", icon: "tablet" },
  lg: { label: "Ordinateurs portables", icon: "laptop" },
  xl: { label: "Ordinateurs de bureau", icon: "monitor" },
  "2xl": { label: "Grands écrans", icon: "monitor" }
};
const ranges = [["base", 0] as [string, number], ...screens].map(([key, from], index, list) => ({
  key,
  from,
  to: list[index + 1]?.[1] ?? rulerMax,
  ...devices[key]
}));
const viewport = ref(window.innerWidth);
const onResize = () => (viewport.value = window.innerWidth);
window.addEventListener("resize", onResize);
onBeforeUnmount(() => window.removeEventListener("resize", onResize));
const percent = (value: number) => `${(Math.min(value, rulerMax) / rulerMax) * 100}%`;
const currentRange = () =>
  [...ranges].reverse().find((range) => viewport.value >= range.from)?.key ?? "base";

const zUsage: Record<string, string> = {
  base: "Contenu de la page",
  raised: "Éléments surélevés dans le flux",
  dropdown: "Listes déroulantes",
  sticky: "En-têtes et barres collantes",
  overlay: "Voile derrière une modale",
  modal: "Modales et bottom sheets",
  popover: "Popovers au-dessus d'une modale",
  toast: "Notifications",
  tooltip: "Infobulles, toujours au-dessus"
};

const opacityUsage: Record<string, string> = {
  disabled: "Éléments désactivés",
  muted: "Contenu atténué",
  overlay: "Voile des modales",
  hover: "Calque de survol",
  focus: "Calque de focus clavier",
  pressed: "Calque d'appui",
  selected: "Calque de sélection",
  dragged: "Calque de glisser"
};
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Densité</h2>
        <p>
          La densité ajuste la hauteur de tous les contrôles d'une zone avec
          <code>data-ns-density</code> : compacte pour les tableaux de bord, spacieuse pour le
          tactile et l'accessibilité.
        </p>
      </header>
      <div class="density-grid">
        <figure
          v-for="item in densities"
          :key="item.key"
          class="density"
          :data-ns-density="item.key === 'comfortable' ? undefined : item.key"
        >
          <figcaption class="density__head">
            <strong>{{ item.label }}</strong>
            <span class="density__factor">×{{ item.factor }}</span>
          </figcaption>
          <div class="density__form" aria-hidden="true">
            <span class="density__label">Adresse e-mail</span>
            <span class="density__input">ada@exemple.com</span>
            <span class="density__list">
              <span v-for="row in ['Notifications', 'Confidentialité', 'Langue']" :key="row">
                {{ row }} <i />
              </span>
            </span>
            <span class="density__actions">
              <span class="density__button">Enregistrer</span>
              <span class="density__button density__button--soft">Annuler</span>
            </span>
          </div>
          <span class="density__measure">
            Champ md · {{ Math.round((sizing.control.md * item.factor) / 2) * 2 }} px
          </span>
          <TokenCode
            :value="
              item.key === 'comfortable' ? 'par défaut' : `data-ns-density=&quot;${item.key}&quot;`
            "
          />
        </figure>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Couches</h2>
        <p>Ordre d'empilement des éléments, de la page jusqu'aux infobulles.</p>
      </header>
      <div class="zstack">
        <div class="zstack__scene" aria-hidden="true">
          <div class="zstack__planes">
            <span
              v-for="([key], index) in layers"
              :key="key"
              :class="['zstack__plane', { 'is-on': hovered === key }]"
              :style="{ '--i': index, '--n': layers.length }"
            >
              <b>{{ key }}</b>
            </span>
          </div>
        </div>
        <ol class="zstack__list">
          <li
            v-for="[key, value] in [...layers].reverse()"
            :key="key"
            :class="{ 'is-on': hovered === key }"
            tabindex="0"
            @mouseenter="hovered = key"
            @focus="hovered = key"
          >
            <span class="zstack__value numeric">{{ value }}</span>
            <span class="zstack__text">
              <strong>{{ key }}</strong>
              <small>{{ zUsage[key] }}</small>
            </span>
            <TokenCode :value="`--ns-z-${key}`" />
          </li>
        </ol>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Opacités</h2>
        <p>États et calques, appliqués sur la couleur primaire pour l'exemple.</p>
      </header>
      <div class="opacity-grid">
        <div v-for="(value, key) in opacity" :key="key" class="opacity">
          <span class="opacity__checker">
            <span :style="{ opacity: value }" />
          </span>
          <strong>{{ key }} · {{ value }}</strong>
          <span class="muted">{{ opacityUsage[key] }}</span>
          <TokenCode :value="`--ns-opacity-${key}`" />
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Points de rupture</h2>
        <p>Largeurs d'écran minimales des mises en page adaptatives, alignées sur Tailwind.</p>
      </header>
      <div class="ruler lab-preview">
        <div class="ruler__track">
          <span
            v-for="(range, index) in ranges"
            :key="range.key"
            :class="['ruler__range', { 'is-current': currentRange() === range.key }]"
            :style="{
              insetInlineStart: percent(range.from),
              inlineSize: `calc(${percent(range.to)} - ${percent(range.from)})`,
              '--i': index
            }"
          >
            <Icon :name="range.icon" :size="18" />
            <strong>{{ range.key }}</strong>
          </span>
          <span
            class="ruler__now"
            :style="{ insetInlineStart: percent(viewport) }"
            :title="`Votre fenêtre : ${viewport} px`"
          >
            <small>Vous · {{ viewport }} px</small>
          </span>
        </div>
        <div class="ruler__ticks" aria-hidden="true">
          <span
            v-for="range in ranges.slice(1)"
            :key="range.key"
            :style="{ insetInlineStart: percent(range.from) }"
            >{{ range.from }}</span
          >
        </div>
      </div>
      <div class="ruler-list">
        <div v-for="range in ranges.slice(1)" :key="range.key" class="ruler-list__row">
          <span class="ruler-list__icon"><Icon :name="range.icon" :size="16" /></span>
          <strong>{{ range.key }}</strong>
          <span class="muted">{{ range.label }} · dès {{ range.from }} px</span>
          <TokenCode :value="`@media (min-width: ${range.from}px)`" />
        </div>
      </div>
    </section>
  </div>
</template>
