<script setup lang="ts">
import { NsAvatar, NsButton, NsScrollArea, NsSpinner } from "@nativesmart/vue";
import type { NsScrollAreaExpose } from "@nativesmart/vue";
import { computed, nextTick, onMounted, ref, useAttrs, watch } from "vue";
import { useVariation, useView } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const view = useView();
const variation = useVariation();
const mini = computed(() => view.value !== "playground");
const orientation = computed(() => String(attrs.orientation ?? "vertical"));

/* Fictional people and amounts for the transaction rows. */
const people = [
  "Kofi Mensah",
  "Aïcha Diallo",
  "Moussa Traoré",
  "Awa Koné",
  "Yao Kouassi",
  "Fatou Ndiaye"
];
const labels = [
  "Transfert reçu",
  "Paiement marchand",
  "Facture électricité",
  "Recharge mobile",
  "Envoi"
];
function transaction(index: number) {
  const amount = (((index * 7919) % 90) + 5) * 500;
  return {
    id: index,
    name: people[index % people.length]!,
    label: labels[index % labels.length]!,
    amount: `${index % 3 === 0 ? "+" : "−"} ${amount.toLocaleString("fr-FR")} FCFA`,
    credit: index % 3 === 0
  };
}

type Mode = "list" | "virtual" | "infinite";
const mode = ref<Mode>("list");
const modes: { id: Mode; label: string }[] = [
  { id: "list", label: "Liste" },
  { id: "virtual", label: "Virtuelle · 10 000" },
  { id: "infinite", label: "Infinie" }
];

const list = Array.from({ length: 30 }, (_, index) => transaction(index));
const huge = Array.from({ length: 10000 }, (_, index) => transaction(index));
const loaded = ref(Array.from({ length: 20 }, (_, index) => transaction(index)));
const loading = ref(false);
function loadMore() {
  if (loading.value || loaded.value.length >= 200) return;
  loading.value = true;
  setTimeout(() => {
    const start = loaded.value.length;
    loaded.value = [
      ...loaded.value,
      ...Array.from({ length: 20 }, (_, index) => transaction(start + index))
    ];
    loading.value = false;
  }, 700);
}

/* The Lab already listens to end-reached through $attrs, and Vue calls one spelling of a
   listener only: chain ours onto the Lab's. */
const listAttrs = computed(() => {
  const logged = attrs["onEnd-reached"] as (() => void) | undefined;
  return {
    ...attrs,
    "onEnd-reached": () => {
      logged?.();
      if (mode.value === "infinite") loadMore();
    }
  };
});

const area = ref<NsScrollAreaExpose>();
const host = ref<HTMLElement>();
const rendered = ref(0);
function count() {
  void nextTick(() => {
    rendered.value = host.value?.querySelectorAll(".ns-scroll-area__row").length ?? 0;
  });
}
watch(mode, count, { flush: "post" });

const cards = Array.from({ length: 10 }, (_, index) => transaction(index));
const columns = [
  "Date",
  "Bénéficiaire",
  "Libellé",
  "Montant",
  "Statut",
  "Canal",
  "Référence",
  "Agence"
];

/* Variation tiles start halfway down, so edge fades and bars have something to show. */
const tileProps = computed(() =>
  variation?.group === "size" ? { ...attrs, scrollbars: "always" } : attrs
);
onMounted(async () => {
  if (!mini.value) return;
  await nextTick();
  const viewport = host.value?.querySelector<HTMLElement>(".ns-scroll-area__viewport");
  if (!viewport) return;
  viewport.scrollTop = 120;
  viewport.scrollLeft = (getComputedStyle(viewport).direction === "rtl" ? -1 : 1) * 120;
  viewport.dispatchEvent(new Event("scroll"));
});
</script>

