<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useSlots, type VNode } from "vue";
import { parseLineRanges, tokenizeLine, type NsCodeLanguage } from "./code-syntax";
import NsIcon from "./NsIcon.vue";

export type NsCodeVariant = "block" | "inline";
export type NsCodeTone = "neutral" | "primary" | "success" | "warning" | "danger";
export type NsCodeSize = "sm" | "md";

export interface NsCodeProps {
  /** Source text. The default slot can hold it instead. */
  code?: string;
  /** A block with its own lines, or a word inside a sentence. */
  variant?: NsCodeVariant;
  /** Colors keywords, strings, numbers and comments. */
  language?: NsCodeLanguage;
  /** File name or caption in the header of a block. */
  title?: string;
  /** Inline code color. */
  tone?: NsCodeTone;
  size?: NsCodeSize;
  /** Numbers each line in a gutter. */
  lineNumbers?: boolean;
  /** Lines to emphasise, such as `2` or `2, 4-6`. */
  highlight?: string;
  /** Starts each line with a shell prompt that is not copied. */
  prompt?: boolean;
  /** Wraps long lines instead of scrolling sideways. */
  wrap?: boolean;
  copyable?: boolean;
  /** Lines shown before an expand button. */
  maxLines?: number;
  copyLabel?: string;
  copiedLabel?: string;
  expandLabel?: string;
  collapseLabel?: string;
}

const props = withDefaults(defineProps<NsCodeProps>(), {
  variant: "block",
  language: "ts",
  tone: "neutral",
  size: "md",
  lineNumbers: false,
  prompt: false,
  wrap: false,
  copyable: true,
  copyLabel: "Copy code",
  copiedLabel: "Copied",
  expandLabel: "Show all",
  collapseLabel: "Show less"
});

const emit = defineEmits<{ copy: [code: string] }>();
const slots = useSlots();

/* The slot text when no code prop: a block keeps its own line breaks, minus the outer blank lines. */
function slotText(nodes: VNode[] | undefined): string {
  return (nodes ?? [])
    .map((node) =>
      typeof node.children === "string"
        ? node.children
        : Array.isArray(node.children)
          ? slotText(node.children as VNode[])
          : ""
    )
    .join("");
}

const source = computed(() => {
  const text = props.code ?? slotText(slots.default?.());
  return props.variant === "block" ? text.replace(/^\n+|\s+$/g, "") : text;
});

const lines = computed(() => source.value.split("\n"));
const marked = computed(() => parseLineRanges(props.highlight));
const tokens = computed(() => lines.value.map((line) => tokenizeLine(line, props.language)));

const expanded = ref(false);
const collapsible = computed(
  () => props.maxLines !== undefined && lines.value.length > props.maxLines
);
const visible = computed(() =>
  collapsible.value && !expanded.value ? tokens.value.slice(0, props.maxLines) : tokens.value
);

const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  try {
    await navigator.clipboard.writeText(source.value);
  } catch {
    return;
  }
  copied.value = true;
  emit("copy", source.value);
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = false), 2000);
}

onBeforeUnmount(() => clearTimeout(timer));

const languageNames: Record<NsCodeLanguage, string> = {
  ts: "TypeScript",
  js: "JavaScript",
  vue: "Vue",
  html: "HTML",
  css: "CSS",
  json: "JSON",
  bash: "Terminal",
  text: "Texte"
};
</script>

