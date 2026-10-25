<script setup lang="ts">
import { computed, onMounted, ref, type Component } from "vue";
import NsIcon from "./NsIcon.vue";

export type NsLinkVariant = "inline" | "standalone";
export type NsLinkUnderline = "always" | "hover" | "none";
export type NsLinkTone = "primary" | "neutral" | "muted" | "danger" | "inherit";
export type NsLinkSize = "inherit" | "sm" | "md" | "lg";

export interface NsLinkProps {
  href?: string;
  /** Link text. The default slot can hold it instead. */
  text?: string;
  /** Inside a sentence, or on its own line with an arrow. */
  variant?: NsLinkVariant;
  /** When the underline shows; inline links keep it. */
  underline?: NsLinkUnderline;
  tone?: NsLinkTone;
  size?: NsLinkSize;
  /** Icon before the text. */
  icon?: string;
  /**
   * Opens in a new tab. Left unset, a link to another site's address counts as external.
   */
  external?: boolean;
  /** Visited links take the visited color. */
  visited?: boolean;
  /** Downloads the target; a string names the file. */
  download?: boolean | string;
  disabled?: boolean;
  /** Element or router component, such as RouterLink with `to`. */
  as?: string | Component;
  newTabLabel?: string;
}

const props = withDefaults(defineProps<NsLinkProps>(), {
  variant: "inline",
  underline: "always",
  tone: "primary",
  size: "inherit",
  external: undefined,
  visited: false,
  download: false,
  disabled: false,
  as: "a",
  newTabLabel: "opens in a new tab"
});

/* Another site's address is external; the page's own host is read once mounted. */
const host = ref<string>();
onMounted(() => (host.value = window.location.host));

const isExternal = computed(() => {
  if (props.external !== undefined) return props.external;
  if (!props.href || !/^https?:\/\//i.test(props.href)) return false;
  try {
    return new URL(props.href).host !== host.value;
  } catch {
    return false;
  }
});

const native = computed(() => props.as === "a");
const linkAttrs = computed(() => {
  if (props.disabled) return { role: "link", "aria-disabled": "true" };
  const attrs: Record<string, string | undefined> = native.value ? { href: props.href } : {};
  if (isExternal.value) {
    attrs.target = "_blank";
    attrs.rel = "noopener noreferrer";
  }
  if (props.download) attrs.download = typeof props.download === "string" ? props.download : "";
  return attrs;
});
</script>

<template>
  <component
    :is="disabled ? 'a' : as"
    v-bind="linkAttrs"
    :class="[
      'ns-link',
      `ns-link--${variant}`,
      `ns-link--underline-${underline}`,
      `ns-link--tone-${tone}`,
      `ns-link--size-${size}`,
      { 'ns-link--visited': visited, 'ns-link--disabled': disabled }
    ]"
  >
    <NsIcon v-if="icon" class="ns-link__icon" :name="icon" size="xs" /><span class="ns-link__text"
      ><slot>{{ text }}</slot></span
    ><template v-if="isExternal"
      ><NsIcon class="ns-link__external" name="external-link" size="xs" /><span
        class="ns-link__spoken"
        >({{ newTabLabel }})</span
      ></template
    ><NsIcon
      v-if="variant === 'standalone' && !isExternal"
      class="ns-link__arrow"
      name="arrow-right"
      size="xs"
    />
  </component>
</template>

<style>
.ns-link {
  --ns-link-color: var(--ns-color-text-link);
  --ns-link-hover: var(--ns-color-text-link-hover);
  --ns-link-decoration: underline;
  --ns-link-decoration-color: color-mix(in srgb, currentColor 45%, transparent);
  color: var(--ns-link-color);
  font: inherit;
  text-decoration: none;
  border-radius: var(--ns-radius-xs);
  cursor: pointer;
  transition: color var(--ns-duration-fast) var(--ns-easing-standard);
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

.ns-link__text {
  text-decoration-line: var(--ns-link-decoration);
  text-decoration-color: var(--ns-link-decoration-color);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.22em;
  transition:
    text-decoration-color var(--ns-duration-fast) var(--ns-easing-standard),
    text-decoration-thickness var(--ns-duration-fast) var(--ns-easing-standard);
}

.ns-link:hover {
  --ns-link-color: var(--ns-link-hover);
}

.ns-link:hover .ns-link__text {
  text-decoration-line: underline;
  text-decoration-color: currentColor;
  text-decoration-thickness: 2px;
}

.ns-link:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
  outline-offset: 2px;
}

.ns-link--underline-hover,
.ns-link--underline-none {
  --ns-link-decoration: none;
}

.ns-link--underline-none:hover .ns-link__text {
  text-decoration-line: none;
}

/* Icons sit on the text line and keep their space when the link wraps. */
.ns-link .ns-icon {
  vertical-align: -0.1em;
}

.ns-link__icon {
  margin-inline-end: 0.3em;
}

.ns-link__external {
  margin-inline-start: 0.2em;
  opacity: 0.75;
}

.ns-link__spoken {
  position: absolute;
  overflow: hidden;
  clip-path: inset(50%);
  inline-size: 1px;
  block-size: 1px;
  white-space: nowrap;
}

/* Standalone: its own line, a semibold weight and an arrow that slides on hover. */
.ns-link--standalone {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  font-weight: var(--ns-font-weight-semibold);
}

.ns-link--standalone .ns-link__icon {
  margin: 0;
}

.ns-link__arrow {
  transition: transform var(--ns-duration-fast) var(--ns-easing-standard);
}

.ns-link:hover .ns-link__arrow {
  transform: translateX(3px);
}

[dir="rtl"] .ns-link:hover .ns-link__arrow {
  transform: scaleX(-1) translateX(3px);
}

/* Tones and sizes */
.ns-link--tone-neutral {
  --ns-link-color: var(--ns-color-text);
  --ns-link-hover: var(--ns-color-text-link-hover);
}

.ns-link--tone-muted {
  --ns-link-color: var(--ns-color-text-muted);
  --ns-link-hover: var(--ns-color-text);
}

.ns-link--tone-danger {
  --ns-link-color: var(--ns-color-danger-text);
  --ns-link-hover: var(--ns-color-danger-text);
}

.ns-link--tone-inherit {
  --ns-link-color: inherit;
  --ns-link-hover: inherit;
}

.ns-link--size-sm {
  font-size: var(--ns-text-body-sm-size);
}

.ns-link--size-md {
  font-size: var(--ns-text-body-md-size);
}

.ns-link--size-lg {
  font-size: var(--ns-text-body-lg-size);
}

.ns-link--visited:visited {
  --ns-link-color: var(--ns-color-text-link-visited);
}

.ns-link--disabled {
  --ns-link-color: var(--ns-color-text-disabled);
  --ns-link-hover: var(--ns-color-text-disabled);
  --ns-link-decoration: none;
  cursor: not-allowed;
}

.ns-link--disabled:hover .ns-link__text {
  text-decoration-line: none;
}

@media (prefers-reduced-motion: reduce) {
  .ns-link:hover .ns-link__arrow {
    transform: none;
  }
}
</style>