<template>
  <!-- Variations: a short list, a row of chips or a small table, scrolled halfway -->
  <div v-if="mini" ref="host" class="demo-scroll-tile">
    <NsScrollArea v-bind="tileProps" max-height="150px" class="demo-scroll__frame">
      <div v-if="orientation === 'horizontal'" class="demo-scroll__chips">
        <span v-for="card in cards" :key="card.id">{{ card.name }}</span>
      </div>
      <table v-else-if="orientation === 'both'" class="demo-scroll__table">
        <tbody>
          <tr v-for="row in 12" :key="row">
            <td v-for="column in columns" :key="column">{{ column }} {{ row }}</td>
          </tr>
        </tbody>
      </table>
      <ul v-else class="demo-scroll__list is-compact">
        <li v-for="item in list.slice(0, 14)" :key="item.id">
          <span>{{ item.name }}</span>
          <strong :class="{ 'is-credit': item.credit }">{{
            item.amount.replace(" FCFA", "")
          }}</strong>
        </li>
      </ul>
    </NsScrollArea>
  </div>

  <!-- Playground -->
  <div v-else ref="host" class="demo-scroll">
    <div v-if="orientation === 'vertical'" class="demo-scroll__bar">
      <div class="demo-scroll__modes" role="group" aria-label="Contenu">
        <button
          v-for="item in modes"
          :key="item.id"
          type="button"
          :aria-pressed="mode === item.id"
          @click="mode = item.id"
        >
          {{ item.label }}
        </button>
      </div>
      <span v-if="mode === 'virtual'" class="demo-scroll__stat">
        {{ rendered }} lignes dans la page sur 10 000
      </span>
      <span v-else-if="mode === 'infinite'" class="demo-scroll__stat"
        >{{ loaded.length }} chargées</span
      >
      <NsButton
        v-if="mode === 'virtual'"
        label="Aller à la ligne 5 000"
        variant="ghost"
        size="sm"
        @press="area?.scrollToIndex(5000, 'center')"
      />
    </div>

    <div class="demo-scroll__card">
      <header class="demo-scroll__head">Dernières opérations</header>

      <NsScrollArea
        v-if="orientation === 'vertical' && mode === 'virtual'"
        ref="area"
        v-bind="$attrs"
        :items="huge"
        :item-height="56"
        class="demo-scroll__frame"
        @scroll="count"
      >
        <template #item="{ item, index }">
          <div class="demo-scroll__row" :aria-posinset="index + 1" aria-setsize="10000">
            <NsAvatar :label="item.name" size="sm" />
            <span class="demo-scroll__who"
              ><strong>{{ item.name }}</strong
              ><small>{{ item.label }} · n° {{ index + 1 }}</small></span
            >
            <b :class="{ 'is-credit': item.credit }">{{ item.amount }}</b>
          </div>
        </template>
      </NsScrollArea>

      <NsScrollArea
        v-else-if="orientation === 'horizontal'"
        v-bind="$attrs"
        class="demo-scroll__frame"
      >
        <div class="demo-scroll__cards">
          <article v-for="card in cards" :key="card.id">
            <NsAvatar :label="card.name" />
            <strong>{{ card.name }}</strong>
            <small>{{ card.label }}</small>
            <b :class="{ 'is-credit': card.credit }">{{ card.amount }}</b>
          </article>
        </div>
      </NsScrollArea>

      <NsScrollArea v-else-if="orientation === 'both'" v-bind="$attrs" class="demo-scroll__frame">
        <table class="demo-scroll__table">
          <thead>
            <tr>
              <th v-for="column in columns" :key="column">{{ column }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" :key="item.id">
              <td>24/10</td>
              <td>{{ item.name }}</td>
              <td>{{ item.label }}</td>
              <td :class="{ 'is-credit': item.credit }">{{ item.amount }}</td>
              <td>Effectué</td>
              <td>Mobile</td>
              <td>NS-{{ 4200 + item.id }}</td>
              <td>Abidjan</td>
            </tr>
          </tbody>
        </table>
      </NsScrollArea>

      <NsScrollArea v-else v-bind="listAttrs" class="demo-scroll__frame">
        <ul class="demo-scroll__list">
          <li v-for="item in mode === 'infinite' ? loaded : list" :key="item.id">
            <NsAvatar :label="item.name" size="sm" />
            <span class="demo-scroll__who"
              ><strong>{{ item.name }}</strong
              ><small>{{ item.label }}</small></span
            >
            <b :class="{ 'is-credit': item.credit }">{{ item.amount }}</b>
          </li>
          <li v-if="mode === 'infinite' && loading" class="demo-scroll__loading">
            <NsSpinner label="Chargement" /> Chargement…
          </li>
        </ul>
      </NsScrollArea>
    </div>
  </div>
</template>

<style>
.demo-scroll {
  display: grid;
  justify-items: center;
  gap: var(--ns-space-3);
  inline-size: 100%;
}

.demo-scroll__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--ns-space-2) var(--ns-space-3);
}

.demo-scroll__modes {
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: var(--ns-radius-lg);
  background: var(--ns-color-surface-muted);
}

