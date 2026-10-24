<script setup lang="ts">
import { NsAspectRatio, NsBadge, NsIcon } from "@nativesmart/vue";
import { computed, useAttrs } from "vue";
import { useVariation, useView } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const view = useView();
const variation = useVariation();

const labels: Record<string, string> = {
  video: "16 : 9",
  square: "1 : 1",
  photo: "4 : 3",
  portrait: "3 : 4",
  story: "9 : 16",
  wide: "21 : 9",
  golden: "1,618 : 1",
  auto: "naturel"
};
const ratio = computed(() => String(attrs.ratio ?? "video"));

/* Served from the shared public folder; bound so Vite keeps them as plain URLs. */
const media = {
  lagoon: { src: "lab/lagoon.svg", alt: "Lagune bordée de palmiers", ratio: 1.5 },
  savanna: { src: "lab/savanna.svg", alt: "Acacias au coucher du soleil", ratio: 0.8 },
  market: { src: "lab/market.svg", alt: "Étals colorés du marché", ratio: 1 }
};
const gallery = [
  media.savanna,
  media.market,
  media.lagoon,
  media.market,
  media.lagoon,
  media.savanna
];

const numeric: Record<string, number> = {
  video: 16 / 9,
  square: 1,
  photo: 4 / 3,
  portrait: 3 / 4,
  story: 9 / 16,
  wide: 21 / 9,
  golden: 1.618,
  auto: media.lagoon.ratio
};

/**
 * One specimen per variation, chosen so its difference shows: ratios side by side at the same
 * height, a portrait image to compare fits, crops that reveal the focus, a square for radii.
 */
const specimen = computed(() => {
  const { title: _title, description: _description, ...rest } = attrs;
  const group = variation?.group;
  const value = variation?.value ?? "";
  const height = 104;
  const width = (r: number) => `min(100%, ${Math.round(height * r)}px)`;
  switch (group) {
    case "ratio":
      return {
        props: rest,
        image: media.lagoon,
        width: width(numeric[value] ?? 1),
        badge: labels[value]
      };
    case "fit":
      return { props: rest, image: media.savanna, width: "100%" };
    case "focus":
      return ["start", "end"].includes(value)
        ? { props: { ...rest, ratio: "portrait" }, image: media.lagoon, width: width(3 / 4) }
        : { props: rest, image: media.savanna, width: "100%" };
    case "radius":
      return { props: { ...rest, ratio: "square" }, image: media.lagoon, width: width(1) };
    case "placeholder":
      return {
        props: { ...rest, loading: true },
        image: media.lagoon,
        width: "100%",
        outline: true
      };
    default:
      return {
        props: rest,
        image: media.lagoon,
        width: "100%",
        badge: value === "zoom" ? "Survolez" : undefined
      };
  }
});
</script>

<template>
  <NsAspectRatio
    v-if="view !== 'playground'"
    :class="['demo-aspect-specimen', { 'demo-aspect-specimen--outline': specimen.outline }]"
    :style="{ inlineSize: specimen.width }"
    v-bind="specimen.props"
  >
    <img :src="specimen.image.src" :alt="specimen.image.alt" />
    <template v-if="specimen.badge" #overlay>
      <NsBadge :label="specimen.badge" />
    </template>
  </NsAspectRatio>

  <div v-else class="demo-aspect-stage">
    <NsAspectRatio class="demo-aspect" v-bind="$attrs">
      <img :src="media.lagoon.src" :alt="media.lagoon.alt" />
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

.demo-aspect-specimen {
  flex: none;
}

.demo-aspect-specimen--outline {
  outline: 1px dashed var(--ns-color-border);
  outline-offset: 3px;
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
