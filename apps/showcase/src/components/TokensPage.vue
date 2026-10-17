<script setup lang="ts">
import {
  brandThemes,
  cssColorVariable,
  primitives,
  semanticColorRoles,
  type SemanticColorRole
} from "@nativesmart/tokens";
import { computed } from "vue";
import { state } from "../state";

const theme = computed(() => brandThemes[state.brand]);
const colors = computed(() => theme.value.colors[state.mode]);

const groups: { title: string; roles: SemanticColorRole[] }[] = [
  {
    title: "Surfaces et texte",
    roles: semanticColorRoles.filter((role) =>
      /^(background|surface|border|text|overlay)/.test(role)
    )
  },
  {
    title: "Marque",
    roles: semanticColorRoles.filter((role) => /primary|secondary|accent|focus/i.test(role))
  },
  {
    title: "Statuts",
    roles: semanticColorRoles.filter((role) => /success|warning|danger|info|offline/i.test(role))
  }
];

const fontSizes = Object.entries(primitives.typography.fontSize);
const radii = Object.entries(primitives.radius).filter(([key]) => key !== "none");
const spacing = Object.entries(primitives.spacing).filter(([, value]) => value > 0);
const shadows = Object.keys(primitives.shadows).filter((key) => key !== "none");
</script>

<template>
  <article class="page">
    <header class="page__header">
      <p class="eyebrow">Identité visuelle</p>
      <h1>{{ theme.name }}</h1>
      <p class="lead">{{ theme.description }}</p>
    </header>

    <section v-for="group in groups" :key="group.title" class="card">
      <h2>{{ group.title }}</h2>
      <div class="swatches">
        <div v-for="role in group.roles" :key="role" class="swatch">
          <span class="swatch__color" :style="{ background: `var(${cssColorVariable(role)})` }" />
          <strong>{{ role }}</strong>
          <code>{{ colors[role] }}</code>
        </div>
      </div>
    </section>

    <section class="card">
      <h2>Typographie</h2>
      <p class="type-sample" style="font-family: var(--ns-font-heading); font-size: 32px">
        Titre · {{ theme.typography.fontFamily.heading[0] }}
      </p>
      <p class="type-sample" style="font-family: var(--ns-font-sans)">
        Texte courant · {{ theme.typography.fontFamily.sans[0] }} — Envoyez 25 000 FCFA en toute
        sécurité.
      </p>
      <p class="type-sample" style="font-family: var(--ns-font-mono)">
        Code · {{ theme.typography.fontFamily.mono[0] }} — --ns-color-primary
      </p>
      <div class="scale">
        <span v-for="[key, size] in fontSizes" :key="key" :style="{ fontSize: `${size}px` }">
          {{ key }} · {{ size }}px
        </span>
      </div>
    </section>

    <section class="card">
      <h2>Formes, espacements et ombres</h2>
      <div class="shapes">
        <div v-for="[key, value] in radii" :key="key" class="shape">
          <span :style="{ borderRadius: `var(--ns-radius-${key})` }" />
          <code>radius.{{ key }} · {{ value }}</code>
        </div>
      </div>
      <div class="spacing">
        <div v-for="[key, value] in spacing" :key="key">
          <span :style="{ inlineSize: `${value}px` }" />
          <code>space.{{ key }} · {{ value }}px</code>
        </div>
      </div>
      <div class="shapes">
        <div v-for="key in shadows" :key="key" class="shape">
          <span class="shape--raised" :style="{ boxShadow: `var(--ns-shadow-${key})` }" />
          <code>shadow.{{ key }}</code>
        </div>
      </div>
    </section>
  </article>
</template>
