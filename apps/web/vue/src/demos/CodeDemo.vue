<script setup lang="ts">
import { NsCode, type NsCodeLanguage } from "@nativesmart/vue";
import { computed, useAttrs } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

const example = 'const total = 25000;\nsend("Aïcha Diallo", total);';

/* One sample per language, so each variation shows its own colors. */
const samples: Record<string, { code: string; title: string }> = {
  ts: {
    title: "send.ts",
    code: `import { transfer } from "@nativesmart/pay";

// Envoie le montant et renvoie le reçu
export async function send(to: string, amount = 25000) {
  const receipt = await transfer({ to, amount, currency: "XOF" });
  return receipt.id;
}`
  },
  js: {
    title: "total.js",
    code: `const amounts = [25000, 8500, 12000];
const total = amounts.reduce((sum, value) => sum + value, 0);
console.log(\`Total : \${total} FCFA\`);`
  },
  vue: {
    title: "Balance.vue",
    code: `<template>
  <NsSurface padding="lg" @click="open">
    <NsHeading :level="2">125 000 FCFA</NsHeading>
  </NsSurface>
</template>`
  },
  html: {
    title: "index.html",
    code: `<figure class="receipt">
  <img src="/kofi.jpg" alt="Kofi Mensah" />
  <figcaption>Reçu n° 4521</figcaption>
</figure>`
  },
  css: {
    title: "theme.css",
    code: `:root {
  --ns-color-primary: #0b63ce;
  --ns-radius-card: 16px;
}

.receipt { padding: 24px; }`
  },
  json: {
    title: "contact.json",
    code: `{
  "name": "Awa Koné",
  "balance": 125000,
  "verified": true
}`
  },
  bash: {
    title: "Terminal",
    code: `pnpm add @nativesmart/vue
pnpm showcase --port 4173`
  },
  text: {
    title: "README",
    code: `NativeSmart Pay
Envois, épargne et reçus en un seul endroit.`
  }
};

const language = computed<NsCodeLanguage>(() => {
  if (variation?.group === "states" && variation.value === "prompt") return "bash";
  return (attrs.language as NsCodeLanguage | undefined) ?? "ts";
});

/* The playground keeps code typed in the panel; otherwise each language shows its sample. */
const sample = computed(() => samples[language.value] ?? samples.ts!);
const code = computed(() =>
  attrs.code && attrs.code !== example ? String(attrs.code) : sample.value.code
);
const title = computed(() =>
  attrs.title && attrs.title !== "send.ts" ? String(attrs.title) : sample.value.title
);

/* Tones only color inline code, so their tiles show a sentence. */
const inline = computed(() => attrs.variant === "inline" || variation?.group === "tone");
const blockAttrs = computed(() => ({
  ...attrs,
  language: language.value,
  code: code.value,
  title: title.value,
  maxLines: variation ? 4 : (attrs.maxLines as number | undefined)
}));
</script>

<template>
  <p v-if="inline" :class="['demo-code-inline', { 'is-small': variation }]">
    Installez la bibliothèque avec
    <NsCode v-bind="attrs" variant="inline" code="pnpm add @nativesmart/vue" />, puis importez
    <NsCode v-bind="attrs" variant="inline" code="NsCode" /> dans vos pages.
  </p>
  <div v-else :class="['demo-code', { 'is-small': variation }]">
    <NsCode v-bind="blockAttrs" variant="block" />
  </div>
</template>

<style>
.demo-code {
  inline-size: 560px;
  max-inline-size: 100%;
}

.demo-code.is-small {
  inline-size: 100%;
}

.demo-code-inline {
  max-inline-size: 440px;
  margin: 0;
  color: var(--ns-color-text);
  font-size: var(--ns-text-body-md-size);
  line-height: 1.8;
}

.demo-code-inline.is-small {
  font-size: var(--ns-text-body-sm-size);
}
</style>
