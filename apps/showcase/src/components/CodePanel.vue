<script setup lang="ts">
import type { ComponentContract } from "@nativesmart/contracts";
import {
  componentSnippet,
  snippetTargets,
  type ShowcaseProps,
  type SnippetLanguage
} from "@nativesmart/showcase-runtime";
import { computed, ref, watch } from "vue";
import { state } from "../state";
import { technologies } from "../technologies";
import CodeBlock from "../ui/CodeBlock.vue";

const props = defineProps<{ contract: ComponentContract; values: ShowcaseProps }>();

const fromTech = () =>
  snippetTargets.find((target) => target.renderer === state.tech)?.language ?? "vue";
const language = ref<SnippetLanguage>(fromTech());
watch(
  () => state.tech,
  () => (language.value = fromTech())
);

const target = computed(
  () => snippetTargets.find((item) => item.language === language.value) ?? snippetTargets[0]
);
const code = computed(() => componentSnippet(language.value, props.contract, props.values));

/** Whether the snippet describes shipped code or the API the contract plans. */
const status = computed(() => {
  const technology = technologies.find((item) => item.id === target.value.renderer);
  if (!technology?.implemented.has(props.contract.id)) {
    return { tone: "planned", label: "API prévue par le contrat" };
  }
  if (technology.url) return { tone: "ready", label: "Disponible" };
  return { tone: "aligning", label: "Codé, API en cours d'alignement" };
});
</script>

<template>
  <section class="code-panel" aria-labelledby="code-title">
    <header class="code-panel__head">
      <h2 id="code-title" class="code-panel__title">Code</h2>
      <div class="code-panel__tabs scroll-hidden" role="tablist" aria-label="Langage">
        <button
          v-for="item in snippetTargets"
          :key="item.language"
          type="button"
          role="tab"
          :aria-selected="item.language === language"
          @click="language = item.language"
        >
          {{ item.label }}
        </button>
      </div>
    </header>
    <CodeBlock :code="code" :language="target.label">
      <template #actions>
        <span :class="['code-panel__status', `code-panel__status--${status.tone}`]">
          {{ status.label }}
        </span>
      </template>
    </CodeBlock>
  </section>
</template>
