<script setup lang="ts">
import { NsContainer, NsIcon } from "@nativesmart/vue";
import { primitives } from "@nativesmart/tokens";
import { encodeProps, type ShowcaseProps } from "@nativesmart/showcase-runtime";
import { computed, onBeforeUnmount, onMounted, ref, useAttrs, watch } from "vue";
import { useVariation, useView } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const view = useView();
const variation = useVariation();
const framed = new URLSearchParams(window.location.search).has("frame");

/* ---------- Playground: a real page in a frame of the chosen width, scaled to fit ---------- */

const viewports = [
  { width: 390, label: "Mobile", icon: "phone" },
  { width: 768, label: "Tablette", icon: "image" },
  { width: 1280, label: "Ordinateur", icon: "home" },
  { width: 1600, label: "Grand écran", icon: "eye" }
];
const viewport = ref(1280);
const pageHeight = 620;
const stage = ref<HTMLElement>();
const frame = ref<HTMLIFrameElement>();
const available = ref(640);
const scale = computed(() => Math.min(1, available.value / viewport.value));

/** The same renderer, in frame mode, with the Lab's current props. */
const source = computed(() => {
  const params = new URLSearchParams(window.location.search);
  params.delete("props");
  params.set("p", encodeProps(attrs as ShowcaseProps));
  params.set("frame", "1");
  params.set("view", "playground");
  return `${window.location.pathname}?${params.toString()}`;
});

const measure = ref<{ content: number; start: number; end: number; top: number }>();
function read() {
  const band = frame.value?.contentDocument?.querySelector<HTMLElement>(".site__tested");
  const column = band?.querySelector<HTMLElement>(".ns-container__content");
  if (!band || !column) return;
  const style = getComputedStyle(column);
  const start = parseFloat(style.paddingInlineStart);
  const end = parseFloat(style.paddingInlineEnd);
  measure.value = {
    content: Math.round(column.clientWidth - start - end),
    start: Math.round(start),
    end: Math.round(end),
    top: Math.round(parseFloat(getComputedStyle(band).paddingBlockStart))
  };
}
watch(source, () => (measure.value = undefined));
/* A new width only resizes the frame: its media queries follow, then the measures. */
watch(viewport, () => setTimeout(read, 400));

let observer: ResizeObserver | undefined;
onMounted(() => {
  if (framed || view.value !== "playground" || !stage.value) return;
  observer = new ResizeObserver(([entry]) => (available.value = entry.contentRect.width));
  observer.observe(stage.value);
});
onBeforeUnmount(() => observer?.disconnect());

/* ---------- Variations: a proportional diagram computed from the tokens ---------- */

const screen = 1600;
const gutterAuto = primitives.grid["2xl"].margin;

const diagram = computed(() => {
  const props = { ...attrs } as Record<string, string | boolean | undefined>;
  const size = String(props.size ?? "xl");
  const gutterKey = String(props.gutter ?? "auto");
  const gutter =
    gutterKey === "auto"
      ? gutterAuto
      : gutterKey === "none"
        ? 0
        : primitives.spacing[Number(gutterKey) as keyof typeof primitives.spacing];
  const sizes = primitives.sizing.container as Record<string, number>;
  const max = size === "full" ? screen : size === "prose" ? 640 : sizes[size];
  const start = props.align === "start" ? gutter : Math.max(gutter, (screen - max) / 2);
  const content = Math.min(max, screen - start - gutter);
  const sections = primitives.spaceUsages.section as Record<
    string,
    keyof typeof primitives.spacing
  >;
  const step = sections[String(props.spacing ?? "none")];
  const block = step === undefined ? 0 : primitives.spacing[step];
  const width = size === "prose" ? "65 caractères" : `${Math.round(content)} px`;
  const notes: Record<string, string> = {
    fixed: " · par paliers",
    safeArea: " · hors encoches"
  };
  const label = `${width}${variation?.group === "states" ? (notes[variation.value] ?? "") : ""}`;
  return {
    start,
    content,
    end: screen - start - content,
    block,
    label,
    background: props.background
  };
});
const contentHeight = 420;
const diagramHeight = computed(() => contentHeight + diagram.value.block * 2);

/* ---------- The page shown in the frame ---------- */

const cards = [
  { icon: "send", title: "Envoyer", text: "Partout en Afrique de l'Ouest, en quelques secondes." },
  { icon: "wallet", title: "Épargner", text: "Des objectifs, des rappels, zéro frais cachés." },
  { icon: "lock", title: "Sécuriser", text: "Code, empreinte et alertes à chaque opération." }
];
</script>

