<script setup lang="ts">
import { computed, useSlots } from "vue";
import { slotText } from "./slot-text";

export type NsHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type NsHeadingSize = "auto" | "display" | "xl" | "lg" | "md" | "sm" | "xs";
export type NsHeadingWeight = "auto" | "medium" | "semibold" | "bold" | "extrabold";
export type NsHeadingTone = "default" | "muted" | "primary" | "gradient";
export type NsHeadingAlign = "start" | "center" | "end";

export interface NsHeadingProps {
  /** The title. The default slot can hold it instead. */
  text?: string;
  /** Place in the document outline: h1 to h6. */
  level?: NsHeadingLevel | `${NsHeadingLevel}`;
  /** Visual size, independent of the level. `auto` follows the level. */
  size?: NsHeadingSize;
  weight?: NsHeadingWeight;
  tone?: NsHeadingTone;
  align?: NsHeadingAlign;
  /** Short overline above the title. An `eyebrow` slot replaces it. */
  eyebrow?: string;
  /** Lead paragraph under the title. */
  subtitle?: string;
  /** Lines kept before an ellipsis. */
  lines?: number;
  /** Shows a link to this title on hover and focus. */
  anchor?: boolean;
  /** Anchor id; derived from the text when `anchor` is on. */
  id?: string;
  anchorLabel?: string;
}

const props = withDefaults(defineProps<NsHeadingProps>(), {
  level: 2,
  size: "auto",
  weight: "auto",
  tone: "default",
  align: "start",
  anchor: false,
  anchorLabel: "Link to this section"
});

const slots = useSlots();

const level = computed(() => Math.min(6, Math.max(1, Number(props.level))) as NsHeadingLevel);

/* Sizes map to text styles; auto keeps the style of the level. */
const styles: Record<Exclude<NsHeadingSize, "auto">, string> = {
  display: "display-md",
  xl: "h1",
  lg: "h2",
  md: "h3",
  sm: "h4",
  xs: "h5"
};
const textStyle = computed(() => (props.size === "auto" ? `h${level.value}` : styles[props.size]));

/** `Envoyez de l'argent` becomes `envoyez-de-l-argent`. */
function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const anchorId = computed(() => {
  if (props.id) return props.id;
  if (!props.anchor) return undefined;
  return slugify(props.text ?? slotText(slots.default?.())) || undefined;
});

const grouped = computed(() => Boolean(props.eyebrow || props.subtitle || slots.eyebrow));
</script>

<template>
  <component
    :is="grouped ? 'hgroup' : 'div'"
    :class="[
      'ns-heading',
      `ns-heading--align-${align}`,
      `ns-heading--tone-${tone}`,
      { 'ns-heading--grouped': grouped }
    ]"
  >
    <p v-if="eyebrow || $slots.eyebrow" class="ns-heading__eyebrow">
      <slot name="eyebrow">{{ eyebrow }}</slot>
    </p>
    <div class="ns-heading__row">
      <component
        :is="`h${level}`"
        :id="anchorId"
        :class="['ns-heading__title', { 'ns-heading__title--clamped': lines }]"
        :style="{
          '--ns-heading-family': `var(--ns-text-${textStyle}-family)`,
          '--ns-heading-size': `var(--ns-text-${textStyle}-size)`,
          '--ns-heading-line-height': `var(--ns-text-${textStyle}-line-height)`,
          '--ns-heading-weight':
            weight === 'auto'
              ? `var(--ns-text-${textStyle}-weight)`
              : `var(--ns-font-weight-${weight})`,
          '--ns-heading-tracking': `var(--ns-text-${textStyle}-tracking)`,
          '--ns-heading-lines': lines
        }"
      >
        <span class="ns-heading__text"
          ><slot>{{ text }}</slot></span
        >
        <a
          v-if="anchor && anchorId"
          class="ns-heading__anchor"
          :href="`#${anchorId}`"
          :aria-label="anchorLabel"
          >#</a
        >
      </component>
      <span v-if="$slots.actions" class="ns-heading__actions"><slot name="actions" /></span>
    </div>
    <p v-if="subtitle" class="ns-heading__subtitle">{{ subtitle }}</p>
  </component>
