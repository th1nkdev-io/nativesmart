<script setup lang="ts">
import { technologies } from "../../technologies";

// Twice the list, so the loop never shows a gap.
const items = [...technologies, ...technologies];
</script>

<template>
  <div class="marquee" aria-label="Technologies prises en charge">
    <ul class="marquee__track">
      <li
        v-for="(technology, index) in items"
        :key="`${technology.id}-${index}`"
        :aria-hidden="index >= technologies.length || undefined"
      >
        <svg v-if="technology.icon" viewBox="0 0 24 24" aria-hidden="true">
          <path :d="technology.icon.path" />
        </svg>
        {{ technology.name }}
      </li>
    </ul>
  </div>
</template>