<template>
  <code
    v-if="variant === 'inline'"
    :class="['ns-code', 'ns-code--inline', `ns-code--tone-${tone}`, `ns-code--${size}`]"
    >{{ source }}</code
  >

  <figure
    v-else
    :class="[
      'ns-code',
      'ns-code--block',
      `ns-code--${size}`,
      {
        'ns-code--wrap': wrap,
        'ns-code--numbers': lineNumbers,
        'ns-code--prompt': prompt,
        'ns-code--collapsed': collapsible && !expanded
      }
    ]"
  >
    <figcaption v-if="title || copyable || $slots.actions" class="ns-code__header">
      <span class="ns-code__title">{{ title }}</span>
      <span class="ns-code__language">{{ languageNames[language] }}</span>
      <slot name="actions" />
      <button
        v-if="copyable"
        type="button"
        :class="['ns-code__copy', { 'is-copied': copied }]"
        :aria-label="copyLabel"
        :title="copyLabel"
        @click="copy"
      >
        <NsIcon :name="copied ? 'check' : 'copy'" size="sm" />
      </button>
      <span class="ns-code__status" role="status">{{ copied ? copiedLabel : "" }}</span>
    </figcaption>

    <pre class="ns-code__pre" tabindex="0"><code class="ns-code__body"><span
      v-for="(line, index) in visible"
      :key="index"
      :class="['ns-code__line', { 'is-highlighted': marked.has(index + 1) }]"
      :data-line="index + 1"
    ><span v-for="(token, part) in line" :key="part" :class="`ns-code__token--${token.kind}`">{{ token.text }}</span>{{ "\n" }}</span></code></pre>

    <button
      v-if="collapsible"
      type="button"
      class="ns-code__expand"
      :aria-expanded="expanded"
      @click="expanded = !expanded"
    >
      {{ expanded ? collapseLabel : expandLabel }}
      <NsIcon :name="expanded ? 'chevron-up' : 'chevron-down'" size="xs" />
    </button>
  </figure>
</template>

<style>
.ns-code {
  --ns-code-font-size: var(--ns-text-code-size);
  font-family: var(--ns-font-mono);
}

/* Inline: a word in a sentence, sized relative to the text around it. */
.ns-code--inline {
  --ns-code-background: var(--ns-color-surface-muted);
  --ns-code-color: var(--ns-color-text);
  --ns-code-border: var(--ns-color-border-subtle);
  padding: 0.1em 0.38em;
  border: 1px solid var(--ns-code-border);
  border-radius: var(--ns-radius-sm);
  background: var(--ns-code-background);
  color: var(--ns-code-color);
  font-size: 0.875em;
  overflow-wrap: anywhere;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

.ns-code--inline.ns-code--sm {
  font-size: 0.8em;
}

.ns-code--tone-primary {
  --ns-code-background: var(--ns-color-primary-muted);
  --ns-code-color: var(--ns-color-on-primary-muted);
  --ns-code-border: var(--ns-color-primary-border);
}

.ns-code--tone-success {
  --ns-code-background: var(--ns-color-success-muted);
  --ns-code-color: var(--ns-color-on-success-muted);
  --ns-code-border: var(--ns-color-success-border);
}

.ns-code--tone-warning {
  --ns-code-background: var(--ns-color-warning-muted);
  --ns-code-color: var(--ns-color-on-warning-muted);
  --ns-code-border: var(--ns-color-warning-border);
}

.ns-code--tone-danger {
  --ns-code-background: var(--ns-color-danger-muted);
  --ns-code-color: var(--ns-color-on-danger-muted);
  --ns-code-border: var(--ns-color-danger-border);
}

/* Block */
.ns-code--block {
  position: relative;
  overflow: hidden;
  min-inline-size: 0;
  margin: 0;
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-lg);
  background: var(--ns-color-surface-sunken);
  color: var(--ns-color-text);
}

.ns-code--block.ns-code--sm {
  --ns-code-font-size: 12px;
}

.ns-code__header {
  display: flex;
  align-items: center;
  gap: var(--ns-space-2);
  min-block-size: 40px;
  padding-inline: var(--ns-space-4) var(--ns-space-1-5);
  border-block-end: 1px solid var(--ns-color-border-subtle);
  background: var(--ns-color-surface);
  font-family: var(--ns-font-sans);
  font-size: var(--ns-text-caption-size);
}

