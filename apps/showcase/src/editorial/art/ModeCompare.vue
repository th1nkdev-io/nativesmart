<script setup lang="ts">
import { brandThemes } from "@nativesmart/tokens";
import { computed, ref } from "vue";
import { state } from "../../state";

const split = ref(50);
const theme = computed(() => brandThemes[state.brand]);

function vars(mode: "light" | "dark") {
  const colors = theme.value.colors[mode];
  return {
    "--bg": colors.background,
    "--sf": colors.surface,
    "--tx": colors.text,
    "--mu": colors.textMuted,
    "--bd": colors.border,
    "--p": colors.primary,
    "--op": colors.onPrimary,
    "--sm": colors.successMuted,
    "--osm": colors.onSuccessMuted
  };
}
</script>

<template>
  <div class="mode-compare">
    <div
      v-for="mode in ['light', 'dark'] as const"
      :key="mode"
      :class="['mode-compare__pane', `mode-compare__pane--${mode}`]"
      :style="{
        ...vars(mode),
        clipPath: mode === 'dark' ? `inset(0 0 0 ${split}%)` : `inset(0 ${100 - split}% 0 0)`
      }"
      :aria-hidden="mode === 'dark' || undefined"
    >
      <div class="mode-compare__card">
        <div class="mode-compare__head">
          <span class="mode-compare__avatar" />
          <span>
            <strong>Virement envoyé</strong>
            <small>Aujourd'hui, 14:32</small>
          </span>
          <i class="mode-compare__badge">Réussi</i>
        </div>
        <span class="mode-compare__amount">125 000 FCFA</span>
        <span class="mode-compare__bar"><i /></span>
        <span class="mode-compare__actions">
          <i class="mode-compare__button">Voir le reçu</i>
          <i class="mode-compare__ghost">Partager</i>
        </span>
      </div>
      <span class="mode-compare__label">{{ mode === "light" ? "Clair" : "Sombre" }}</span>
    </div>
    <span
      class="mode-compare__handle"
      :style="{ insetInlineStart: `${split}%` }"
      aria-hidden="true"
    >
      <i />
    </span>
    <input
      v-model.number="split"
      class="mode-compare__range"
      type="range"
      min="0"
      max="100"
      aria-label="Comparer le mode clair et le mode sombre"
    />
  </div>
</template>
