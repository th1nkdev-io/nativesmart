<script setup lang="ts">
import { state } from "../state";
import { getTechnology, technologyFamilies, type Technology } from "../technologies";

/** Brand color of the logo, or the text color when the brand color is too dark to read. */
function iconColor(technology: Technology) {
  const hex = technology.icon?.hex ?? "";
  const value = Number.parseInt(hex, 16);
  const luminance =
    ((value >> 16) & 255) * 0.299 + ((value >> 8) & 255) * 0.587 + (value & 255) * 0.114;
  return hex && luminance > 60 ? `#${hex}` : "currentColor";
}

function label(technology: Technology) {
  if (technology.url) return `${technology.name} · ${technology.implemented.size} composants`;
  return `${technology.name} · aperçu bientôt, API prévue consultable`;
}
</script>

<template>
  <nav class="rail" aria-label="Technologies">
    <section v-for="group in technologyFamilies" :key="group.family" class="rail__group">
      <h2 class="rail__title">{{ group.label }}</h2>
      <button
        v-for="technology in group.items"
        :key="technology.id"
        type="button"
        :class="['rail__item', { 'rail__item--soon': !technology.url }]"
        :aria-pressed="getTechnology(state.tech).id === technology.id"
        :aria-label="label(technology)"
        @click="state.tech = technology.id"
      >
        <svg
          v-if="technology.icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          :style="{ fill: technology.url ? iconColor(technology) : undefined }"
        >
          <path :d="technology.icon.path" />
        </svg>
        <span v-else aria-hidden="true">{{ technology.name.slice(0, 2) }}</span>
        <span class="rail__tooltip" aria-hidden="true">{{ label(technology) }}</span>
      </button>
    </section>
  </nav>
</template>
