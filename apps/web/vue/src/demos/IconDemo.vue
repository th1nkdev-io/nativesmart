<script setup lang="ts">
import { iconNames, NsIcon } from "@nativesmart/vue";
import { computed, onBeforeUnmount, ref, useAttrs } from "vue";
import { useVariation } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const variation = useVariation();
const names = iconNames();
const name = computed(() => String(attrs.name ?? "heart"));

/* Rotation and flip only read on icons that point; spinning on the refresh icon. */
const tileNames = computed(() => {
  if (variation?.group === "rotate" || variation?.group === "flip")
    return ["arrow-right", "chevron-right", "send"];
  if (variation?.group === "states" && variation.value === "spin")
    return ["refresh", "refresh", "refresh"];
  return [name.value, "bell", "wallet"];
});

/* A shape needs a container to show. */
const tileAttrs = computed(() =>
  variation?.group === "shape" ? { ...attrs, variant: "soft", tone: "primary" } : attrs
);

const pixels: Record<string, number> = {
  "2xs": 10,
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  "2xl": 40,
  "3xl": 48
};
const sizeLabel = computed(() => {
  const size = String(attrs.size ?? "md");
  return `${size} · ${pixels[size] ?? 20} px`;
});

/* The library: filtered by name, a click copies the tag. */
const query = ref("");
const shown = computed(() =>
  names.filter((item) => item.includes(query.value.trim().toLowerCase()))
);
const copied = ref<string>();
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy(item: string) {
  try {
    await navigator.clipboard.writeText(`<NsIcon name="${item}" />`);
  } catch {
    return;
  }
  copied.value = item;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = undefined), 1600);
}

onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <div v-if="variation" class="demo-icon-tile">
    <NsIcon v-for="(item, index) in tileNames" :key="index" v-bind="tileAttrs" :name="item" />
  </div>

  <div v-else class="demo-icon">
    <div class="demo-icon__stage">
      <figure class="demo-icon__hero">
        <NsIcon v-bind="attrs" :name="name" size="3xl" />
        <figcaption>{{ sizeLabel }}</figcaption>
      </figure>
      <ul class="demo-icon__context" aria-label="En contexte">
        <li>
          <span class="demo-icon__button"
            ><NsIcon v-bind="attrs" :name="name" size="sm" variant="plain" />Ajouter</span
          >
        </li>
        <li class="demo-icon__status">
          <NsIcon v-bind="attrs" :name="name" variant="soft" shape="circle" />
          <span><b>Aïcha Diallo</b><small>Favori depuis lundi</small></span>
        </li>
        <li class="demo-icon__inline">
          Appuyez sur <NsIcon v-bind="attrs" :name="name" size="xs" variant="plain" /> pour garder
          ce contact.
        </li>
      </ul>
    </div>

    <section class="demo-icon__library">
      <header>
        <strong>{{ shown.length }} icônes</strong>
        <label class="demo-icon__search">
          <NsIcon name="search" size="sm" />
          <input v-model="query" type="search" placeholder="Chercher une icône" />
        </label>
      </header>
      <ul class="demo-icon__grid" aria-label="Icônes intégrées">
        <li v-for="item in shown" :key="item">
          <button
            type="button"
            :class="{ 'is-current': item === name, 'is-copied': item === copied }"
            :title="`Copier <NsIcon name=&quot;${item}&quot; />`"
            @click="copy(item)"
          >
            <NsIcon :name="item === copied ? 'check' : item" />
            <small>{{ item === copied ? "Copié" : item }}</small>
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>

<style>
.demo-icon {
  display: grid;
  gap: var(--ns-space-5);
  inline-size: 100%;
  max-inline-size: 760px;
}

.demo-icon__stage {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--ns-space-6);
  align-items: center;
  padding: var(--ns-space-5);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface);
  color: var(--ns-color-text);
}

.demo-icon__hero {
  position: relative;
  display: grid;
  place-items: center;
  inline-size: 144px;
  block-size: 144px;
  margin: 0;
  border-radius: var(--ns-radius-xl);
  background:
    radial-gradient(circle, var(--ns-color-border-subtle) 1px, transparent 1.5px) 0 0 / 12px 12px,
    var(--ns-color-surface-sunken);
}

.demo-icon__hero figcaption {
  position: absolute;
  inset-block-end: var(--ns-space-2);
  inset-inline: 0;
  color: var(--ns-color-text-muted);
  font-family: var(--ns-font-mono);
  font-size: 10px;
  text-align: center;
}

.demo-icon__context {
  display: grid;
  gap: var(--ns-space-3);
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--ns-text-body-sm-size);
}

.demo-icon__button {
  display: inline-flex;
  align-items: center;
  gap: var(--ns-space-2);
  min-block-size: 36px;
  padding-inline: var(--ns-space-3) var(--ns-space-4);
  border-radius: var(--ns-radius-control);
  background: var(--ns-color-primary);
  color: var(--ns-color-on-primary);
  font-weight: var(--ns-font-weight-semibold);
}

.demo-icon__status {
  display: flex;
  align-items: center;
  gap: var(--ns-space-3);
}

.demo-icon__status span {
  display: grid;
}

.demo-icon__status small {
  color: var(--ns-color-text-muted);
}

.demo-icon__inline {
  color: var(--ns-color-text-muted);
}

.demo-icon__library {
  display: grid;
  gap: var(--ns-space-3);
}

.demo-icon__library header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--ns-space-3);
  color: var(--ns-color-text);
  font-size: var(--ns-text-body-sm-size);
}

.demo-icon__search {
  display: inline-flex;
  align-items: center;
  gap: var(--ns-space-2);
  min-block-size: 36px;
  padding-inline: var(--ns-space-3);
  border: 1px solid var(--ns-color-border);
  border-radius: var(--ns-radius-control);
  background: var(--ns-color-surface);
  color: var(--ns-color-text-muted);
}

.demo-icon__search:focus-within {
  border-color: var(--ns-color-primary);
  box-shadow: 0 0 0 3px var(--ns-color-primary-muted);
}

.demo-icon__search input {
  inline-size: 160px;
  border: 0;
  outline: 0;
  background: none;
  color: var(--ns-color-text);
  font: inherit;
}

.demo-icon__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  gap: var(--ns-space-1);
  margin: 0;
  padding: 0;
  list-style: none;
}

.demo-icon__grid button {
  display: grid;
  justify-items: center;
  gap: var(--ns-space-1-5);
  inline-size: 100%;
  padding: var(--ns-space-3) var(--ns-space-1);
  border: 1px solid transparent;
  border-radius: var(--ns-radius-md);
  background: none;
  color: var(--ns-color-text);
  font: inherit;
  cursor: pointer;
}

.demo-icon__grid button:hover {
  background: var(--ns-color-surface-hover);
}

.demo-icon__grid button:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
}

.demo-icon__grid button.is-current {
  border-color: var(--ns-color-primary-border);
  background: var(--ns-color-primary-muted);
  color: var(--ns-color-on-primary-muted);
}

.demo-icon__grid button.is-copied {
  color: var(--ns-color-success-text);
}

.demo-icon__grid small {
  overflow: hidden;
  max-inline-size: 100%;
  color: var(--ns-color-text-muted);
  font-family: var(--ns-font-mono);
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.demo-icon-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--ns-space-4);
  color: var(--ns-color-text);
}

@media (max-width: 560px) {
  .demo-icon__stage {
    grid-template-columns: minmax(0, 1fr);
    justify-items: start;
  }

  .demo-icon__library header {
    flex-wrap: wrap;
  }
}
</style>
