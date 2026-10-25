<script setup lang="ts">
import {
  describeContract,
  type ComponentContract,
  type ComponentProperty
} from "@nativesmart/contracts";
import { computed, ref } from "vue";
import Icon from "../editorial/Icon.vue";
import type { IconName } from "../editorial/icons";
import { state } from "../state";
import { technologies } from "../technologies";
import { anatomyFigures } from "./anatomy";

const props = defineProps<{ contract: ComponentContract }>();

const described = computed(() => describeContract(props.contract));
const figure = computed(() => anatomyFigures[props.contract.id]);
const activePart = ref<string>();
const partNumber = (part: string) => props.contract.anatomy.indexOf(part) + 1;
const settings = computed(() =>
  props.contract.properties.filter((property) => property.kind !== "slot")
);
const slots = computed(() =>
  props.contract.properties.filter((property) => property.kind === "slot")
);

const summary = computed(() => [
  {
    id: "api-anatomy",
    icon: "layers" as IconName,
    count: props.contract.anatomy.length,
    label: "parties"
  },
  {
    id: "api-props",
    icon: "sliders" as IconName,
    count: settings.value.length,
    label: "propriétés"
  },
  {
    id: "api-states",
    icon: "focus" as IconName,
    count: props.contract.states.length,
    label: "états"
  },
  {
    id: "api-events",
    icon: "zap" as IconName,
    count: props.contract.events.length,
    label: "événements"
  },
  {
    id: "api-tokens",
    icon: "palette" as IconName,
    count: props.contract.semanticTokens.length,
    label: "tokens"
  }
]);

const kindLabels: Record<ComponentProperty["kind"], string> = {
  enum: "liste",
  boolean: "booléen",
  string: "texte",
  number: "nombre",
  slot: "contenu",
  "string-list": "liste de textes"
};

/** Every value a property accepts, the default first-class. */
function values(property: ComponentProperty) {
  if (property.kind === "boolean") return ["true", "false"];
  return property.values ? [...property.values] : [];
}

function isDefault(property: ComponentProperty, value: string) {
  return property.defaultValue !== undefined && String(property.defaultValue) === value;
}

/** A tone per state, so related states read together. */
function stateTone(name: string) {
  if (
    ["hovered", "focused", "pressed", "selected", "checked", "on", "open", "active"].includes(name)
  )
    return "primary";
  if (["invalid", "error"].includes(name)) return "danger";
  if (
    ["loading", "opening", "closing", "entering", "exiting", "uploading", "submitting"].includes(
      name
    )
  )
    return "info";
  if (["loaded", "success", "visible"].includes(name)) return "success";
  if (["disabled", "readonly", "closed", "off"].includes(name)) return "muted";
  return "neutral";
}

const pascal = (name: string) =>
  name.replace(/(^|-)([a-z])/g, (_, __: string, letter: string) => letter.toUpperCase());

/** How the active technology listens to an event. */
function listener(event: string) {
  const handler = `on${pascal(event)}`;
  switch (state.tech) {
    case "vue":
      return `@${event}="…"`;
    case "angular":
      return `(${handler.slice(2, 3).toLowerCase()}${handler.slice(3)})="…"`;
    case "svelte":
      return `${handler.toLowerCase()}={…}`;
    case "flutter":
      return `${handler}: (…) {}`;
    case "compose":
      return `${handler} = { … }`;
    case "swiftui":
      return `.${handler} { … }`;
    case "maui":
      return `${pascal(event)}="…"`;
    case "html-css":
    case "ionic-capacitor":
    case "desktop-web":
      return `addEventListener("ns-${event}", …)`;
    default:
      return `${handler}={…}`;
  }
}

/** A subcomponent as the active technology names it: NsGridItem in Vue, GridItem elsewhere. */
function subName(name: string) {
  return ["vue", "svelte", "angular", "html-css"].includes(state.tech) ? `Ns${name}` : name;
}

