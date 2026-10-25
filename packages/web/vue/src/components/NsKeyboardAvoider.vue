<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { useKeyboardInset } from "../composables/useKeyboardInset";

export type NsKeyboardAvoiderBehavior = "padding" | "height" | "translate" | "none";
export type NsKeyboardAvoiderGap = "0" | "2" | "4" | "6" | "8";

export interface NsKeyboardAvoiderProps {
  /**
   * How room is made above the keyboard: `padding` shrinks the scroll area, `height` caps the
   * whole frame, `translate` lifts it, as for a bottom sheet.
   */
  behavior?: NsKeyboardAvoiderBehavior;
  /** Pixels already covered above this frame, such as a fixed header, subtracted from the keyboard. */
  offset?: number;
  /** Space kept between the focused field and the keyboard. */
  focusGap?: NsKeyboardAvoiderGap;
  /** Scrolls the focused field into view when the keyboard opens or focus moves. */
  scrollToFocused?: boolean;
  enabled?: boolean;
  /**
   * Keyboard height to use instead of detection: from a native shell such as Capacitor's keyboard
   * plugin, or to preview the layout.
   */
  keyboardHeight?: number;
  as?: string;
}

const props = withDefaults(defineProps<NsKeyboardAvoiderProps>(), {
  behavior: "padding",
  offset: 0,
  focusGap: "4",
  scrollToFocused: true,
  enabled: true,
  as: "div"
});

const emit = defineEmits<{
  "keyboard-change": [state: { visible: boolean; height: number }];
}>();

const detected = useKeyboardInset();
const keyboard = computed(() => props.keyboardHeight ?? detected.height.value);
/** Room actually made: the keyboard minus what the offset already accounts for. */
const inset = computed(() =>
  props.enabled && props.behavior !== "none" ? Math.max(0, keyboard.value - props.offset) : 0
);
const visible = computed(() => keyboard.value > 0);

const content = ref<HTMLElement>();

/* Once the room is made, bring the focused field above the keyboard. */
async function reveal() {
  if (!props.scrollToFocused || !visible.value) return;
  await nextTick();
  const active = document.activeElement as HTMLElement | null;
  if (!active || !content.value?.contains(active)) return;
  requestAnimationFrame(() => active.scrollIntoView?.({ block: "nearest", behavior: "smooth" }));
}

watch(keyboard, (height) => {
  emit("keyboard-change", { visible: height > 0, height });
  /* After the frame has followed the keyboard: the field's final position is known. */
  if (height > 0) setTimeout(reveal, 260);
});
</script>

<template>
  <component
    :is="as"
    :class="[
      'ns-keyboard-avoider',
      `ns-keyboard-avoider--${behavior}`,
      { 'ns-keyboard-avoider--open': visible && enabled }
    ]"
    :style="{
      '--ns-keyboard-inset': `${inset}px`,
      '--ns-keyboard-gap': `var(--ns-space-${focusGap})`
    }"
  >
    <div ref="content" class="ns-keyboard-avoider__content" @focusin="reveal">
      <slot />
    </div>
    <div v-if="$slots.accessory" class="ns-keyboard-avoider__accessory">
      <slot name="accessory" />
    </div>
  </component>
</template>

<style>
/*
 * Fills its parent, like a screen: the content scrolls, the accessory bar sits at the bottom and
 * rides above the keyboard. Follows the keyboard with the platform's emphasized curve.
 */
.ns-keyboard-avoider {
  --ns-keyboard-inset: 0px;
  --ns-keyboard-gap: var(--ns-space-4);
  --ns-keyboard-duration: var(--ns-duration-moderate);
  --ns-keyboard-easing: var(--ns-easing-emphasized-decelerate);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  block-size: 100%;
  min-block-size: 0;
  transition:
    padding-block-end var(--ns-keyboard-duration) var(--ns-keyboard-easing),
    max-block-size var(--ns-keyboard-duration) var(--ns-keyboard-easing),
    transform var(--ns-keyboard-duration) var(--ns-keyboard-easing);
}

.ns-keyboard-avoider__content {
  flex: 1 1 auto;
  min-block-size: 0;
  overflow: auto;
  overscroll-behavior: contain;
  scroll-padding-block-end: var(--ns-keyboard-gap);
}

.ns-keyboard-avoider__content :focus {
  scroll-margin-block-end: var(--ns-keyboard-gap);
}

.ns-keyboard-avoider__accessory {
  flex: none;
}

.ns-keyboard-avoider--padding {
  padding-block-end: var(--ns-keyboard-inset);
}

.ns-keyboard-avoider--height {
  max-block-size: calc(100% - var(--ns-keyboard-inset));
}

.ns-keyboard-avoider--translate {
  transform: translateY(calc(var(--ns-keyboard-inset) * -1));
}

@media (prefers-reduced-motion: reduce) {
  .ns-keyboard-avoider {
    transition: none;
  }
}
</style>
