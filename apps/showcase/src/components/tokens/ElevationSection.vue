<script setup lang="ts">
import { brandThemes, primitives } from "@nativesmart/tokens";
import { computed, ref } from "vue";
import { state } from "../../state";
import TokenCode from "./TokenCode.vue";

const theme = computed(() => brandThemes[state.brand]);
const levels = Object.keys(primitives.elevation);
const levelUsage: Record<string, string> = {
  "0": "À plat : page, éléments intégrés",
  "1": "Cartes, champs",
  "2": "Survol, barres collantes",
  "3": "Menus, popovers",
  "4": "Toasts, feuilles, glisser",
  "5": "Modales et dialogues"
};

const usageNames: Record<keyof typeof primitives.elevationUsages, string> = {
  flat: "À plat",
  card: "Carte",
  raised: "Carte survolée",
  sticky: "Barre collante",
  dropdown: "Liste déroulante",
  popover: "Popover",
  toast: "Notification",
  drag: "Élément glissé",
  sheet: "Feuille",
  modal: "Modale"
};

/* Interactive lift */
const lift = ref(1);

/* Glows */
const glowIntents = ["primary", "success", "danger"] as const;
const glowList = Object.keys(primitives.glows).map((key, index) => {
  const intent = glowIntents[index];
  return { key, intent, name: intent === "primary" ? key : `${intent}-${key}` };
});

/* Materials */
const materialNames: Record<keyof typeof primitives.materials, string> = {
  thin: "Fine",
  regular: "Normale",
  thick: "Épaisse"
};
const materialUsage: Record<keyof typeof primitives.materials, string> = {
  thin: "Barres d'outils, onglets",
  regular: "Menus, notifications",
  thick: "Feuilles, panneaux latéraux"
};

