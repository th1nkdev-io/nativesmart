<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ value: string }>();
const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  try {
    await navigator.clipboard.writeText(props.value);
  } catch {
    return;
  }
  copied.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = false), 1200);
}
</script>

<template>
  <button type="button" class="token-code" :title="`Copier ${value}`" @click="copy">
    <code>{{ value }}</code>
    <span class="token-code__state" aria-live="polite">{{ copied ? "Copié" : "" }}</span>
  </button>
</template>
