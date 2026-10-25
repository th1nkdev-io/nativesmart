<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import {
  detectPlatform,
  isHeld,
  keyLabel,
  keyName,
  normalizeKey,
  parseKeys,
  type NsKbdPlatform
} from "./kbd-keys";

export type NsKbdDisplay = "symbol" | "text";
export type NsKbdSeparator = "none" | "plus";
export type NsKbdVariant = "keycap" | "soft" | "ghost";
export type NsKbdSize = "sm" | "md" | "lg";

export interface NsKbdProps {
  /** Shortcut such as `mod+k`, or keys in sequence such as `g i`. The slot holds a single key. */
  keys?: string;
  /** Whose keyboard. `auto` reads the device: `mod` is ⌘ on Apple, Ctrl elsewhere. */
  platform?: "auto" | NsKbdPlatform;
  /** Modifier symbols such as ⌘ ⇧, or their names. */
  display?: NsKbdDisplay;
  /** Between the keys of a combination; a sequence always reads `thenLabel`. */
  separator?: NsKbdSeparator;
  variant?: NsKbdVariant;
  size?: NsKbdSize;
  /** Lights up the keys the user presses and emits `match`. */
  listen?: boolean;
  /** Spoken text, in place of the generated key names. */
  label?: string;
  thenLabel?: string;
}

const props = withDefaults(defineProps<NsKbdProps>(), {
  platform: "auto",
  display: "symbol",
  separator: "none",
  variant: "keycap",
  size: "md",
  listen: false,
  thenLabel: "then"
});

const emit = defineEmits<{ match: [event: KeyboardEvent] }>();

/* The device is read after mounting, so server and client render the same first frame. */
const detected = ref<NsKbdPlatform>("other");
onMounted(() => (detected.value = detectPlatform()));
const platform = computed(() => (props.platform === "auto" ? detected.value : props.platform));

const parsed = computed(() => parseKeys(props.keys ?? ""));
const keys = computed(() =>
  parsed.value.keys.map((key) => ({
    key,
    label: keyLabel(key, platform.value, props.display),
    symbol: /^[^\p{L}\p{N}]$/u.test(keyLabel(key, platform.value, props.display)),
    name: keyName(key, platform.value)
  }))
);
const spoken = computed(
  () =>
    props.label ??
    keys.value.map((key) => key.name).join(parsed.value.sequence ? ` ${props.thenLabel} ` : " + ")
);

/* Listening: held keys light up; the whole combination flashes and emits match. */
const held = reactive(new Set<string>());
const matched = ref(false);
let flash: ReturnType<typeof setTimeout> | undefined;

function sync(event: KeyboardEvent) {
  for (const [flag, key] of [
    [event.metaKey, "meta"],
    [event.ctrlKey, "ctrl"],
    [event.altKey, "alt"],
    [event.shiftKey, "shift"]
  ] as const) {
    if (flag) held.add(key);
    else held.delete(key);
  }
}

function onDown(event: KeyboardEvent) {
  sync(event);
  held.add(normalizeKey(event.key));
  if (event.code.startsWith("Key")) held.add(event.code.slice(3).toLowerCase());
  if (event.code.startsWith("Digit")) held.add(event.code.slice(5));
  const all = parsed.value.keys;
  if (
    !parsed.value.sequence &&
    all.length &&
    all.every((key) => isHeld(key, held, platform.value))
  ) {
    matched.value = true;
    clearTimeout(flash);
    flash = setTimeout(() => (matched.value = false), 600);
    emit("match", event);
  }
}

function onUp(event: KeyboardEvent) {
  sync(event);
  held.delete(normalizeKey(event.key));
  if (event.code.startsWith("Key")) held.delete(event.code.slice(3).toLowerCase());
  if (event.code.startsWith("Digit")) held.delete(event.code.slice(5));
}

function clear() {
  held.clear();
}

function start() {
  window.addEventListener("keydown", onDown);
  window.addEventListener("keyup", onUp);
  window.addEventListener("blur", clear);
}

function stop() {
  window.removeEventListener("keydown", onDown);
  window.removeEventListener("keyup", onUp);
  window.removeEventListener("blur", clear);
  held.clear();
}

onMounted(() => props.listen && start());
watch(
  () => props.listen,
  (value) => (value ? start() : stop())
);
onBeforeUnmount(() => {
  stop();
  clearTimeout(flash);
});
</script>

