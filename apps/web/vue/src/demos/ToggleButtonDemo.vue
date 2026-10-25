<script setup lang="ts">
import { NsToggleButton } from "@nativesmart/vue";
import { computed, ref, useAttrs, watch } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

const label = computed(() => String(attrs.label ?? "Favori"));

/* The panel sets the starting state; clicks then switch it here. */
const on = ref(Boolean(attrs.pressed));
watch(
  () => attrs.pressed,
  (value) => (on.value = Boolean(value))
);

const look = computed(() => {
  const {
    label: _label,
    icon: _icon,
    iconPressed: _iconPressed,
    pressed: _pressed,
    ...rest
  } = attrs;
  return rest;
});

/* A real effect: hiding the balance. */
const hidden = ref(false);
const filters = ref({ received: true, sent: false, pending: false });
</script>

<template>
  <div v-if="variation" class="demo-toggle-tile">
    <NsToggleButton v-bind="attrs" :label="label" :pressed="false" />
    <NsToggleButton v-bind="attrs" :label="label" :pressed="true" />
  </div>

  <div v-else class="demo-toggle">
    <div class="demo-toggle__stage">
      <NsToggleButton v-bind="attrs" v-model:pressed="on" :label="label" />
      <small>{{ on ? "Activé" : "Désactivé" }} · aria-pressed="{{ on }}"</small>
    </div>

    <div class="demo-toggle__balance">
      <span>
        <small>Solde disponible</small>
        <strong>{{ hidden ? "•••••• FCFA" : "125 000 FCFA" }}</strong>
      </span>
      <NsToggleButton
        v-bind="look"
        v-model:pressed="hidden"
        label="Masquer le solde"
        icon="eye"
        icon-pressed="eye-off"
        icon-only
      />
    </div>

    <div class="demo-toggle__filters" role="group" aria-label="Filtrer les opérations">
      <NsToggleButton
        v-bind="look"
        v-model:pressed="filters.received"
        label="Reçus"
        icon="download"
        size="sm"
      />
      <NsToggleButton
        v-bind="look"
        v-model:pressed="filters.sent"
        label="Envoyés"
        icon="send"
        size="sm"
      />
      <NsToggleButton
        v-bind="look"
        v-model:pressed="filters.pending"
        label="En attente"
        icon="clock"
        size="sm"
      />
    </div>
  </div>
</template>

<style>
.demo-toggle {
  display: grid;
  gap: var(--ns-space-4);
  inline-size: 460px;
  max-inline-size: 100%;
  color: var(--ns-color-text);
}

.demo-toggle__stage {
  display: grid;
  justify-items: center;
  gap: var(--ns-space-3);
  padding: var(--ns-space-8) var(--ns-space-4) var(--ns-space-6);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background:
    radial-gradient(circle, var(--ns-color-border-subtle) 1px, transparent 1.5px) 0 0 / 14px 14px,
    var(--ns-color-surface);
}

.demo-toggle__stage small {
  color: var(--ns-color-text-muted);
  font-family: var(--ns-font-mono);
  font-size: 11px;
}

.demo-toggle__balance {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--ns-space-3);
  padding: var(--ns-space-4) var(--ns-space-5);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface-brand);
  color: var(--ns-color-text-on-brand);
}

.demo-toggle__balance span {
  display: grid;
}

.demo-toggle__balance small {
  opacity: 0.8;
  font-size: var(--ns-text-caption-size);
}

.demo-toggle__balance strong {
  font-size: var(--ns-text-title-md-size);
  font-variant-numeric: tabular-nums;
}

.demo-toggle__balance .ns-button:not(.ns-button--pressed) {
  --ns-button-foreground: var(--ns-color-text-on-brand);
  --ns-button-border: color-mix(in srgb, var(--ns-color-text-on-brand) 40%, transparent);
}

.demo-toggle__filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ns-space-2);
}

.demo-toggle-tile {
  display: flex;
  justify-content: center;
  gap: var(--ns-space-2);
}
</style>
