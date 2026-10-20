<script setup lang="ts">
import { brandThemes } from "@nativesmart/tokens";
import { computed } from "vue";
import { openPage, state } from "../state";
import { getTechnology } from "../technologies";

defineEmits<{ toggleMenu: [] }>();

const technology = computed(() => getTechnology(state.tech));

const densities = [
  { value: "compact", label: "Compacte" },
  { value: "comfortable", label: "Confortable" },
  { value: "spacious", label: "Spacieuse" }
] as const;

const viewports = [
  { value: "mobile", label: "Mobile", width: "375" },
  { value: "tablet", label: "Tablette", width: "768" },
  { value: "desktop", label: "Desktop", width: "100%" }
] as const;
</script>

<template>
  <header class="topbar">
    <button class="topbar__menu" type="button" aria-label="Menu" @click="$emit('toggleMenu')">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
    </button>
    <a class="topbar__brand" href="#/" @click.prevent="openPage('')">
      <span class="topbar__logo">ns</span>
      <span class="topbar__name">Nativesmart <strong>Lab</strong></span>
    </a>
    <span class="topbar__tech" :title="`Technologie active : ${technology.name}`">
      {{ technology.name }}
    </span>

    <div class="topbar__controls scroll-hidden">
      <label class="control" title="Identité visuelle">
        <span class="control__label">Identité</span>
        <select v-model="state.brand">
          <option v-for="theme in Object.values(brandThemes)" :key="theme.id" :value="theme.id">
            {{ theme.name }}
          </option>
        </select>
      </label>

      <div class="segmented" role="group" aria-label="Mode de couleur">
        <button
          type="button"
          :aria-pressed="state.mode === 'light'"
          title="Mode clair"
          @click="state.mode = 'light'"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            />
          </svg>
          <span class="sr-only">Clair</span>
        </button>
        <button
          type="button"
          :aria-pressed="state.mode === 'dark'"
          title="Mode sombre"
          @click="state.mode = 'dark'"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
          <span class="sr-only">Sombre</span>
        </button>
      </div>

      <label class="control" title="Densité des contrôles">
        <span class="control__label">Densité</span>
        <select v-model="state.density">
          <option v-for="item in densities" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </label>

      <div class="segmented" role="group" aria-label="Sens d'écriture">
        <button
          type="button"
          :aria-pressed="state.dir === 'ltr'"
          title="Gauche à droite"
          @click="state.dir = 'ltr'"
        >
          LTR
        </button>
        <button
          type="button"
          :aria-pressed="state.dir === 'rtl'"
          title="Droite à gauche (arabe, hébreu)"
          @click="state.dir = 'rtl'"
        >
          RTL
        </button>
      </div>

      <div class="segmented" role="group" aria-label="Largeur d'écran">
        <button
          v-for="item in viewports"
          :key="item.value"
          type="button"
          :aria-pressed="state.viewport === item.value"
          :title="`${item.label} · ${item.width}${item.width === '100%' ? '' : ' px'}`"
          @click="state.viewport = item.value"
        >
          <svg v-if="item.value === 'mobile'" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="7" y="2" width="10" height="20" rx="2" />
            <path d="M11 18h2" />
          </svg>
          <svg v-else-if="item.value === 'tablet'" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <path d="M11 18h2" />
          </svg>
          <svg v-else viewBox="0 0 24 24" aria-hidden="true">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
          <span class="sr-only">{{ item.label }}</span>
        </button>
      </div>
    </div>
  </header>
</template>
