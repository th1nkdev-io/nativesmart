<script setup lang="ts">
import { brandThemes } from "@nativesmart/tokens";
import { openPage, state } from "../state";
import { technologies } from "../technologies";

defineEmits<{ toggleMenu: [] }>();
</script>

<template>
  <header class="topbar">
    <button class="topbar__menu" type="button" aria-label="Menu" @click="$emit('toggleMenu')">
      ☰
    </button>
    <a class="topbar__brand" href="#/" @click.prevent="openPage('')">
      <span class="topbar__logo">ns</span>
      <span>Nativesmart <strong>Lab</strong></span>
    </a>

    <div class="topbar__controls">
      <label class="field">
        <span>Techno</span>
        <select v-model="state.tech">
          <option
            v-for="tech in technologies"
            :key="tech.id"
            :value="tech.id"
            :disabled="!tech.url"
          >
            {{ tech.name }}{{ tech.url ? "" : " (bientôt)" }}
          </option>
        </select>
      </label>

      <label class="field">
        <span>Identité</span>
        <select v-model="state.brand">
          <option v-for="theme in Object.values(brandThemes)" :key="theme.id" :value="theme.id">
            {{ theme.name }}
          </option>
        </select>
      </label>

      <div class="segmented" role="group" aria-label="Mode">
        <button
          type="button"
          :aria-pressed="state.mode === 'light'"
          title="Mode clair"
          @click="state.mode = 'light'"
        >
          ☀
        </button>
        <button
          type="button"
          :aria-pressed="state.mode === 'dark'"
          title="Mode sombre"
          @click="state.mode = 'dark'"
        >
          ☾
        </button>
      </div>

      <div class="segmented" role="group" aria-label="Direction">
        <button type="button" :aria-pressed="state.dir === 'ltr'" @click="state.dir = 'ltr'">
          LTR
        </button>
        <button type="button" :aria-pressed="state.dir === 'rtl'" @click="state.dir = 'rtl'">
          RTL
        </button>
      </div>

      <div class="segmented" role="group" aria-label="Largeur">
        <button
          v-for="[value, label] in [
            ['mobile', 'Mobile'],
            ['tablet', 'Tablette'],
            ['desktop', 'Desktop']
          ] as const"
          :key="value"
          type="button"
          :aria-pressed="state.viewport === value"
          @click="state.viewport = value"
        >
          {{ label }}
        </button>
      </div>
    </div>
  </header>
</template>
