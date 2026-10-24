<script setup lang="ts">
import { animations, primitives, sampleSpring, type AnimationName } from "@nativesmart/tokens";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import Icon from "../../editorial/Icon.vue";
import SegControl from "./SegControl.vue";
import TokenCode from "./TokenCode.vue";

const { duration, easing, spring, transition, distance, stagger } = primitives.motion;
const kebab = (value: string) => value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

/*
 * Every demo plays on its own, in a loop, while the page is on screen: `played` goes back and
 * forth, and the keyed demos (named animations, cascade) restart on each forward beat.
 */
const systemReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const playing = ref(!systemReduced);
const speed = ref<1 | 0.5 | 0.25>(1);
const speedOptions = [
  { value: 1, label: "1×" },
  { value: 0.5, label: "½×" },
  { value: 0.25, label: "¼×" }
] as const;
const reduced = ref(false);
const factor = computed(() => 1 / speed.value);
const played = ref(false);
const beat = ref(0);

const root = ref<HTMLElement>();
const onScreen = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;
let observer: IntersectionObserver | undefined;

function tick() {
  clearTimeout(timer);
  if (!playing.value || !onScreen.value) return;
  played.value = !played.value;
  if (played.value) beat.value += 1;
  timer = setTimeout(tick, (played.value ? 1800 : 1100) * factor.value);
}

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    onScreen.value = entry.isIntersecting;
  });
  if (root.value) observer.observe(root.value);
});
onBeforeUnmount(() => {
  clearTimeout(timer);
  observer?.disconnect();
});
watch([playing, onScreen, speed], () => {
  // Start from the beginning so every demo lines up on the new rhythm.
  played.value = false;
  timer = setTimeout(tick, 300);
});

/* Curves */
const easingUsage: Record<keyof typeof easing, string> = {
  standard: "Par défaut : la plupart des transitions",
  emphasized: "Mouvements expressifs, léger dépassement",
  emphasizedDecelerate: "Entrées expressives, atterrissage long",
  emphasizedAccelerate: "Sorties expressives",
  decelerate: "Éléments qui entrent à l'écran",
  accelerate: "Éléments qui quittent l'écran",
  linear: "Rotations et indicateurs continus"
};

/** SVG path of an easing, time left to right, progress bottom to top. */
function curvePath(value: string) {
  const match = value.match(/cubic-bezier\(([^)]+)\)/);
  if (!match) return "M0,100 L100,0";
  const [x1, y1, x2, y2] = match[1].split(",").map(Number);
  return `M0,100 C${x1 * 100},${100 - y1 * 100} ${x2 * 100},${100 - y2 * 100} 100,0`;
}

function springPath(samples: readonly number[]) {
  return samples
    .map((value, index) => {
      const x = (index / (samples.length - 1)) * 100;
      return `${index ? "L" : "M"}${x.toFixed(1)},${(100 - value * 100).toFixed(1)}`;
    })
    .join("");
}

/* Springs */
const springText: Record<keyof typeof spring, string> = {
  gentle: "Doux · panneaux, contenus",
  snappy: "Vif · interrupteurs, onglets",
  bouncy: "Rebond · réactions, succès",
  stiff: "Ferme · petits éléments"
};
const springs = Object.entries(spring).map(([name, value]) => {
  const { samples, duration: settle } = sampleSpring(value);
  return { name: name as keyof typeof spring, ...value, settle, path: springPath(samples) };
});

/* Durations */
const durationUsage: Record<keyof typeof duration, string> = {
  instant: "Changement immédiat",
  fastest: "Retours instantanés : coche, pression",
  fast: "Survol, appui, petits éléments",
  normal: "Menus, onglets, infobulles",
  moderate: "Déplacements, réorganisation",
  slow: "Modales, feuilles",
  slower: "Grandes transitions",
  slowest: "Transitions de page, illustrations"
};

/* Transitions */
const transitionText: Record<keyof typeof transition, string> = {
  enter: "Un élément apparaît",
  exit: "Un élément disparaît",
  move: "Un élément change de place",
  expand: "Une zone s'ouvre",
  collapse: "Une zone se referme",
  fade: "Un contenu se remplace"
};
/** Transitions hide on the backward beat; a click flips one card out of step to compare. */
const flipped = ref<Record<string, boolean>>({});
const transitionShown = (key: string) => played.value !== Boolean(flipped.value[key]);

