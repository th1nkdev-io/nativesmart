<script setup lang="ts">
import { brandThemes, contrastRatio } from "@nativesmart/tokens";
import { computed } from "vue";
import { state } from "../../state";

const colors = computed(() => brandThemes[state.brand].colors.light);
const ratio = computed(() => contrastRatio(colors.value.onPrimary, colors.value.primary));
/** Share of the 7:1 AAA goal, drawn on the gauge. */
const share = computed(() => Math.min(100, (ratio.value / 7) * 100));
</script>

<template>
  <div
    v-tilt="6"
    class="contrast-art"
    role="img"
    :aria-label="`Contraste ${ratio.toFixed(2)} pour 1`"
  >
    <svg class="contrast-art__gauge" viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="84" class="contrast-art__track" />
      <circle
        cx="100"
        cy="100"
        r="84"
        class="contrast-art__value"
        pathLength="100"
        :stroke-dasharray="`${share} 100`"
      />
      <circle
        cx="100"
        cy="100"
        r="84"
        class="contrast-art__aa"
        pathLength="100"
        stroke-dasharray="0.6 99.4"
        :stroke-dashoffset="-64.3"
      />
    </svg>
    <div class="contrast-art__center">
      <strong>{{ ratio.toFixed(2) }}<small>:1</small></strong>
      <span>Texte sur primary</span>
      <em>{{ ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "AA large" }}</em>
    </div>
    <span
      class="contrast-art__button"
      :style="{ background: colors.primary, color: colors.onPrimary }"
    >
      Confirmer
    </span>
    <span class="contrast-art__keys" aria-hidden="true">
      <kbd>Tab</kbd><kbd>↵</kbd><kbd>Esc</kbd>
    </span>
  </div>
</template>
