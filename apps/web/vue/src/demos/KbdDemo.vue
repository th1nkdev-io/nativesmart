<script setup lang="ts">
import { NsIcon, NsKbd } from "@nativesmart/vue";
import { computed, ref, useAttrs } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

/* The palette's own hints share the panel's look, but keep their own keys. */
const look = computed(() => {
  const { keys: _keys, listen: _listen, label: _label, ...rest } = attrs;
  return rest;
});

const actions = [
  { icon: "send", label: "Envoyer de l'argent", keys: "mod+enter" },
  { icon: "user", label: "Nouveau contact", keys: "mod+shift+n" },
  { icon: "home", label: "Aller à l'accueil", keys: "g h" },
  { icon: "close", label: "Fermer", keys: "esc" }
];

/* The hero shortcut always listens in the playground, so pressing it shows the match. */
const matches = ref(0);
</script>

<template>
  <div v-if="variation" class="demo-kbd-tile">
    <span class="demo-kbd__field">
      <NsIcon name="search" size="sm" /><span>Rechercher</span>
      <NsKbd v-bind="attrs" />
    </span>
  </div>

  <div v-else class="demo-kbd">
    <div class="demo-kbd__hero">
      <NsKbd v-bind="attrs" size="lg" listen @match="matches++" />
      <p v-if="matches" class="demo-kbd__match">
        <NsIcon name="check-circle" size="sm" />Combinaison détectée
        <b v-if="matches > 1">× {{ matches }}</b>
      </p>
      <p v-else class="demo-kbd__hint">Appuyez sur ces touches : elles s'allument.</p>
    </div>

    <div class="demo-kbd__palette" role="presentation">
      <span class="demo-kbd__field">
        <NsIcon name="search" size="sm" />Rechercher une action
        <NsKbd v-bind="look" keys="mod+k" />
      </span>
      <ul>
        <li v-for="action in actions" :key="action.label">
          <NsIcon :name="action.icon" size="sm" />
          <span>{{ action.label }}</span>
          <NsKbd v-bind="look" :keys="action.keys" then-label="puis" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.demo-kbd {
  display: grid;
  gap: var(--ns-space-5);
  justify-items: center;
  inline-size: 460px;
  max-inline-size: 100%;
  color: var(--ns-color-text);
}

.demo-kbd__hero {
  display: grid;
  justify-items: center;
  gap: var(--ns-space-3);
  padding-block: var(--ns-space-4);
}

.demo-kbd__hint,
.demo-kbd__match {
  display: flex;
  align-items: center;
  gap: var(--ns-space-1-5);
  margin: 0;
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
}

.demo-kbd__match {
  color: var(--ns-color-success-text);
  font-weight: var(--ns-font-weight-semibold);
}

.demo-kbd__palette {
  overflow: hidden;
  inline-size: 100%;
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface);
  box-shadow: var(--ns-elevation-popover);
}

.demo-kbd__field {
  display: flex;
  align-items: center;
  gap: var(--ns-space-2);
  min-block-size: 48px;
  padding-inline: var(--ns-space-4) var(--ns-space-3);
  color: var(--ns-color-text-placeholder);
  font-size: var(--ns-text-body-sm-size);
}

.demo-kbd__field .ns-kbd {
  margin-inline-start: auto;
}

.demo-kbd-tile .demo-kbd__field > span {
  overflow: hidden;
  min-inline-size: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.demo-kbd__palette .demo-kbd__field {
  border-block-end: 1px solid var(--ns-color-border-subtle);
}

.demo-kbd__palette ul {
  display: grid;
  margin: 0;
  padding: var(--ns-space-1-5);
  list-style: none;
}

.demo-kbd__palette li {
  display: flex;
  align-items: center;
  gap: var(--ns-space-3);
  min-block-size: 40px;
  padding-inline: var(--ns-space-2-5);
  border-radius: var(--ns-radius-md);
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-body-sm-size);
}

.demo-kbd__palette li:first-child {
  background: var(--ns-color-surface-hover);
  color: var(--ns-color-text);
}

.demo-kbd__palette li span {
  flex: 1;
  min-inline-size: 0;
  color: var(--ns-color-text);
}

.demo-kbd-tile {
  inline-size: 100%;
}

.demo-kbd-tile .demo-kbd__field {
  border: 1px solid var(--ns-color-border);
  border-radius: var(--ns-radius-control);
  background: var(--ns-color-surface);
}
</style>
