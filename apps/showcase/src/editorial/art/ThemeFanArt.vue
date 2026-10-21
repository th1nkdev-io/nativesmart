<script setup lang="ts">
import { brandThemes } from "@nativesmart/tokens";
import { computed } from "vue";
import { state } from "../../state";

// The active identity comes to the front of the fan.
const cards = computed(() => {
  const themes = Object.values(brandThemes);
  const active = themes.findIndex((theme) => theme.id === state.brand);
  return themes.map((theme, index) => ({
    theme,
    position: (index - active + themes.length + 1) % themes.length
  }));
});
</script>

<template>
  <div v-tilt="8" class="fan-art" role="img" aria-label="Les identités visuelles en éventail">
    <button
      v-for="{ theme, position } in cards"
      :key="theme.id"
      type="button"
      class="fan-art__card"
      :data-position="position"
      :aria-label="`Choisir l'identité ${theme.name}`"
      :style="{
        '--p': theme.colors.light.primary,
        '--op': theme.colors.light.onPrimary,
        '--s': theme.colors.light.secondary,
        '--bg': theme.colors.light.surface,
        '--tx': theme.colors.light.text,
        '--mu': theme.colors.light.textMuted,
        '--bd': theme.colors.light.border
      }"
      @click="state.brand = theme.id"
    >
      <span class="fan-art__band" />
      <span class="fan-art__name">{{ theme.name }}</span>
      <span class="fan-art__line" />
      <span class="fan-art__line fan-art__line--short" />
      <span class="fan-art__row">
        <i class="fan-art__button">Valider</i>
        <i class="fan-art__chip">Nouveau</i>
      </span>
      <span class="fan-art__swatches">
        <i
          v-for="step in [300, 500, 700, 900]"
          :key="step"
          :style="{ background: theme.palette.primary[step as 300] }"
        />
      </span>
    </button>
  </div>
</template>