</template>

<style>
.ns-heading {
  --ns-heading-color: var(--ns-color-text);
  display: grid;
  gap: var(--ns-space-1);
  min-inline-size: 0;
  margin: 0;
  text-align: start;
}

.ns-heading--grouped {
  gap: var(--ns-space-2);
}

.ns-heading--align-center {
  justify-items: center;
  text-align: center;
}

.ns-heading--align-end {
  justify-items: end;
  text-align: end;
}

/* Actions sit at the end of the title line and drop under it when space runs out. */
.ns-heading__row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--ns-space-3);
  min-inline-size: 0;
}

.ns-heading--align-center .ns-heading__row {
  justify-content: center;
}

.ns-heading--align-end .ns-heading__row {
  justify-content: flex-end;
}

.ns-heading__title {
  position: relative;
  min-inline-size: 0;
  margin: 0;
  color: var(--ns-heading-color);
  font-family: var(--ns-heading-family);
  font-size: var(--ns-heading-size);
  font-weight: var(--ns-heading-weight);
  line-height: var(--ns-heading-line-height);
  letter-spacing: var(--ns-heading-tracking);
  text-wrap: balance;
  scroll-margin-block-start: var(--ns-space-20);
}

.ns-heading__title--clamped .ns-heading__text {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--ns-heading-lines);
}

.ns-heading__actions {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: var(--ns-space-2);
  margin-inline-start: auto;
}

.ns-heading--align-center .ns-heading__actions,
.ns-heading--align-end .ns-heading__actions {
  margin-inline-start: 0;
}

/* Tones */
.ns-heading--tone-muted {
  --ns-heading-color: var(--ns-color-text-muted);
}

.ns-heading--tone-primary {
  --ns-heading-color: var(--ns-color-primary-text);
}

.ns-heading--tone-gradient .ns-heading__text {
  background: var(--ns-gradient-brand);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Eyebrow and subtitle */
.ns-heading__eyebrow {
  margin: 0;
  color: var(--ns-color-primary-text);
  font-family: var(--ns-text-overline-family);
  font-size: var(--ns-text-overline-size);
  font-weight: var(--ns-text-overline-weight);
  line-height: var(--ns-text-overline-line-height);
  letter-spacing: var(--ns-text-overline-tracking);
  text-transform: uppercase;
}

.ns-heading__subtitle {
  max-inline-size: 60ch;
  margin: 0;
  color: var(--ns-color-text-muted);
  font-family: var(--ns-text-lead-family);
  font-size: var(--ns-text-lead-size);
  font-weight: var(--ns-text-lead-weight);
  line-height: var(--ns-text-lead-line-height);
  letter-spacing: var(--ns-text-lead-tracking);
  text-wrap: pretty;
}

/* Anchor: shown on hover and keyboard focus, beside the title. */
.ns-heading__anchor {
  margin-inline-start: 0.3em;
  border-radius: var(--ns-radius-sm);
  color: var(--ns-color-text-subtle);
  font-weight: var(--ns-font-weight-regular);
  text-decoration: none;
  opacity: 0;
  transition:
    opacity var(--ns-duration-fast) var(--ns-easing-standard),
    color var(--ns-duration-fast) var(--ns-easing-standard);
}

.ns-heading__title:hover .ns-heading__anchor,
.ns-heading__anchor:focus-visible {
  opacity: 1;
}

.ns-heading__anchor:hover {
  color: var(--ns-color-primary-text);
}

.ns-heading__anchor:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
  outline-offset: 2px;
}

@media (hover: none) {
  .ns-heading__anchor {
    opacity: 0.6;
  }
}
</style>
