<script setup lang="ts">
import { getComponentContract } from "@nativesmart/contracts";
import { applyLayout, applyTheme } from "@nativesmart/showcase-runtime";
import { computed, ref, watch, watchEffect } from "vue";
import ComponentPage from "./components/ComponentPage.vue";
import HomePage from "./components/HomePage.vue";
import OnThisPage from "./components/OnThisPage.vue";
import SideNav from "./components/SideNav.vue";
import TechRail from "./components/TechRail.vue";
import TokensPage from "./components/TokensPage.vue";
import TopBar from "./components/TopBar.vue";
import { brandName } from "./brand";
import { state } from "./state";

const contract = computed(() => getComponentContract(state.page));
const menuOpen = ref(false);
const canvas = ref<HTMLElement>();

// The chrome follows the brand and mode; direction and density only apply to the content.
watchEffect(() => applyTheme(document, { brand: state.brand, mode: state.mode, dir: "ltr" }));
watchEffect(() => {
  if (canvas.value) applyLayout(canvas.value, { dir: state.dir, density: state.density });
});
watch(
  () => state.page,
  () => (menuOpen.value = false)
);

const tocKey = computed(() => `${state.page}:${state.tab}`);

watchEffect(() => {
  const title = contract.value?.name ?? (state.page.startsWith("tokens") ? "Tokens" : "");
  document.title = title ? `${title} · ${brandName} Lab` : `${brandName} Lab`;
});
</script>

<template>
  <div :class="['lab', { 'lab--menu-open': menuOpen }]">
    <TopBar class="lab__top" @toggle-menu="menuOpen = !menuOpen" />
    <TechRail class="lab__rail" />
    <SideNav class="lab__nav" />
    <button
      v-if="menuOpen"
      class="lab__scrim"
      type="button"
      aria-label="Fermer le menu"
      @click="menuOpen = false"
    />

    <main class="lab__main">
      <div :class="['lab__viewport', `lab__viewport--${state.viewport}`]">
        <div ref="canvas" class="lab__canvas" data-toc-root>
          <ComponentPage v-if="contract" :key="contract.id" :contract="contract" />
          <TokensPage v-else-if="state.page.startsWith('tokens')" />
          <HomePage v-else />
        </div>
      </div>
    </main>

    <aside class="lab__aside" aria-label="Panneau contextuel">
      <div id="lab-aside" />
      <OnThisPage v-if="!contract" :key="tocKey" />
    </aside>
  </div>
</template>
