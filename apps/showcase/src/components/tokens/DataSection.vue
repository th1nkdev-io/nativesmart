<script setup lang="ts">
import { avatarColorIndex, brandThemes, mostReadable } from "@nativesmart/tokens";
import { computed, ref } from "vue";
import { state } from "../../state";
import TokenCode from "./TokenCode.vue";

const theme = computed(() => brandThemes[state.brand]);
const dataviz = computed(() => theme.value.dataviz[state.mode]);
const avatars = computed(() => theme.value.avatars[state.mode]);
/** Step labels stay readable on every step of a ramp. */
const labelColor = (color: string) => mostReadable(color, ["#ffffff", "#0f172a"]);

/* Categorical: a column chart with one series per color. */
const series = [
  { name: "Web", value: 92 },
  { name: "iOS", value: 74 },
  { name: "Android", value: 81 },
  { name: "Desktop", value: 46 },
  { name: "Tablette", value: 58 },
  { name: "TV", value: 22 },
  { name: "Montre", value: 31 },
  { name: "Auto", value: 17 },
  { name: "Kiosque", value: 39 },
  { name: "Autre", value: 12 }
];
const chart = { width: 640, height: 220, padding: 28 };
const columnWidth = (chart.width - chart.padding * 2) / series.length;
const gridLines = [0, 25, 50, 75, 100];
const y = (value: number) =>
  chart.height - chart.padding - (value / 100) * (chart.height - chart.padding * 2);

/* Sequential: a contribution grid with deterministic values. */
const weeks = 26;
const heat = Array.from({ length: weeks * 7 }, (_, index) => {
  const wave = Math.sin(index / 9) + Math.sin(index / 3.7) * 0.6 + Math.cos(index / 17);
  return Math.max(0, Math.min(9, Math.round((wave + 2.2) * 1.9)));
});

/* Diverging: a monthly variation chart. */
const variations = [-4, -3, -1, 0, 1, 2, 4, 3, 2, -2, 1, 3];
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

