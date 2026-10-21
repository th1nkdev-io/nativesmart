<script setup lang="ts">
import Icon from "./Icon.vue";
import type { IconName } from "./icons";

defineProps<{ eyebrow: string; icon: IconName; lead: string }>();
</script>

<template>
  <header :class="['ed-hero', { 'ed-hero--art': $slots.art }]">
    <div class="ed-hero__glow" aria-hidden="true" />
    <div class="ed-hero__text">
      <p v-reveal:fade class="ed-pill">
        <Icon :name="icon" :size="14" />
        {{ eyebrow }}
      </p>
      <h1 v-reveal="80" class="ed-hero__title"><slot name="title" /></h1>
      <p v-reveal="160" class="ed-hero__lead">{{ lead }}</p>
      <div v-if="$slots.actions" v-reveal="240" class="ed-hero__actions">
        <slot name="actions" />
      </div>
      <div v-if="$slots.meta" v-reveal="320" class="ed-hero__meta">
        <slot name="meta" />
      </div>
    </div>
    <div v-if="$slots.art" v-reveal:scale="200" class="ed-hero__art">
      <slot name="art" />
    </div>
  </header>
</template>