/* Tonal surfaces: shown in dark mode whatever the Lab mode, since that is where they matter. */
const darkTheme = computed(() => theme.value.colors.dark);
const darkLevels = computed(() =>
  Object.entries(primitives.darkSurfaceLift).map(([level, amount]) => ({ level, amount }))
);
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Niveaux</h2>
        <p>
          Six niveaux d'ombres en plusieurs couches. Leur teinte vient de l'identité, et elles sont
          trois fois plus marquées en mode sombre, où les ombres se voient moins.
        </p>
      </header>
      <div class="lift-stage lab-preview">
        <div class="lift-stage__card" :style="{ boxShadow: `var(--ns-elevation-${lift})` }">
          <span class="lift-stage__level">{{ lift }}</span>
          <span>{{ levelUsage[lift] }}</span>
          <code>--ns-elevation-{{ lift }}</code>
        </div>
        <label class="lift-stage__control">
          <small>Niveau d'élévation</small>
          <input v-model.number="lift" type="range" min="0" max="5" step="1" />
          <span class="lift-stage__ticks" aria-hidden="true">
            <i v-for="level in levels" :key="level">{{ level }}</i>
          </span>
        </label>
      </div>
      <div class="elevation-grid">
        <article
          v-for="level in levels"
          :key="level"
          class="elevation lab-preview"
          :style="{ boxShadow: `var(--ns-elevation-${level})` }"
        >
          <strong>{{ level }}</strong>
          <span class="muted">{{ levelUsage[level] }}</span>
          <TokenCode :value="`--ns-elevation-${level}`" />
        </article>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Élévation par usage</h2>
        <p>
          Les composants demandent un usage, pas un niveau : un menu prend
          <code>--ns-elevation-dropdown</code>, et toute la hiérarchie se règle à un seul endroit.
        </p>
      </header>
      <div class="elevation-usages lab-preview">
        <article
          v-for="(level, usage) in primitives.elevationUsages"
          :key="usage"
          class="elevation-usage"
          :style="{ boxShadow: `var(--ns-elevation-${usage})` }"
        >
          <strong>{{ usageNames[usage] }}</strong>
          <small>niveau {{ level }}</small>
          <TokenCode :value="`--ns-elevation-${usage}`" />
        </article>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Ombres internes et halos</h2>
        <p>
          Les ombres internes creusent : puits, champs, bouton pressé. Les halos entourent un
          élément dans la couleur de son intention : <code>--ns-glow-md</code> pour le primaire,
          <code>--ns-glow-danger-md</code> pour le danger, et ainsi pour les sept intentions.
        </p>
      </header>
      <div class="effect-grid lab-preview">
        <figure v-for="(value, key) in primitives.insetShadows" :key="key" class="effect">
          <span class="effect__inset" :style="{ boxShadow: `var(--ns-shadow-inset-${key})` }" />
          <figcaption>
            <strong>inset-{{ key }}</strong>
            <TokenCode :value="`--ns-shadow-inset-${key}`" />
          </figcaption>
        </figure>
        <figure v-for="glow in glowList" :key="glow.key" class="effect">
          <span
            class="effect__glow"
            :style="{
              boxShadow: `var(--ns-glow-${glow.name})`,
              background: `var(--ns-color-${glow.intent})`,
              color: `var(--ns-color-on-${glow.intent})`
            }"
          >
            {{ glow.intent }}
          </span>
          <figcaption>
            <strong>glow-{{ glow.name }}</strong>
            <TokenCode :value="`--ns-glow-${glow.name}`" />
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Surfaces en mode sombre</h2>
        <p>
          Dans le noir, une ombre ne suffit pas : chaque niveau éclaircit aussi la surface, comme
          dans Material Design 3. Aperçu en sombre, quel que soit le mode du Lab.
        </p>
      </header>
      <div class="tonal-stage" :style="{ background: darkTheme.background }">
        <div
          v-for="item in darkLevels"
          :key="item.level"
          class="tonal-stage__card lab-preview"
          :style="{
            background: `color-mix(in srgb, ${darkTheme.surface}, #ffffff ${item.amount * 100}%)`,
            color: darkTheme.text,
            borderColor: darkTheme.border
          }"
        >
          <strong>{{ item.level }}</strong>
          <small :style="{ color: darkTheme.textMuted }"
            >+{{ Math.round(item.amount * 100) }} %</small
          >
        </div>
      </div>
      <div class="token-inline">
        <TokenCode value="--ns-surface-level-0" />
        <span class="muted">à</span>
        <TokenCode value="--ns-surface-level-5" />
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Matières</h2>
        <p>
          Trois matières translucides, comme sur iOS et Windows : le contenu passe derrière, flouté
          et légèrement saturé. Si l'utilisateur réduit la transparence, elles deviennent opaques.
        </p>
      </header>
      <div class="material-stage lab-preview">
        <div class="material-stage__backdrop" aria-hidden="true">
          <div v-for="row in 6" :key="row" class="material-stage__track">
            <i v-for="tile in 14" :key="tile" :class="`is-${(tile + row * 3) % 7}`" />
          </div>
        </div>
        <div
          v-for="(material, name) in primitives.materials"
          :key="name"
          class="material-panel"
          :style="{
            background: `var(--ns-material-${name})`,
            backdropFilter: `var(--ns-material-${name}-filter)`
          }"
        >
          <span class="material-panel__head">
            <strong>{{ materialNames[name] }}</strong>
            <small>{{ materialUsage[name] }}</small>
          </span>
          <dl class="material-panel__specs">
            <div>
              <dt>Opacité</dt>
              <dd>{{ Math.round(material.opacity * 100) }} %</dd>
            </div>
            <div>
              <dt>Flou</dt>
              <dd>{{ material.blur }} px</dd>
            </div>
            <div>
              <dt>Saturation</dt>
              <dd>×{{ material.saturate }}</dd>
            </div>
          </dl>
          <code>--ns-material-{{ name }}</code>
        </div>
      </div>
      <div class="blur-row lab-preview">
        <figure v-for="(value, key) in primitives.blur" :key="key">
          <span class="blur-row__sample">
            <i :style="{ filter: `blur(var(--ns-blur-${key}))` }" />
          </span>
          <figcaption>
            <span
              ><strong>{{ key }}</strong> · {{ value }} px</span
            >
            <TokenCode :value="`--ns-blur-${key}`" />
          </figcaption>
        </figure>
      </div>
    </section>
  </div>
</template>
