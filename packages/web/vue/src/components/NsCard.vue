<script setup lang="ts">
export type NsCardVariant = "outlined" | "elevated" | "filled";
export type NsCardPadding = "none" | "sm" | "md" | "lg";

export interface NsCardProps {
  /** Heading shown in the header when no header slot is given. */
  title?: string;
  description?: string;
  variant?: NsCardVariant;
  padding?: NsCardPadding;
  /** Lifts on hover, for cards that open something. Put the link or button inside. */
  interactive?: boolean;
  disabled?: boolean;
  /** Rendered element: `article`, `li`, `section`… */
  as?: string;
}

withDefaults(defineProps<NsCardProps>(), {
  variant: "outlined",
  padding: "md",
  interactive: false,
  disabled: false,
  as: "div"
});
</script>

<template>
  <component
    :is="as"
    :class="[
      'ns-card',
      `ns-card--${variant}`,
      `ns-card--padding-${padding}`,
      { 'ns-card--interactive': interactive, 'ns-card--disabled': disabled }
    ]"
    :aria-disabled="disabled || undefined"
  >
    <div v-if="$slots.media" class="ns-card__media"><slot name="media" /></div>
    <header v-if="$slots.header || title || description" class="ns-card__header">
      <slot name="header">
        <h3 v-if="title" class="ns-card__title">{{ title }}</h3>
        <p v-if="description" class="ns-card__description">{{ description }}</p>
      </slot>
    </header>
    <div v-if="$slots.default" class="ns-card__content"><slot /></div>
    <footer v-if="$slots.footer" class="ns-card__footer"><slot name="footer" /></footer>
  </component>
</template>

<style>
.ns-card {
  --ns-card-background: var(--ns-color-surface);
  --ns-card-border: var(--ns-color-border);
  --ns-card-radius: var(--ns-radius-card);
  --ns-card-shadow: none;
  --ns-card-padding: var(--ns-space-5);
  --ns-card-gap: var(--ns-space-3);
  display: flex;
  flex-direction: column;
  gap: var(--ns-card-gap);
  min-inline-size: 0;
  padding: var(--ns-card-padding);
  overflow: hidden;
  border: 1px solid var(--ns-card-border);
  border-radius: var(--ns-card-radius);
  background: var(--ns-card-background);
  box-shadow: var(--ns-card-shadow);
  color: var(--ns-color-text);
  font-family: var(--ns-font-sans);
  transition:
    box-shadow var(--ns-duration-normal) var(--ns-easing-standard),
    transform var(--ns-duration-normal) var(--ns-easing-standard),
    border-color var(--ns-duration-normal) var(--ns-easing-standard);
}

.ns-card__media {
  margin: calc(var(--ns-card-padding) * -1) calc(var(--ns-card-padding) * -1) 0;
}

.ns-card__media > :is(img, video, picture) {
  display: block;
  inline-size: 100%;
  object-fit: cover;
}

.ns-card__header {
  display: grid;
  gap: var(--ns-space-1);
}

.ns-card__title {
  margin: 0;
  font-family: var(--ns-text-title-md-family);
  font-size: var(--ns-text-title-md-size);
  font-weight: var(--ns-font-weight-semibold);
  line-height: var(--ns-text-title-md-line-height);
  letter-spacing: var(--ns-text-title-md-tracking);
}

.ns-card__description {
  margin: 0;
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-body-sm-size);
  line-height: var(--ns-text-body-sm-line-height);
}

.ns-card__content {
  font-size: var(--ns-text-body-md-size);
  line-height: var(--ns-text-body-md-line-height);
}

.ns-card__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: var(--ns-space-2);
  margin-block-start: auto;
  padding-block-start: var(--ns-card-gap);
  border-block-start: 1px solid var(--ns-color-border-subtle);
}

/* Variants */
.ns-card--elevated {
  --ns-card-border: transparent;
  --ns-card-background: var(--ns-color-surface-raised);
  --ns-card-shadow: var(--ns-elevation-card);
}

.ns-card--filled {
  --ns-card-border: transparent;
  --ns-card-background: var(--ns-color-surface-muted);
}

/* Padding */
.ns-card--padding-none {
  --ns-card-padding: 0;
}

.ns-card--padding-sm {
  --ns-card-padding: var(--ns-space-3);
  --ns-card-gap: var(--ns-space-2);
}

.ns-card--padding-lg {
  --ns-card-padding: var(--ns-space-8);
  --ns-card-gap: var(--ns-space-4);
}

/* States */
.ns-card--interactive {
  cursor: pointer;
}

.ns-card--interactive:not(.ns-card--disabled):hover {
  --ns-card-shadow: var(--ns-elevation-raised);
  --ns-card-border: var(--ns-color-border-strong);
  transform: translateY(-2px);
}

.ns-card--interactive:focus-within:has(:focus-visible) {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
  outline-offset: var(--ns-focus-ring-offset);
}

.ns-card--disabled {
  opacity: var(--ns-opacity-disabled);
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .ns-card--interactive:not(.ns-card--disabled):hover {
    transform: none;
  }
}
</style>
