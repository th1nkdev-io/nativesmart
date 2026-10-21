<script setup lang="ts">
import { computed, ref } from "vue";
import {
  isTokenName,
  referenceFor,
  tokenPlatform,
  tokenPlatformName
} from "../../lib/tokenPlatform";

const props = defineProps<{ value: string }>();
const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

/** Token written for the active technology; CSS when the platform has no equivalent. */
const shown = computed(() => referenceFor(props.value) ?? props.value);
const webOnly = computed(
  () =>
    isTokenName(props.value) && tokenPlatform.value !== "css" && referenceFor(props.value) === null
);
const title = computed(() =>
  webOnly.value
    ? `Token web uniquement : pas d'équivalent en ${tokenPlatformName.value}. Copier ${shown.value}`
    : `Copier ${shown.value}`
);

async function copy() {
  try {
    await navigator.clipboard.writeText(shown.value);
  } catch {
    return;
  }
  copied.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = false), 1200);
}
</script>

<template>
  <button
    type="button"
    :class="['token-code', { 'token-code--web': webOnly }]"
    :title="title"
    @click="copy"
  >
    <code>{{ shown }}</code>
    <span v-if="webOnly" class="token-code__web" aria-hidden="true">web</span>
    <span class="token-code__state" aria-live="polite">{{ copied ? "Copié" : "" }}</span>
  </button>
</template>
