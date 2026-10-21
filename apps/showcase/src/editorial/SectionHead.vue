<script setup lang="ts">
import Icon from "./Icon.vue";
import type { IconName } from "./icons";

withDefaults(
  defineProps<{ kicker: string; icon: IconName; title: string; lead?: string; center?: boolean }>(),
  { lead: "", center: false }
);
</script>

<template>
  <header :class="['ed-head', { 'ed-head--center': center }]">
    <p v-reveal:fade class="ed-kicker">
      <span class="ed-kicker__icon"><Icon :name="icon" :size="14" /></span>
      {{ kicker }}
    </p>
    <h2 v-reveal="60" class="ed-head__title">{{ title }}</h2>
    <p v-if="lead" v-reveal="120" class="ed-head__lead">{{ lead }}</p>
  </header>
</template>
