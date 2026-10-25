<script setup lang="ts">
import { NsBox, NsIcon } from "@nativesmart/vue";
import { computed, useAttrs } from "vue";
import { useVariation, useView } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const view = useView();
const variation = useVariation();

/* Served from the shared public folder; bound so Vite keeps it a plain URL. */
const backdrop = "lab/lagoon.svg";

const actions = [
  { icon: "send", label: "Envoyer" },
  { icon: "download", label: "Recevoir" },
  { icon: "wallet", label: "Payer" }
];

/**
 * What a variation needs to show its difference: a content block to measure padding, children of
 * different heights for alignment, room to distribute, text for tones, a photo under materials.
 */
const scene = computed(() => {
  const group = variation?.group ?? "";
  const base = { ...attrs };
  switch (group) {
    case "padding":
      return { kind: "padding", props: { ...base, display: "block", border: "dashed" } };
    case "display":
      return { kind: "children", props: base };
    case "direction":
    case "gap":
      return { kind: "children", props: base };
    case "align":
      return {
        kind: "heights",
        props: { ...base, direction: "row", minHeight: "104px", width: "100%" }
      };
    case "justify":
      return { kind: "dots", props: { ...base, direction: "row", width: "100%" } };
    case "background":
    case "tone":
      return { kind: "text", props: { ...base, display: "block", padding: "4", radius: "lg" } };
    case "border":
    case "radius":
    case "elevation":
      return {
        kind: "surface",
        props: {
          background: "surface",
          padding: "4",
          border: "subtle",
          radius: "lg",
          ...base,
          display: "block",
          width: "100%"
        }
      };
    case "material":
      return { kind: "material", props: { ...base, display: "block", padding: "4", radius: "lg" } };
    default:
      return { kind: "children", props: base };
  }
});
</script>

<template>
  <!-- Playground: the box holds three actions, every Lab setting applies to it. -->
  <NsBox v-if="view === 'playground'" class="demo-box" v-bind="$attrs">
    <NsBox
      v-for="action in actions"
      :key="action.label"
      display="flex"
      align="center"
      gap="3"
      padding="3"
      background="surface"
      radius="md"
      border="subtle"
      class="demo-box__item"
    >
      <NsBox display="flex" padding="2" radius="full" background="primary-muted">
        <NsIcon :name="action.icon" size="sm" />
      </NsBox>
      {{ action.label }}
    </NsBox>
  </NsBox>

  <!-- Variations -->
  <div v-else :class="['demo-box-scene', `demo-box-scene--${scene.kind}`]">
    <div v-if="scene.kind === 'material'" class="demo-box-scene__photo">
      <img :src="backdrop" alt="" />
      <NsBox v-bind="scene.props">Solde · 1 250 000 FCFA</NsBox>
    </div>

    <div
      v-else-if="scene.kind !== 'children' || variation?.value !== 'none'"
      class="demo-box-scene__frame"
    >
      <NsBox v-bind="scene.props">
        <span v-if="scene.kind === 'padding'" class="demo-box-scene__content">contenu</span>
        <template v-else-if="scene.kind === 'heights'">
          <span class="demo-box-scene__chip" style="block-size: 24px" />
          <span class="demo-box-scene__chip" style="block-size: 44px" />
          <span class="demo-box-scene__chip" style="block-size: 32px" />
        </template>
        <template v-else-if="scene.kind === 'dots'">
          <span v-for="index in 3" :key="index" class="demo-box-scene__dot" />
        </template>
        <template v-else-if="scene.kind === 'text'"> <strong>Aa</strong> Texte lisible </template>
        <template v-else-if="scene.kind === 'surface'">Surface</template>
        <template v-else>
          <span v-for="action in actions" :key="action.label" class="demo-box-scene__chip">
            {{ action.label }}
          </span>
        </template>
      </NsBox>
    </div>

    <p v-else class="demo-box-scene__none">Rien n'est rendu</p>
  </div>
</template>

<style>
.demo-box {
  inline-size: 360px;
  max-inline-size: 100%;
}

.demo-box__item {
  font-size: var(--ns-text-body-sm-size);
  font-weight: var(--ns-font-weight-medium);
}

.demo-box-scene {
  inline-size: 100%;
}

.demo-box-scene__frame > .ns-box {
  margin-inline: auto;
}

.demo-box-scene__content {
  display: grid;
  place-items: center;
  min-block-size: 36px;
  border-radius: var(--ns-radius-sm);
  background: var(--ns-color-primary-muted);
  color: var(--ns-color-on-primary-muted);
  font-size: 11px;
  font-weight: var(--ns-font-weight-semibold);
}

.demo-box-scene__chip {
  display: inline-grid;
  place-items: center;
  min-inline-size: 28px;
  padding: 3px 8px;
  border-radius: var(--ns-radius-sm);
  background: var(--ns-color-primary);
  color: var(--ns-color-on-primary);
  font-size: 11px;
  font-weight: var(--ns-font-weight-semibold);
}

.demo-box-scene__dot {
  inline-size: 18px;
  block-size: 18px;
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-primary);
}

.demo-box-scene--surface .ns-box,
.demo-box-scene--text .ns-box {
  font-size: var(--ns-text-body-sm-size);
}

.demo-box-scene__photo {
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  min-block-size: 112px;
  border-radius: var(--ns-radius-lg);
}

.demo-box-scene__photo img {
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}

.demo-box-scene__photo .ns-box {
  position: relative;
  font-size: var(--ns-text-body-sm-size);
  font-weight: var(--ns-font-weight-semibold);
}

.demo-box-scene__none {
  margin: 0;
  padding: var(--ns-space-6) var(--ns-space-3);
  border: 1px dashed var(--ns-color-border);
  border-radius: var(--ns-radius-md);
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
  text-align: center;
}
</style>
