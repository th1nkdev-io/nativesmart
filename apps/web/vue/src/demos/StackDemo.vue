<script setup lang="ts">
import { NsStack } from "@nativesmart/vue";
import { computed, useAttrs } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();

const people = [
  { initials: "KM", name: "Kofi Mensah", short: "Kofi", amount: "25 000" },
  { initials: "AD", name: "Aïcha Diallo", short: "Aïcha", amount: "8 500" },
  { initials: "MT", name: "Moussa Traoré", short: "Moussa", amount: "12 000" },
  { initials: "AK", name: "Awa Koné", short: "Awa", amount: "4 000" },
  { initials: "YK", name: "Yao Kouassi", short: "Yao", amount: "30 000" },
  { initials: "FN", name: "Fatou Ndiaye", short: "Fatou", amount: "6 500" }
];

/* Wrapping needs more items than fit; everything else reads best with three. */
const shown = computed(() =>
  people.slice(0, variation?.group === "states" && variation.value === "wrap" ? 6 : 3)
);
const compactTile = computed(() => Boolean(variation));
const inlineScene = computed(() => attrs.inline === true || attrs.inline === "true");
/* In a variation tile the inline stack is a row of avatars, close together. */
const inlineAttrs = computed(() => (variation ? { ...attrs, direction: "row", gap: "xs" } : attrs));
/* Wrapping, equal shares and joined groups show along a row. */
const rowStates = ["wrap", "fill", "compact"];
const stackAttrs = computed(() =>
  variation?.group === "states" && rowStates.includes(variation.value)
    ? { ...attrs, direction: "row" }
    : attrs
);
const isRow = computed(() => String(stackAttrs.value.direction ?? "column").startsWith("row"));
const tag = computed(() => (attrs.as === "ul" || attrs.as === "ol" ? "li" : "div"));
</script>

<template>
  <p v-if="inlineScene" :class="['demo-stack-inline', { 'is-small': compactTile }]">
    Envoyé à
    <NsStack v-bind="inlineAttrs">
      <span
        v-for="person in people.slice(0, 3)"
        :key="person.initials"
        class="demo-stack__avatar"
        >{{ person.initials }}</span
      >
    </NsStack>
    hier soir
  </p>

  <div v-else :class="['demo-stack', { 'is-small': compactTile, 'is-row': isRow }]">
    <NsStack v-bind="stackAttrs" class="demo-stack__stack">
      <component :is="tag" v-for="person in shown" :key="person.initials" class="demo-stack__item">
        <span class="demo-stack__avatar">{{ person.initials }}</span>
        <span class="demo-stack__who">
          <b>{{ compactTile ? person.short : person.name }}</b>
          <small>{{ person.amount }} FCFA</small>
        </span>
      </component>
    </NsStack>
  </div>
</template>

<style>
.demo-stack {
  inline-size: 520px;
  max-inline-size: 100%;
  color: var(--ns-color-text);
  font-size: var(--ns-text-body-sm-size);
}

.demo-stack.is-small {
  inline-size: 100%;
}

/* The stack sits on hatching and its items are opaque: the gaps and free space show through. */
.demo-stack__stack {
  min-block-size: 248px;
  padding: var(--ns-space-2);
  border-radius: var(--ns-radius-lg);
  outline: 1px dashed color-mix(in srgb, var(--ns-color-primary) 50%, transparent);
  outline-offset: -1px;
  background: repeating-linear-gradient(
    -45deg,
    color-mix(in srgb, var(--ns-color-primary) 16%, transparent) 0 1px,
    color-mix(in srgb, var(--ns-color-primary) 4%, transparent) 1px 6px
  );
}

.demo-stack.is-small .demo-stack__stack {
  min-block-size: 168px;
  padding: var(--ns-space-1-5);
}

.demo-stack__item {
  display: flex;
  align-items: center;
  gap: var(--ns-space-2-5);
  min-inline-size: 0;
  padding: var(--ns-space-2) var(--ns-space-3);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-lg);
  background: var(--ns-color-surface);
  box-shadow: var(--ns-elevation-1);
}

.demo-stack.is-small .demo-stack__item {
  gap: var(--ns-space-1-5);
  padding: var(--ns-space-1-5) var(--ns-space-2);
  font-size: var(--ns-text-caption-size);
}

.demo-stack__avatar {
  display: inline-grid;
  flex: none;
  place-items: center;
  inline-size: 32px;
  block-size: 32px;
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-primary-muted);
  color: var(--ns-color-on-primary-muted);
  font-size: 11px;
  font-weight: var(--ns-font-weight-semibold);
}

.demo-stack.is-small .demo-stack__avatar {
  inline-size: 24px;
  block-size: 24px;
  font-size: 9px;
}

.demo-stack__who {
  display: grid;
  min-inline-size: 0;
}

.demo-stack__who b,
.demo-stack__who small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.demo-stack__who b {
  font-weight: var(--ns-font-weight-semibold);
}

.demo-stack__who small {
  color: var(--ns-color-text-muted);
  font-variant-numeric: tabular-nums;
}

.demo-stack.is-small .demo-stack__who small {
  font-size: 10px;
}

/* A row of tiles keeps the first names only. */
.demo-stack.is-small.is-row .demo-stack__who small,
.demo-stack.is-small.is-row .demo-stack__avatar {
  display: none;
}

.demo-stack.is-small.is-row .demo-stack__stack {
  min-block-size: 96px;
}

/* Divided reads as a plain list: the lines replace the cards and the hatching. */
.demo-stack__stack.ns-stack--divided {
  background: var(--ns-color-surface);
}

.ns-stack--divided > .demo-stack__item {
  border-color: transparent;
  box-shadow: none;
}

.demo-stack.is-small.is-row .demo-stack__item {
  padding-inline: var(--ns-space-1-5);
}

/* Inline: a row of avatars inside a sentence. */
.demo-stack-inline {
  margin: 0;
  color: var(--ns-color-text);
  font-size: var(--ns-text-body-md-size);
  line-height: 2;
}

.demo-stack-inline.is-small {
  font-size: var(--ns-text-body-sm-size);
}

.demo-stack-inline .demo-stack__avatar {
  box-shadow: 0 0 0 2px var(--ns-color-surface);
}
</style>
