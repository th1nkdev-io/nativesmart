<script setup lang="ts">
import type { ComponentContract } from "@nativesmart/contracts";
import {
  defaultProps,
  type RenderRequest,
  type ShowcasePropValue
} from "@nativesmart/showcase-runtime";
import { computed, ref } from "vue";
import { categoryNames } from "../labels";
import { state, type ComponentTab } from "../state";
import { getTechnology, technologies } from "../technologies";
import CodePanel from "./CodePanel.vue";
import ComingSoon from "./ComingSoon.vue";
import ContractPanel from "./ContractPanel.vue";
import OnThisPage from "./OnThisPage.vue";
import PropControls from "./PropControls.vue";
import RendererFrame from "./RendererFrame.vue";

const props = defineProps<{ contract: ComponentContract }>();

const values = ref<Record<string, ShowcasePropValue>>({ ...defaultProps(props.contract) });
const events = ref<{ id: number; name: string; time: string }[]>([]);
const technology = computed(() => getTechnology(state.tech));
const implemented = computed(
  () => technology.value.url !== null && technology.value.implemented.has(props.contract.id)
);
const tab = computed<ComponentTab>(() => state.tab);
const availability = computed(() =>
  technologies.map((item) => ({
    id: item.id,
    name: item.name,
    available: item.implemented.has(props.contract.id),
    inLab: item.url !== null
  }))
);

const statusLabels: Record<string, string> = {
  draft: "Prévu",
  preview: "Contrat prêt",
  stable: "Stable",
  deprecated: "Déprécié"
};

const tabs: { id: ComponentTab; label: string }[] = [
  { id: "playground", label: "Playground" },
  { id: "variations", label: "Variations" },
  { id: "contract", label: "Contrat" }
];

const request = computed<RenderRequest>(() => ({
  component: props.contract.id,
  view: tab.value === "variations" ? "variations" : "playground",
  props: values.value,
  brand: state.brand,
  mode: state.mode,
  dir: state.dir,
  density: state.density
}));

let nextId = 0;
function logEvent(name: string) {
  const time = new Date().toLocaleTimeString("fr-FR");
  events.value = [{ id: nextId++, name, time }, ...events.value].slice(0, 8);
}

function reset() {
  values.value = { ...defaultProps(props.contract) };
}
</script>

<template>
  <article class="page">
    <header class="page__header">
      <p class="eyebrow">
        {{ contract.layer === "business" ? "Composant métier" : "Composant de base" }} ·
        {{ categoryNames[contract.category] ?? contract.category }}
      </p>
      <h1 class="ns-text-h1">{{ contract.name }}</h1>
      <p class="lead">{{ contract.description }}</p>
      <p class="chips">
        <span class="tag">{{ contract.priority }}</span>
        <span :class="['tag', `tag--${contract.status}`]">{{ statusLabels[contract.status] }}</span>
        <span :class="['tag', implemented ? 'tag--implemented' : 'tag--missing']">
          {{
            implemented ? `Disponible en ${technology.name}` : `Pas encore en ${technology.name}`
          }}
        </span>
      </p>
    </header>

    <div class="tabs scroll-hidden" role="tablist">
      <button
        v-for="item in tabs"
        :key="item.id"
        type="button"
        role="tab"
        :aria-selected="tab === item.id"
        @click="state.tab = item.id"
      >
        {{ item.label }}
      </button>
    </div>

    <ContractPanel v-if="tab === 'contract'" :contract="contract" />
    <template v-else>
      <ComingSoon v-if="!implemented" :contract="contract" :technology="technology" />
      <RendererFrame
        v-else-if="technology.url"
        :url="technology.url"
        :request="request"
        @event="logEvent"
      />
      <CodePanel v-if="tab === 'playground'" :contract="contract" :values="values" />
    </template>

    <Teleport defer to="#lab-aside">
      <div class="aside-stack">
        <PropControls
          v-if="tab === 'playground' && implemented"
          v-model="values"
          :contract="contract"
          @reset="reset"
        />

        <section v-if="tab === 'playground' && implemented" class="aside-card">
          <header class="aside-card__head">
            <h2 class="aside__title">Événements</h2>
            <span class="aside-card__count">{{ events.length }}</span>
          </header>
          <div class="aside-card__body">
            <p v-if="events.length === 0" class="muted">
              {{
                contract.events.length
                  ? `Interagissez avec l'aperçu : ${contract.events.join(", ")}.`
                  : "Ce composant n'émet pas d'événement."
              }}
            </p>
            <ol v-else class="event-log">
              <li v-for="event in events" :key="event.id">
                <code>{{ event.name }}</code>
                <span class="muted">{{ event.time }}</span>
              </li>
            </ol>
          </div>
        </section>

        <OnThisPage v-if="tab === 'contract'" :key="`${contract.id}-contract`" />

        <section class="aside-card">
          <header class="aside-card__head">
            <h2 class="aside__title">Disponibilité</h2>
            <span class="aside-card__count">
              {{ availability.filter((item) => item.available).length }}/{{ availability.length }}
            </span>
          </header>
          <ul class="availability aside-card__body">
            <li v-for="item in availability" :key="item.id">
              <span :class="['dot', item.available ? 'dot--available' : 'dot--planned']" />
              <span>{{ item.name }}</span>
              <small class="muted">
                {{ item.available ? (item.inLab ? "Dans le Lab" : "Codé") : "—" }}
              </small>
            </li>
          </ul>
        </section>
      </div>
    </Teleport>
  </article>
</template>
