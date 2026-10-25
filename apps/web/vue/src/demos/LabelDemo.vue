<script setup lang="ts">
import { NsLabel } from "@nativesmart/vue";
import { computed, ref, useAttrs } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

/* A real field: clicking the label focuses it, and the counter follows what is typed. */
const value = ref("25000");
const max = 12;
const labelAttrs = computed(() => ({
  ...attrs,
  counter: attrs.counter !== undefined ? `${value.value.length}/${max}` : undefined
}));
const describedBy = computed(() => (attrs.description ? "demo-amount-description" : undefined));
const method = ref("mobile");
</script>

<template>
  <div :class="['demo-label', { 'is-small': variation }]">
    <div class="demo-label__field">
      <NsLabel v-bind="labelAttrs" for="demo-amount" />
      <input
        id="demo-amount"
        v-model="value"
        :class="['demo-label__input', { 'is-invalid': attrs.invalid }]"
        inputmode="numeric"
        :maxlength="max"
        :required="Boolean(attrs.required)"
        :disabled="Boolean(attrs.disabled)"
        :aria-invalid="Boolean(attrs.invalid) || undefined"
        :aria-describedby="describedBy"
      />
    </div>

    <fieldset v-if="!variation" class="demo-label__group">
      <NsLabel as="legend" text="Moyen de paiement" required />
      <label v-for="option in ['mobile', 'card']" :key="option" class="demo-label__option">
        <input v-model="method" type="radio" name="demo-method" :value="option" />
        {{ option === "mobile" ? "Mobile Money" : "Carte bancaire" }}
      </label>
    </fieldset>
  </div>
</template>

<style>
.demo-label {
  box-sizing: border-box;
  display: grid;
  gap: var(--ns-space-5);
  inline-size: 360px;
  max-inline-size: 100%;
  padding: var(--ns-space-6);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface);
  box-shadow: var(--ns-elevation-card);
}

.demo-label.is-small {
  inline-size: 100%;
  padding: var(--ns-space-4);
  box-shadow: none;
}

.demo-label__field {
  display: grid;
  gap: var(--ns-space-1-5);
}

/* The label's description sits under its line; the input follows it. */
.demo-label__input {
  min-block-size: 40px;
  padding-inline: var(--ns-space-3);
  border: 1px solid var(--ns-color-border);
  border-radius: var(--ns-radius-control);
  background: var(--ns-color-surface);
  color: var(--ns-color-text);
  font: inherit;
  font-variant-numeric: tabular-nums;
}

.demo-label__input:focus-visible {
  border-color: var(--ns-color-primary);
  outline: 0;
  box-shadow: 0 0 0 3px var(--ns-color-primary-muted);
}

.demo-label__input.is-invalid {
  border-color: var(--ns-color-danger);
}

.demo-label__input:disabled {
  background: var(--ns-color-surface-disabled);
  color: var(--ns-color-text-disabled);
}

.demo-label__group {
  display: grid;
  gap: var(--ns-space-2);
  margin: 0;
  padding: 0;
  border: 0;
}

.demo-label__group .ns-label {
  margin-block-end: var(--ns-space-1);
}

.demo-label__option {
  display: flex;
  align-items: center;
  gap: var(--ns-space-2);
  color: var(--ns-color-text);
  font-size: var(--ns-text-body-sm-size);
  cursor: pointer;
}

.demo-label__option input {
  accent-color: var(--ns-color-primary);
}
</style>
