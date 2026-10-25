<script setup lang="ts">
import { NsHeading, NsIcon } from "@nativesmart/vue";
import { computed, useAttrs } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

const level = computed(() => Number(attrs.level ?? 2));

/* The page around the heading: it sits after an h1 and an h2, so the outline shows its place. */
const outline = computed(() => [
  { level: 1, text: "NativeSmart Pay" },
  { level: 2, text: "Transferts" },
  { level: level.value, text: String(attrs.text ?? "Titre"), current: true }
]);

const warning = computed(() => {
  if (level.value === 1) return "Deuxième h1 : une page n'en a qu'un.";
  if (level.value > 3) return `Niveau sauté : un h${level.value} suit un h2.`;
  return undefined;
});

/* Tiles keep the eyebrow and drop the subtitle, except where alignment needs both. */
const tileAttrs = computed(() =>
  variation?.group === "align" ? attrs : { ...attrs, subtitle: undefined }
);
</script>

<template>
  <div v-if="variation" class="demo-heading-tile">
    <NsHeading v-bind="tileAttrs" />
  </div>

  <div v-else class="demo-heading">
    <article class="demo-heading__page">
      <NsHeading v-bind="attrs">
        <template #actions>
          <span class="demo-heading__button">Envoyer</span>
        </template>
      </NsHeading>
    </article>

    <aside class="demo-heading__outline" aria-label="Plan du document">
      <small>Plan du document</small>
      <ol>
        <li
          v-for="(item, index) in outline"
          :key="index"
          :class="{ 'is-current': item.current }"
          :style="{ '--depth': item.level - 1 }"
        >
          <b>h{{ item.level }}</b>
          <span>{{ item.text }}</span>
        </li>
      </ol>
      <p v-if="warning" class="demo-heading__warning">
        <NsIcon name="alert-triangle" size="sm" />{{ warning }}
      </p>
      <p v-else class="demo-heading__ok"><NsIcon name="check-circle" size="sm" />Plan valide</p>
    </aside>
  </div>
</template>

<style>
.demo-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: var(--ns-space-5);
  align-items: start;
  inline-size: 760px;
  max-inline-size: 100%;
}

.demo-heading__page {
  padding: var(--ns-space-8) var(--ns-space-6);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface);
  box-shadow: var(--ns-elevation-card);
}

.demo-heading__button {
  display: inline-grid;
  place-items: center;
  min-block-size: 34px;
  padding-inline: var(--ns-space-4);
  border-radius: var(--ns-radius-control);
  background: var(--ns-color-primary);
  color: var(--ns-color-on-primary);
  font-family: var(--ns-font-sans);
  font-size: var(--ns-text-body-sm-size);
  font-weight: var(--ns-font-weight-semibold);
  letter-spacing: normal;
}

.demo-heading__outline {
  display: grid;
  gap: var(--ns-space-3);
  padding: var(--ns-space-4);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface-sunken);
  font-size: var(--ns-text-caption-size);
}

.demo-heading__outline > small {
  color: var(--ns-color-text-muted);
  font-weight: var(--ns-font-weight-semibold);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.demo-heading__outline ol {
  display: grid;
  gap: var(--ns-space-1);
  margin: 0;
  padding: 0;
  list-style: none;
}

.demo-heading__outline li {
  display: flex;
  align-items: center;
  gap: var(--ns-space-2);
  min-inline-size: 0;
  padding: var(--ns-space-1) var(--ns-space-2);
  margin-inline-start: calc(var(--depth) * 12px);
  border-radius: var(--ns-radius-sm);
  color: var(--ns-color-text-muted);
}

.demo-heading__outline li.is-current {
  background: var(--ns-color-primary-muted);
  color: var(--ns-color-on-primary-muted);
  font-weight: var(--ns-font-weight-semibold);
}

.demo-heading__outline li b {
  flex: none;
  font-family: var(--ns-font-mono);
  font-size: 10px;
}

.demo-heading__outline li span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.demo-heading__warning,
.demo-heading__ok {
  display: flex;
  align-items: flex-start;
  gap: var(--ns-space-1-5);
  margin: 0;
  line-height: 1.4;
}

.demo-heading__warning {
  color: var(--ns-color-warning-text);
}

.demo-heading__ok {
  color: var(--ns-color-success-text);
}

.demo-heading-tile {
  inline-size: 100%;
}

/* The anchor shows on hover; a tile shows it at rest. */
.demo-heading-tile .ns-heading__anchor {
  opacity: 1;
}

@media (max-width: 640px) {
  .demo-heading {
    grid-template-columns: minmax(0, 1fr);
  }

  .demo-heading__page {
    padding: var(--ns-space-6) var(--ns-space-4);
  }
}
</style>
