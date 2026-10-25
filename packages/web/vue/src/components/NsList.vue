<script setup lang="ts">
import { computed } from "vue";
import { iconPath } from "../icons";

export type NsListMarker = "bullet" | "number" | "check" | "dash" | "icon" | "steps" | "none";
export type NsListTone = "neutral" | "primary" | "success" | "warning" | "danger";
export type NsListSize = "sm" | "md" | "lg";
export type NsListSpacing = "tight" | "normal" | "relaxed";
export type NsListItem = string | { title: string; description?: string };

export interface NsListProps {
  /** Items as text, or a title with a description. The default slot can hold li elements. */
  items?: readonly NsListItem[];
  marker?: NsListMarker;
  /** Icon of the `icon` marker. */
  icon?: string;
  /** Marker color. */
  tone?: NsListTone;
  size?: NsListSize;
  spacing?: NsListSpacing;
  /** Items flow into columns on wide screens. */
  columns?: 1 | 2 | 3 | "1" | "2" | "3";
  dividers?: boolean;
  /** First number of an ordered list. */
  start?: number;
  /** Accessible name, when the list needs one. */
  label?: string;
}

const props = withDefaults(defineProps<NsListProps>(), {
  marker: "bullet",
  icon: "star",
  tone: "primary",
  size: "md",
  spacing: "normal",
  columns: 1,
  dividers: false,
  start: 1
});

defineSlots<{
  default?: () => unknown;
  item?: (props: { item: NsListItem; index: number }) => unknown;
}>();

const ordered = computed(() => props.marker === "number" || props.marker === "steps");

const entries = computed(() =>
  (props.items ?? []).map((item) =>
    typeof item === "string" ? { title: item, description: undefined } : item
  )
);

/* Check and icon markers are masks: the glyph is drawn in the tone color like any text. */
const mask = computed(() => {
  const name = props.marker === "check" ? "check" : props.marker === "icon" ? props.icon : "";
  const path = name ? iconPath(name) : undefined;
  if (!path) return undefined;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
});
</script>

<template>
  <component
    :is="ordered ? 'ol' : 'ul'"
    role="list"
    :aria-label="label"
    :start="ordered && start !== 1 ? start : undefined"
    :class="[
      'ns-list',
      `ns-list--${marker}`,
      `ns-list--tone-${tone}`,
      `ns-list--${size}`,
      `ns-list--spacing-${spacing}`,
      `ns-list--columns-${columns}`,
      { 'ns-list--dividers': dividers }
    ]"
    :style="{ counterReset: `ns-list ${start - 1}`, '--ns-list-mask': mask }"
  >
    <template v-if="items">
      <li v-for="(entry, index) in entries" :key="index">
        <slot name="item" :item="items[index]!" :index="index">
          <span class="ns-list__title">{{ entry.title }}</span>
          <span v-if="entry.description" class="ns-list__description">{{ entry.description }}</span>
        </slot>
      </li>
    </template>
    <slot v-else />
  </component>
</template>

<style>
.ns-list {
  --ns-list-color: var(--ns-color-primary);
  --ns-list-on-color: var(--ns-color-on-primary);
  --ns-list-font-size: var(--ns-text-body-md-size);
  --ns-list-marker: 1.5em;
  --ns-list-gap: var(--ns-space-2);
  margin: 0;
  padding: 0;
  color: var(--ns-color-text);
  font-size: var(--ns-list-font-size);
  line-height: 1.5;
  list-style: none;
}

.ns-list > li {
  position: relative;
  display: grid;
  gap: 2px;
  padding-inline-start: calc(var(--ns-list-marker) + var(--ns-space-2));
  counter-increment: ns-list;
  break-inside: avoid;
}

.ns-list > li + li {
  margin-block-start: var(--ns-list-gap);
}

.ns-list__title {
  min-inline-size: 0;
}

.ns-list__description {
  color: var(--ns-color-text-muted);
  font-size: 0.875em;
}

/* Markers: generated content, so they are not read; the ul or ol carries the meaning. */
.ns-list > li::before {
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
  display: grid;
  place-items: center;
  inline-size: var(--ns-list-marker);
  block-size: 1.5em;
  color: var(--ns-list-color);
  content: "";
}

