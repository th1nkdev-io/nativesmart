<script setup lang="ts">
import { getComponentContract } from "@nativesmart/contracts";
import { applyLayout, applyPreviewTheme, applyTheme } from "@nativesmart/showcase-runtime";
import { defaultBrandThemeId } from "@nativesmart/tokens";
import { computed, ref, watch, watchEffect } from "vue";
import ComponentPage from "./components/ComponentPage.vue";
import HomePage from "./components/HomePage.vue";
import OnThisPage from "./components/OnThisPage.vue";
import SideNav from "./components/SideNav.vue";
import TechRail from "./components/TechRail.vue";
import TokensPage from "./components/TokensPage.vue";
import TopBar from "./components/TopBar.vue";
import { brandName } from "./brand";
import { findDocPage } from "./pages";
import { state } from "./state";

const contract = computed(() => getComponentContract(state.page));
const docPage = computed(() => findDocPage(state.page));
const menuOpen = ref(false);
const tocVisible = ref(false);
// The contextual aside only takes room when it has something to show.
const hasAside = computed(() => Boolean(contract.value) || tocVisible.value);
const canvas = ref<HTMLElement>();

// The Lab always wears the NativeSmart identity so its screens are designed against one theme.
// The chosen identity only reaches the components: the renderer frames and `.lab-preview` areas.
// Direction and density only apply to the content.
watchEffect(() =>
  applyTheme(document, { brand: defaultBrandThemeId, mode: state.mode, dir: "ltr" })
);
watchEffect(() => applyPreviewTheme(document, state.brand, ".lab-preview"));
watchEffect(() => {
  if (canvas.value) applyLayout(canvas.value, { dir: state.dir, density: state.density });
});
watch(
  () => state.page,
  () => (menuOpen.value = false)
);

const tocKey = computed(() => `${state.page}:${state.tab}`);

watchEffect(() => {
  const title =
    contract.value?.name ??
    (state.page.startsWith("tokens")
      ? "Tokens"
      : docPage.value?.component
        ? docPage.value.label
        : "");
  document.title = title ? `${title} · ${brandName} Lab` : `${brandName} Lab`;
});
</script>

<template>
  <div :class="['lab', { 'lab--menu-open': menuOpen, 'lab--no-aside': !hasAside }]">
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
          <component :is="docPage.component" v-else-if="docPage?.component" :key="docPage.id" />
          <HomePage v-else />
        </div>
      </div>
    </main>

    <aside class="lab__aside" aria-label="Panneau contextuel">
      <div id="lab-aside" />
      <OnThisPage v-if="!contract" :key="tocKey" @visible="tocVisible = $event" />
    </aside>
  </div>
</template>
