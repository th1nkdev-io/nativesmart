<script setup lang="ts">
import { NsCopyButton } from "@nativesmart/vue";
import { computed, useAttrs } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

/* French wording, unless the panel changes it. */
const french = {
  label: "Copier",
  copiedLabel: "Copié",
  failedLabel: "Copie impossible",
  maskedLabel: "masqué, se termine par"
};
const main = computed(() => ({
  ...french,
  ...attrs,
  label: attrs.label === "Copy" || !attrs.label ? french.label : String(attrs.label),
  copiedLabel:
    attrs.copiedLabel === "Copied" || !attrs.copiedLabel
      ? french.copiedLabel
      : String(attrs.copiedLabel),
  failedLabel:
    attrs.failedLabel === "Copy failed" || !attrs.failedLabel
      ? french.failedLabel
      : String(attrs.failedLabel),
  value: String(attrs.value ?? "CI93 0001 2345 6789 4521")
}));
</script>

<template>
  <div v-if="variation" class="demo-copy-tile">
    <NsCopyButton v-bind="main" />
  </div>

  <article v-else class="demo-copy">
    <header>
      <small>Recevoir de l'argent</small>
      <strong>Partagez ces informations avec Kofi Mensah</strong>
    </header>
    <NsCopyButton v-bind="main" />
    <div class="demo-copy__row">
      <span>
        <small>Référence</small>
        <b>NS-4521</b>
      </span>
      <NsCopyButton v-bind="french" value="NS-4521" display="icon" caption="Référence" />
    </div>
    <NsCopyButton
      v-bind="french"
      value="https://pay.nativesmart.dev/r/aicha-diallo"
      display="button"
      label="Copier le lien de paiement"
    />
  </article>
</template>

<style>
.demo-copy {
  display: grid;
  gap: var(--ns-space-4);
  inline-size: 420px;
  max-inline-size: 100%;
  padding: var(--ns-space-6);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface);
  box-shadow: var(--ns-elevation-card);
  color: var(--ns-color-text);
}

.demo-copy header {
  display: grid;
  gap: 2px;
}

.demo-copy header small {
  color: var(--ns-color-primary-text);
  font-size: var(--ns-text-overline-size);
  font-weight: var(--ns-font-weight-semibold);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.demo-copy header strong {
  font-size: var(--ns-text-body-md-size);
}

.demo-copy__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--ns-space-2) var(--ns-space-3);
  border-radius: var(--ns-radius-control);
  background: var(--ns-color-surface-muted);
}

.demo-copy__row span {
  display: grid;
}

.demo-copy__row small {
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
}

.demo-copy__row b {
  font-family: var(--ns-font-mono);
  font-size: var(--ns-text-body-sm-size);
}

.demo-copy-tile {
  display: grid;
  justify-items: center;
  inline-size: 100%;
}

.demo-copy-tile .ns-copy-button--field {
  inline-size: 100%;
}
</style>
