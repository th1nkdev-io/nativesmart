<script setup lang="ts">
import {
  brandThemes,
  defineBrandTheme,
  motionPresets,
  primitives,
  shapePresets,
  toScopedCss,
  type Personality
} from "@nativesmart/tokens";
import { computed, onBeforeUnmount, reactive, ref, watchEffect } from "vue";
import Icon from "../../editorial/Icon.vue";
import type { IconName } from "../../editorial/icons";
import { state } from "../../state";

type Trait = keyof Personality;

const theme = computed(() => brandThemes[state.brand]);
const traits = reactive<Personality>({ ...brandThemes[state.brand].personality });

const traitList: {
  id: Trait;
  name: string;
  icon: IconName;
  text: string;
  choices: { value: string; label: string }[];
}[] = [
  {
    id: "shape",
    name: "Formes",
    icon: "cube",
    text: "Rayons des contrôles, cartes, fenêtres et badges",
    choices: [
      { value: "sharp", label: "Nettes" },
      { value: "soft", label: "Douces" },
      { value: "round", label: "Rondes" }
    ]
  },
  {
    id: "motion",
    name: "Mouvement",
    icon: "wave",
    text: "Durées et courbes de toutes les transitions",
    choices: [
      { value: "calm", label: "Calme" },
      { value: "standard", label: "Standard" },
      { value: "expressive", label: "Expressif" }
    ]
  },
  {
    id: "headings",
    name: "Titres",
    icon: "type",
    text: "Graisse des titres et des styles d'affichage",
    choices: [
      { value: "light", label: "Légers" },
      { value: "balanced", label: "Équilibrés" },
      { value: "heavy", label: "Affirmés" }
    ]
  },
  {
    id: "density",
    name: "Densité",
    icon: "rows",
    text: "Hauteur des contrôles et marges intérieures",
    choices: [
      { value: "compact", label: "Compacte" },
      { value: "comfortable", label: "Confortable" },
      { value: "spacious", label: "Spacieuse" }
    ]
  }
];

const presets: { label: string; description: string; icon: IconName; traits: Personality }[] = [
  {
    label: "Équilibré",
    description: "Le réglage par défaut",
    icon: "target",
    traits: { shape: "soft", motion: "standard", headings: "balanced", density: "comfortable" }
  },
  {
    label: "Finance sobre",
    description: "Précis, dense, posé",
    icon: "gauge",
    traits: { shape: "sharp", motion: "calm", headings: "balanced", density: "compact" }
  },
  {
    label: "Grand public",
    description: "Rond, vif, généreux",
    icon: "heart",
    traits: { shape: "round", motion: "expressive", headings: "heavy", density: "spacious" }
  },
  {
    label: "Éditorial",
    description: "Élégant et calme",
    icon: "book",
    traits: { shape: "soft", motion: "calm", headings: "light", density: "comfortable" }
  }
];

function isActive(preset: Personality) {
  return (Object.keys(preset) as Trait[]).every((key) => preset[key] === traits[key]);
}

function apply(next: Personality) {
  Object.assign(traits, next);
}

function setTrait(trait: Trait, value: string) {
  Object.assign(traits, { [trait]: value });
}

/** Arrow keys move the choice inside a trait, as in a native radio group. */
function move(event: KeyboardEvent, trait: (typeof traitList)[number]) {
  const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
  if (!step) return;
  event.preventDefault();
  const index = trait.choices.findIndex((choice) => choice.value === traits[trait.id]);
  const next = trait.choices[(index + step + trait.choices.length) % trait.choices.length];
  setTrait(trait.id, next.value);
  const group = event.currentTarget as HTMLElement;
  requestAnimationFrame(() => group.querySelector<HTMLElement>('[aria-checked="true"]')?.focus());
}

/* Mini illustrations, drawn from the same presets the tokens use. */
function radiusOf(key: keyof typeof primitives.radius) {
  return key === "full" ? 999 : primitives.radius[key];
}
const headingWeight = { light: 400, balanced: 700, heavy: 850 } as const;
const densityGap = { compact: 3, comfortable: 5, spacious: 8 } as const;

