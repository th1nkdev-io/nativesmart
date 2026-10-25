<script setup lang="ts">
import { NsGrid, NsGridItem, NsIcon } from "@nativesmart/vue";
import { computed, onBeforeUnmount, onMounted, ref, useAttrs } from "vue";
import { useVariation, useView } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const view = useView();
const variation = useVariation();

/* ---------- Playground: an account dashboard over the column guides, in a resizable frame ---------- */

const tiles = [
  {
    icon: "wallet",
    title: "Solde",
    value: "1 250 000 FCFA",
    span: { base: 12, sm: 12, lg: 8 },
    tall: true
  },
  { icon: "send", title: "Envois", value: "12 ce mois", span: { base: 12, sm: 6, lg: 4 } },
  { icon: "download", title: "Reçus", value: "8 ce mois", span: { base: 12, sm: 6, lg: 4 } },
  { icon: "star", title: "Épargne", value: "Objectif 64 %", span: { base: 12, sm: 6, lg: 4 } },
  { icon: "calendar", title: "Factures", value: "2 à payer", span: { base: 12, sm: 6, lg: 4 } },
  { icon: "clock", title: "Historique", value: "Dernière opération hier", span: { base: 12 } }
];

const guides = ref(true);
const frame = ref<HTMLElement>();
const width = ref(0);
let observer: ResizeObserver | undefined;
onMounted(() => {
  if (view.value !== "playground" || !frame.value) return;
  observer = new ResizeObserver(([entry]) => (width.value = Math.round(entry.contentRect.width)));
  observer.observe(frame.value);
});
onBeforeUnmount(() => observer?.disconnect());

/** The guides repeat the grid's columns and gaps, without its cells. */
const guideAttrs = computed(() => {
  const { dense: _dense, align: _align, justify: _justify, ...rest } = attrs;
  return rest;
});

/* ---------- Variations: numbered cells chosen to show each setting ---------- */

type Cell = { span: number; height?: number; narrow?: boolean };
const scene = computed((): { props: Record<string, unknown>; cells: Cell[] } => {
  switch (variation?.group) {
    case "columns":
      return {
        props: { ...attrs, gap: "1" },
        cells: Array.from({ length: 6 }, () => ({ span: 1 }))
      };
    case "align":
      return {
        props: { ...attrs, columns: 3 },
        cells: [
          { span: 1, height: 24 },
          { span: 1, height: 52 },
          { span: 1, height: 36 }
        ]
      };
    case "justify":
      return {
        props: { ...attrs, columns: 3 },
        cells: [
          { span: 1, narrow: true },
          { span: 1, narrow: true },
          { span: 1, narrow: true }
        ]
      };
    case "states":
      return {
        props: { ...attrs, columns: 3 },
        cells: [{ span: 2 }, { span: 2 }, { span: 1 }, { span: 1 }, { span: 1 }]
      };
    default:
      return {
        props: { ...attrs, columns: 3, ...(variation?.group === "gap" ? {} : { gap: "2" }) },
        cells: [{ span: 2 }, { span: 1 }, { span: 1 }, { span: 1 }, { span: 1 }]
      };
  }
});
</script>

