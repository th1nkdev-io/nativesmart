<script setup lang="ts">
import { brandThemes, primitives } from "@nativesmart/tokens";
import { computed } from "vue";
import { state } from "../../state";
import TokenCode from "./TokenCode.vue";

const theme = computed(() => brandThemes[state.brand]);
const radii = Object.entries(primitives.radius);
const usages = computed(() =>
  [
    { key: "control", label: "Contrôles", example: "Boutons, champs, onglets" },
    { key: "card", label: "Cartes", example: "Cartes, panneaux, tableaux" },
    { key: "overlay", label: "Surfaces flottantes", example: "Modales, menus, bottom sheets" },
    { key: "badge", label: "Badges", example: "Badges, puces, avatars de statut" }
  ].map((item) => ({
    ...item,
    value: theme.value.shape[item.key as keyof typeof theme.value.shape]
  }))
);
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Rayons par usage</h2>
        <p>
          Chaque identité choisit ses arrondis par usage. C'est l'un des marqueurs les plus visibles
          d'une marque : {{ theme.name }} les définit ainsi.
        </p>
      </header>
      <div class="usage-grid">
        <article v-for="usage in usages" :key="usage.key" class="usage">
          <div class="usage__demo">
            <span
              v-if="usage.key === 'control'"
              class="usage__control"
              :style="{ borderRadius: 'var(--ns-radius-control)' }"
            >
              Envoyer
            </span>
            <span
              v-else-if="usage.key === 'card'"
              class="usage__card"
              :style="{ borderRadius: 'var(--ns-radius-card)' }"
            />
            <span
              v-else-if="usage.key === 'overlay'"
              class="usage__overlay"
              :style="{ borderRadius: 'var(--ns-radius-overlay)' }"
            />
            <span v-else class="usage__badge" :style="{ borderRadius: 'var(--ns-radius-badge)' }">
              Payé
            </span>
          </div>
          <strong>{{ usage.label }}</strong>
          <span class="muted">{{ usage.example }}</span>
          <span class="type-row__spec">
            radius.{{ usage.value }} · {{ primitives.radius[usage.value] }}px
          </span>
          <TokenCode :value="`--ns-radius-${usage.key}`" />
        </article>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Échelle des rayons</h2>
        <p>Valeurs disponibles pour les usages et les cas particuliers.</p>
      </header>
      <div class="radius-grid">
        <div v-for="[key, value] in radii" :key="key" class="radius">
          <span :style="{ borderRadius: `var(--ns-radius-${key})` }" />
          <strong>{{ key }}</strong>
          <small>{{ key === "full" ? "9999px" : `${value}px` }}</small>
          <TokenCode :value="`--ns-radius-${key}`" />
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Bordures et focus</h2>
        <p>
          Épaisseurs de bordure et anneau de focus visible au clavier :
          {{ primitives.borders.focusRing.width }} px, décalé de
          {{ primitives.borders.focusRing.offset }} px, couleur <code>focusRing</code>.
        </p>
      </header>
      <div class="border-grid">
        <div v-for="(value, key) in primitives.borders.width" :key="key" class="border-demo">
          <span :style="{ borderWidth: `${value}px` }" />
          <strong>{{ key }}</strong>
          <small>{{ value }}px</small>
          <TokenCode :value="`--ns-border-width-${key}`" />
        </div>
        <div class="border-demo">
          <span class="border-demo__focus" />
          <strong>focus ring</strong>
          <small>
            {{ primitives.borders.focusRing.width }} / {{ primitives.borders.focusRing.offset }}px
          </small>
          <TokenCode value="--ns-focus-ring-width" />
        </div>
      </div>
    </section>
  </div>
</template>
