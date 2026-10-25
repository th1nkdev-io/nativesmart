<script setup lang="ts">
import { computed } from "vue";

export type NsSafeAreaEdge = "top" | "bottom" | "start" | "end";
export type NsSafeAreaEdges = "all" | "top" | "bottom" | "vertical" | "horizontal" | "none";
export type NsSafeAreaSpace = "0" | "2" | "3" | "4" | "6" | "8";

export interface NsSafeAreaProps {
  /** Edges kept clear: a preset, or a list such as `["top", "start"]`. Start and end follow the reading direction. */
  edges?: NsSafeAreaEdges | readonly NsSafeAreaEdge[];
  /** `padding` keeps the background under the notch; `margin` leaves it uncovered. */
  mode?: "padding" | "margin";
  /** Smallest space on each kept edge, even where the screen has no inset: Flutter's minimum. */
  minimum?: NsSafeAreaSpace;
  /** Space added on top of the inset, for content that must breathe above the home indicator. */
  spacing?: NsSafeAreaSpace;
  /** Insets to use instead of the screen's: from a native shell, or to preview a device. */
  insets?: Partial<Record<"top" | "right" | "bottom" | "left", number>>;
  as?: string;
}

const props = withDefaults(defineProps<NsSafeAreaProps>(), {
  edges: "all",
  mode: "padding",
  minimum: "0",
  spacing: "0",
  as: "div"
});

const presets: Record<NsSafeAreaEdges, readonly NsSafeAreaEdge[]> = {
  all: ["top", "bottom", "start", "end"],
  top: ["top"],
  bottom: ["bottom"],
  vertical: ["top", "bottom"],
  horizontal: ["start", "end"],
  none: []
};

const kept = computed(() => (typeof props.edges === "string" ? presets[props.edges] : props.edges));

/* The 0 step is unitless in the tokens; max() and calc() with a length need 0px. */
const space = (step: NsSafeAreaSpace) => (step === "0" ? "0px" : `var(--ns-space-${step})`);

const style = computed(() => {
  const vars: Record<string, string> = {
    "--ns-safe-minimum": space(props.minimum),
    "--ns-safe-spacing": space(props.spacing)
  };
  for (const [side, value] of Object.entries(props.insets ?? {})) {
    if (value !== undefined) vars[`--ns-safe-${side}-override`] = `${value}px`;
  }
  return vars;
});
</script>

<template>
  <component
    :is="as"
    :class="[
      'ns-safe-area',
      `ns-safe-area--${mode}`,
      ...kept.map((edge) => `ns-safe-area--${edge}`)
    ]"
    :style="style"
  >
    <slot />
  </component>
</template>

<style>
/*
 * Insets are physical (the notch is on one side of the glass); start and end map them to the
 * reading direction. Each kept edge gets max(inset, minimum) + spacing.
 */
.ns-safe-area {
  --ns-safe-top: var(--ns-safe-top-override, env(safe-area-inset-top, 0px));
  --ns-safe-bottom: var(--ns-safe-bottom-override, env(safe-area-inset-bottom, 0px));
  --ns-safe-left: var(--ns-safe-left-override, env(safe-area-inset-left, 0px));
  --ns-safe-right: var(--ns-safe-right-override, env(safe-area-inset-right, 0px));
  --ns-safe-start: var(--ns-safe-left);
  --ns-safe-end: var(--ns-safe-right);
  box-sizing: border-box;
}

[dir="rtl"] .ns-safe-area {
  --ns-safe-start: var(--ns-safe-right);
  --ns-safe-end: var(--ns-safe-left);
}

.ns-safe-area--padding.ns-safe-area--top {
  padding-block-start: calc(
    max(var(--ns-safe-top), var(--ns-safe-minimum)) + var(--ns-safe-spacing)
  );
}

.ns-safe-area--padding.ns-safe-area--bottom {
  padding-block-end: calc(
    max(var(--ns-safe-bottom), var(--ns-safe-minimum)) + var(--ns-safe-spacing)
  );
}

.ns-safe-area--padding.ns-safe-area--start {
  padding-inline-start: calc(
    max(var(--ns-safe-start), var(--ns-safe-minimum)) + var(--ns-safe-spacing)
  );
}

.ns-safe-area--padding.ns-safe-area--end {
  padding-inline-end: calc(
    max(var(--ns-safe-end), var(--ns-safe-minimum)) + var(--ns-safe-spacing)
  );
}

.ns-safe-area--margin.ns-safe-area--top {
  margin-block-start: calc(
    max(var(--ns-safe-top), var(--ns-safe-minimum)) + var(--ns-safe-spacing)
  );
}

.ns-safe-area--margin.ns-safe-area--bottom {
  margin-block-end: calc(
    max(var(--ns-safe-bottom), var(--ns-safe-minimum)) + var(--ns-safe-spacing)
  );
}

.ns-safe-area--margin.ns-safe-area--start {
  margin-inline-start: calc(
    max(var(--ns-safe-start), var(--ns-safe-minimum)) + var(--ns-safe-spacing)
  );
}

.ns-safe-area--margin.ns-safe-area--end {
  margin-inline-end: calc(max(var(--ns-safe-end), var(--ns-safe-minimum)) + var(--ns-safe-spacing));
}
</style>