<template>
  <div v-if="view === 'playground'" class="demo-grid">
    <div class="demo-grid__bar">
      <label class="demo-grid__toggle">
        <input v-model="guides" type="checkbox" />
        Colonnes
      </label>
      <span class="demo-grid__width">
        <NsIcon name="arrow-left" size="xs" /> {{ width }} px
        <NsIcon name="arrow-right" size="xs" />
      </span>
      <span class="demo-grid__hint">
        {{
          attrs.breakpoints === "container"
            ? "Étirez le cadre : la grille suit sa propre largeur"
            : "Points de rupture de la fenêtre"
        }}
      </span>
    </div>

    <div ref="frame" class="demo-grid__frame">
      <div class="demo-grid__stage">
        <NsGrid v-if="guides" v-bind="guideAttrs" class="demo-grid__guides" aria-hidden="true">
          <NsGridItem v-for="index in 12" :key="index" />
        </NsGrid>
        <NsGrid v-bind="$attrs" class="demo-grid__grid">
          <NsGridItem v-for="tile in tiles" :key="tile.title" :span="tile.span">
            <article :class="['demo-grid__tile', { 'is-tall': tile.tall }]">
              <span class="demo-grid__icon"><NsIcon :name="tile.icon" size="sm" /></span>
              <small>{{ tile.title }}</small>
              <strong>{{ tile.value }}</strong>
            </article>
          </NsGridItem>
        </NsGrid>
      </div>
    </div>
  </div>

  <NsGrid v-else v-bind="scene.props" class="demo-grid-cells">
    <NsGridItem v-for="(cell, index) in scene.cells" :key="index" :span="cell.span">
      <span
        :class="['demo-grid-cells__cell', { 'is-narrow': 'narrow' in cell }]"
        :style="'height' in cell ? { blockSize: `${cell.height}px` } : undefined"
        >{{ index + 1 }}</span
      >
    </NsGridItem>
  </NsGrid>
</template>

<style>
.demo-grid {
  display: grid;
  gap: var(--ns-space-3);
  inline-size: 100%;
}

.demo-grid__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--ns-space-2) var(--ns-space-4);
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
}

.demo-grid__toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--ns-space-1-5);
  color: var(--ns-color-text);
  font-weight: var(--ns-font-weight-medium);
  cursor: pointer;
}

.demo-grid__toggle input {
  accent-color: var(--ns-color-primary);
}

.demo-grid__width {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-surface-muted);
  font-family: var(--ns-font-mono);
}

/* The frame resizes with its corner handle: the grid in container mode reflows live. */
.demo-grid__frame {
  box-sizing: border-box;
  inline-size: 100%;
  min-inline-size: 260px;
  max-inline-size: 100%;
  padding: var(--ns-space-4);
  overflow: hidden;
  resize: horizontal;
  border: 1px dashed var(--ns-color-border);
  border-radius: var(--ns-radius-lg);
  background: var(--ns-color-background);
}

.demo-grid__stage {
  position: relative;
}

.demo-grid__guides {
  position: absolute;
  inset: 0;
  grid-auto-rows: 100%;
  overflow: hidden;
}

.demo-grid__guides > .ns-grid-item {
  border-radius: var(--ns-radius-sm);
  background: color-mix(in srgb, var(--ns-color-danger) 9%, transparent);
}

.demo-grid__grid {
  position: relative;
}

.demo-grid__tile {
  display: grid;
  align-content: start;
  gap: 2px;
  block-size: 100%;
  box-sizing: border-box;
  padding: var(--ns-space-3);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-lg);
  background: color-mix(in srgb, var(--ns-color-surface) 92%, transparent);
  font-size: var(--ns-text-body-sm-size);
}

.demo-grid__tile.is-tall {
  min-block-size: 120px;
}

.demo-grid__tile small {
  color: var(--ns-color-text-muted);
}

.demo-grid__icon {
  display: inline-grid;
  place-items: center;
  inline-size: 28px;
  block-size: 28px;
  margin-block-end: var(--ns-space-1);
  border-radius: var(--ns-radius-md);
  background: var(--ns-color-primary-muted);
  color: var(--ns-color-primary);
}

/* Variations */
.demo-grid-cells {
  inline-size: 100%;
}

.demo-grid-cells__cell {
  display: grid;
  place-items: center;
  min-block-size: 28px;
  border-radius: var(--ns-radius-sm);
  background: var(--ns-color-primary);
  color: var(--ns-color-on-primary);
  font-size: 11px;
  font-weight: var(--ns-font-weight-semibold);
}

.demo-grid-cells__cell.is-narrow {
  inline-size: 28px;
}
</style>