.ns-code__title {
  overflow: hidden;
  flex: 1;
  min-inline-size: 0;
  color: var(--ns-color-text);
  font-family: var(--ns-font-mono);
  font-weight: var(--ns-font-weight-medium);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ns-code__language {
  color: var(--ns-color-text-subtle);
}

.ns-code__copy {
  display: inline-grid;
  flex: none;
  place-items: center;
  inline-size: 30px;
  block-size: 30px;
  border: 0;
  border-radius: var(--ns-radius-md);
  background: none;
  color: var(--ns-color-text-muted);
  cursor: pointer;
  transition:
    background-color var(--ns-duration-fast) var(--ns-easing-standard),
    color var(--ns-duration-fast) var(--ns-easing-standard);
}

.ns-code__copy:hover {
  background: var(--ns-color-surface-hover);
  color: var(--ns-color-text);
}

.ns-code__copy:focus-visible,
.ns-code__expand:focus-visible,
.ns-code__pre:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
  outline-offset: calc(var(--ns-focus-ring-width) * -1);
}

.ns-code__copy.is-copied {
  color: var(--ns-color-success-text);
}

.ns-code__status {
  position: absolute;
  overflow: hidden;
  clip-path: inset(50%);
  inline-size: 1px;
  block-size: 1px;
  white-space: nowrap;
}

.ns-code__pre {
  overflow: auto;
  margin: 0;
  padding-block: var(--ns-space-3);
  font-size: var(--ns-code-font-size);
  line-height: 1.7;
  tab-size: 2;
}

.ns-code__body {
  display: grid;
  min-inline-size: max-content;
  font: inherit;
  counter-reset: ns-code-line;
}

.ns-code--wrap .ns-code__body {
  min-inline-size: 0;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.ns-code__line {
  position: relative;
  padding-inline: var(--ns-space-4);
  counter-increment: ns-code-line;
}

/* Gutter: numbers or prompts are generated content, so they are neither read nor copied. */
.ns-code--numbers .ns-code__line,
.ns-code--prompt .ns-code__line {
  padding-inline-start: calc(var(--ns-space-4) + 3ch);
}

.ns-code--numbers .ns-code__line::before,
.ns-code--prompt .ns-code__line::before {
  position: absolute;
  inset-inline-start: var(--ns-space-3);
  inline-size: 2ch;
  color: var(--ns-color-text-subtle);
  text-align: end;
  user-select: none;
}

.ns-code--numbers .ns-code__line::before {
  content: counter(ns-code-line);
}

.ns-code--prompt .ns-code__line::before {
  content: "$";
  color: var(--ns-color-success-text);
}

.ns-code--numbers.ns-code--prompt .ns-code__line::before {
  content: counter(ns-code-line) " $";
  inline-size: auto;
}

.ns-code--numbers.ns-code--prompt .ns-code__line {
  padding-inline-start: calc(var(--ns-space-4) + 5ch);
}

.ns-code__line.is-highlighted {
  background: color-mix(in srgb, var(--ns-color-primary) 10%, transparent);
  box-shadow: inset 2px 0 0 var(--ns-color-primary);
}

[dir="rtl"] .ns-code__line.is-highlighted {
  box-shadow: inset -2px 0 0 var(--ns-color-primary);
}

/* Syntax */
.ns-code__token--keyword {
  color: var(--ns-color-primary-text);
  font-weight: var(--ns-font-weight-medium);
}

.ns-code__token--string {
  color: var(--ns-color-success-text);
}

.ns-code__token--number {
  color: var(--ns-color-warning-text);
}

.ns-code__token--comment {
  color: var(--ns-color-text-subtle);
  font-style: italic;
}

.ns-code__token--tag {
  color: var(--ns-color-info-text);
}

.ns-code__token--attribute {
  color: var(--ns-color-danger-text);
}

.ns-code__token--punctuation {
  color: var(--ns-color-text-muted);
}

/* Collapsed: the last visible lines fade under the expand button. */
.ns-code--collapsed .ns-code__pre {
  mask-image: linear-gradient(to bottom, #000 calc(100% - 32px), transparent);
}

.ns-code__expand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--ns-space-1);
  inline-size: 100%;
  min-block-size: 36px;
  border: 0;
  border-block-start: 1px solid var(--ns-color-border-subtle);
  background: var(--ns-color-surface);
  color: var(--ns-color-primary-text);
  font-family: var(--ns-font-sans);
  font-size: var(--ns-text-caption-size);
  font-weight: var(--ns-font-weight-semibold);
  cursor: pointer;
}

.ns-code__expand:hover {
  background: var(--ns-color-surface-hover);
}
</style>
