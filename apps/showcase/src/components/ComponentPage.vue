<script setup lang="ts">
import type { ComponentContract } from "@nativesmart/contracts";
import {
  defaultProps,
  type RenderRequest,
  type ShowcasePropValue
} from "@nativesmart/showcase-runtime";
import { computed, ref } from "vue";
import { state, type ComponentTab } from "../state";
import { getTechnology } from "../technologies";
import ContractPanel from "./ContractPanel.vue";
import PropControls from "./PropControls.vue";
import RendererFrame from "./RendererFrame.vue";

const props = defineProps<{ contract: ComponentContract }>();

const values = ref<Record<string, ShowcasePropValue>>({ ...defaultProps(props.contract) });
const events = ref<{ id: number; name: string; time: string }[]>([]);
const technology = computed(() => getTechnology(state.tech));
const implemented = computed(
  () => technology.value.url !== null && technology.value.implemented.has(props.contract.id)
);
const tab = computed<ComponentTab>(() => (implemented.value ? state.tab : "contract"));

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
  dir: state.dir
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
        {{ contract.category }}
      </p>
      <h1>{{ contract.name }}</h1>
      <p class="lead">{{ contract.description }}</p>
      <p class="chips">
        <span class="tag">{{ contract.priority }}</span>
        <span :class="['tag', `tag--${contract.status}`]">contrat {{ contract.status }}</span>
        <span :class="['tag', implemented ? 'tag--implemented' : 'tag--missing']">
          {{
            implemented ? `implémenté en ${technology.name}` : `pas encore en ${technology.name}`
          }}
        </span>
      </p>
    </header>

    <div class="tabs" role="tablist">
      <button
        v-for="item in tabs"
        :key="item.id"
        type="button"
        role="tab"
        :aria-selected="tab === item.id"
        :disabled="!implemented && item.id !== 'contract'"
        @click="state.tab = item.id"
      >
        {{ item.label }}
      </button>
    </div>

    <ContractPanel v-if="tab === 'contract'" :contract="contract" />

    <div v-else-if="technology.url" :class="['workbench', `workbench--${tab}`]">
      <div class="workbench__stage">
        <RendererFrame :url="technology.url" :request="request" @event="logEvent" />
        <div v-if="tab === 'playground'" class="events">
          <h3>Événements</h3>
          <p v-if="events.length === 0" class="muted">
            Interagissez avec le composant : {{ contract.events.join(", ") || "aucun événement" }}.
          </p>
          <ol v-else>
            <li v-for="event in events" :key="event.id">
              <code>{{ event.name }}</code> <span class="muted">{{ event.time }}</span>
            </li>
          </ol>
        </div>
      </div>
      <PropControls
        v-if="tab === 'playground'"
        v-model="values"
        :contract="contract"
        class="workbench__controls"
        @reset="reset"
      />
    </div>
  </article>
</template>
