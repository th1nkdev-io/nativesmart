<script setup lang="ts">
import { brandThemes, primitives, type BrandShape } from "@nativesmart/tokens";
import { computed } from "vue";
import { state } from "../../state";
import TokenCode from "./TokenCode.vue";

const theme = computed(() => brandThemes[state.brand]);
const radii = Object.entries(primitives.radius);

const usageText: { key: keyof BrandShape; label: string; example: string }[] = [
  { key: "control", label: "Contrôles", example: "Contrôles segmentés, onglets" },
  { key: "button", label: "Boutons", example: "Toutes les variantes" },
  { key: "input", label: "Champs", example: "Texte, listes, dates" },
  { key: "card", label: "Cartes", example: "Cartes, panneaux, tableaux" },
  { key: "overlay", label: "Surfaces flottantes", example: "Modales, menus, popovers" },
  { key: "sheet", label: "Feuilles", example: "Bottom sheets : coins du haut" },
  { key: "badge", label: "Badges", example: "Statuts, compteurs" },
  { key: "chip", label: "Puces", example: "Filtres, sélections" },
  { key: "avatar", label: "Avatars", example: "Photos et initiales" },
  { key: "image", label: "Images", example: "Vignettes, médias" },
  { key: "tooltip", label: "Infobulles", example: "Aide au survol" }
];
const usages = computed(() =>
  usageText.map((item) => ({ ...item, value: theme.value.shape[item.key] }))
);

