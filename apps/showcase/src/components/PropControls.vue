<script setup lang="ts">
import type { ComponentContract, ComponentProperty } from "@nativesmart/contracts";
import { editableKinds, type ShowcasePropValue } from "@nativesmart/showcase-runtime";
import { computed } from "vue";

const props = defineProps<{ contract: ComponentContract }>();
const values = defineModel<Record<string, ShowcasePropValue>>({ required: true });
defineEmits<{ reset: [] }>();

const editable = computed(() =>
  props.contract.properties.filter((property) => editableKinds.has(property.kind))
);

function update(property: ComponentProperty, raw: string | boolean) {
  let value: ShowcasePropValue = raw;
  if (property.kind === "number") value = Number(raw);
  if (property.kind === "string-list") {
    value = String(raw)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  const next = { ...values.value, [property.name]: value };
  if (value === "" && property.kind === "enum") delete next[property.name];
  values.value = next;
}

function text(value: ShowcasePropValue | undefined) {
  return Array.isArray(value) ? value.join(", ") : String(value ?? "");
}
</script>

<template>
  <form class="controls" @submit.prevent>
    <div class="controls__head">
      <h3>Propriétés</h3>
      <button type="button" class="link-button" @click="$emit('reset')">Réinitialiser</button>
    </div>
    <p v-if="editable.length === 0" class="muted">Aucune propriété modifiable.</p>

    <label v-for="property in editable" :key="property.name" class="controls__row">
      <span class="controls__name">
        {{ property.name }}<span v-if="property.required" class="controls__required">*</span>
      </span>

      <select
        v-if="property.kind === 'enum'"
        :value="values[property.name] ?? ''"
        @change="update(property, ($event.target as HTMLSelectElement).value)"
      >
        <option v-if="property.defaultValue === undefined" value="">—</option>
        <option v-for="value in property.values" :key="value" :value="value">{{ value }}</option>
      </select>

      <input
        v-else-if="property.kind === 'boolean'"
        type="checkbox"
        class="switch"
        :checked="values[property.name] === true"
        @change="update(property, ($event.target as HTMLInputElement).checked)"
      />

      <input
        v-else
        :type="property.kind === 'number' ? 'number' : 'text'"
        :value="text(values[property.name])"
        :placeholder="property.kind === 'string-list' ? 'a, b, c' : ''"
        @input="update(property, ($event.target as HTMLInputElement).value)"
      />

      <small class="controls__hint">{{ property.description }}</small>
    </label>
  </form>
</template>
