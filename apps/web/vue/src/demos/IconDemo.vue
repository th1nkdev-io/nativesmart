<script setup lang="ts">
import { iconNames, NsIcon } from "@nativesmart/vue";
import { computed, useAttrs } from "vue";
import { useView } from "./view";

defineOptions({ inheritAttrs: false });
const view = useView();
const names = iconNames();
const attrs = useAttrs();
const name = computed(() => String(attrs.name ?? "heart"));
</script>

<template>
  <NsIcon v-if="view !== 'playground'" v-bind="$attrs" :name="name" />
  <div v-else class="demo-icon">
    <span class="demo-icon__hero"><NsIcon size="xl" v-bind="$attrs" :name="name" /></span>
    <ul class="demo-icon__grid" aria-label="Icônes intégrées">
      <li v-for="name in names" :key="name" :title="name">
        <NsIcon :name="name" />
        <small>{{ name }}</small>
      </li>
    </ul>
  </div>
</template>

<style>
.demo-icon {
  display: grid;
  justify-items: center;
  gap: var(--ns-space-6);
  inline-size: 100%;
}

.demo-icon__hero {
  display: grid;
  place-items: center;
  inline-size: 72px;
  block-size: 72px;
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-primary-muted);
  color: var(--ns-color-primary);
}

.demo-icon__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
  gap: var(--ns-space-1);
  inline-size: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.demo-icon__grid li {
  display: grid;
  justify-items: center;
  gap: var(--ns-space-1-5);
  padding: var(--ns-space-3) var(--ns-space-1);
  border-radius: var(--ns-radius-md);
  color: var(--ns-color-text);
}

.demo-icon__grid li:hover {
  background: var(--ns-color-surface-hover);
}

.demo-icon__grid small {
  overflow: hidden;
  max-inline-size: 100%;
  color: var(--ns-color-text-muted);
  font-family: var(--ns-font-mono);
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
