<script setup lang="ts">
import { ref } from "vue";
import { state } from "../state";
import { getTechnology, technologyFamilies, type Technology } from "../technologies";

/** Brand color of the logo, or the text color when the brand color is too dark to read. */
function iconColor(technology: Technology) {
  const hex = technology.icon?.hex ?? "";
  const value = Number.parseInt(hex, 16);
  const luminance =
    ((value >> 16) & 255) * 0.299 + ((value >> 8) & 255) * 0.587 + (value & 255) * 0.114;
  return hex && luminance > 60 ? `#${hex}` : "currentColor";
}

// The rail scrolls, so the tooltip lives in <body> where nothing clips it.
const tip = ref<{ name: string; status: string; top: number; left: number } | null>(null);

function showTip(event: Event, technology: Technology) {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  tip.value = {
    name: technology.name,
    status: status(technology),
    top: rect.top + rect.height / 2,
    left: rect.right + 12
  };
}

function status(technology: Technology) {
  if (technology.url) return `Dans le Lab · ${technology.implemented.size} composants`;
  if (technology.implemented.size) return `${technology.implemented.size} codés · aperçu bientôt`;
  return "Aperçu bientôt · API prévue";
}
</script>

<template>
  <nav class="rail" aria-label="Technologies">
    <section v-for="group in technologyFamilies" :key="group.family" class="rail__group">
      <h2 class="rail__title">{{ group.label }}</h2>
      <button
        v-for="technology in group.items"
        :key="technology.id"
        type="button"
        class="rail__item"
        :style="{ '--tech-color': iconColor(technology) }"
        :aria-pressed="getTechnology(state.tech).id === technology.id"
        :aria-label="`${technology.name}, ${status(technology)}`"
        @click="state.tech = technology.id"
        @pointerenter="showTip($event, technology)"
        @pointerleave="tip = null"
        @focus="showTip($event, technology)"
        @blur="tip = null"
      >
        <svg v-if="technology.icon" viewBox="0 0 24 24" aria-hidden="true">
          <path :d="technology.icon.path" />
        </svg>
        <span v-else class="rail__initials" aria-hidden="true">
          {{ technology.name.slice(0, 2) }}
        </span>
        <span v-if="technology.url" class="rail__live" aria-hidden="true" />
      </button>
    </section>
    <Teleport to="body">
      <Transition name="rail-tip">
        <span
          v-if="tip"
          class="rail-tip"
          aria-hidden="true"
          :style="{ top: `${tip.top}px`, left: `${tip.left}px` }"
        >
          <strong>{{ tip.name }}</strong>
          <small>{{ tip.status }}</small>
        </span>
      </Transition>
    </Teleport>
  </nav>
</template>
