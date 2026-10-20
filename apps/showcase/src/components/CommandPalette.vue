<script setup lang="ts">
import { componentContracts } from "@nativesmart/contracts";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
import { categoryNames } from "../labels";
import { paletteOpen } from "../lib/palette";
import { navSections, tokenSections } from "../pages";
import { openPage, state } from "../state";
import { getTechnology } from "../technologies";

type Entry = {
  id: string;
  label: string;
  hint: string;
  group: "Pages" | "Composants";
  icon?: string;
  status?: "available" | "specified" | "planned";
  keywords: string;
};

const tokenIcon = navSections
  .flatMap((section) => section.items)
  .find((item) => item.id === "tokens")?.icon;

const pages: Entry[] = [
  ...navSections.flatMap((section) =>
    section.items.map((item) => ({
      id: item.id,
      label: item.label,
      hint: section.label,
      group: "Pages" as const,
      icon: item.icon,
      keywords: `${item.label} ${section.label}`
    }))
  ),
  ...tokenSections.map((section) => ({
    id: `tokens/${section.id}`,
    label: `Tokens · ${section.label}`,
    hint: "Fondations",
    group: "Pages" as const,
    icon: tokenIcon,
    keywords: `tokens ${section.label} ${section.id}`
  }))
];

const technology = computed(() => getTechnology(state.tech));
const components = computed<Entry[]>(() =>
  componentContracts.map((contract) => ({
    id: contract.id,
    label: contract.name,
    hint: categoryNames[contract.category] ?? contract.category,
    group: "Composants",
    status: technology.value.implemented.has(contract.id)
      ? "available"
      : contract.status === "draft"
        ? "planned"
        : "specified",
    keywords: `${contract.name} ${contract.id} ${categoryNames[contract.category] ?? ""} ${contract.description}`
  }))
);

const id = useId();
const query = ref("");
const active = ref(0);
const input = ref<HTMLInputElement>();
const list = ref<HTMLElement>();

const normalize = (text: string) => text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Name matches first, then matches anywhere; at most 40 results stay readable. */
const results = computed(() => {
  const search = normalize(query.value.trim());
  const all = [...pages, ...components.value];
  if (!search) {
    return [
      ...pages.slice(0, 6),
      ...components.value.filter((entry) => entry.status === "available")
    ];
  }
  const scored = all
    .map((entry) => {
      const label = normalize(entry.label);
      const score = label.startsWith(search)
        ? 0
        : label.includes(search)
          ? 1
          : normalize(entry.keywords).includes(search)
            ? 2
            : -1;
      return { entry, score };
    })
    .filter((item) => item.score >= 0)
    .sort((a, b) => a.score - b.score);
  return scored.slice(0, 40).map((item) => item.entry);
});

const groups = computed(() =>
  (["Pages", "Composants"] as const)
    .map((name) => ({ name, entries: results.value.filter((entry) => entry.group === name) }))
    .filter((group) => group.entries.length > 0)
);
/** Results in display order, so arrow keys follow what is on screen. */
const ordered = computed(() => groups.value.flatMap((group) => group.entries));

watch(query, () => (active.value = 0));
watch(paletteOpen, async (open) => {
  if (!open) return;
  query.value = "";
  active.value = 0;
  await nextTick();
  input.value?.focus();
});

function choose(entry: Entry | undefined) {
  if (!entry) return;
  paletteOpen.value = false;
  openPage(entry.id);
}

function move(step: number) {
  const count = ordered.value.length;
  if (count === 0) return;
  active.value = (active.value + step + count) % count;
  void nextTick(() =>
    list.value
      ?.querySelector<HTMLElement>(`[data-index="${active.value}"]`)
      ?.scrollIntoView({ block: "nearest" })
  );
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "ArrowDown") move(1);
  else if (event.key === "ArrowUp") move(-1);
  else if (event.key === "Enter") choose(ordered.value[active.value]);
  else if (event.key === "Escape") paletteOpen.value = false;
  else return;
  event.preventDefault();
}

function onGlobalKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLElement | null;
  const typing = target?.closest("input, textarea, [contenteditable]") !== null;
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    paletteOpen.value = !paletteOpen.value;
  } else if (event.key === "/" && !typing && !paletteOpen.value) {
    event.preventDefault();
    paletteOpen.value = true;
  }
}

onMounted(() => window.addEventListener("keydown", onGlobalKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onGlobalKeydown));

const statusLabels = { available: "Disponible", specified: "Contrat prêt", planned: "Prévu" };
</script>

<template>
  <Teleport to="body">
    <Transition name="palette">
      <div v-if="paletteOpen" class="palette-backdrop" @pointerdown.self="paletteOpen = false">
        <div class="palette" role="dialog" aria-modal="true" aria-label="Rechercher dans le Lab">
          <div class="palette__search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              ref="input"
              v-model="query"
              type="text"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded="true"
              :aria-controls="`${id}-list`"
              :aria-activedescendant="ordered.length ? `${id}-${active}` : undefined"
              placeholder="Rechercher un composant, une page…"
              spellcheck="false"
              autocomplete="off"
              @keydown="onKeydown"
            />
            <kbd>Échap</kbd>
          </div>

          <div :id="`${id}-list`" ref="list" class="palette__results" role="listbox">
            <template v-for="group in groups" :key="group.name">
              <p class="palette__group" role="presentation">
                {{
                  query.trim()
                    ? group.name
                    : group.name === "Pages"
                      ? "Pages"
                      : `Disponibles en ${technology.name}`
                }}
              </p>
              <div
                v-for="entry in group.entries"
                :id="`${id}-${ordered.indexOf(entry)}`"
                :key="`${entry.group}-${entry.id}`"
                :data-index="ordered.indexOf(entry)"
                role="option"
                :aria-selected="ordered.indexOf(entry) === active"
                class="palette__item"
                @pointermove="active = ordered.indexOf(entry)"
                @click="choose(entry)"
              >
                <span class="palette__icon" aria-hidden="true">
                  <svg v-if="entry.icon" viewBox="0 0 24 24"><path :d="entry.icon" /></svg>
                  <span v-else :class="['dot', `dot--${entry.status}`]" />
                </span>
                <span class="palette__label">{{ entry.label }}</span>
                <span class="palette__hint">
                  {{ entry.status ? `${entry.hint} · ${statusLabels[entry.status]}` : entry.hint }}
                </span>
                <svg class="palette__enter" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 10 4 15l5 5" />
                  <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                </svg>
              </div>
            </template>
            <p v-if="ordered.length === 0" class="palette__empty">
              Aucun résultat pour « {{ query }} ».
            </p>
          </div>

          <footer class="palette__footer">
            <span><kbd>↑</kbd><kbd>↓</kbd> naviguer</span>
            <span><kbd>↵</kbd> ouvrir</span>
            <span class="palette__count">{{ componentContracts.length }} composants</span>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
