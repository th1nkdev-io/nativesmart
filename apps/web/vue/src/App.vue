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
import VariationScope from "./demos/VariationScope.vue";
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

/** Group header: the property and its contract description, or the boolean states. */
function groupInfo(title: string) {
  if (title === "states") {
    return { name: "États", description: "Chaque option activée seule, les autres à leur défaut." };
  }
  if (title === "default") return { name: "Par défaut", description: "" };
  const property = contract.value?.properties.find((item) => item.name === title);
  return { name: title, description: property?.description ?? "" };
}

/** The value a tile shows, as code: `"square"` under the `ratio` header, or the boolean name. */
function itemCode(group: string, label: string) {
  if (group === "states" || group === "default") return label;
  return `"${label}"`;
}

function isDefault(group: string, label: string) {
  if (group === "states") return label === "default";
  const property = contract.value?.properties.find((item) => item.name === group);
  return property?.defaultValue === label;
}

const tile = computed(() => `${variationTiles[request.value.component] ?? 160}px`);

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
      <section v-for="group in groups" :key="group.title" class="renderer__group">
        <header class="renderer__head">
          <h2 class="renderer__title">
            {{ groupInfo(group.title).name }}
            <span class="renderer__count">{{ group.items.length }}</span>
          </h2>
          <p v-if="groupInfo(group.title).description" class="renderer__description">
            {{ groupInfo(group.title).description }}
          </p>
        </header>
        <div class="renderer__grid">
          <figure v-for="item in group.items" :key="item.label" class="renderer__cell">
            <div class="renderer__specimen">
              <VariationScope :group="group.title" :value="item.label">
                <component :is="component" v-bind="bind(item.props)" />
              </VariationScope>
            </div>
            <span v-if="isDefault(group.title, item.label)" class="renderer__default">défaut</span>
            <figcaption class="renderer__caption">
              <code>{{ itemCode(group.title, item.label) }}</code>
            </figcaption>
          </figure>
        </div>
      </section>
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

.renderer__head {
  display: grid;
  gap: var(--ns-space-1);
  margin-block-end: var(--ns-space-4);
}

.renderer__title {
  display: flex;
  align-items: center;
  gap: var(--ns-space-2);
  margin: 0;
  color: var(--ns-color-text);
  font-family: var(--ns-font-mono);
  font-size: var(--ns-text-body-sm-size);
  font-weight: var(--ns-font-weight-semibold);
}

.renderer__count {
  padding: 1px 7px;
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-surface-muted);
  color: var(--ns-color-text-muted);
  font-family: var(--ns-font-sans);
  font-size: 11px;
  font-weight: var(--ns-font-weight-medium);
}

.renderer__description {
  margin: 0;
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-body-sm-size);
  line-height: var(--ns-text-body-sm-line-height);
}

/* Uniform tiles: every row lines up, every specimen sits in the middle of its tile. */
.renderer__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(var(--renderer-tile), 100%), 1fr));
  gap: var(--ns-space-3);
}

.renderer__cell {
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto;
  min-inline-size: 0;
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-lg);
  background: var(--ns-color-surface);
}

.renderer__specimen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 0;
  min-block-size: 112px;
  padding: var(--ns-space-5) var(--ns-space-4);
  background:
    radial-gradient(circle, var(--ns-color-border-subtle) 1px, transparent 1.5px) 0 0 / 14px 14px,
    var(--ns-color-background);
}

.renderer__caption {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--ns-space-2);
  min-inline-size: 0;
  padding: var(--ns-space-2) var(--ns-space-3);
  border-block-start: 1px solid var(--ns-color-border-subtle);
}

.renderer__caption code {
  min-inline-size: 0;
  color: var(--ns-color-text);
  font-family: var(--ns-font-mono);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.renderer__default {
  position: absolute;
  inset-block-start: var(--ns-space-2);
  inset-inline-end: var(--ns-space-2);
  z-index: 1;
  padding: 1px 6px;
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-primary-muted);
  color: var(--ns-color-on-primary-muted);
  font-size: 11px;
  font-weight: var(--ns-font-weight-medium);
}
</style>
