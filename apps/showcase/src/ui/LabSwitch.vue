<script setup lang="ts">
defineProps<{ label: string }>();
const model = defineModel<boolean>({ default: false });
</script>

<template>
  <button
    type="button"
    role="switch"
    class="lab-switch"
    :aria-checked="model"
    :aria-label="label"
    @click="model = !model"
  >
    <span class="lab-switch__thumb" />
  </button>
</template>
