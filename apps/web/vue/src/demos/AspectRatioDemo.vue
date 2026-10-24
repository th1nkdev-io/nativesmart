<script setup lang="ts">
import { NsAspectRatio, NsBadge, NsIcon } from "@nativesmart/vue";
import { computed, useAttrs } from "vue";
import { useView } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const view = useView();

const labels: Record<string, string> = {
  video: "16 : 9",
  square: "1 : 1",
  photo: "4 : 3",
  portrait: "3 : 4",
  story: "9 : 16",
  wide: "21 : 9",
  golden: "1,618 : 1",
  auto: "Ratio de l'image"
};
const ratio = computed(() => String(attrs.ratio ?? "video"));
/** Variations are 180 px wide: they leave the caption out. */
const variationAttrs = computed(() => {
  const { title: _title, description: _description, ...rest } = attrs;
  return rest;
});

/* Served from the shared public folder; bound so Vite keeps them as plain URLs. */
const media = { lagoon: "lab/lagoon.svg", savanna: "lab/savanna.svg", market: "lab/market.svg" };
const gallery = [
  { src: "lab/savanna.svg", alt: "Acacias au coucher du soleil" },
  { src: "lab/market.svg", alt: "Étals colorés du marché" },
  { src: "lab/lagoon.svg", alt: "Lagune bordée de palmiers" },
  { src: "lab/market.svg", alt: "Étals colorés du marché" },
  { src: "lab/lagoon.svg", alt: "Lagune bordée de palmiers" },
  { src: "lab/savanna.svg", alt: "Acacias au coucher du soleil" }
];
</script>

<template>
  <!-- Variations: a portrait image makes cropping, fit and focus visible; captions stay out. -->
  <NsAspectRatio
    v-if="view !== 'playground'"
    class="demo-aspect demo-aspect--small"
    v-bind="variationAttrs"
  >
    <img :src="media.savanna" alt="Acacias au coucher du soleil" />
  </NsAspectRatio>

  <div v-else class="demo-aspect-stage">
    <NsAspectRatio class="demo-aspect" v-bind="$attrs">
      <img :src="media.lagoon" alt="Lagune bordée de palmiers" />
      <template #overlay>
        <NsBadge :label="labels[ratio] ?? ratio" />
        <button type="button" class="demo-aspect__like" aria-label="Ajouter aux favoris">
          <NsIcon name="heart" size="sm" />
        </button>
      </template>
    </NsAspectRatio>

    <section v-if="ratio === 'auto'" class="demo-aspect-masonry" aria-label="Galerie masonry">
      <NsAspectRatio
        v-for="(item, index) in gallery"
        :key="index"
        ratio="auto"
        :radius="($attrs.radius as 'image') ?? 'image'"
        zoom
      >
        <img :src="item.src" :alt="item.alt" />
      </NsAspectRatio>
    </section>
  </div>
</template>

<style>
.demo-aspect-stage {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  justify-items: center;
  gap: var(--ns-space-6);
  inline-size: 100%;
}

.demo-aspect {
  inline-size: 460px;
  max-inline-size: 100%;
}

.demo-aspect--small {
  inline-size: 180px;
}

.demo-aspect__like {
  display: inline-grid;
  place-items: center;
  inline-size: 32px;
  block-size: 32px;
  border: 0;
  border-radius: var(--ns-radius-full);
  background: color-mix(in srgb, var(--ns-color-surface) 85%, transparent);
  color: var(--ns-color-danger);
  cursor: pointer;
  backdrop-filter: blur(6px);
}

.demo-aspect__like:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
  outline-offset: 2px;
}

.demo-aspect-masonry {
  inline-size: 100%;
  max-inline-size: 640px;
  columns: 3 160px;
  column-gap: var(--ns-space-3);
}

.demo-aspect-masonry > * {
  margin-block-end: var(--ns-space-3);
  break-inside: avoid;
}
</style>