.demo-scroll__modes button {
  padding: var(--ns-space-1-5) var(--ns-space-3);
  border: 0;
  border-radius: var(--ns-radius-md);
  background: transparent;
  color: var(--ns-color-text-muted);
  font: inherit;
  font-size: var(--ns-text-label-sm-size);
  cursor: pointer;
}

.demo-scroll__modes button[aria-pressed="true"] {
  background: var(--ns-color-surface);
  box-shadow: var(--ns-elevation-1);
  color: var(--ns-color-text);
}

.demo-scroll__modes button:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
}

.demo-scroll__stat {
  padding: 2px 8px;
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-primary-muted);
  color: var(--ns-color-on-primary-muted);
  font-family: var(--ns-font-mono);
  font-size: 11px;
}

.demo-scroll__card {
  display: grid;
  inline-size: 380px;
  max-inline-size: 100%;
  overflow: hidden;
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-xl);
  background: var(--ns-color-surface);
  box-shadow: var(--ns-elevation-2);
}

.demo-scroll__head {
  padding: var(--ns-space-3) var(--ns-space-4);
  border-block-end: 1px solid var(--ns-color-border-subtle);
  font-size: var(--ns-text-label-md-size);
  font-weight: var(--ns-font-weight-semibold);
}

.demo-scroll__card .demo-scroll__frame {
  block-size: 320px;
}

.demo-scroll__list {
  margin: 0;
  padding: var(--ns-space-1) 0;
  list-style: none;
}

.demo-scroll__list li,
.demo-scroll__row {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: var(--ns-space-3);
  block-size: 56px;
  padding-inline: var(--ns-space-4);
  font-size: var(--ns-text-body-sm-size);
}

.demo-scroll__who {
  display: grid;
  flex: 1;
  min-inline-size: 0;
  line-height: 1.25;
}

.demo-scroll__who > * {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.demo-scroll__list small,
.demo-scroll__row small {
  color: var(--ns-color-text-muted);
}

.demo-scroll__list b,
.demo-scroll__row b,
.demo-scroll__cards b,
.demo-scroll__table td.is-credit,
.demo-scroll__list strong.is-credit {
  font-weight: var(--ns-font-weight-semibold);
  white-space: nowrap;
}

.is-credit {
  color: var(--ns-color-success-text);
}

.demo-scroll__loading {
  justify-content: center;
  color: var(--ns-color-text-muted);
}

.demo-scroll__cards {
  display: flex;
  gap: var(--ns-space-3);
  padding: var(--ns-space-4);
}

.demo-scroll__cards article {
  display: grid;
  flex: none;
  justify-items: start;
  gap: 4px;
  inline-size: 160px;
  padding: var(--ns-space-4);
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-lg);
  background: var(--ns-color-background);
  font-size: var(--ns-text-body-sm-size);
}

.demo-scroll__cards small {
  color: var(--ns-color-text-muted);
}

.demo-scroll__card .ns-scroll-area--horizontal.demo-scroll__frame {
  block-size: auto;
}

.demo-scroll__table {
  border-collapse: collapse;
  font-size: var(--ns-text-body-sm-size);
  white-space: nowrap;
}

.demo-scroll__table th,
.demo-scroll__table td {
  padding: var(--ns-space-2) var(--ns-space-4);
  border-block-end: 1px solid var(--ns-color-border-subtle);
  text-align: start;
}

.demo-scroll__table th {
  position: sticky;
  inset-block-start: 0;
  background: var(--ns-color-surface-muted);
  color: var(--ns-color-text-muted);
  font-weight: var(--ns-font-weight-semibold);
}

/* Variation tiles */
.demo-scroll-tile {
  inline-size: 100%;
}

.demo-scroll-tile .demo-scroll__frame {
  border: 1px solid var(--ns-color-border-subtle);
  border-radius: var(--ns-radius-md);
  background: var(--ns-color-surface);
}

.demo-scroll__list.is-compact li {
  justify-content: space-between;
  gap: var(--ns-space-2);
  block-size: 30px;
  padding-inline: var(--ns-space-3);
  font-size: 11px;
}

.demo-scroll__list.is-compact span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.demo-scroll__chips {
  display: flex;
  gap: var(--ns-space-2);
  padding: var(--ns-space-3);
}

.demo-scroll__chips span {
  flex: none;
  padding: 4px 10px;
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-primary-muted);
  color: var(--ns-color-on-primary-muted);
  font-size: 11px;
  white-space: nowrap;
}

.demo-scroll-tile .demo-scroll__table {
  font-size: 10px;
}

.demo-scroll-tile .demo-scroll__table td {
  padding: 4px 8px;
}
</style>