<template>
  <!-- In its own frame: the page itself -->
  <div v-if="framed" class="site">
    <NsContainer as="header" background="surface" spacing="none" class="site__bar">
      <div class="site__nav">
        <strong>Kora</strong>
        <span>Particuliers</span><span>Entreprises</span><span>Aide</span>
      </div>
    </NsContainer>
    <NsContainer v-bind="$attrs" class="site__tested">
      <div class="site__column">
        <p class="site__eyebrow">Paiements</p>
        <h1>Votre argent, où que vous soyez</h1>
        <p class="site__lead">
          Le conteneur garde ce texte et ces cartes dans une colonne lisible, avec des marges qui
          grandissent avec l'écran.
        </p>
        <div class="site__cards">
          <article v-for="card in cards" :key="card.title">
            <NsIcon :name="card.icon" />
            <strong>{{ card.title }}</strong>
            <span>{{ card.text }}</span>
          </article>
        </div>
      </div>
      <div data-bleed class="site__bleed">
        Bandeau <code>data-bleed</code> : d'un bord à l'autre de l'écran
      </div>
    </NsContainer>
  </div>

  <!-- Playground -->
  <div v-else-if="view === 'playground'" ref="stage" class="demo-container">
    <div class="demo-container__bar">
      <div class="demo-container__viewports" role="group" aria-label="Largeur d'écran">
        <button
          v-for="item in viewports"
          :key="item.width"
          type="button"
          :aria-pressed="viewport === item.width"
          @click="viewport = item.width"
        >
          <NsIcon :name="item.icon" size="sm" />
          {{ item.label }} <small>{{ item.width }}</small>
        </button>
      </div>
      <p v-if="measure" class="demo-container__measure">
        <span><i class="is-content" /> contenu {{ measure.content }} px</span>
        <span><i class="is-gutter" /> marges {{ measure.start }} · {{ measure.end }} px</span>
        <span v-if="measure.top"><i class="is-block" /> section {{ measure.top }} px</span>
      </p>
    </div>
    <div
      class="demo-container__viewport"
      :style="{ blockSize: `${pageHeight * scale}px`, inlineSize: `${viewport * scale}px` }"
    >
      <iframe
        ref="frame"
        :key="source"
        :src="source"
        title="Page d'exemple"
        :style="{
          inlineSize: `${viewport}px`,
          blockSize: `${pageHeight}px`,
          transform: `scale(${scale})`
        }"
        @load="read"
      />
    </div>
  </div>

  <!-- Variations -->
  <svg
    v-else
    class="demo-container-diagram"
    :viewBox="`0 0 ${screen} ${diagramHeight}`"
    role="img"
    :aria-label="`Contenu de ${diagram.label} sur un écran de ${screen} px`"
  >
    <defs>
      <pattern
        id="gutter-hatch"
        width="28"
        height="28"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <rect width="12" height="28" class="demo-container-diagram__hatch" />
      </pattern>
    </defs>
    <rect
      :width="screen"
      :height="diagramHeight"
      :class="`demo-container-diagram__band is-${diagram.background ?? 'none'}`"
    />
    <rect :width="diagram.start" :height="diagramHeight" fill="url(#gutter-hatch)" />
    <template v-if="diagram.block">
      <rect
        :x="diagram.start"
        :width="diagram.content"
        :height="diagram.block"
        fill="url(#gutter-hatch)"
      />
      <rect
        :x="diagram.start"
        :y="diagram.block + contentHeight"
        :width="diagram.content"
        :height="diagram.block"
        fill="url(#gutter-hatch)"
      />
    </template>
    <rect
      :x="diagram.start + diagram.content"
      :width="diagram.end"
      :height="diagramHeight"
      fill="url(#gutter-hatch)"
    />
    <g :transform="`translate(${diagram.start} ${diagram.block})`">
      <rect
        :width="diagram.content"
        :height="contentHeight"
        rx="18"
        class="demo-container-diagram__content"
      />
      <rect
        x="40"
        y="56"
        :width="Math.min(diagram.content - 80, 720)"
        height="44"
        rx="10"
        class="demo-container-diagram__line"
      />
      <rect
        x="40"
        y="124"
        :width="Math.min(diagram.content - 80, 1000)"
        height="22"
        rx="8"
        class="demo-container-diagram__line is-soft"
      />
      <rect
        x="40"
        y="162"
        :width="Math.min(diagram.content - 80, 820)"
        height="22"
        rx="8"
        class="demo-container-diagram__line is-soft"
      />
      <text
        :x="diagram.content / 2"
        :y="contentHeight - 70"
        text-anchor="middle"
        class="demo-container-diagram__label"
      >
        {{ diagram.label }}
      </text>
    </g>
  </svg>
</template>

<style>
/* Page in the frame */
.site {
  min-block-size: 100vh;
  background: var(--ns-color-background);
  color: var(--ns-color-text);
  font-family: var(--ns-font-sans);
}

.site__bar {
  border-block-end: 1px solid var(--ns-color-border-subtle);
}

.site__nav {
  display: flex;
  align-items: center;
  gap: var(--ns-space-6);
  block-size: 56px;
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-body-sm-size);
}

.site__nav strong {
  margin-inline-end: auto;
  color: var(--ns-color-primary);
  font-size: var(--ns-text-title-md-size);
}

/* The container under test: hatched gutters and section spacing, dashed content column */
.site__tested {
  background-image: repeating-linear-gradient(
    45deg,
    color-mix(in srgb, var(--ns-color-warning) 22%, transparent) 0 6px,
    transparent 6px 14px
  );
  background-clip: padding-box;
}

