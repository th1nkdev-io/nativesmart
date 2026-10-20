<script setup lang="ts">
import { computed, ref } from "vue";
import { highlight } from "../lib/highlight";

const props = withDefaults(defineProps<{ code: string; language?: string }>(), {
  language: ""
});

const tokens = computed(() => highlight(props.code));
const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code);
  } catch {
    return;
  }
  copied.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = false), 1400);
}
</script>

<template>
  <div class="code-block">
    <div class="code-block__bar">
      <span class="code-block__language">{{ language }}</span>
      <slot name="actions" />
      <button type="button" class="ghost-button" @click="copy">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path v-if="copied" d="M20 6 9 17l-5-5" />
          <template v-else>
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </template>
        </svg>
        {{ copied ? "Copié" : "Copier" }}
      </button>
    </div>
    <pre class="code-block__pre" dir="ltr"><code><span
      v-for="(token, index) in tokens"
      :key="index"
      :class="token.kind && `tok-${token.kind}`"
    >{{ token.text }}</span></code></pre>
  </div>
</template>
