<script lang="ts">
import { reactive, ref } from "vue";
import type { SnippetLanguage } from "@nativesmart/showcase-runtime";

// Shared by every preview: the chosen syntax per technology and the expanded state persist while
// browsing components.
const preferredLanguage = reactive<Record<string, SnippetLanguage>>({});
const expanded = ref(false);
</script>

<script setup lang="ts">
import type { ComponentContract } from "@nativesmart/contracts";
import {
  componentSnippet,
  examplesSnippet,
  snippetVariantsFor,
  type ShowcaseProps,
  type VariationGroup
} from "@nativesmart/showcase-runtime";
import { computed, useId, watch } from "vue";
import { useCopy } from "../lib/clipboard";
import { highlight } from "../lib/highlight";
import { state } from "../state";
import { getTechnology } from "../technologies";

const props = defineProps<{
  contract: ComponentContract;
  /** Props of the playground preview. */
  values?: ShowcaseProps;
  /** Variation groups: the code shows every example of the selected group. */
  groups?: readonly VariationGroup[];
}>();

/** Above this number of lines, the code is folded to keep the preview in focus. */
const foldedLines = 12;

const id = useId();
const technology = computed(() => getTechnology(state.tech));
const variants = computed(() => snippetVariantsFor(technology.value.id));
const variant = computed(
  () =>
    variants.value.find((item) => item.language === preferredLanguage[technology.value.id]) ??
    variants.value[0]
);
const groupIndex = ref(0);
watch(
  () => props.groups,
  () => (groupIndex.value = 0)
);

const code = computed(() => {
  const group = props.groups?.[groupIndex.value];
  if (group) {
    return examplesSnippet(
      variant.value.language,
      props.contract,
      group.items.map((item) => item.props)
    );
  }
  return componentSnippet(variant.value.language, props.contract, props.values ?? {});
});
const tokens = computed(() => highlight(code.value));
const lineCount = computed(() => code.value.split("\n").length);
const foldable = computed(() => lineCount.value > foldedLines);
const folded = computed(() => foldable.value && !expanded.value);

/** Whether the code describes shipped code or the API the contract plans. */
const status = computed(() => {
  const name = technology.value.name;
  if (!technology.value.implemented.has(props.contract.id)) {
    return {
      tone: "planned",
      label: "API prévue",
      detail: `Pas encore codé en ${name} : le code suit l'API prévue par le contrat.`
    };
  }
  if (technology.value.url) {
    return { tone: "ready", label: "Disponible", detail: `Codé en ${name} et testable ici.` };
  }
  return {
    tone: "aligning",
    label: "En alignement",
    detail: `Codé en ${name}, son API s'aligne encore sur le contrat.`
  };
});

const { copied, copy } = useCopy();
</script>

<template>
  <section :class="['preview-code', { 'is-folded': folded }]" aria-label="Code">
    <div class="preview-code__bar">
      <span class="preview-code__tech">
        <svg v-if="technology.icon" viewBox="0 0 24 24" aria-hidden="true">
          <path :d="technology.icon.path" />
        </svg>
        {{ technology.name }}
      </span>

      <div
        v-if="variants.length > 1"
        class="preview-code__pills"
        role="radiogroup"
        aria-label="Syntaxe"
      >
        <button
          v-for="item in variants"
          :key="item.language"
          type="button"
          role="radio"
          :aria-checked="item.language === variant.language"
          @click="preferredLanguage[technology.id] = item.language"
        >
          {{ item.label }}
        </button>
      </div>

      <div
        v-if="groups && groups.length > 1"
        class="preview-code__pills scroll-hidden"
        role="radiogroup"
        aria-label="Groupe de variations"
      >
        <button
          v-for="(group, index) in groups"
          :key="group.title"
          type="button"
          role="radio"
          :aria-checked="index === groupIndex"
          @click="groupIndex = index"
        >
          {{ group.title }}
        </button>
      </div>

      <span
        :class="['preview-code__status', `preview-code__status--${status.tone}`]"
        :title="status.detail"
      >
        <span class="preview-code__dot" aria-hidden="true" />
        {{ status.label }}
        <span class="sr-only">. {{ status.detail }}</span>
      </span>

      <button type="button" class="preview-code__action" @click="copy(code)">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path v-if="copied" d="M20 6 9 17l-5-5" />
          <template v-else>
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </template>
        </svg>
        <span class="preview-code__action-label">{{ copied ? "Copié" : "Copier" }}</span>
      </button>
      <button
        v-if="foldable"
        type="button"
        class="preview-code__action"
        :aria-expanded="!folded"
        :aria-controls="`${id}-code`"
        :title="folded ? 'Afficher tout le code' : 'Réduire le code'"
        @click="expanded = !expanded"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path :d="folded ? 'm7 10 5 5 5-5' : 'm7 14 5-5 5 5'" />
        </svg>
        <span class="sr-only">{{ folded ? "Afficher tout le code" : "Réduire le code" }}</span>
      </button>
    </div>

    <div :id="`${id}-code`" class="preview-code__body">
      <pre class="code-block__pre" dir="ltr"><code><span
        v-for="(token, index) in tokens"
        :key="index"
        :class="token.kind && `tok-${token.kind}`"
      >{{ token.text }}</span></code></pre>
      <button v-if="folded" type="button" class="preview-code__more" @click="expanded = true">
        Afficher tout le code · {{ lineCount }} lignes
      </button>
    </div>
  </section>
</template>
