<script setup lang="ts">
import { getComponentContract } from "@nativesmart/contracts";
import {
  applyTheme,
  onRenderRequest,
  postToShell,
  reportHeight,
  requestFromSearch,
  variationsFor,
  type RenderRequest,
  type ShowcaseProps
} from "@nativesmart/showcase-runtime";
import { computed, onBeforeUnmount, onMounted, provide, ref, watchEffect } from "vue";
import VariationRail from "./VariationRail.vue";
import VariationScope from "./demos/VariationScope.vue";
import { NsIcon } from "@nativesmart/vue";
import { viewKey } from "./demos/view";
import { registry, variationTiles } from "./registry";

const request = ref<RenderRequest>(requestFromSearch(window.location.search));
const root = ref<HTMLElement>();
const contract = computed(() => getComponentContract(request.value.component));
const component = computed(() => registry[request.value.component]);
const groups = computed(() => (contract.value ? variationsFor(contract.value) : []));

watchEffect(() => applyTheme(document, request.value));
provide(
  viewKey,
  computed(() => request.value.view)
);

/** Forwards every contract event to the shell event log. */
function listeners() {
  const id = request.value.component;
  return Object.fromEntries(
    (contract.value?.events ?? []).map((name) => [
      `on${name[0].toUpperCase()}${name.slice(1)}`,
      () => postToShell({ type: "ns:event", component: id, name })
    ])
  );
}

const kindLabels: Record<string, string> = {
  enum: "liste",
  boolean: "booléen",
  string: "texte",
  number: "nombre"
};

/** Group header: a readable title, the property as code, its type and contract description. */
function groupInfo(title: string) {
  if (title === "states") {
    return {
      name: "États",
      description: "Chaque option booléenne activée seule, les autres à leur valeur par défaut."
    };
  }
  if (title === "default") return { name: "Par défaut" };
  const property = contract.value?.properties.find((item) => item.name === title);
  return {
    name: title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, " "),
    code: title,
    kind: property ? kindLabels[property.kind] : undefined,
    description: property?.description
  };
}

/** How the variation is written: `ratio="square"`, or the boolean switched on. */
function itemCode(group: string, label: string) {
  if (group === "default") return "";
  if (group === "states") return label === "default" ? "aucune option" : `:${label}="true"`;
  return `${group}="${label}"`;
}

function isDefault(group: string, label: string) {
  if (group === "states") return label === "default";
  const property = contract.value?.properties.find((item) => item.name === group);
  return property?.defaultValue === label;
}

const tile = computed(() => `${variationTiles[request.value.component] ?? 180}px`);

function bind(props: ShowcaseProps) {
  return { ...props, ...listeners() };
}

const cleanups: (() => void)[] = [];
onMounted(() => {
  cleanups.push(onRenderRequest((next) => (request.value = next)));
  if (root.value) cleanups.push(reportHeight(root.value));
  postToShell({ type: "ns:ready", renderer: "vue", components: Object.keys(registry) });
});
onBeforeUnmount(() => cleanups.forEach((cleanup) => cleanup()));
</script>

<template>
  <main ref="root" class="renderer">
    <p v-if="!component" class="renderer__empty">
      « {{ contract?.name ?? request.component }} » n'est pas encore implémenté en Vue.
    </p>

    <div v-else-if="request.view === 'playground'" class="renderer__stage">
      <component :is="component" v-bind="bind(request.props)" />
    </div>

    <div v-else class="renderer__groups" :style="{ '--renderer-tile': tile }">
      <VariationRail
        v-for="group in groups"
        :key="group.title"
        :title="groupInfo(group.title).name"
        :code="groupInfo(group.title).code"
        :kind="groupInfo(group.title).kind"
        :description="groupInfo(group.title).description"
        :count="group.items.length"
      >
        <figure
          v-for="item in group.items"
          :key="item.label"
          :class="[
            'renderer__cell',
            { 'renderer__cell--default': isDefault(group.title, item.label) }
          ]"
        >
          <div class="renderer__specimen">
            <VariationScope :group="group.title" :value="item.label">
              <component :is="component" v-bind="bind(item.props)" />
            </VariationScope>
          </div>
          <figcaption class="renderer__caption">
            <span class="renderer__name">
              {{ item.label === "default" && group.title === "states" ? "Repos" : item.label }}
              <span v-if="isDefault(group.title, item.label)" class="renderer__default">
                <NsIcon name="check" /> défaut
              </span>
            </span>
            <code v-if="itemCode(group.title, item.label)">{{
              itemCode(group.title, item.label)
            }}</code>
          </figcaption>
        </figure>
      </VariationRail>
    </div>
  </main>