/* Avatars */
const people = ["Aïcha Ndiaye", "Biya Paul", "Chen Wei", "Diego Ramos", "Emma Martin", "Farid Ali"];
const typedName = ref("Ada Lovelace");
const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Séries catégorielles</h2>
        <p>
          Dix couleurs dans un ordre fixe, choisies pour rester distinctes entre elles et garder 3:1
          sur la surface. Elles sont les mêmes pour toutes les identités : un graphique ne doit pas
          changer de sens quand la marque change.
        </p>
      </header>
      <figure class="chart-card lab-preview">
        <svg
          :viewBox="`0 0 ${chart.width} ${chart.height}`"
          role="img"
          aria-label="Graphique en colonnes, une couleur par série"
        >
          <line
            v-for="line in gridLines"
            :key="line"
            :x1="chart.padding"
            :x2="chart.width - chart.padding"
            :y1="y(line)"
            :y2="y(line)"
            :stroke="line === 0 ? 'var(--ns-data-axis)' : 'var(--ns-data-grid)'"
            :stroke-width="line === 0 ? 1.5 : 1"
          />
          <rect
            v-for="(item, index) in series"
            :key="item.name"
            class="chart-card__bar"
            :style="{ animationDelay: `${index * 40}ms` }"
            :x="chart.padding + index * columnWidth + columnWidth * 0.18"
            :y="y(item.value)"
            :width="columnWidth * 0.64"
            :height="y(0) - y(item.value)"
            rx="4"
            :fill="`var(--ns-data-cat-${index + 1})`"
          />
        </svg>
        <figcaption class="legend">
          <span v-for="(item, index) in series" :key="item.name" class="legend__item">
            <i :style="{ background: `var(--ns-data-cat-${index + 1})` }" />
            {{ item.name }}
            <code>cat-{{ index + 1 }}</code>
          </span>
        </figcaption>
      </figure>
      <div class="token-inline">
        <TokenCode value="--ns-data-cat-1" />
        <span class="muted">à</span>
        <TokenCode value="--ns-data-cat-10" />
        <TokenCode value="--ns-data-grid" />
        <TokenCode value="--ns-data-axis" />
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Échelle séquentielle</h2>
        <p>
          Neuf pas de la couleur primaire de {{ theme.name }}, pour les valeurs qui vont du faible
          au fort. En mode sombre l'échelle s'inverse : les faibles valeurs se fondent dans le fond.
        </p>
      </header>
      <div class="ramp lab-preview">
        <span
          v-for="(color, index) in dataviz.sequential"
          :key="index"
          :style="{ background: `var(--ns-data-seq-${index + 1})`, color: labelColor(color) }"
          :title="`--ns-data-seq-${index + 1} · ${color}`"
        >
          {{ index + 1 }}
        </span>
      </div>
      <div class="heatmap lab-preview" role="img" aria-label="Carte de chaleur d'activité">
        <span
          v-for="(value, index) in heat"
          :key="index"
          :style="{
            background: value ? `var(--ns-data-seq-${value})` : 'var(--ns-color-surface-muted)'
          }"
        />
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Échelle divergente</h2>
        <p>
          Pour les écarts autour d'une référence : baisse à gauche, neutre au centre, hausse dans la
          couleur de la marque.
        </p>
      </header>
      <div class="ramp lab-preview">
        <span
          v-for="(color, index) in dataviz.diverging"
          :key="index"
          :style="{ background: `var(--ns-data-div-${index + 1})`, color: labelColor(color) }"
          :title="`--ns-data-div-${index + 1} · ${color}`"
        >
          {{ index - 4 > 0 ? `+${index - 4}` : index - 4 }}
        </span>
      </div>
      <div class="diverging lab-preview" role="img" aria-label="Variation mensuelle">
        <div v-for="(value, index) in variations" :key="index" class="diverging__col">
          <span
            class="diverging__bar"
            :style="{
              '--size': `${Math.abs(value) * 12}%`,
              background: `var(--ns-data-div-${value + 5})`
            }"
            :data-sign="value < 0 ? 'neg' : 'pos'"
          />
          <small>{{ months[index] }}</small>
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Avatars</h2>
        <p>
          Huit paires fond et initiales à 4,5:1. La couleur se déduit du nom : une personne garde la
          même couleur sur toutes les plateformes, sans rien stocker.
        </p>
      </header>
      <div class="avatar-board lab-preview">
        <div class="avatar-row">
          <span
            v-for="(pair, index) in avatars"
            :key="index"
            class="avatar"
            :style="{ background: pair.background, color: pair.foreground }"
            :title="`--ns-avatar-${index + 1}-bg`"
          >
            {{ index + 1 }}
          </span>
        </div>
        <div class="avatar-row">
          <span v-for="person in people" :key="person" class="avatar-person">
            <span
              class="avatar"
              :style="{
                background: `var(--ns-avatar-${avatarColorIndex(person) + 1}-bg)`,
                color: `var(--ns-avatar-${avatarColorIndex(person) + 1}-fg)`
              }"
            >
              {{ initials(person) }}
            </span>
            {{ person }}
          </span>
        </div>
        <label class="avatar-try">
          <span
            class="avatar avatar--lg"
            :style="{
              background: `var(--ns-avatar-${avatarColorIndex(typedName) + 1}-bg)`,
              color: `var(--ns-avatar-${avatarColorIndex(typedName) + 1}-fg)`
            }"
          >
            {{ initials(typedName) || "?" }}
          </span>
          <span class="avatar-try__field">
            <small>Tapez un nom</small>
            <input v-model="typedName" type="text" autocomplete="off" spellcheck="false" />
          </span>
          <code>avatarColorIndex → {{ avatarColorIndex(typedName) + 1 }}</code>
        </label>
      </div>
    </section>
  </div>
</template>
