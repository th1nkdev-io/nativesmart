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
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from "vue";
import { registry } from "./registry";

const request = ref<RenderRequest>(requestFromSearch(window.location.search));
const root = ref<HTMLElement>();
const contract = computed(() => getComponentContract(request.value.component));
const component = computed(() => registry[request.value.component]);
const groups = computed(() => (contract.value ? variationsFor(contract.value) : []));

watchEffect(() => applyTheme(document, request.value));

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

    <div v-else class="renderer__groups">
      <section v-for="group in groups" :key="group.title" class="renderer__group">
        <h2 class="renderer__title">{{ group.title }}</h2>
        <div class="renderer__items">
          <figure v-for="item in group.items" :key="item.label" class="renderer__item">
            <component :is="component" v-bind="bind(item.props)" />
            <figcaption>{{ item.label }}</figcaption>
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

.renderer__groups {
  display: grid;
  gap: var(--ns-space-8);
}

.renderer__title {
  margin: 0 0 var(--ns-space-3);
  color: var(--ns-color-text-muted);
  font-size: var(--ns-font-size-xs);
  font-weight: var(--ns-font-weight-semibold);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.renderer__items {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--ns-space-6);
}

.renderer__item {
  display: grid;
  justify-items: center;
  gap: var(--ns-space-2);
  margin: 0;
}

.renderer__item figcaption {
  color: var(--ns-color-text-muted);
  font-family: var(--ns-font-mono);
  font-size: var(--ns-font-size-xs);
}
</style>
