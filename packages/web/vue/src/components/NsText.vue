<script setup lang="ts">
import {
  computed,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useSlots,
  watch,
  type FunctionalComponent,
  type VNodeChild
} from "vue";
import NsIcon from "./NsIcon.vue";
import { slotText } from "./slot-text";

export type NsTextRole =
  | "body"
  | "lead"
  | "label"
  | "caption"
  | "overline"
  | "quote"
  | "heading"
  | "display";
export type NsTextSize = "auto" | "xs" | "sm" | "md" | "lg";
export type NsTextWeight = "auto" | "regular" | "medium" | "semibold" | "bold";
export type NsTextTone =
  | "default"
  | "muted"
  | "subtle"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "inherit";
export type NsTextAlign = "start" | "center" | "end" | "justify";

export interface NsTextProps {
  /** Semantic text role: picks the text style and the default element. */
  role?: NsTextRole;
  /** Body and label sizes; `auto` takes the role's. */
  size?: NsTextSize;
  weight?: NsTextWeight;
  /** Heading level, for the heading role: h1 to h6. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Rendered element when the default does not fit, for example `legend` or `dt`. */
  as?: string;
  tone?: NsTextTone;
  align?: NsTextAlign;
  /** Lines kept before an ellipsis. */
  lines?: number;
  /** With `lines`: a button reveals the rest. */
  expandable?: boolean;
  /** Cuts the text on one line with an ellipsis. */
  truncate?: boolean;
  strong?: boolean;
  italic?: boolean;
  underline?: boolean;
  /** Struck through, such as an old price. */
  strike?: boolean;
  /** Highlighted, such as a search match. */
  mark?: boolean;
  /** Tabular figures, so amounts line up. */
  numeric?: boolean;
  /** Adds a button that copies the text. */
  copyable?: boolean;
  disabled?: boolean;
  expandLabel?: string;
  collapseLabel?: string;
  copyLabel?: string;
  copiedLabel?: string;
}

const props = withDefaults(defineProps<NsTextProps>(), {
  role: "body",
  size: "auto",
  weight: "auto",
  level: 2,
  tone: "default",
  align: "start",
  expandable: false,
  truncate: false,
  strong: false,
  italic: false,
  underline: false,
  strike: false,
  mark: false,
  numeric: false,
  copyable: false,
  disabled: false,
  expandLabel: "Read more",
  collapseLabel: "Show less",
  copyLabel: "Copy",
  copiedLabel: "Copied"
});

const emit = defineEmits<{ copy: [text: string]; expand: [open: boolean] }>();
const slots = useSlots();

const tag = computed(() => {
  if (props.as) return props.as;
  switch (props.role) {
    case "heading":
      return `h${props.level}`;
    case "quote":
      return "blockquote";
    case "body":
    case "lead":
    case "display":
      return "p";
    default:
      return "span";
  }
});

/** Each role maps to a text style; body and label also take a size. */
const style = computed(() => {
  const size = props.size === "auto" ? "md" : props.size;
  switch (props.role) {
    case "heading":
      return `h${props.level}`;
    case "display":
      return "display-md";
    case "label":
      return `label-${size === "xs" || size === "lg" || size === "sm" ? size : "md"}`;
    case "body":
      return `body-${size}`;
    default:
      return props.role;
  }
});

/* Decorations nest semantic elements, outermost first. */
const wrappers = computed(
  () =>
    [
      props.strong && "strong",
      props.italic && "em",
      props.strike && "s",
      props.mark && "mark",
      props.underline && "u"
    ].filter(Boolean) as string[]
);

/* strong › em › s › mark › u around the slot, each a real element so its meaning is read. */
const Decorated: FunctionalComponent = (_, { slots: inner }) =>
  wrappers.value.reduceRight<VNodeChild>(
    (child, wrapper) => h(wrapper, null, [child]),
    inner.default?.()
  );

/* Clamping: the expand button only shows when the text really overflows. */
const content = ref<HTMLElement>();
const expanded = ref(false);
const overflowing = ref(false);
const clamped = computed(() => props.lines !== undefined && !expanded.value);
let observer: ResizeObserver | undefined;

function measure() {
  const element = content.value;
  overflowing.value = Boolean(element && element.scrollHeight > element.clientHeight + 1);
}

onMounted(() => {
  if (typeof ResizeObserver === "undefined" || !content.value) return;
  observer = new ResizeObserver(measure);
  observer.observe(content.value);
  measure();
});

watch(
  () => props.lines,
  async () => {
    expanded.value = false;
    await nextTick();
    measure();
  }
);

function toggle() {
  expanded.value = !expanded.value;
  emit("expand", expanded.value);
}

const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  const text = (content.value?.textContent ?? slotText(slots.default?.())).trim();
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    return;
  }
  copied.value = true;
  emit("copy", text);
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = false), 2000);
}

