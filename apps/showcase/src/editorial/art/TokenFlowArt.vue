<script setup lang="ts">
import { brandThemes } from "@nativesmart/tokens";
import { computed } from "vue";
import { state } from "../../state";

const theme = computed(() => brandThemes[state.brand]);

/** Name of the palette step behind a color, for example "primary-700", or the color itself. */
function primitiveOf(color: string) {
  for (const [name, scale] of Object.entries(theme.value.palette)) {
    for (const [step, value] of Object.entries(scale as Record<string, string>)) {
      if (value.toLowerCase() === color.toLowerCase()) return `${name}-${step}`;
    }
  }
  return color;
}

const rows = computed(() =>
  (
    [
      ["primary", "Bouton"],
      ["successMuted", "Badge"],
      ["surface", "Carte"]
    ] as const
  ).map(([role, use]) => {
    const swatch = theme.value.colors.light[role];
    return { role, use, swatch, primitive: primitiveOf(swatch) };
  })
);
</script>

<template>
  <div
    v-tilt="6"
    class="flow-art"
    role="img"
    aria-label="Une valeur devient un rôle, puis un composant"
  >
    <div class="flow-art__heads" aria-hidden="true">
      <span>Primitive</span><span>Rôle</span><span>Composant</span>
    </div>
    <div
      v-for="(row, index) in rows"
      :key="row.role"
      class="flow-art__row"
      :style="{ '--row': index }"
    >
      <span class="flow-art__node">
        <i :style="{ background: row.swatch }" />
        <code>{{ row.primitive }}</code>
      </span>
      <svg class="flow-art__wire" viewBox="0 0 60 10" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 5h60" />
      </svg>
      <span class="flow-art__node flow-art__node--role"
        ><code>{{ row.role }}</code></span
      >
      <svg class="flow-art__wire" viewBox="0 0 60 10" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 5h60" />
      </svg>
      <span class="flow-art__node flow-art__node--use">{{ row.use }}</span>
    </div>
  </div>
</template>