/** Superellipse outline, the shape iOS draws for continuous corners. */
function superellipse(size: number, exponent: number) {
  const half = size / 2;
  const points: string[] = [];
  for (let step = 0; step <= 96; step += 1) {
    const angle = (step / 96) * Math.PI * 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = half + half * Math.sign(cos) * Math.abs(cos) ** (2 / exponent);
    const y = half + half * Math.sign(sin) * Math.abs(sin) ** (2 / exponent);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return `M${points.join("L")}Z`;
}
const squircle = superellipse(120, 5);
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Rayons par usage</h2>
        <p>
          Onze usages, chacun relié à l'échelle. {{ theme.name }} en fixe quatre ; les autres les
          suivent (un champ reprend le rayon des contrôles, une puce celui des badges) sauf si
          l'identité en décide autrement.
        </p>
      </header>
      <div class="usage-grid usage-grid--shapes">
        <article v-for="usage in usages" :key="usage.key" class="usage">
          <div class="usage__demo lab-preview">
            <span v-if="usage.key === 'control'" class="shape-demo shape-demo--segmented">
              <i class="is-on">Jour</i><i>Semaine</i>
            </span>
            <span v-else-if="usage.key === 'button'" class="shape-demo shape-demo--button">
              Envoyer
            </span>
            <span v-else-if="usage.key === 'input'" class="shape-demo shape-demo--input">
              Montant
            </span>
            <span v-else-if="usage.key === 'card'" class="shape-demo shape-demo--card">
              <i /><i /><i />
            </span>
            <span v-else-if="usage.key === 'overlay'" class="shape-demo shape-demo--overlay">
              <i /><i /><i />
            </span>
            <span v-else-if="usage.key === 'sheet'" class="shape-demo shape-demo--sheet">
              <i />
            </span>
            <span v-else-if="usage.key === 'badge'" class="shape-demo shape-demo--badge">
              Payé
            </span>
            <span v-else-if="usage.key === 'chip'" class="shape-demo shape-demo--chip">
              Mobile money ×
            </span>
            <span v-else-if="usage.key === 'avatar'" class="shape-demo shape-demo--avatar">
              AN
            </span>
            <span v-else-if="usage.key === 'image'" class="shape-demo shape-demo--image" />
            <span v-else class="shape-demo shape-demo--tooltip">Copié !</span>
          </div>
          <strong>{{ usage.label }}</strong>
          <span class="muted">{{ usage.example }}</span>
          <span class="type-row__spec">
            radius.{{ usage.value }} ·
            {{ usage.value === "full" ? "9999" : primitives.radius[usage.value] }}px
          </span>
          <TokenCode :value="`--ns-radius-${usage.key}`" />
        </article>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Échelle des rayons</h2>
        <p>Dix valeurs, du carré parfait à la pilule.</p>
      </header>
      <div class="radius-grid">
        <div v-for="[key, value] in radii" :key="key" class="radius">
          <span :style="{ borderRadius: `var(--ns-radius-${key})` }" />
          <strong>{{ key }}</strong>
          <small>{{ key === "full" ? "9999px" : `${value}px` }}</small>
          <TokenCode :value="`--ns-radius-${key}`" />
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Rayons imbriqués</h2>
        <p>
          Un élément posé dans une boîte arrondie prend le rayon de la boîte moins la marge qui les
          sépare. Les courbes restent alors parallèles.
        </p>
      </header>
      <div class="nesting lab-preview">
        <figure>
          <span class="nesting__outer">
            <span class="nesting__inner nesting__inner--good" />
          </span>
          <figcaption>
            <strong>Juste</strong>
            <code>rayon extérieur − var(--ns-inset-lg)</code>
          </figcaption>
        </figure>
        <figure>
          <span class="nesting__outer">
            <span class="nesting__inner nesting__inner--bad" />
          </span>
          <figcaption>
            <strong>À éviter</strong>
            <span class="muted"
              >Le même rayon dedans et dehors : l'écart se déforme aux coins.</span
            >
          </figcaption>
        </figure>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Bordures</h2>
        <p>
          Quatre épaisseurs et trois styles. Les pointillés signalent une zone de dépôt ou un état
          provisoire.
        </p>
      </header>
      <div class="border-grid">
        <div v-for="(value, key) in primitives.borders.width" :key="key" class="border-demo">
          <span :style="{ borderWidth: `${value}px` }" />
          <strong>{{ key }}</strong>
          <small>{{ value }}px</small>
          <TokenCode :value="`--ns-border-width-${key}`" />
        </div>
        <div v-for="(value, key) in primitives.borders.style" :key="key" class="border-demo">
          <span :style="{ borderWidth: '2px', borderStyle: value }" />
          <strong>{{ key }}</strong>
          <small>style</small>
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Anneaux de focus</h2>
        <p>
          Deux façons de dessiner le même anneau : le contour CSS, ou une double ombre qui suit
          l'arrondi et reste visible dans un parent en <code>overflow: hidden</code>.
        </p>
      </header>
      <div class="focus-styles lab-preview">
        <figure>
          <span class="focus-styles__item focus-styles__item--outline">Contour</span>
          <figcaption><code>outline</code> · --ns-focus-ring-width</figcaption>
        </figure>
        <figure>
          <span class="focus-styles__item focus-styles__item--halo">Double ombre</span>
          <figcaption><TokenCode value="--ns-focus-ring-shadow" /></figcaption>
        </figure>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Coins lissés</h2>
        <p>
          iOS et Figma dessinent des coins continus, plus doux qu'un arc de cercle. Le lissage vaut
          {{ primitives.cornerSmoothing }} pour ces plateformes ; le web garde des arcs, le CSS
          n'ayant pas encore d'équivalent.
        </p>
      </header>
      <div class="smoothing lab-preview">
        <figure>
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <rect x="0" y="0" width="120" height="120" rx="27" />
          </svg>
          <figcaption>Arc de cercle · web, Android</figcaption>
        </figure>
        <figure>
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <path :d="squircle" />
          </svg>
          <figcaption>Coin continu · iOS, macOS</figcaption>
        </figure>
        <figure class="smoothing__overlay">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <rect x="0" y="0" width="120" height="120" rx="27" />
            <path :d="squircle" />
          </svg>
          <figcaption>Superposés</figcaption>
        </figure>
      </div>
    </section>
  </div>
</template>