/** An emphasized curve from (0,0) to (1,1), scaled into a 64 × 40 box with room to overshoot. */
function curvePath(motion: Personality["motion"]) {
  const [x1, y1, x2, y2] = motionPresets[motion].emphasized.match(/[\d.]+/g)!.map(Number);
  const x = (value: number) => 4 + value * 56;
  const y = (value: number) => 34 - value * 22;
  return `M${x(0)} ${y(0)} C${x(x1)} ${y(y1)} ${x(x2)} ${y(y2)} ${x(1)} ${y(1)}`;
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

const facts = computed(() => {
  const shape = shapePresets[traits.shape];
  const motion = motionPresets[traits.motion];
  return {
    shape: `contrôle ${shape.control} · carte ${shape.card} · fenêtre ${shape.overlay}`,
    motion: `durées ×${motion.durationFactor}`,
    headings: {
      light: "2 crans plus légers",
      balanced: "graisses d'origine",
      heavy: "1 cran plus gras"
    }[traits.headings],
    density: `contrôles ×${primitives.density[traits.density]}`
  } satisfies Record<Trait, string>;
});

const opened = ref(true);
const copied = ref(false);
async function copy() {
  await navigator.clipboard?.writeText(config.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1600);
}
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

      <div class="persona">
        <div class="persona__studio">
          <div class="persona-presets" role="group" aria-label="Préréglages">
            <button
              v-for="preset in presets"
              :key="preset.label"
              type="button"
              class="persona-preset"
              :aria-pressed="isActive(preset.traits)"
              @click="apply(preset.traits)"
            >
              <span class="persona-preset__art" aria-hidden="true">
                <i
                  :style="{
                    borderRadius: `${Math.min(radiusOf(shapePresets[preset.traits.shape].card), 14)}px`
                  }"
                >
                  <b :style="{ fontWeight: headingWeight[preset.traits.headings] }">Aa</b>
                  <span :style="{ gap: `${densityGap[preset.traits.density] - 1}px` }">
                    <u /><u />
                  </span>
                </i>
              </span>
              <span class="persona-preset__text">
                <strong><Icon :name="preset.icon" :size="14" /> {{ preset.label }}</strong>
                <small>{{ preset.description }}</small>
              </span>
            </button>
          </div>

          <div class="persona-traits">
            <article v-for="trait in traitList" :key="trait.id" class="persona-trait">
              <header class="persona-trait__head">
                <span class="persona-trait__icon"><Icon :name="trait.icon" :size="16" /></span>
                <span>
                  <strong>{{ trait.name }}</strong>
                  <small>{{ trait.text }}</small>
                </span>
              </header>
              <div
                class="persona-trait__choices"
                role="radiogroup"
                :aria-label="trait.name"
                @keydown="move($event, trait)"
              >
                <button
                  v-for="choice in trait.choices"
                  :key="choice.value"
                  type="button"
                  role="radio"
                  class="persona-choice"
                  :aria-checked="traits[trait.id] === choice.value"
                  :tabindex="traits[trait.id] === choice.value ? 0 : -1"
                  @click="setTrait(trait.id, choice.value)"
                >
                  <span class="persona-choice__art" aria-hidden="true">
                    <i
                      v-if="trait.id === 'shape'"
                      class="art-shape"
                      :style="{
                        borderRadius: `${Math.min(
                          radiusOf(shapePresets[choice.value as Personality['shape']].card),
                          16
                        )}px`
                      }"
                    />
                    <svg v-else-if="trait.id === 'motion'" viewBox="0 0 64 40" class="art-curve">
                      <path d="M4 12H60" class="art-curve__target" />
                      <path :d="curvePath(choice.value as Personality['motion'])" />
                      <circle
                        r="3.5"
                        cx="4"
                        cy="34"
                        :style="{
                          animationDuration: `${1.6 * motionPresets[choice.value as Personality['motion']].durationFactor}s`,
                          animationTimingFunction:
                            motionPresets[choice.value as Personality['motion']].emphasized
                        }"
                      />
                    </svg>
                    <b
                      v-else-if="trait.id === 'headings'"
                      class="art-heading"
                      :style="{
                        fontWeight: headingWeight[choice.value as Personality['headings']]
                      }"
                      >Aa</b
                    >
                    <span
                      v-else
                      class="art-density"
                      :style="{
                        gap: `${densityGap[choice.value as Personality['density']]}px`
                      }"
                    >
                      <u /><u /><u />
                    </span>
                  </span>
                  {{ choice.label }}
                </button>
              </div>
              <small class="persona-trait__fact">{{ facts[trait.id] }}</small>
            </article>
          </div>

          <details class="persona-config">
            <summary>
              <Icon name="code" :size="16" />
              <span>Configuration de l'identité</span>
              <small>defineBrandTheme</small>
            </summary>
            <div class="persona-config__body">
              <button type="button" class="persona-config__copy" @click="copy">
                <Icon :name="copied ? 'check' : 'copy'" :size="14" />
                {{ copied ? "Copié" : "Copier" }}
              </button>
              <pre dir="ltr"><code>{{ config }}</code></pre>
            </div>
          </details>
        </div>

        <figure class="persona__preview">
          <div class="persona-phone">
            <div class="personality-preview persona-phone__screen">
              <div class="persona-phone__status" aria-hidden="true">
                <span>9:41</span>
                <i />
                <span class="persona-phone__signal"><u /><u /><u /></span>
              </div>
              <div class="persona-app">
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
          <figcaption>
            {{ theme.name }} ·
            {{
              traitList
                .map((trait) => trait.choices.find((c) => c.value === traits[trait.id])?.label)
                .join(" · ")
            }}
          </figcaption>
        </figure>
      </div>
    </section>
  </div>
</template>
