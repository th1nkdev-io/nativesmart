<script setup lang="ts">
import { NsDivider, NsIcon } from "@nativesmart/vue";
import { computed, useAttrs } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

/** Each divider is shown where it belongs: a sign-in form, a toolbar, or a list with avatars. */
const scene = computed(() => {
  if (attrs.orientation === "vertical") return "toolbar";
  if (variation?.group === "inset") return "list";
  return "form";
});

/* Between list rows or toolbar groups a label would only get in the way. */
const listAttrs = computed(() => {
  const { label: _label, ...rest } = attrs;
  return rest;
});

const people = [
  { initials: "KM", name: "Kofi Mensah", detail: "25 000 FCFA · hier" },
  { initials: "AD", name: "Aïcha Diallo", detail: "8 500 FCFA · lundi" }
];
</script>

<template>
  <div :class="['demo-divider', `demo-divider--${scene}`, { 'is-small': variation }]">
    <template v-if="scene === 'form'">
      <span class="demo-divider__button"
        ><NsIcon name="user" size="sm" /> Continuer avec Google</span
      >
      <NsDivider v-bind="$attrs" />
      <span class="demo-divider__field">Adresse e-mail</span>
    </template>

    <template v-else-if="scene === 'toolbar'">
      <span class="demo-divider__tool"><b>B</b></span>
      <span class="demo-divider__tool"><i>I</i></span>
      <span class="demo-divider__tool"><u>U</u></span>
      <NsDivider v-bind="listAttrs" />
      <span class="demo-divider__tool"><NsIcon name="external-link" size="sm" /></span>
      <span class="demo-divider__tool"><NsIcon name="image" size="sm" /></span>
    </template>

    <template v-else>
      <template v-for="(person, index) in people" :key="person.name">
        <NsDivider v-if="index > 0" v-bind="listAttrs" />
        <div class="demo-divider__person">
          <span class="demo-divider__avatar">{{ person.initials }}</span>
          <span>
            <strong>{{ person.name }}</strong>
            <small>{{ person.detail }}</small>
          </span>
        </div>
      </template>
    </template>
  </div>
</template>

<style>
.demo-divider {
  display: grid;
  gap: var(--ns-space-3);
  inline-size: 320px;
  max-inline-size: 100%;
  padding: var(--ns-space-5);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface);
  color: var(--ns-color-text);
  font-size: var(--ns-text-body-sm-size);
}

.demo-divider.is-small {
  inline-size: 100%;
  padding: var(--ns-space-4);
}

.demo-divider__button,
.demo-divider__field {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--ns-space-2);
  min-block-size: 36px;
  border: 1px solid var(--ns-color-border);
  border-radius: var(--ns-radius-control);
  font-weight: var(--ns-font-weight-medium);
}

.demo-divider__field {
  justify-content: flex-start;
  padding-inline: var(--ns-space-3);
  color: var(--ns-color-text-placeholder);
  font-weight: var(--ns-font-weight-regular);
}

.demo-divider--toolbar {
  display: flex;
  align-items: center;
  gap: var(--ns-space-1);
  inline-size: auto;
  padding: var(--ns-space-1-5);
}

.demo-divider--toolbar.is-small {
  inline-size: auto;
  padding: var(--ns-space-1-5);
}

.demo-divider__tool {
  display: inline-grid;
  place-items: center;
  inline-size: 32px;
  block-size: 32px;
  border-radius: var(--ns-radius-md);
  color: var(--ns-color-text-muted);
}

.demo-divider__tool:hover {
  background: var(--ns-color-surface-hover);
}

.demo-divider--list {
  gap: 0;
  padding-block: var(--ns-space-2);
}

.demo-divider__person {
  display: flex;
  align-items: center;
  gap: var(--ns-space-4);
  padding-block: var(--ns-space-2);
}

.demo-divider__avatar {
  display: inline-grid;
  flex: none;
  place-items: center;
  inline-size: 40px;
  block-size: 40px;
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-primary-muted);
  color: var(--ns-color-on-primary-muted);
  font-size: 12px;
  font-weight: var(--ns-font-weight-semibold);
}

.demo-divider__person > span:last-child {
  display: grid;
}

.demo-divider__person small {
  color: var(--ns-color-text-muted);
}
</style>
