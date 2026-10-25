<script setup lang="ts">
import { NsIcon, NsSpacer } from "@nativesmart/vue";
import { computed, onBeforeUnmount, onMounted, ref, useAttrs } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

/**
 * Where the spacer is shown: an app bar for sizes, a crowded row for the minimum, a sentence or a
 * card for the axes. The playground shows a row and a column side by side.
 */
const scene = computed(() => {
  if (!variation) return "playground";
  if (variation.group === "minSize") return "crowded";
  if (variation.group === "axis" && variation.value === "horizontal") return "inline";
  if (variation.group === "axis" && variation.value === "vertical") return "flow";
  return "bar";
});

/* A spacer is invisible: the variations draw it, except the default state that shows it hidden. */
const spacerAttrs = computed(() => {
  if (!variation) return attrs;
  const hidden = variation.group === "states" && variation.value === "default";
  return { ...attrs, reveal: !hidden };
});

/* The playground measures its two spacers live, so resizing the window shows them work. */
const rowSpacer = ref<{ $el: HTMLElement }>();
const columnSpacer = ref<{ $el: HTMLElement }>();
const rowSize = ref(0);
const columnSize = ref(0);
let observer: ResizeObserver | undefined;

onMounted(() => {
  if (!rowSpacer.value || !columnSpacer.value) return;
  observer = new ResizeObserver(() => {
    rowSize.value = Math.round(rowSpacer.value?.$el.getBoundingClientRect().width ?? 0);
    columnSize.value = Math.round(columnSpacer.value?.$el.getBoundingClientRect().height ?? 0);
  });
  observer.observe(rowSpacer.value.$el);
  observer.observe(columnSpacer.value.$el);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <div v-if="scene === 'playground'" class="demo-spacer">
    <figure class="demo-spacer__scene">
      <div class="demo-spacer__bar">
        <span class="demo-spacer__logo">N</span>
        <strong>NativeSmart Pay</strong>
        <NsSpacer ref="rowSpacer" v-bind="spacerAttrs" />
        <span class="demo-spacer__tool"><NsIcon name="search" size="sm" /></span>
        <span class="demo-spacer__tool"><NsIcon name="bell" size="sm" /></span>
        <span class="demo-spacer__avatar">KM</span>
      </div>
      <figcaption>
        <span>Barre d'application · ligne</span>
        <b
          ><NsIcon name="chevron-left" size="xs" />{{ rowSize }} px<NsIcon
            name="chevron-right"
            size="xs"
        /></b>
      </figcaption>
    </figure>

    <figure class="demo-spacer__scene">
      <div class="demo-spacer__card">
        <small>Solde disponible</small>
        <strong>125 000 FCFA</strong>
        <span class="demo-spacer__muted">Dernier envoi à Aïcha Diallo, hier</span>
        <NsSpacer ref="columnSpacer" v-bind="spacerAttrs" />
        <span class="demo-spacer__button">Envoyer de l'argent</span>
      </div>
      <figcaption>
        <span>Carte · colonne</span>
        <b
          ><NsIcon name="chevron-up" size="xs" />{{ columnSize }} px<NsIcon
            name="chevron-down"
            size="xs"
        /></b>
      </figcaption>
    </figure>
  </div>

  <div v-else :class="['demo-spacer-tile', `demo-spacer-tile--${scene}`]">
    <template v-if="scene === 'bar'">
      <span class="demo-spacer__logo">N</span>
      <NsSpacer v-bind="spacerAttrs" />
      <span class="demo-spacer__tool"><NsIcon name="search" size="sm" /></span>
      <span class="demo-spacer__avatar">KM</span>
    </template>

    <template v-else-if="scene === 'crowded'">
      <span class="demo-spacer__title">Remboursement de Moussa Traoré</span>
      <NsSpacer v-bind="spacerAttrs" />
      <span class="demo-spacer__amount">+12 000</span>
    </template>

    <p v-else-if="scene === 'inline'">
      Total<NsSpacer v-bind="spacerAttrs" size="lg" />25 000 FCFA
    </p>

    <template v-else>
      <strong>Épargne</strong>
      <NsSpacer v-bind="spacerAttrs" size="lg" />
      <span class="demo-spacer__muted">Objectif atteint à 64 %</span>
    </template>
  </div>
</template>

<style>
.demo-spacer {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: var(--ns-space-5);
  inline-size: 640px;
  max-inline-size: 100%;
}

.demo-spacer__scene {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  gap: var(--ns-space-2);
  margin: 0;
}

.demo-spacer__scene figcaption {
  display: flex;
  justify-content: space-between;
  gap: var(--ns-space-2);
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
}

.demo-spacer__scene figcaption b {
  display: inline-flex;
  align-items: center;
  gap: var(--ns-space-1);
  color: var(--ns-color-primary-text);
  font-family: var(--ns-font-mono);
  font-weight: var(--ns-font-weight-semibold);
  font-variant-numeric: tabular-nums;
}

.demo-spacer__bar,
.demo-spacer-tile {
  display: flex;
  align-items: center;
  gap: var(--ns-space-2);
  min-block-size: 56px;
  padding: var(--ns-space-2) var(--ns-space-3);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface);
  box-shadow: var(--ns-elevation-1);
  color: var(--ns-color-text);
  font-size: var(--ns-text-body-sm-size);
}

.demo-spacer__bar strong {
  overflow: hidden;
  min-inline-size: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.demo-spacer__logo {
  display: inline-grid;
  flex: none;
  place-items: center;
  inline-size: 30px;
  block-size: 30px;
  border-radius: var(--ns-radius-md);
  background: var(--ns-color-primary);
  color: var(--ns-color-on-primary);
  font-weight: var(--ns-font-weight-bold);
}

.demo-spacer__tool {
  display: inline-grid;
  flex: none;
  place-items: center;
  inline-size: 32px;
  block-size: 32px;
  border-radius: var(--ns-radius-md);
  color: var(--ns-color-text-muted);
}

.demo-spacer__avatar {
  display: inline-grid;
  flex: none;
  place-items: center;
  inline-size: 32px;
  block-size: 32px;
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-primary-muted);
  color: var(--ns-color-on-primary-muted);
  font-size: 11px;
  font-weight: var(--ns-font-weight-semibold);
}

.demo-spacer__card {
  display: flex;
  flex-direction: column;
  block-size: 220px;
  padding: var(--ns-space-4);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface);
  box-shadow: var(--ns-elevation-1);
  color: var(--ns-color-text);
}

