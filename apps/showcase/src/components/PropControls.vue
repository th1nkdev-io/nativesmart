<script setup lang="ts">
import type { ComponentContract, ComponentProperty } from "@nativesmart/contracts";
import { editableKinds, type ShowcasePropValue } from "@nativesmart/showcase-runtime";
import { computed } from "vue";
import LabSegmented from "../ui/LabSegmented.vue";
import LabSelect from "../ui/LabSelect.vue";
import LabSwitch from "../ui/LabSwitch.vue";

const props = defineProps<{ contract: ComponentContract }>();
const values = defineModel<Record<string, ShowcasePropValue>>({ required: true });
defineEmits<{ reset: [] }>();

const editable = computed(() =>
  props.contract.properties.filter((property) => editableKinds.has(property.kind))
);

const kindLabels: Record<string, string> = {
  boolean: "booléen",
  enum: "liste",
  number: "nombre",
  string: "texte",
  "string-list": "liste de textes"
};

/** Short enums read best as segmented buttons; longer ones use a select. */
function isSegmented(property: ComponentProperty) {
  const options = property.values ?? [];
  return (
    property.defaultValue !== undefined && options.length <= 4 && options.join("").length <= 22
  );
}

function enumOptions(property: ComponentProperty) {
  return (property.values ?? []).map((value) => ({ value, label: value }));
}

function set(property: ComponentProperty, value: ShowcasePropValue | undefined) {
  const next = { ...values.value };
  if (value === undefined || value === "") delete next[property.name];
  else next[property.name] = value;
  values.value = next;
}

function setText(property: ComponentProperty, raw: string) {
  if (property.kind === "number") return set(property, raw === "" ? undefined : Number(raw));
  if (property.kind === "string-list") {
    return set(
      property,
      raw
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    );
  }
  set(property, raw);
}

function text(value: ShowcasePropValue | undefined) {
  return Array.isArray(value) ? value.join(", ") : String(value ?? "");
}
</script>

<template>
  <section class="aside-card props-panel" aria-labelledby="props-title">
    <header class="aside-card__head">
      <h2 id="props-title" class="aside__title">Propriétés</h2>
      <button type="button" class="ghost-button" @click="$emit('reset')">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        Réinitialiser
      </button>
    </header>
    <p v-if="editable.length === 0" class="muted">Aucune propriété modifiable.</p>

    <div class="props-list">
      <div
        v-for="property in editable"
        :key="property.name"
        :class="['prop', { 'prop--inline': property.kind === 'boolean' }]"
      >
        <div class="prop__head">
          <span class="prop__name">
            {{ property.name }}<span v-if="property.required" class="prop__required">*</span>
          </span>
          <span class="prop__kind">{{ kindLabels[property.kind] ?? property.kind }}</span>
        </div>

        <LabSwitch
          v-if="property.kind === 'boolean'"
          class="prop__control"
          :label="property.name"
          :model-value="values[property.name] === true"
          @update:model-value="set(property, $event)"
        />
        <LabSegmented
          v-else-if="property.kind === 'enum' && isSegmented(property)"
          class="prop__control"
          :label="property.name"
          :options="enumOptions(property)"
          :model-value="values[property.name] as string | undefined"
          @update:model-value="set(property, $event)"
        />
        <LabSelect
          v-else-if="property.kind === 'enum'"
          class="prop__control"
          :label="property.name"
          :options="enumOptions(property)"
          placeholder="Aucune valeur"
          :model-value="values[property.name] as string | undefined"
          @update:model-value="set(property, $event)"
        />
        <input
          v-else
          class="lab-input prop__control"
          :type="property.kind === 'number' ? 'number' : 'text'"
          :value="text(values[property.name])"
          :placeholder="property.kind === 'string-list' ? 'valeur, valeur…' : ''"
          :aria-label="property.name"
          @input="setText(property, ($event.target as HTMLInputElement).value)"
        />

        <p class="prop__description">{{ property.description }}</p>
      </div>
    </div>
  </section>
</template>
