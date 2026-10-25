<script setup lang="ts">
import {
  NsButton,
  NsButtonGroup,
  NsIconButton,
  type NsButtonGroupOrientation,
  type NsButtonSize
} from "@nativesmart/vue";
import { computed, useAttrs } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

/* The other groups share size and orientation, each with its own look. */
const shape = computed(() => ({
  size: attrs.size as NsButtonSize | undefined,
  orientation: attrs.orientation as NsButtonGroupOrientation | undefined
}));
</script>

<template>
  <div v-if="variation" class="demo-group-tile">
    <NsButtonGroup v-bind="attrs">
      <NsButton label="PDF" icon="download" />
      <NsButton label="CSV" />
      <NsButton label="Imprimer" />
    </NsButtonGroup>
  </div>

  <div v-else class="demo-group">
    <section>
      <small>Exporter le relevé</small>
      <NsButtonGroup v-bind="attrs">
        <NsButton label="PDF" icon="download" />
        <NsButton label="CSV" />
        <NsButton label="Imprimer" />
      </NsButtonGroup>
    </section>

    <section>
      <small>Bouton scindé : l'action et ses variantes</small>
      <NsButtonGroup v-bind="shape" variant="solid" intent="primary" label="Envoyer">
        <NsButton label="Envoyer 25 000 FCFA" icon="send" />
        <NsIconButton icon="chevron-down" label="Autres façons d'envoyer" :tooltip="false" />
      </NsButtonGroup>
    </section>

    <section>
      <small>Barre d'outils</small>
      <NsButtonGroup v-bind="shape" variant="outline" intent="neutral" label="Reçu n° 4521">
        <NsIconButton icon="edit" label="Modifier" />
        <NsIconButton icon="copy" label="Dupliquer" />
        <NsIconButton icon="trash" label="Supprimer" intent="danger" />
      </NsButtonGroup>
    </section>
  </div>
</template>

<style>
.demo-group {
  display: grid;
  gap: var(--ns-space-5);
  inline-size: 460px;
  max-inline-size: 100%;
  padding: var(--ns-space-6);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface);
}

.demo-group section {
  display: grid;
  justify-items: start;
  gap: var(--ns-space-2);
}

.demo-group small {
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
}

.demo-group-tile {
  display: grid;
  place-items: center;
  inline-size: 100%;
}
</style>