.demo-spacer__card small,
.demo-spacer__muted {
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
}

.demo-spacer__card strong {
  margin-block: var(--ns-space-1);
  font-size: var(--ns-text-title-md-size);
  font-variant-numeric: tabular-nums;
}

.demo-spacer__button {
  display: grid;
  flex: none;
  place-items: center;
  min-block-size: 38px;
  border-radius: var(--ns-radius-control);
  background: var(--ns-color-primary);
  color: var(--ns-color-on-primary);
  font-size: var(--ns-text-body-sm-size);
  font-weight: var(--ns-font-weight-semibold);
}

/* Variation tiles */
.demo-spacer-tile {
  inline-size: 100%;
  box-shadow: none;
}

.demo-spacer-tile--crowded {
  gap: 0;
}

.demo-spacer__title {
  overflow: hidden;
  min-inline-size: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.demo-spacer__amount {
  flex: none;
  color: var(--ns-color-success-text);
  font-weight: var(--ns-font-weight-semibold);
  font-variant-numeric: tabular-nums;
}

.demo-spacer-tile--inline,
.demo-spacer-tile--flow {
  display: block;
}

.demo-spacer-tile--inline p {
  margin: 0;
  line-height: 32px;
}

.demo-spacer-tile--flow > :not(.ns-spacer) {
  display: block;
}

@media (max-width: 560px) {
  .demo-spacer {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