</template>

<style>
/* The shell sizes the iframe to the reported height: the preview never scrolls itself. */
html,
body {
  margin: 0;
  overflow: hidden;
  background: var(--ns-color-background);
  color: var(--ns-color-text);
  font-family: var(--ns-font-sans);
}

.renderer {
  box-sizing: border-box;
  padding: var(--ns-space-6);
}

.renderer__stage {
  display: flex;
  align-items: center;
  justify-content: center;
  min-block-size: 200px;
}

.renderer__empty {
  margin: 0;
  padding: var(--ns-space-8) 0;
  color: var(--ns-color-text-muted);
  text-align: center;
}

@media (max-width: 480px) {
  .renderer {
    padding: var(--ns-space-4);
  }

  .renderer__specimen {
    padding: var(--ns-space-4) var(--ns-space-3);
  }
}

.renderer__groups {
  display: grid;
  gap: var(--ns-space-10);
}

.renderer__cell {
  display: grid;
  grid-template-rows: 1fr auto;
  min-inline-size: 0;
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-lg);
  background: var(--ns-color-surface);
  transition:
    border-color var(--ns-duration-fast) var(--ns-easing-standard),
    box-shadow var(--ns-duration-fast) var(--ns-easing-standard);
}

.renderer__cell:hover {
  border-color: var(--ns-color-border);
  box-shadow: var(--ns-elevation-1);
}

/* The default value stands out: primary ring, tinted stage, labelled caption. */
.renderer__cell--default,
.renderer__cell--default:hover {
  border-color: var(--ns-color-primary);
  box-shadow: 0 0 0 1px var(--ns-color-primary);
}

.renderer__specimen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 0;
  min-block-size: 132px;
  padding: var(--ns-space-5) var(--ns-space-4);
  background:
    radial-gradient(circle, var(--ns-color-border-subtle) 1px, transparent 1.5px) 0 0 / 14px 14px,
    var(--ns-color-background);
}

.renderer__cell--default .renderer__specimen {
  background:
    radial-gradient(
        circle,
        color-mix(in srgb, var(--ns-color-primary) 22%, transparent) 1px,
        transparent 1.5px
      )
      0 0 / 14px 14px,
    color-mix(in srgb, var(--ns-color-primary-muted) 45%, var(--ns-color-background));
}

.renderer__caption {
  display: grid;
  gap: 2px;
  min-inline-size: 0;
  padding: var(--ns-space-2-5) var(--ns-space-3);
  border-block-start: 1px solid var(--ns-color-border-subtle);
}

.renderer__name {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--ns-space-1) var(--ns-space-2);
  color: var(--ns-color-text);
  font-size: var(--ns-text-label-md-size);
  font-weight: var(--ns-font-weight-semibold);
}

.renderer__caption code {
  overflow: hidden;
  color: var(--ns-color-text-muted);
  font-family: var(--ns-font-mono);
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.renderer__default {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 0 6px 0 4px;
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-primary-muted);
  color: var(--ns-color-on-primary-muted);
  font-size: 10px;
  font-weight: var(--ns-font-weight-semibold);
  line-height: 16px;
}

.renderer__default .ns-icon {
  --ns-icon-size: 10px;
  --ns-icon-stroke: 3;
}
</style>
