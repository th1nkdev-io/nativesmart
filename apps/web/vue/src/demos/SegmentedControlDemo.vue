<script setup lang="ts">
import { NsSegmentedControl, type NsSegmentedOption } from "@nativesmart/vue";
import { computed, ref, useAttrs, watch } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

const viewOptions = [
  { label: "Liste", value: "list", icon: "menu" },
  { label: "Grille", value: "grid", icon: "image" },
  { label: "Carte", value: "map", icon: "home" }
];

/* Icons only needs options that have icons; text options come from the panel. */
const options = computed<NsSegmentedOption[]>(() =>
  attrs.iconOnly
    ? viewOptions
    : ((attrs.options as string[] | undefined) ?? ["Jour", "Semaine", "Mois", "Année"])
);

/* The panel sets the starting value; clicks then change it here. */
const value = ref(attrs.iconOnly ? "list" : String(attrs.value ?? "Semaine"));
watch(
  () => [attrs.value, attrs.iconOnly],
  () => (value.value = attrs.iconOnly ? "list" : String(attrs.value ?? "Semaine"))
);

/* Each period draws its own bars, so the choice shows an effect. */
const series: Record<string, number[]> = {
  Jour: [12, 30, 22, 45, 38, 52, 18],
  Semaine: [64, 48, 72, 58, 80, 66, 90],
  Mois: [40, 70, 55, 85, 62, 95, 74],
  Année: [30, 45, 60, 52, 78, 88, 100]
};
const bars = computed(() => series[value.value] ?? series.Semaine!);
const totals: Record<string, string> = {
  Jour: "48 500",
  Semaine: "312 000",
  Mois: "1 240 000",
  Année: "14 900 000"
};
</script>

<template>
  <div v-if="variation" class="demo-seg-tile">
    <NsSegmentedControl v-bind="attrs" v-model:value="value" :options="options" />
  </div>

  <article v-else class="demo-seg">
    <header>
      <span>
        <small>Envois</small>
        <strong>{{ totals[value] ?? "312 000" }} FCFA</strong>
      </span>
      <NsSegmentedControl v-bind="attrs" v-model:value="value" :options="options" />
    </header>
    <div class="demo-seg__chart" aria-hidden="true">
      <span v-for="(bar, index) in bars" :key="index" :style="{ blockSize: `${bar}%` }" />
    </div>
  </article>
</template>

<style>
.demo-seg {
  display: grid;
  gap: var(--ns-space-5);
  inline-size: 560px;
  max-inline-size: 100%;
  padding: var(--ns-space-6);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface);
  box-shadow: var(--ns-elevation-card);
  color: var(--ns-color-text);
}

.demo-seg header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--ns-space-3);
}

.demo-seg header > span {
  display: grid;
}

.demo-seg header small {
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
}

.demo-seg header strong {
  font-size: var(--ns-text-title-md-size);
  font-variant-numeric: tabular-nums;
}

.demo-seg__chart {
  display: flex;
  align-items: flex-end;
  gap: var(--ns-space-2);
  block-size: 140px;
  padding-block-start: var(--ns-space-2);
  border-block-end: 1px solid var(--ns-color-border-subtle);
}

.demo-seg__chart span {
  flex: 1;
  border-radius: var(--ns-radius-sm) var(--ns-radius-sm) 0 0;
  background: linear-gradient(
    var(--ns-color-primary),
    color-mix(in srgb, var(--ns-color-primary) 55%, transparent)
  );
  transition: block-size var(--ns-duration-slow) var(--ns-easing-emphasized);
}

.demo-seg-tile {
  display: grid;
  place-items: center;
  inline-size: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .demo-seg__chart span {
    transition: none;
  }
}
</style>
