<script setup lang="ts">
import { NsIcon, NsSurface } from "@nativesmart/vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const variation = useVariation();
</script>

<template>
  <!-- Colored shapes behind the layers, so shadows, tones and glass all have something to show. -->
  <div :class="['demo-surface', { 'is-small': variation }]">
    <span class="demo-surface__blob demo-surface__blob--one" aria-hidden="true" />
    <span class="demo-surface__blob demo-surface__blob--two" aria-hidden="true" />

    <NsSurface v-slot="{ level }" v-bind="$attrs" class="demo-surface__card">
      <span class="demo-surface__level">{{ level }}</span>
      <small>Solde disponible</small>
      <strong>125 000 FCFA</strong>

      <template v-if="!variation">
        <span class="demo-surface__hint">Les surfaces imbriquées en auto montent d'un niveau.</span>
        <NsSurface v-slot="{ level: inner }" padding="sm" radius="md" class="demo-surface__row">
          <span class="demo-surface__avatar">AD</span>
          <span class="demo-surface__who">
            <b>Aïcha Diallo</b>
            <small>Envoi · hier</small>
          </span>
          <span class="demo-surface__level">{{ inner }}</span>
        </NsSurface>
        <NsSurface v-slot="{ level: inner }" padding="sm" radius="md" class="demo-surface__row">
          <span class="demo-surface__avatar"><NsIcon name="wallet" size="sm" /></span>
          <span class="demo-surface__who">
            <b>Épargne</b>
            <small>Objectif à 64 %</small>
          </span>
          <span class="demo-surface__level">{{ inner }}</span>
        </NsSurface>
      </template>
    </NsSurface>
  </div>
</template>

<style>
.demo-surface {
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  inline-size: 520px;
  max-inline-size: 100%;
  padding: var(--ns-space-10) var(--ns-space-8);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-background);
  isolation: isolate;
}

.demo-surface.is-small {
  inline-size: 100%;
  padding: var(--ns-space-5) var(--ns-space-4);
}

.demo-surface__blob {
  position: absolute;
  z-index: -1;
  border-radius: var(--ns-radius-full);
  filter: blur(2px);
}

.demo-surface__blob--one {
  inset-block-start: 10%;
  inset-inline-start: 8%;
  inline-size: 46%;
  aspect-ratio: 1;
  background: linear-gradient(135deg, var(--ns-color-primary), var(--ns-color-info));
  opacity: 0.55;
}

.demo-surface__blob--two {
  inset-block-end: 6%;
  inset-inline-end: 6%;
  inline-size: 34%;
  aspect-ratio: 1;
  background: linear-gradient(135deg, var(--ns-color-success), var(--ns-color-warning));
  opacity: 0.5;
}

.demo-surface__card {
  display: grid;
  gap: var(--ns-space-1);
  inline-size: 100%;
  max-inline-size: 340px;
}

.demo-surface.is-small .demo-surface__card {
  max-inline-size: none;
}

.demo-surface__card > small {
  opacity: 0.75;
  font-size: var(--ns-text-caption-size);
}

.demo-surface__card > strong {
  font-size: var(--ns-text-title-md-size);
  font-variant-numeric: tabular-nums;
}

.demo-surface.is-small .demo-surface__card > strong {
  font-size: var(--ns-text-body-size);
}

.demo-surface__level {
  justify-self: end;
  padding: 1px var(--ns-space-2);
  border-radius: var(--ns-radius-full);
  background: color-mix(in srgb, currentColor 10%, transparent);
  font-family: var(--ns-font-mono);
  font-size: 10px;
  font-weight: var(--ns-font-weight-semibold);
  line-height: 16px;
}

.demo-surface__card > .demo-surface__level {
  position: absolute;
  inset-block-start: var(--ns-space-3);
  inset-inline-end: var(--ns-space-3);
}

.demo-surface.is-small .demo-surface__card > .demo-surface__level {
  position: static;
  justify-self: start;
  margin-block-end: var(--ns-space-1);
}

.demo-surface__hint {
  margin-block: var(--ns-space-2) var(--ns-space-1);
  opacity: 0.75;
  font-size: var(--ns-text-caption-size);
}

.demo-surface__row {
  display: flex;
  align-items: center;
  gap: var(--ns-space-2-5);
  margin-block-start: var(--ns-space-1);
  font-size: var(--ns-text-body-sm-size);
}

.demo-surface__avatar {
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

.demo-surface__who {
  display: grid;
  flex: 1;
  min-inline-size: 0;
}

.demo-surface__who small {
  opacity: 0.7;
  font-size: var(--ns-text-caption-size);
}

@media (max-width: 560px) {
  .demo-surface {
    padding: var(--ns-space-6) var(--ns-space-3);
  }
}
</style>