<template>
  <kbd
    :class="[
      'ns-kbd',
      `ns-kbd--${variant}`,
      `ns-kbd--${size}`,
      { 'ns-kbd--matched': matched, 'ns-kbd--listening': listen }
    ]"
  >
    <template v-if="keys.length">
      <template v-for="(item, index) in keys" :key="index">
        <span v-if="index > 0 && parsed.sequence" class="ns-kbd__then" aria-hidden="true">{{
          thenLabel
        }}</span>
        <span v-else-if="index > 0 && separator === 'plus'" class="ns-kbd__plus" aria-hidden="true"
          >+</span
        >
        <kbd
          :class="[
            'ns-kbd__key',
            { 'is-symbol': item.symbol, 'is-held': listen && isHeld(item.key, held, platform) }
          ]"
          aria-hidden="true"
          >{{ item.label }}</kbd
        >
      </template>
      <span class="ns-kbd__spoken">{{ spoken }}</span>
    </template>
    <kbd v-else class="ns-kbd__key"><slot /></kbd>
  </kbd>
</template>

<style>
.ns-kbd {
  --ns-kbd-height: 22px;
  position: relative;
  --ns-kbd-pad: 6px;
  --ns-kbd-font-size: var(--ns-text-kbd-size);
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-family: var(--ns-font-mono);
  font-size: var(--ns-kbd-font-size);
  line-height: 1;
  vertical-align: middle;
  white-space: nowrap;
}

.ns-kbd--sm {
  --ns-kbd-height: 18px;
  --ns-kbd-pad: 4px;
  --ns-kbd-font-size: 10px;
}

.ns-kbd--lg {
  --ns-kbd-height: 30px;
  --ns-kbd-pad: 9px;
  --ns-kbd-font-size: 14px;
}

.ns-kbd__key {
  display: inline-grid;
  place-items: center;
  box-sizing: border-box;
  min-inline-size: var(--ns-kbd-height);
  block-size: var(--ns-kbd-height);
  padding-inline: var(--ns-kbd-pad);
  border-radius: var(--ns-radius-sm);
  color: var(--ns-color-text);
  font: inherit;
  font-weight: var(--ns-font-weight-medium);
  transition:
    transform var(--ns-duration-fast) var(--ns-easing-standard),
    background-color var(--ns-duration-fast) var(--ns-easing-standard),
    border-color var(--ns-duration-fast) var(--ns-easing-standard),
    box-shadow var(--ns-duration-fast) var(--ns-easing-standard);
}

/* Keycap: a raised key with a thicker bottom edge. */
.ns-kbd--keycap .ns-kbd__key {
  border: 1px solid var(--ns-color-border);
  border-block-end-width: 2px;
  border-block-end-color: var(--ns-color-border-strong);
  background: linear-gradient(var(--ns-color-surface), var(--ns-color-surface-muted));
  box-shadow: 0 1px 1px rgb(0 0 0 / 0.04);
}

/* Symbols such as ⌘ and ⇧ are drawn small in most mono fonts. */
.ns-kbd__key.is-symbol {
  font-family: var(--ns-font-sans);
  font-size: 1.2em;
}

.ns-kbd--soft .ns-kbd__key {
  background: var(--ns-color-surface-muted);
  color: var(--ns-color-text-muted);
}

.ns-kbd--ghost .ns-kbd__key {
  min-inline-size: 0;
  padding-inline: 0;
  color: var(--ns-color-text-muted);
}

.ns-kbd__plus,
.ns-kbd__then {
  color: var(--ns-color-text-subtle);
  font-family: var(--ns-font-sans);
  font-size: 0.9em;
}

.ns-kbd__then {
  padding-inline: 2px;
}

.ns-kbd__spoken {
  position: absolute;
  overflow: hidden;
  clip-path: inset(50%);
  inline-size: 1px;
  block-size: 1px;
  white-space: nowrap;
}

/* Listening */
.ns-kbd__key.is-held {
  border-color: var(--ns-color-primary-border);
  background: var(--ns-color-primary-muted);
  box-shadow: none;
  color: var(--ns-color-on-primary-muted);
  transform: translateY(1px);
}

.ns-kbd--keycap .ns-kbd__key.is-held {
  border-block-end-width: 1px;
}

.ns-kbd--matched .ns-kbd__key {
  border-color: var(--ns-color-success-border);
  background: var(--ns-color-success-muted);
  color: var(--ns-color-on-success-muted);
}

@media (prefers-reduced-motion: reduce) {
  .ns-kbd__key.is-held {
    transform: none;
  }
}
</style>