/* Named animations */
const animationText: Record<AnimationName, string> = {
  "fade-in": "Apparition",
  "fade-out": "Disparition",
  "scale-in": "Zoom d'entrée",
  "slide-up": "Glisse vers le haut",
  "slide-down": "Glisse vers le bas",
  shimmer: "Chargement",
  spin: "Rotation",
  pulse: "Pulsation"
};
const animationNames = Object.keys(animations) as AnimationName[];
const animationKey = beat;

/* Stagger */
const staggerKey = beat;
const staggerItems = [
  "Virement envoyé",
  "Facture payée",
  "Carte rechargée",
  "Épargne versée",
  "Remboursement reçu"
];
</script>

<template>
  <div
    ref="root"
    class="token-sections motion-page"
    :data-ns-motion="reduced ? 'reduce' : undefined"
    :style="{ '--motion-factor': factor }"
  >
    <div class="motion-dock" role="toolbar" aria-label="Lecture des démonstrations">
      <button
        type="button"
        class="motion-dock__play"
        :aria-label="playing ? 'Mettre en pause' : 'Lire'"
        :aria-pressed="playing"
        @click="playing = !playing"
      >
        <Icon :name="playing ? 'pause' : 'play'" :size="18" />
      </button>
      <span class="motion-dock__status">
        <strong>{{ playing ? "Lecture en boucle" : "En pause" }}</strong>
        <small>Les démonstrations jouent seules</small>
      </span>
      <span class="motion-dock__sep" aria-hidden="true" />
      <SegControl v-model="speed" :options="speedOptions" label="Vitesse" />
      <button
        type="button"
        class="motion-dock__toggle"
        :aria-pressed="reduced"
        title="Simuler le réglage « réduire les animations » du système"
        @click="reduced = !reduced"
      >
        <Icon name="accessibility" :size="16" />
        Mouvement réduit
      </button>
    </div>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Courbes</h2>
        <p>
          Sept courbes. Les « emphasized » donnent du caractère aux grandes transitions ; les autres
          restent discrètes pour l'interface de tous les jours.
        </p>
      </header>
      <div class="curve-grid">
        <article v-for="(value, key) in easing" :key="key" class="curve-card">
          <svg
            viewBox="-6 -34 112 146"
            preserveAspectRatio="none"
            class="curve-card__plot"
            aria-hidden="true"
          >
            <path class="curve-card__axis" d="M0,0 H100 M0,100 H100" />
            <path class="curve-card__line" :d="curvePath(value)" />
          </svg>
          <div class="motion-track">
            <span
              :class="['motion-dot', { 'motion-dot--end': played }]"
              :style="{
                transitionDuration: `calc(var(--ns-duration-slower) * var(--motion-factor, 1))`,
                transitionTimingFunction: `var(--ns-easing-${kebab(key)})`
              }"
            />
          </div>
          <strong>{{ key }}</strong>
          <small class="muted">{{ easingUsage[key] }}</small>
          <TokenCode :value="`--ns-easing-${kebab(key)}`" />
        </article>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Ressorts</h2>
        <p>
          Des ressorts physiques pour SwiftUI, Compose, Flutter et Framer Motion. Le web reçoit la
          même courbe, échantillonnée en <code>linear()</code>, avec sa durée de stabilisation.
        </p>
      </header>
      <div class="spring-grid">
        <article v-for="item in springs" :key="item.name" class="spring-card">
          <div class="spring-card__stage">
            <span
              :class="['spring-ball', { 'spring-ball--end': played }]"
              :style="{
                transitionDuration: `calc(var(--ns-spring-${item.name}-duration) * var(--motion-factor, 1))`,
                transitionTimingFunction: `var(--ns-spring-${item.name})`
              }"
            />
          </div>
          <svg
            viewBox="-6 -34 112 146"
            preserveAspectRatio="none"
            class="curve-card__plot"
            aria-hidden="true"
          >
            <path class="curve-card__axis" d="M0,0 H100 M0,100 H100" />
            <path class="curve-card__line" :d="item.path" />
          </svg>
          <strong>{{ item.name }}</strong>
          <small class="muted">{{ springText[item.name] }}</small>
          <small class="numeric">
            raideur {{ item.stiffness }} · amortissement {{ item.damping }} · {{ item.settle }} ms
          </small>
          <TokenCode :value="`--ns-spring-${item.name}`" />
        </article>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Durées</h2>
        <p>
          Huit durées, de l'instantané à la transition de page. Plus un élément est grand, plus il
          prend son temps.
        </p>
      </header>
      <div class="duration-race">
        <div v-for="(value, key) in duration" :key="key" class="duration-race__row">
          <span class="duration-race__meta">
            <strong>{{ key }}</strong>
            <small class="numeric">{{ value }} ms</small>
          </span>
          <span class="duration-race__track">
            <span
              :class="['duration-race__bar', { 'is-played': played }]"
              :style="{
                transitionDuration: `calc(var(--ns-duration-${key}) * var(--motion-factor, 1))`
              }"
            />
          </span>
          <small class="duration-race__usage muted">{{ durationUsage[key] }}</small>
          <TokenCode :value="`--ns-duration-${key}`" />
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Transitions prêtes à l'emploi</h2>
        <p>
          Une durée et une courbe déjà assorties, selon ce que fait l'élément :
          <code>transition: opacity var(--ns-transition-enter)</code>. Cliquez pour les essayer.
        </p>
      </header>
      <div class="transition-grid lab-preview">
        <button
          v-for="(value, key) in transition"
          :key="key"
          type="button"
          class="transition-card"
          @click="flipped[key] = !flipped[key]"
        >
          <span class="transition-card__stage">
            <span
              :class="[
                'transition-card__item',
                `transition-card__item--${key}`,
                { 'is-hidden': !transitionShown(key) }
              ]"
              :style="{
                transition: `all calc(var(--ns-duration-${value.duration}) * var(--motion-factor, 1)) var(--ns-easing-${kebab(value.easing)})`
              }"
            />
          </span>
          <strong>{{ key }}</strong>
          <small class="muted">{{ transitionText[key] }}</small>
          <small class="numeric">{{ value.duration }} · {{ value.easing }}</small>
          <code>--ns-transition-{{ key }}</code>
        </button>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Animations nommées</h2>
        <p>
          Huit animations prêtes : la classe <code>.ns-animate-slide-up</code> ou
          <code>animate-ns-slide-up</code> avec Tailwind. Avec le mouvement réduit, les glissements
          deviennent de simples fondus.
        </p>
      </header>
      <div class="animation-grid lab-preview">
        <figure
          v-for="name in animationNames"
          :key="`${name}-${animationKey}`"
          class="animation-card"
        >
          <span class="animation-card__stage">
            <span v-if="name === 'shimmer'" class="animation-card__shimmer ns-animate-shimmer" />
            <span v-else :class="['animation-card__item', `ns-animate-${name}`]" />
          </span>
          <figcaption>
            <strong>{{ animationText[name] }}</strong>
            <code>.ns-animate-{{ name }}</code>
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Cascade et distances</h2>
        <p>
          Les éléments d'une liste arrivent l'un après l'autre, à {{ stagger }} ms d'intervalle, sur
          une distance de {{ distance.lg }} px. Distances disponibles :
          {{ Object.values(distance).join(", ") }} px.
        </p>
      </header>
      <div class="stagger-demo lab-preview">
        <ul :key="staggerKey">
          <li
            v-for="(item, index) in staggerItems"
            :key="item"
            class="ns-animate-slide-up"
            :style="{
              animationDelay: `calc(var(--ns-stagger) * ${index} * var(--motion-factor, 1))`,
              animationDuration: `calc(var(--ns-duration-slow) * var(--motion-factor, 1))`
            }"
          >
            <span class="stagger-demo__dot" />
            {{ item }}
          </li>
        </ul>
        <div class="stagger-demo__side">
          <TokenCode value="--ns-stagger" />
          <TokenCode value="--ns-motion-distance-lg" />
        </div>
      </div>
    </section>
  </div>
</template>
