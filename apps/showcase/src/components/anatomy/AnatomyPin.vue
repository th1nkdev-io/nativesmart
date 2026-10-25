<script setup lang="ts">
defineProps<{ number: number; active: boolean }>();
</script>

<template>
  <b :class="['anatomy-pin', { 'is-active': active }]" aria-hidden="true">{{ number }}</b>
</template>
