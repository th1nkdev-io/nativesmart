<script setup lang="ts">
import Icon from "../Icon.vue";
import type { IconName } from "../icons";

const nodes: { icon: IconName; label: string }[] = [
  { icon: "book", label: "Contrat" },
  { icon: "palette", label: "Tokens" },
  { icon: "code", label: "Code" },
  { icon: "eye", label: "Lab" }
];
</script>

<template>
  <div v-tilt="8" class="cycle-art" role="img" aria-label="Le cycle d'un composant">
    <svg class="cycle-art__ring" viewBox="0 0 300 300" aria-hidden="true">
      <circle cx="150" cy="150" r="112" class="cycle-art__track" />
      <circle cx="150" cy="150" r="112" class="cycle-art__dash" />
    </svg>
    <span class="cycle-art__runner" aria-hidden="true" />
    <span
      v-for="(node, index) in nodes"
      :key="node.label"
      class="cycle-art__node"
      :style="{ '--angle': `${index * 90 - 90}deg`, '--i': index }"
    >
      <Icon :name="node.icon" :size="20" />
      <small>{{ node.label }}</small>
    </span>
    <span class="cycle-art__center">
      <strong>4</strong>
      <small>étapes</small>
    </span>
  </div>
</template>