.site__column {
  display: grid;
  gap: var(--ns-space-4);
  padding: var(--ns-space-6);
  border-radius: var(--ns-radius-lg);
  background: var(--ns-color-background);
  outline: 2px dashed var(--ns-color-primary);
  outline-offset: -1px;
}

.site__column h1 {
  margin: 0;
  font-size: var(--ns-text-h2-size);
  line-height: var(--ns-text-h2-line-height);
}

.site__eyebrow {
  margin: 0;
  color: var(--ns-color-primary);
  font-size: var(--ns-text-overline-size);
  font-weight: var(--ns-font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.site__lead {
  margin: 0;
  max-inline-size: 60ch;
  color: var(--ns-color-text-muted);
}

.site__cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--ns-space-4);
}

.site__cards article {
  display: grid;
  gap: var(--ns-space-1);
  padding: var(--ns-space-4);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-lg);
  background: var(--ns-color-surface);
  font-size: var(--ns-text-body-sm-size);
}

.site__cards .ns-icon {
  color: var(--ns-color-primary);
}

.site__cards span {
  color: var(--ns-color-text-muted);
}

.site__bleed {
  margin-block-start: var(--ns-space-6);
  padding: var(--ns-space-4);
  background: var(--ns-color-surface-brand);
  color: var(--ns-color-text-on-brand);
  font-size: var(--ns-text-body-sm-size);
  text-align: center;
}

/* Playground */
.demo-container {
  display: grid;
  justify-items: center;
  gap: var(--ns-space-4);
  inline-size: 100%;
}

.demo-container__bar {
  display: grid;
  justify-items: center;
  gap: var(--ns-space-3);
}

.demo-container__viewports {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
  padding: 3px;
  border-radius: var(--ns-radius-lg);
  background: var(--ns-color-surface-muted);
}

.demo-container__viewports button {
  display: inline-flex;
  align-items: center;
  gap: var(--ns-space-1-5);
  padding: var(--ns-space-1-5) var(--ns-space-3);
  border: 0;
  border-radius: var(--ns-radius-md);
  background: transparent;
  color: var(--ns-color-text-muted);
  font: inherit;
  font-size: var(--ns-text-label-sm-size);
  font-weight: var(--ns-font-weight-medium);
  cursor: pointer;
}

.demo-container__viewports button small {
  color: var(--ns-color-text-subtle);
  font-family: var(--ns-font-mono);
  font-size: 10px;
}

.demo-container__viewports button[aria-pressed="true"] {
  background: var(--ns-color-surface);
  box-shadow: var(--ns-elevation-1);
  color: var(--ns-color-text);
}

.demo-container__viewports button:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
}

.demo-container__measure {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--ns-space-1) var(--ns-space-4);
  margin: 0;
  color: var(--ns-color-text-muted);
  font-family: var(--ns-font-mono);
  font-size: 11px;
}

.demo-container__measure span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.demo-container__measure i {
  inline-size: 10px;
  block-size: 10px;
  border-radius: 2px;
}

.demo-container__measure .is-content {
  outline: 2px dashed var(--ns-color-primary);
  outline-offset: -2px;
}

.demo-container__measure .is-gutter,
.demo-container__measure .is-block {
  background: repeating-linear-gradient(
    45deg,
    color-mix(in srgb, var(--ns-color-warning) 55%, transparent) 0 2px,
    transparent 2px 4px
  );
}

.demo-container__viewport {
  overflow: hidden;
  border: 1px solid var(--ns-color-border);
  border-radius: var(--ns-radius-lg);
  box-shadow: var(--ns-elevation-3);
  transition: inline-size var(--ns-duration-moderate) var(--ns-easing-emphasized);
}

.demo-container__viewport iframe {
  display: block;
  border: 0;
  transform-origin: 0 0;
}

/* Variations */
.demo-container-diagram {
  display: block;
  inline-size: 100%;
  border-radius: var(--ns-radius-md);
  box-shadow: 0 0 0 1px var(--ns-color-border-subtle);
}

.demo-container-diagram__band {
  fill: var(--ns-color-background);
}

.demo-container-diagram__band.is-surface {
  fill: var(--ns-color-surface);
}

.demo-container-diagram__band.is-surface-muted {
  fill: var(--ns-color-surface-muted);
}

.demo-container-diagram__band.is-surface-brand {
  fill: var(--ns-color-surface-brand);
}

.demo-container-diagram__band.is-surface-inverse {
  fill: var(--ns-color-surface-inverse);
}

.demo-container-diagram__hatch {
  fill: color-mix(in srgb, var(--ns-color-warning) 30%, transparent);
}

.demo-container-diagram__content {
  fill: var(--ns-color-primary-muted);
  stroke: var(--ns-color-primary);
  stroke-dasharray: 14 10;
  stroke-width: 4;
}

.demo-container-diagram__line {
  fill: var(--ns-color-primary);
  opacity: 0.55;
}

.demo-container-diagram__line.is-soft {
  opacity: 0.25;
}

.demo-container-diagram__label {
  fill: var(--ns-color-on-primary-muted);
  font-family: var(--ns-font-sans);
  font-size: 80px;
  font-weight: 700;
}
</style>