.ns-list--bullet > li::before {
  background: radial-gradient(circle, var(--ns-list-color) 0.18em, transparent 0.2em);
}

.ns-list--dash > li::before {
  content: "–";
  font-weight: var(--ns-font-weight-semibold);
}

.ns-list--number > li::before {
  content: counter(ns-list) ".";
  font-variant-numeric: tabular-nums;
  font-weight: var(--ns-font-weight-semibold);
  justify-items: end;
}

.ns-list--check > li::before,
.ns-list--icon > li::before {
  background: var(--ns-list-color);
  mask: var(--ns-list-mask) center / 1em no-repeat;
  -webkit-mask: var(--ns-list-mask) center / 1em no-repeat;
}

/* Steps: numbered circles joined by a line down to the next step. */
.ns-list--steps {
  --ns-list-marker: 1.75em;
}

.ns-list--steps > li {
  padding-block-end: var(--ns-space-1);
  padding-inline-start: calc(var(--ns-list-marker) + var(--ns-space-3));
}

.ns-list--steps > li::before {
  block-size: var(--ns-list-marker);
  border-radius: var(--ns-radius-full);
  background: var(--ns-list-color);
  color: var(--ns-list-on-color);
  content: counter(ns-list);
  font-size: 0.8em;
  font-variant-numeric: tabular-nums;
  font-weight: var(--ns-font-weight-bold);
  inline-size: var(--ns-list-marker);
}

.ns-list--steps > li:not(:last-child)::after {
  position: absolute;
  inset-block: calc(var(--ns-list-marker) + 4px) calc(var(--ns-list-gap) * -1 + 4px);
  inset-inline-start: calc(var(--ns-list-marker) / 2 - 1px);
  inline-size: 2px;
  border-radius: 1px;
  background: color-mix(in srgb, var(--ns-list-color) 30%, transparent);
  content: "";
}

.ns-list--steps > li .ns-list__title {
  padding-block-start: 0.12em;
  font-weight: var(--ns-font-weight-semibold);
}

.ns-list--steps.ns-list--spacing-normal {
  --ns-list-gap: var(--ns-space-4);
}

/* Tones, sizes and spacing */
.ns-list--tone-neutral {
  --ns-list-color: var(--ns-color-text-muted);
  --ns-list-on-color: var(--ns-color-surface);
}

.ns-list--tone-success {
  --ns-list-color: var(--ns-color-success);
  --ns-list-on-color: var(--ns-color-on-success);
}

.ns-list--tone-warning {
  --ns-list-color: var(--ns-color-warning);
  --ns-list-on-color: var(--ns-color-on-warning);
}

.ns-list--tone-danger {
  --ns-list-color: var(--ns-color-danger);
  --ns-list-on-color: var(--ns-color-on-danger);
}

.ns-list--sm {
  --ns-list-font-size: var(--ns-text-body-sm-size);
}

.ns-list--lg {
  --ns-list-font-size: var(--ns-text-body-lg-size);
}

.ns-list--spacing-tight {
  --ns-list-gap: var(--ns-space-1);
}

.ns-list--spacing-relaxed {
  --ns-list-gap: var(--ns-space-4);
}

.ns-list--steps.ns-list--spacing-relaxed {
  --ns-list-gap: var(--ns-space-6);
}

/* Dividers: a line between items, the gap split around it. */
.ns-list--dividers > li + li {
  padding-block-start: var(--ns-list-gap);
  border-block-start: 1px solid var(--ns-color-border-subtle);
}

.ns-list--dividers > li + li::before {
  inset-block-start: var(--ns-list-gap);
}

.ns-list--none > li {
  padding-inline-start: 0;
}

/* Columns on wider screens; steps keep one column to stay a sequence. */
@media (min-width: 640px) {
  .ns-list--columns-2:not(.ns-list--steps),
  .ns-list--columns-3:not(.ns-list--steps) {
    columns: 2;
    column-gap: var(--ns-space-8);
  }

  .ns-list--columns-2:not(.ns-list--steps) > li,
  .ns-list--columns-3:not(.ns-list--steps) > li {
    margin-block: 0 var(--ns-list-gap);
  }
}

@media (min-width: 1024px) {
  .ns-list--columns-3:not(.ns-list--steps) {
    columns: 3;
  }
}
</style>