/** How the active technology fills a slot. */
function slotSyntax(name: string) {
  const isDefault = name === "children";
  switch (state.tech) {
    case "vue":
      return isDefault ? "contenu entre les balises" : `<template #${name}>`;
    case "svelte":
      return isDefault ? "contenu entre les balises" : `{#snippet ${name}()}`;
    case "angular":
      return isDefault ? "contenu projeté" : `<ng-template #${name}>`;
    case "flutter":
      return isDefault ? "child:" : `${name}:`;
    case "compose":
      return isDefault ? "content = { … }" : `${name} = { … }`;
    case "swiftui":
      return isDefault ? "content: { … }" : `${name}: { … }`;
    case "maui":
      return isDefault ? "Content" : pascal(name);
    case "html-css":
    case "ionic-capacitor":
    case "desktop-web":
      return isDefault ? "contenu de l'élément" : `slot="${name}"`;
    default:
      return isDefault ? "children" : `${name}={…}`;
  }
}

const techName = computed(
  () => technologies.find((technology) => technology.id === state.tech)?.name ?? state.tech
);
</script>

<template>
  <div class="api">
    <p v-if="contract.status === 'draft'" class="notice">
      Contrat réservé (<code>draft</code>) : nom, catégorie et priorité sont fixés, les propriétés
      restent à spécifier.
    </p>

    <nav class="api-summary" aria-label="Sommaire de l'API">
      <a v-for="item in summary" :key="item.id" :href="`#${item.id}`" class="api-summary__item">
        <Icon :name="item.icon" :size="18" />
        <strong>{{ item.count }}</strong>
        <span>{{ item.label }}</span>
      </a>
    </nav>

    <!-- Anatomy -->
    <section id="api-anatomy" class="api-section">
      <header class="api-section__head">
        <h3 data-toc>Anatomie</h3>
        <p>Les parties du composant, nommées de la même façon dans toutes les technologies.</p>
      </header>
      <div v-if="figure" class="api-anatomy">
        <component
          :is="figure"
          :number="partNumber"
          :active="activePart"
          @hover="activePart = $event"
        />
        <ol class="api-legend" @mouseleave="activePart = undefined">
          <li
            v-for="(part, index) in described.anatomy"
            :key="part.name"
            :class="{ 'is-active': activePart === part.name }"
            @mouseenter="activePart = part.name"
          >
            <b class="anatomy-pin">{{ index + 1 }}</b>
            <span>
              <code>{{ part.name }}</code>
              <small>{{ part.description }}</small>
            </span>
          </li>
        </ol>
      </div>
      <div v-else class="api-tree">
        <div class="api-tree__node api-tree__node--root">
          <b class="anatomy-pin">1</b>
          <span>
            <code>{{ described.anatomy[0]?.name }}</code>
            <small>{{ described.anatomy[0]?.description }}</small>
          </span>
        </div>
        <ol v-if="described.anatomy.length > 1" class="api-tree__children">
          <li
            v-for="(part, index) in described.anatomy.slice(1)"
            :key="part.name"
            class="api-tree__node"
          >
            <b class="anatomy-pin">{{ index + 2 }}</b>
            <span>
              <code>{{ part.name }}</code>
              <small>{{ part.description }}</small>
            </span>
          </li>
        </ol>
      </div>
    </section>

    <!-- Properties -->
    <section id="api-props" class="api-section">
      <header class="api-section__head">
        <h3 data-toc>Propriétés</h3>
        <p>Mêmes noms dans chaque technologie ; la valeur par défaut est marquée.</p>
      </header>
      <p v-if="settings.length === 0" class="muted">Aucune propriété spécifiée.</p>
      <div v-else class="api-table" role="table" aria-label="Propriétés">
        <div class="api-table__row api-table__row--head" role="row">
          <span role="columnheader">Propriété</span>
          <span role="columnheader">Valeurs</span>
          <span role="columnheader">Description</span>
        </div>
        <div v-for="property in settings" :key="property.name" class="api-table__row" role="row">
          <span class="api-prop" role="cell">
            <code>{{ property.name }}</code>
            <span :class="['api-kind', `api-kind--${property.kind}`]">{{
              kindLabels[property.kind]
            }}</span>
            <span v-if="property.required" class="api-required">requis</span>
          </span>
          <span class="api-values" role="cell">
            <template v-if="values(property).length">
              <code
                v-for="value in values(property)"
                :key="value"
                :class="['api-value', { 'api-value--default': isDefault(property, value) }]"
                :title="isDefault(property, value) ? 'Valeur par défaut' : undefined"
                ><Icon v-if="isDefault(property, value)" name="check" :size="12" />{{ value }}</code
              >
            </template>
            <code
              v-else-if="property.defaultValue !== undefined"
              class="api-value api-value--default"
              ><Icon name="check" :size="12" />{{ property.defaultValue }}</code
            >
            <span v-else-if="property.example !== undefined" class="api-example"
              >ex. <code>{{ property.example }}</code></span
            >
            <span v-else class="muted">libre</span>
          </span>
          <span class="api-description" role="cell">{{ property.description }}</span>
        </div>
      </div>

      <template v-if="slots.length">
        <h4 class="api-subhead">Emplacements</h4>
        <div class="api-list">
          <div v-for="slot in slots" :key="slot.name" class="api-list__row">
            <span class="api-list__key">
              <code>{{ slot.name === "children" ? "default" : slot.name }}</code>
              <small>{{ slotSyntax(slot.name) }}</small>
            </span>
            <span class="api-list__text">{{ slot.description }}</span>
          </div>
        </div>
      </template>
    </section>

    <!-- Subcomponents -->
    <section v-if="contract.subcomponents?.length" id="api-subcomponents" class="api-section">
      <header class="api-section__head">
        <h3 data-toc>Sous-composants</h3>
        <p>Les composants qui s'utilisent à l'intérieur de {{ contract.name }}.</p>
      </header>
      <div v-for="sub in contract.subcomponents" :key="sub.name" class="api-sub">
        <h4 class="api-sub__title">
          <code>{{ subName(sub.name) }}</code>
          <span>{{ sub.description }}</span>
        </h4>
        <div class="api-table" role="table" :aria-label="sub.name">
          <div class="api-table__row api-table__row--head" role="row">
            <span role="columnheader">Propriété</span>
            <span role="columnheader">Valeurs</span>
            <span role="columnheader">Description</span>
          </div>
          <div
            v-for="property in sub.properties"
            :key="property.name"
            class="api-table__row"
            role="row"
          >
            <span class="api-prop" role="cell">
              <code>{{ property.name }}</code>
              <span :class="['api-kind', `api-kind--${property.kind}`]">{{
                kindLabels[property.kind]
              }}</span>
            </span>
            <span class="api-values" role="cell">
              <template v-if="values(property).length">
                <code
                  v-for="value in values(property)"
                  :key="value"
                  :class="['api-value', { 'api-value--default': isDefault(property, value) }]"
                  ><Icon v-if="isDefault(property, value)" name="check" :size="12" />{{
                    value
                  }}</code
                >
              </template>
              <code
                v-else-if="property.defaultValue !== undefined"
                class="api-value api-value--default"
                ><Icon name="check" :size="12" />{{ property.defaultValue }}</code
              >
              <span v-else class="muted">libre</span>
            </span>
            <span class="api-description" role="cell">{{ property.description }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- States -->
    <section id="api-states" class="api-section">
      <header class="api-section__head">
        <h3 data-toc>États</h3>
        <p>Ce que le composant peut afficher, et ce que chaque état signifie.</p>
      </header>
      <div class="api-list">
        <div
          v-for="item in described.states"
          :key="item.name"
          :class="['api-list__row', `api-tone--${stateTone(item.name)}`]"
        >
          <span class="api-list__key"
            ><span class="api-list__name"
              ><i class="api-dot" aria-hidden="true" /><code>{{ item.name }}</code></span
            ></span
          >
          <span class="api-list__text">{{ item.description || "—" }}</span>
        </div>
      </div>
    </section>

    <!-- Events -->
    <section id="api-events" class="api-section">
      <header class="api-section__head">
        <h3 data-toc>Événements</h3>
        <p>
          Quand chaque événement se déclenche, ce qu'il transmet, et comment l'écouter en
          {{ techName }}.
        </p>
      </header>
      <div v-if="described.events.length === 0" class="api-empty">
        <span class="api-empty__icon"><Icon name="zap" :size="18" /></span>
        <span>
          <strong>Aucun événement</strong>
          <small
            >{{ contract.name }} ne réagit à aucune interaction : il n'y a rien à écouter. Ses
            enfants gardent leurs propres événements.</small
          >
        </span>
      </div>
      <div v-else class="api-list api-list--events">
        <div class="api-list__row api-list__row--head" aria-hidden="true">
          <span>Événement</span><span>Se déclenche quand</span><span>Données</span>
        </div>
        <div v-for="event in described.events" :key="event.name" class="api-list__row">
          <span class="api-list__key">
            <code>{{ event.name }}</code>
            <small class="api-listen">{{ listener(event.name) }}</small>
          </span>
          <span class="api-list__text">{{ event.description || "—" }}</span>
          <span class="api-list__text">
            <template v-if="event.payload">{{ event.payload }}</template>
            <em v-else>aucune</em>
          </span>
        </div>
      </div>
    </section>

    <!-- Accessibility -->
    <section class="api-section">
      <header class="api-section__head">
        <h3 data-toc>Accessibilité</h3>
        <p>Ce que chaque technologie doit garantir pour les lecteurs d'écran et le clavier.</p>
      </header>
      <div class="api-facts">
        <div class="api-fact">
          <Icon name="eye" :size="18" />
          <span>
            <small>Rôle exposé</small>
            <strong v-if="contract.accessibility.role"
              ><code>{{ contract.accessibility.role }}</code></strong
            >
            <strong v-else>Celui de l'élément rendu</strong>
          </span>
        </div>
        <div class="api-fact">
          <Icon name="keyboard" :size="18" />
          <span>
            <small>Clavier</small>
            <strong>{{
              described.keyboard.length
                ? `${described.keyboard.length} touche${described.keyboard.length > 1 ? "s" : ""}`
                : "Aucune touche propre"
            }}</strong>
          </span>
        </div>
        <div class="api-fact">
          <Icon name="shield" :size="18" />
          <span>
            <small>Exigences</small>
            <strong>{{ contract.accessibility.requirements.length }} à garantir</strong>
          </span>
        </div>
      </div>
      <div v-if="described.keyboard.length" class="api-list">
        <div v-for="key in described.keyboard" :key="key.name" class="api-list__row">
          <span class="api-list__key"
            ><kbd>{{ key.name }}</kbd></span
          >
          <span class="api-list__text">{{ key.description }}</span>
        </div>
      </div>
      <ul class="api-list api-checklist">
        <li v-for="item in contract.accessibility.requirements" :key="item" class="api-list__row">
          <span class="api-check" aria-hidden="true"><Icon name="check" :size="12" /></span>
          <span class="api-list__text api-list__text--strong">{{ item }}</span>
        </li>
      </ul>
    </section>

    <!-- Tokens -->
    <section id="api-tokens" class="api-section">
      <header class="api-section__head">
        <h3 data-toc>Tokens du composant</h3>
        <p>Les décisions de design que le composant lit, à surcharger par thème.</p>
      </header>
      <p v-if="described.tokens.length === 0" class="muted">Aucun.</p>
      <div v-else class="api-list">
        <div v-for="token in described.tokens" :key="token.name" class="api-list__row">
          <span class="api-list__key"
            ><code>{{ token.name }}</code></span
          >
          <span class="api-list__text">{{ token.description || "—" }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
