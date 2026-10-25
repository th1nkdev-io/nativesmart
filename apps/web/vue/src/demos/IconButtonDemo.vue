<script setup lang="ts">
import { NsIconButton } from "@nativesmart/vue";
import { computed, useAttrs } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

const icon = computed(() => String(attrs.icon ?? "bell"));
const label = computed(() => String(attrs.label ?? "Notifications"));

/* The other buttons share the panel's look, with their own icons and no badge. */
const look = computed(() => {
  const { icon: _icon, label: _label, badge: _badge, ...rest } = attrs;
  return rest;
});

/* A shape only shows on a filled button. */
const tileAttrs = computed(() =>
  variation?.group === "shape" ? { ...attrs, variant: "soft", intent: "primary" } : attrs
);
const tileLook = computed(() => {
  const {
    icon: _icon,
    label: _label,
    badge: _badge,
    ...rest
  } = tileAttrs.value as Record<string, unknown>;
  return rest;
});

const tools = [
  { icon: "edit", label: "Modifier" },
  { icon: "copy", label: "Dupliquer" },
  { icon: "download", label: "Télécharger" },
  { icon: "trash", label: "Supprimer" }
];
</script>

<template>
  <div v-if="variation" class="demo-icon-button-tile">
    <NsIconButton v-bind="tileAttrs" :icon="icon" :label="label" />
    <NsIconButton v-bind="tileLook" icon="search" label="Rechercher" />
    <NsIconButton v-bind="tileLook" icon="heart" label="Favori" />
  </div>

  <div v-else class="demo-icon-button">
    <div class="demo-icon-button__stage">
      <NsIconButton v-bind="attrs" :icon="icon" :label="label" />
      <small>Survolez ou tabulez : le label apparaît dans une bulle.</small>
    </div>

    <header class="demo-icon-button__bar">
      <NsIconButton v-bind="look" icon="menu" label="Menu" />
      <strong>NativeSmart Pay</strong>
      <span class="demo-icon-button__actions">
        <NsIconButton v-bind="look" icon="search" label="Rechercher" />
        <NsIconButton v-bind="attrs" :icon="icon" :label="label" />
        <NsIconButton v-bind="look" icon="settings" label="Réglages" />
      </span>
    </header>

    <div class="demo-icon-button__tools" role="toolbar" aria-label="Reçu de Kofi Mensah">
      <span>Reçu n° 4521</span>
      <NsIconButton
        v-for="tool in tools"
        :key="tool.icon"
        v-bind="look"
        :icon="tool.icon"
        :label="tool.label"
        size="sm"
        :intent="tool.icon === 'trash' ? 'danger' : (look.intent as never)"
      />
    </div>
  </div>
</template>

<style>
.demo-icon-button {
  display: grid;
  gap: var(--ns-space-4);
  inline-size: 520px;
  max-inline-size: 100%;
}

.demo-icon-button__stage {
  display: grid;
  justify-items: center;
  gap: var(--ns-space-3);
  padding: var(--ns-space-10) var(--ns-space-4) var(--ns-space-6);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background:
    radial-gradient(circle, var(--ns-color-border-subtle) 1px, transparent 1.5px) 0 0 / 14px 14px,
    var(--ns-color-surface);
}

.demo-icon-button__stage small {
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
}

.demo-icon-button__bar,
.demo-icon-button__tools {
  display: flex;
  align-items: center;
  gap: var(--ns-space-2);
  padding: var(--ns-space-2) var(--ns-space-3);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface);
  color: var(--ns-color-text);
}

.demo-icon-button__bar strong {
  overflow: hidden;
  font-size: var(--ns-text-body-sm-size);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.demo-icon-button__actions {
  display: flex;
  gap: var(--ns-space-1);
  margin-inline-start: auto;
}

.demo-icon-button__tools > span:first-child {
  flex: 1;
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
}

.demo-icon-button-tile {
  display: flex;
  justify-content: center;
  gap: var(--ns-space-2);
  padding-block-start: var(--ns-space-6);
}
</style>
