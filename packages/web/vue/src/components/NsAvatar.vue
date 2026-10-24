<script setup lang="ts">
import { computed, ref, watch } from "vue";

export type NsAvatarSize = "sm" | "md" | "lg";

export interface NsAvatarProps {
  /** Accessible identity label; the initials come from it. */
  label: string;
  /** Image source. Initials are shown while it loads or when it fails. */
  source?: string;
  size?: NsAvatarSize;
  disabled?: boolean;
}

const props = withDefaults(defineProps<NsAvatarProps>(), { size: "md", disabled: false });

const failed = ref(false);
const loaded = ref(false);
watch(
  () => props.source,
  () => {
    failed.value = false;
    loaded.value = false;
  }
);

const initials = computed(() => {
  const words = props.label.trim().split(/\s+/).filter(Boolean);
  const letters = words.length > 1 ? [words[0], words[words.length - 1]] : words;
  return letters.map((word) => Array.from(word)[0]?.toUpperCase() ?? "").join("");
});

/** The same label always gets the same of the eight avatar palettes. */
const palette = computed(() => {
  let hash = 0;
  for (const char of props.label) hash = (hash * 31 + char.codePointAt(0)!) >>> 0;
  return (hash % 8) + 1;
});

const showImage = computed(() => Boolean(props.source) && !failed.value);
</script>

<template>
  <span
    :class="[
      'ns-avatar',
      `ns-avatar--${size}`,
      { 'ns-avatar--loaded': showImage && loaded, 'ns-avatar--disabled': disabled }
    ]"
    :style="{
      '--ns-avatar-background': `var(--ns-avatar-${palette}-bg)`,
      '--ns-avatar-foreground': `var(--ns-avatar-${palette}-fg)`
    }"
    role="img"
    :aria-label="label"
  >
    <span class="ns-avatar__fallback" aria-hidden="true">{{ initials }}</span>
    <img
      v-if="showImage"
      class="ns-avatar__image"
      :src="source"
      alt=""
      @load="loaded = true"
      @error="failed = true"
    />
  </span>
</template>

<style>
.ns-avatar {
  --ns-avatar-size: var(--ns-avatar-size-md);
  --ns-avatar-radius: var(--ns-radius-avatar);
  position: relative;
  display: inline-grid;
  flex: none;
  place-items: center;
  inline-size: var(--ns-avatar-size);
  block-size: var(--ns-avatar-size);
  overflow: hidden;
  border-radius: var(--ns-avatar-radius);
  background: var(--ns-avatar-background);
  color: var(--ns-avatar-foreground);
  font-family: var(--ns-font-sans);
  font-size: calc(var(--ns-avatar-size) * 0.4);
  font-weight: var(--ns-font-weight-semibold);
  line-height: 1;
  user-select: none;
}

.ns-avatar__image {
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity var(--ns-duration-normal) var(--ns-easing-standard);
}

.ns-avatar--loaded .ns-avatar__image {
  opacity: 1;
}

.ns-avatar--sm {
  --ns-avatar-size: var(--ns-avatar-size-sm);
}

.ns-avatar--lg {
  --ns-avatar-size: var(--ns-avatar-size-lg);
}

.ns-avatar--disabled {
  opacity: var(--ns-opacity-disabled);
}
</style>
