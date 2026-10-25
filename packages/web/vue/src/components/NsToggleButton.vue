<script setup lang="ts">
import { computed } from "vue";
import type { NsButtonIntent, NsButtonSize } from "./button-context";
import NsButton from "./NsButton.vue";
import NsIconButton from "./NsIconButton.vue";

export type NsToggleButtonVariant = "outline" | "ghost" | "soft";

export interface NsToggleButtonProps {
  /** What it switches. The name stays the same pressed or not. */
  label: string;
  /** Icon when off. */
  icon?: string;
  /** Icon when on, such as `eye-off` after `eye`. */
  iconPressed?: string;
  /** Look when off; on, it takes the intent's tint and border. */
  variant?: NsToggleButtonVariant;
  /** Color when on. */
  intent?: NsButtonIntent;
  size?: NsButtonSize;
  /** A square showing only the icon, the label as tooltip. */
  iconOnly?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<NsToggleButtonProps>(), {
  variant: "outline",
  intent: "primary",
  iconOnly: false,
  disabled: false
});

const pressed = defineModel<boolean>("pressed", { default: false });
const emit = defineEmits<{ change: [pressed: boolean] }>();

const shownIcon = computed(() =>
  pressed.value && props.iconPressed ? props.iconPressed : props.icon
);

function toggle() {
  pressed.value = !pressed.value;
  emit("change", pressed.value);
}
</script>

<template>
  <NsIconButton
    v-if="iconOnly"
    class="ns-toggle-button"
    :label="label"
    :icon="shownIcon ?? 'check'"
    :variant="variant"
    :intent="pressed ? intent : 'neutral'"
    :size="size"
    :disabled="disabled"
    :pressed="pressed"
    @press="toggle"
  />
  <NsButton
    v-else
    class="ns-toggle-button"
    :label="label"
    :icon="shownIcon"
    :variant="variant"
    :intent="pressed ? intent : 'neutral'"
    :size="size"
    :disabled="disabled"
    :pressed="pressed"
    @press="toggle"
  />
</template>

<style>
/* Off, a neutral outline keeps a visible border; on, the intent's border shows the state. */
.ns-toggle-button .ns-button--outline.ns-button--neutral:not(.ns-button--pressed),
.ns-button.ns-toggle-button.ns-button--outline:not(.ns-button--pressed) {
  --ns-button-border: var(--ns-color-border);
}

.ns-toggle-button .ns-icon,
.ns-button.ns-toggle-button .ns-icon {
  transition: transform var(--ns-duration-fast) var(--ns-easing-emphasized);
}

.ns-toggle-button .ns-button--pressed .ns-icon,
.ns-button.ns-toggle-button.ns-button--pressed .ns-icon {
  transform: scale(1.12);
}

@media (prefers-reduced-motion: reduce) {
  .ns-toggle-button .ns-icon,
  .ns-button.ns-toggle-button .ns-icon {
    transition: none;
    transform: none;
  }
}
</style>
