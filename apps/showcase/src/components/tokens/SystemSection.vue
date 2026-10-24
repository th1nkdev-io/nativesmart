<script setup lang="ts">
import { primitives } from "@nativesmart/tokens";
import TokenCode from "./TokenCode.vue";

const { zIndex, opacity, breakpoints, density, sizing } = primitives;
const screens = Object.entries(breakpoints).filter(([key]) => !["phone", "tablet"].includes(key));
const densities = [
  { key: "compact", label: "Compacte", factor: density.compact },
  { key: "comfortable", label: "Confortable", factor: density.comfortable },
  { key: "spacious", label: "Spacieuse", factor: density.spacious }
];

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
        <div
          v-for="item in densities"
          :key="item.key"
          class="density"
          :data-ns-density="item.key === 'comfortable' ? undefined : item.key"
        >
          <strong>{{ item.label }} · ×{{ item.factor }}</strong>
          <span
            v-for="(value, key) in sizing.control"
            :key="key"
            class="density__control"
            :style="{ blockSize: `var(--ns-control-height-${key})` }"
          >
            {{ key }}
          </span>
          <TokenCode :value="`data-ns-density=&quot;${item.key}&quot;`" />
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Couches</h2>
        <p>Ordre d'empilement des éléments, de la page jusqu'aux infobulles.</p>
      </header>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Couche</th>
              <th>Valeur</th>
              <th>Usage</th>
              <th>Variable</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key) in zIndex" :key="key">
              <td>
                <strong>{{ key }}</strong>
              </td>
              <td class="numeric">{{ value }}</td>
              <td>{{ zUsage[key] }}</td>
              <td><TokenCode :value="`--ns-z-${key}`" /></td>
            </tr>
          </tbody>
        </table>
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
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>À partir de</th>
              <th>Appareils typiques</th>
              <th>Media query</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="[key, value] in screens" :key="key">
              <td>
                <strong>{{ key }}</strong>
              </td>
              <td class="numeric">{{ value }}px</td>
              <td>
                {{
                  {
                    sm: "Grands téléphones",
                    md: "Tablettes",
                    lg: "Ordinateurs portables",
                    xl: "Ordinateurs de bureau",
                    "2xl": "Grands écrans"
                  }[key]
                }}
              </td>
              <td><TokenCode :value="`@media (min-width: ${value}px)`" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
