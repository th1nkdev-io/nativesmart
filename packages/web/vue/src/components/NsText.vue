<script setup lang="ts">
import { computed } from "vue";

export type NsTextRole = "body" | "label" | "caption" | "heading" | "display";
export type NsTextTone = "default" | "muted" | "subtle" | "inherit";

export interface NsTextProps {
  /** Semantic text role: picks the text style and the default element. */
  role?: NsTextRole;
  /** Heading level, for the heading role: h1 to h6. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Rendered element when the default does not fit, for example `legend` or `dt`. */
  as?: string;
  tone?: NsTextTone;
  /** Cuts the text on one line with an ellipsis. */
  truncate?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<NsTextProps>(), {
  role: "body",
  level: 2,
  tone: "default",
  truncate: false,
  disabled: false
});

const tag = computed(() => {
  if (props.as) return props.as;
  if (props.role === "heading") return `h${props.level}`;
  return props.role === "body" || props.role === "display" ? "p" : "span";
});

/** Heading levels map to the h1 to h6 text styles; other roles have one style each. */
const style = computed(() => {
  switch (props.role) {
    case "heading":
      return `h${props.level}`;
    case "display":
      return "display-md";
    case "label":
      return "label-md";
    case "caption":
      return "caption";
    default:
      return "body-md";
  }
});
</script>

<template>
  <component
    :is="tag"
    :class="[
      'ns-text',
      `ns-text--${role}`,
      `ns-text--${tone}`,
      { 'ns-text--truncate': truncate, 'ns-text--disabled': disabled }
    ]"
    :style="{
      '--ns-text-family': `var(--ns-text-${style}-family)`,
      '--ns-text-size': `var(--ns-text-${style}-size)`,
      '--ns-text-line-height': `var(--ns-text-${style}-line-height)`,
      '--ns-text-weight': `var(--ns-text-${style}-weight)`,
      '--ns-text-tracking': `var(--ns-text-${style}-tracking)`
    }"
    :aria-disabled="disabled || undefined"
  >
    <slot />
  </component>
</template>

<style>
.ns-text {
  --ns-text-color: var(--ns-color-text);
  margin: 0;
  color: var(--ns-text-color);
  font-family: var(--ns-text-family);
  font-size: var(--ns-text-size);
  font-weight: var(--ns-text-weight);
  line-height: var(--ns-text-line-height);
  letter-spacing: var(--ns-text-tracking);
  text-wrap: pretty;
}

.ns-text--heading,
.ns-text--display {
  text-wrap: balance;
}

.ns-text--muted,
.ns-text--caption {
  --ns-text-color: var(--ns-color-text-muted);
}

.ns-text--subtle {
  --ns-text-color: var(--ns-color-text-subtle);
}

.ns-text--inherit {
  --ns-text-color: inherit;
}

.ns-text--truncate {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ns-text--disabled {
  --ns-text-color: var(--ns-color-text-disabled);
}
</style>