onBeforeUnmount(() => {
  observer?.disconnect();
  clearTimeout(timer);
});
</script>

<template>
  <component
    :is="tag"
    :class="[
      'ns-text',
      `ns-text--${role}`,
      `ns-text--${tone}`,
      `ns-text--align-${align}`,
      {
        'ns-text--truncate': truncate,
        'ns-text--numeric': numeric,
        'ns-text--disabled': disabled
      }
    ]"
    :style="{
      '--ns-text-family': `var(--ns-text-${style}-family)`,
      '--ns-text-size': `var(--ns-text-${style}-size)`,
      '--ns-text-line-height': `var(--ns-text-${style}-line-height)`,
      '--ns-text-weight':
        weight === 'auto' ? `var(--ns-text-${style}-weight)` : `var(--ns-font-weight-${weight})`,
      '--ns-text-tracking': `var(--ns-text-${style}-tracking)`,
      '--ns-text-lines': lines
    }"
    :aria-disabled="disabled || undefined"
  >
    <span ref="content" :class="['ns-text__content', { 'ns-text__content--clamped': clamped }]">
      <Decorated v-if="wrappers.length"><slot /></Decorated>
      <slot v-else />
    </span>
    <button
      v-if="lines !== undefined && expandable && (overflowing || expanded)"
      type="button"
      class="ns-text__expand"
      :aria-expanded="expanded"
      @click="toggle"
    >
      {{ expanded ? collapseLabel : expandLabel }}
    </button>
    <button
      v-if="copyable"
      type="button"
      :class="['ns-text__copy', { 'is-copied': copied }]"
      :aria-label="copied ? copiedLabel : copyLabel"
      :title="copyLabel"
      @click="copy"
    >
      <NsIcon :name="copied ? 'check' : 'copy'" size="xs" />
    </button>
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

.ns-text--overline {
  text-transform: uppercase;
}

/* Quote: a bar at the start, in the quote style. */
.ns-text--quote {
  padding-inline-start: var(--ns-space-4);
  border-inline-start: 3px solid var(--ns-color-primary);
  font-style: italic;
}

.ns-text--align-center {
  text-align: center;
}

.ns-text--align-end {
  text-align: end;
}

.ns-text--align-justify {
  text-align: justify;
  hyphens: auto;
}

/* Tones */
.ns-text--muted,
.ns-text--caption {
  --ns-text-color: var(--ns-color-text-muted);
}

.ns-text--subtle {
  --ns-text-color: var(--ns-color-text-subtle);
}

.ns-text--primary {
  --ns-text-color: var(--ns-color-primary-text);
}

.ns-text--success {
  --ns-text-color: var(--ns-color-success-text);
}

.ns-text--warning {
  --ns-text-color: var(--ns-color-warning-text);
}

.ns-text--danger {
  --ns-text-color: var(--ns-color-danger-text);
}

.ns-text--inherit {
  --ns-text-color: inherit;
}

.ns-text--numeric {
  font-variant-numeric: tabular-nums;
}

/* Decorations */
.ns-text strong {
  font-weight: var(--ns-font-weight-bold);
}

.ns-text s {
  text-decoration-color: color-mix(in srgb, currentColor 60%, transparent);
}

.ns-text u {
  text-decoration-color: color-mix(in srgb, currentColor 50%, transparent);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
}

.ns-text mark {
  padding-inline: 0.15em;
  border-radius: var(--ns-radius-xs);
  background: var(--ns-color-warning-muted);
  color: var(--ns-color-on-warning-muted);
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

/* Truncation and clamping */
.ns-text--truncate {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ns-text--truncate .ns-text__content {
  display: inline;
}

.ns-text__content--clamped {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--ns-text-lines);
}

.ns-text__expand {
  margin: var(--ns-space-1) 0 0;
  padding: 0;
  border: 0;
  background: none;
  color: var(--ns-color-text-link);
  font: inherit;
  font-size: 0.9em;
  font-weight: var(--ns-font-weight-semibold);
  cursor: pointer;
}

.ns-text__expand:hover {
  text-decoration: underline;
}

.ns-text__copy {
  display: inline-grid;
  place-items: center;
  inline-size: 1.5em;
  block-size: 1.5em;
  margin-inline-start: 0.25em;
  padding: 0;
  border: 0;
  border-radius: var(--ns-radius-sm);
  background: none;
  color: var(--ns-color-text-subtle);
  vertical-align: -0.3em;
  cursor: pointer;
}

.ns-text__copy:hover {
  background: var(--ns-color-surface-hover);
  color: var(--ns-color-text);
}

.ns-text__copy.is-copied {
  color: var(--ns-color-success-text);
}

.ns-text__expand:focus-visible,
.ns-text__copy:focus-visible {
  border-radius: var(--ns-radius-sm);
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
  outline-offset: 2px;
}

.ns-text--disabled {
  --ns-text-color: var(--ns-color-text-disabled);
}
</style>
