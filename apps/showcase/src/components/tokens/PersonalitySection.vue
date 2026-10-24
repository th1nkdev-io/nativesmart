<script setup lang="ts">
import {
  brandThemes,
  defineBrandTheme,
  motionPresets,
  shapePresets,
  toScopedCss,
  type Personality
} from "@nativesmart/tokens";
import { computed, onBeforeUnmount, reactive, ref, watchEffect } from "vue";
import { state } from "../../state";
import SegControl from "./SegControl.vue";

const theme = computed(() => brandThemes[state.brand]);
const traits = reactive<Personality>({ ...brandThemes[state.brand].personality });

const options = {
  shape: [
    { value: "sharp", label: "Nettes" },
    { value: "soft", label: "Douces" },
    { value: "round", label: "Rondes" }
  ],
  motion: [
    { value: "calm", label: "Calme" },
    { value: "standard", label: "Standard" },
    { value: "expressive", label: "Expressif" }
  ],
  headings: [
    { value: "light", label: "Légers" },
    { value: "balanced", label: "Équilibrés" },
    { value: "heavy", label: "Affirmés" }
  ],
  density: [
    { value: "compact", label: "Compacte" },
    { value: "comfortable", label: "Confortable" },
    { value: "spacious", label: "Spacieuse" }
  ]
} as const;

const traitNames: Record<keyof Personality, string> = {
  shape: "Formes",
  motion: "Mouvement",
  headings: "Titres",
  density: "Densité"
};

const presets: { label: string; description: string; traits: Personality }[] = [
  {
    label: "Équilibré",
    description: "Le réglage par défaut",
    traits: { shape: "soft", motion: "standard", headings: "balanced", density: "comfortable" }
  },
  {
    label: "Finance sobre",
    description: "Précis, dense, posé",
    traits: { shape: "sharp", motion: "calm", headings: "balanced", density: "compact" }
  },
  {
    label: "Grand public",
    description: "Rond, vif, généreux",
    traits: { shape: "round", motion: "expressive", headings: "heavy", density: "spacious" }
  },
  {
    label: "Éditorial",
    description: "Élégant et calme",
    traits: { shape: "soft", motion: "calm", headings: "light", density: "comfortable" }
  }
];

function apply(next: Personality) {
  Object.assign(traits, next);
}

function setTrait(trait: keyof Personality, value: string) {
  Object.assign(traits, { [trait]: value });
}

/* The preview gets its own stylesheet, built from the brand with these traits. */
const scope = ".personality-preview";
const previewTheme = computed(() =>
  defineBrandTheme({ ...theme.value, personality: { ...traits }, shape: undefined })
);
let style: HTMLStyleElement | undefined;
watchEffect(() => {
  style ??= document.head.appendChild(document.createElement("style"));
  style.textContent = toScopedCss(previewTheme.value, scope);
});
onBeforeUnmount(() => style?.remove());

const config = computed(
  () =>
    `defineBrandTheme({\n  id: "${theme.value.id}",\n  // couleurs, polices…\n  personality: {\n    shape: "${traits.shape}",\n    motion: "${traits.motion}",\n    headings: "${traits.headings}",\n    density: "${traits.density}"\n  }\n});`
);

const opened = ref(true);
const motionFacts = computed(() => motionPresets[traits.motion]);
const shapeFacts = computed(() => shapePresets[traits.shape]);
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Personnalité</h2>
        <p>
          Au-delà des couleurs et des polices, une identité a un caractère. Quatre traits le règlent
          en quelques mots, et les tokens suivent : arrondis, rythme des animations, poids des
          titres et densité. Composez celui de {{ theme.name }}.
        </p>
      </header>

      <div class="persona-presets">
        <button
          v-for="preset in presets"
          :key="preset.label"
          type="button"
          class="persona-preset"
          :aria-pressed="
            preset.traits.shape === traits.shape &&
            preset.traits.motion === traits.motion &&
            preset.traits.headings === traits.headings &&
            preset.traits.density === traits.density
          "
          @click="apply(preset.traits)"
        >
          <strong>{{ preset.label }}</strong>
          <small>{{ preset.description }}</small>
        </button>
      </div>

      <div class="persona">
        <div class="persona__controls">
          <div v-for="(choices, trait) in options" :key="trait" class="persona__trait">
            <small>{{ traitNames[trait] }}</small>
            <SegControl
              :model-value="traits[trait]"
              :options="choices"
              :label="traitNames[trait]"
              @update:model-value="setTrait(trait, $event)"
            />
          </div>
          <dl class="persona__facts">
            <div>
              <dt>Rayons</dt>
              <dd>
                contrôle {{ shapeFacts.control }} · carte {{ shapeFacts.card }} · fenêtre
                {{ shapeFacts.overlay }}
              </dd>
            </div>
            <div>
              <dt>Durées</dt>
              <dd>×{{ motionFacts.durationFactor }} · {{ motionFacts.standard }}</dd>
            </div>
          </dl>
          <pre class="persona__code" dir="ltr"><code>{{ config }}</code></pre>
        </div>

        <div class="lab-preview">
          <div class="personality-preview persona-app">
            <header class="persona-app__head">
              <span class="persona-app__avatar">AN</span>
              <span>
                <small>Bonjour Aïcha</small>
                <strong class="persona-app__title">Votre solde</strong>
              </span>
              <span class="persona-app__badge">Vérifié</span>
            </header>
            <p class="persona-app__amount">1 250 000 <small>FCFA</small></p>
            <div class="persona-app__chips">
              <span class="persona-app__chip is-on">Tout</span>
              <span class="persona-app__chip">Envois</span>
              <span class="persona-app__chip">Reçus</span>
            </div>
            <label class="persona-app__field">
              <span>Montant à envoyer</span>
              <input type="text" value="25 000" />
            </label>
            <div class="persona-app__actions">
              <button type="button" class="persona-app__button" @click="opened = !opened">
                {{ opened ? "Masquer le détail" : "Voir le détail" }}
              </button>
              <button type="button" class="persona-app__button persona-app__button--soft">
                Annuler
              </button>
            </div>
            <div :class="['persona-app__detail', { 'is-open': opened }]">
              <div>
                <span>Frais</span><strong>0 FCFA</strong> <span>Arrivée</span
                ><strong>Immédiate</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
