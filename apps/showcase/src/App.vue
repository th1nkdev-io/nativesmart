<script setup lang="ts">
import { getComponentContract } from "@nativesmart/contracts";
import { applyTheme } from "@nativesmart/showcase-runtime";
import { computed, ref, watch, watchEffect } from "vue";
import ComponentPage from "./components/ComponentPage.vue";
import HomePage from "./components/HomePage.vue";
import SideNav from "./components/SideNav.vue";
import TokensPage from "./components/TokensPage.vue";
import TopBar from "./components/TopBar.vue";
import { state } from "./state";

const contract = computed(() => getComponentContract(state.page));
const menuOpen = ref(false);

// The shell follows the brand and mode; only the preview switches direction.
watchEffect(() => applyTheme(document, { brand: state.brand, mode: state.mode, dir: "ltr" }));
watch(
  () => state.page,
  () => (menuOpen.value = false)
);
</script>

<template>
  <div class="lab">
    <TopBar class="lab__top" @toggle-menu="menuOpen = !menuOpen" />
    <SideNav :class="['lab__nav', { 'lab__nav--open': menuOpen }]" />
    <main class="lab__main">
      <ComponentPage v-if="contract" :key="contract.id" :contract="contract" />
      <TokensPage v-else-if="state.page.startsWith('tokens')" />
      <HomePage v-else />
    </main>
  </div>
</template>
