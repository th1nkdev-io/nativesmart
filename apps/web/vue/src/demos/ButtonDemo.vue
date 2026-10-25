<script setup lang="ts">
import { NsButton, type NsButtonIntent, type NsButtonVariant } from "@nativesmart/vue";
import { computed, ref, useAttrs } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

/* Pressing the main button runs a short fake send, to show loading. */
const sending = ref(false);
function send() {
  sending.value = true;
  setTimeout(() => (sending.value = false), 1400);
}

const variants: NsButtonVariant[] = ["solid", "soft", "outline", "ghost", "link"];
const intents: NsButtonIntent[] = ["primary", "neutral", "success", "warning", "danger"];
const intentLabels: Record<NsButtonIntent, string> = {
  primary: "Envoyer",
  neutral: "Annuler",
  success: "Valider",
  warning: "Revoir",
  danger: "Supprimer"
};
const label = computed(() => String(attrs.label ?? "Envoyer"));
const currentVariant = computed(() => attrs.variant ?? "solid");
const currentIntent = computed(() => attrs.intent ?? "primary");
</script>

<template>
  <div v-if="variation" class="demo-button-tile">
    <NsButton v-bind="attrs" :label="label" />
  </div>

  <div v-else class="demo-button">
    <div class="demo-button__stage">
      <NsButton
        v-bind="attrs"
        :label="label"
        :loading="Boolean(attrs.loading) || sending"
        @press="send"
      />
      <small>Appuyez : le bouton passe en chargement sans changer de largeur.</small>
    </div>

    <div class="demo-button__matrix" role="presentation">
      <span />
      <b v-for="intent in intents" :key="intent">{{ intent }}</b>
      <template v-for="variant in variants" :key="variant">
        <b>{{ variant }}</b>
        <span
          v-for="intent in intents"
          :key="intent"
          :class="{ 'is-current': variant === currentVariant && intent === currentIntent }"
        >
          <NsButton :label="intentLabels[intent]" :variant="variant" :intent="intent" size="sm" />
        </span>
      </template>
    </div>
  </div>
</template>

<style>
.demo-button {
  display: grid;
  gap: var(--ns-space-5);
  inline-size: 720px;
  max-inline-size: 100%;
}

.demo-button__stage {
  display: grid;
  justify-items: center;
  gap: var(--ns-space-3);
  padding: var(--ns-space-8) var(--ns-space-4);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background:
    radial-gradient(circle, var(--ns-color-border-subtle) 1px, transparent 1.5px) 0 0 / 14px 14px,
    var(--ns-color-surface);
}

.demo-button__stage small {
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
}

.demo-button__matrix {
  display: grid;
  grid-template-columns: 64px repeat(5, minmax(0, 1fr));
  gap: var(--ns-space-1);
  align-items: center;
  overflow-x: auto;
  padding: var(--ns-space-3);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface);
}

.demo-button__matrix > b {
  color: var(--ns-color-text-subtle);
  font-family: var(--ns-font-mono);
  font-size: 10px;
  font-weight: var(--ns-font-weight-medium);
  text-align: center;
}

.demo-button__matrix > b:nth-child(6n + 1) {
  text-align: start;
}

.demo-button__matrix > span {
  display: grid;
  place-items: center;
  min-block-size: 48px;
  border-radius: var(--ns-radius-md);
}

.demo-button__matrix > span.is-current {
  background: var(--ns-color-primary-muted);
  box-shadow: inset 0 0 0 1px var(--ns-color-primary-border);
}

.demo-button-tile {
  display: grid;
  place-items: center;
  inline-size: 100%;
}
</style>
