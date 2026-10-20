<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; lead: string }>();
</script>

<template>
  <article class="page doc">
    <header class="page__header">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1 class="ns-text-h1">{{ title }}</h1>
      <p class="lead">{{ lead }}</p>
    </header>
    <slot />
  </article>
</template>
