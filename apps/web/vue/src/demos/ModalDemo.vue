<script setup lang="ts">
import { NsButton, NsModal } from "@nativesmart/vue";
import { ref, useAttrs, watch } from "vue";
import { useView } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const view = useView();
const open = ref(Boolean(attrs.open));
watch(
  () => attrs.open,
  (next) => (open.value = Boolean(next))
);
</script>

<template>
  <!-- The variation grid shows the panel in place: a real dialog would cover every variation. -->
  <div v-if="view !== 'playground'">
    <div v-if="open" class="ns-modal__panel demo-modal__static">
      <header class="ns-modal__header">
        <div class="ns-modal__heading">
          <h2 class="ns-modal__title">Confirmer l'envoi</h2>
        </div>
      </header>
      <div class="ns-modal__content">25 000 FCFA seront envoyés à Kofi Mensah.</div>
      <footer class="ns-modal__actions">
        <NsButton label="Annuler" variant="ghost" intent="neutral" size="sm" />
        <NsButton label="Confirmer" size="sm" />
      </footer>
    </div>
    <NsButton v-else label="Ouvrir la fenêtre" variant="outline" />
  </div>

  <div v-else :class="['demo-modal', { 'demo-modal--open': open }]">
    <NsButton label="Ouvrir la fenêtre" variant="outline" @press="open = true" />
    <NsModal
      title="Confirmer l'envoi"
      description="Vérifiez le montant avant de valider."
      close-label="Fermer"
      v-bind="$attrs"
      :open="open"
      @update:open="open = $event"
    >
      25 000 FCFA seront envoyés à Kofi Mensah. Les frais sont offerts pour ce transfert.
      <template #actions>
        <NsButton label="Annuler" variant="ghost" intent="neutral" @press="open = false" />
        <NsButton label="Confirmer" @press="open = false" />
      </template>
    </NsModal>
  </div>
</template>

<style>
/* The Lab frame grows to the content: keep room for the open dialog. */
.demo-modal--open {
  min-block-size: 360px;
}

.demo-modal__static {
  inline-size: 340px;
  max-inline-size: 100%;
  border-radius: var(--ns-radius-overlay);
}
</style>
