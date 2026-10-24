<script setup lang="ts">
import {
  brandThemes,
  fluidRange,
  primitives,
  textStyles,
  type TextStyle,
  type TextStyleCategory,
  type TextStyleName
} from "@nativesmart/tokens";
import { computed, ref } from "vue";
import { state } from "../../state";
import Icon from "../../editorial/Icon.vue";
import TokenCode from "./TokenCode.vue";

const theme = computed(() => brandThemes[state.brand]);
const { fontSize, lineHeight, fontWeight, letterSpacing, leading, measure } = primitives.typography;

const families = computed(() => {
  const fonts = theme.value.typography.fontFamily;
  return [
    { key: "display", label: "Display", use: "Grands titres", stack: fonts.display },
    { key: "heading", label: "Titres", use: "Titres et composants", stack: fonts.heading },
    { key: "sans", label: "Texte", use: "Lecture et interface", stack: fonts.sans },
    { key: "serif", label: "Serif", use: "Citations, éditorial", stack: fonts.serif },
    { key: "mono", label: "Code", use: "Code et raccourcis", stack: fonts.mono }
  ];
});

const styles = Object.entries(textStyles) as [TextStyleName, TextStyle][];
const categories: { id: TextStyleCategory; label: string; description: string }[] = [
  { id: "display", label: "Display", description: "Pages vitrines, fluides selon l'écran" },
  { id: "heading", label: "Titres de document", description: "Hiérarchie des pages, h1 à h6" },
  { id: "title", label: "Titres de composant", description: "Cartes, listes, panneaux" },
  { id: "body", label: "Corps", description: "Texte de lecture" },
  { id: "label", label: "Libellés", description: "Interface : boutons, badges, légendes" },
  { id: "special", label: "Spéciaux", description: "Chiffres, prix, liens, citations, code" }
];
const groups = categories.map((category) => ({
  ...category,
  styles: styles.filter(([, style]) => style.category === category.id)
}));

const descriptions: Record<TextStyleName, string> = {
  "display-xl": "Héros des pages d'accueil",
  "display-lg": "Grands titres des pages vitrines",
  "display-md": "Ouvertures de section",
  "display-sm": "Titres de fonctionnalité, états vides",
  h1: "Titre de page",
  h2: "Titre de section",
  h3: "Titre de sous-section",
  h4: "Titre de carte et de dialogue",
  h5: "Titre de groupe",
  h6: "Petit titre de groupe",
  "title-lg": "Tiroirs, grandes cartes",
  "title-md": "Cartes, en-têtes de liste",
  "title-sm": "Éléments de liste, tuiles",
  lead: "Introduction sous un titre de page",
  "body-lg": "Paragraphes d'introduction",
  "body-md": "Texte de lecture par défaut",
  "body-sm": "Interfaces denses, texte secondaire",
  "body-xs": "Notes de bas de page, mentions",
  "label-lg": "Grands boutons et onglets",
  "label-md": "Boutons, champs, éléments de menu",
  "label-sm": "Badges, puces, petits contrôles",
  "label-xs": "Compteurs, pastilles",
  caption: "Aide, horodatages, légendes",
  overline: "Surtitres au-dessus des titres",
  link: "Liens isolés",
  stat: "Chiffres clés des tableaux de bord",
  price: "Prix et montants",
  quote: "Témoignages et citations",
  code: "Code, identifiants, références",
  kbd: "Raccourcis clavier"
};

const samples: Partial<Record<TextStyleName, string>> = {
  "display-xl": "Sans frontières",
  "display-lg": "Envoyez sans frontières",
  "display-md": "Votre argent, partout",
  overline: "Nouveau",
  code: "--ns-color-primary",
  kbd: "Ctrl K",
  stat: "12 480",
  price: "25 000 FCFA",
  quote: "« Enfin une interface qui parle comme nous. »",
  link: "Voir tous les paiements",
  "label-xs": "99+"
};

function sizeAt(style: TextStyle, width: number) {
  const max = fontSize[style.size];
  if (!style.fluid) return max;
  const min = fontSize[style.fluid.min];
  const progress = Math.min(
    1,
    Math.max(0, (width - fluidRange.min) / (fluidRange.max - fluidRange.min))
  );
  return Math.round(min + (max - min) * progress);
}

/* Tester */
const testerText = ref("Envoyez de l'argent, partout, en un instant.");
const testerStyle = ref<TextStyleName>("display-lg");
const testerWidth = ref(1024);
const tester = computed(() => {
  const style: TextStyle = textStyles[testerStyle.value];
  const size = sizeAt(style, testerWidth.value);
  const height = style.fluid
    ? leading[style.fluid.leading]
    : style.leading
      ? leading[style.leading]
      : lineHeight[style.size] / fontSize[style.size];
  return {
    style,
    size,
    css: {
      fontFamily: `var(--ns-font-${style.family})`,
      fontSize: `${size}px`,
      lineHeight: String(height),
      fontWeight: fontWeight[style.weight],
      letterSpacing: `${letterSpacing[style.tracking]}em`,
      fontStyle: style.italic ? "italic" : undefined,
      textTransform: style.uppercase ? ("uppercase" as const) : undefined,
      fontVariantNumeric: style.tabular ? "tabular-nums" : undefined
    }
  };
});
const presets = [
  { label: "Mobile", width: 375 },
  { label: "Tablette", width: 768 },
  { label: "Portable", width: 1024 },
  { label: "Bureau", width: 1440 }
];

const sizes = Object.entries(fontSize) as [keyof typeof fontSize, number][];
const largest = Math.max(...Object.values(fontSize));

const paragraph =
  "Chaque transfert est suivi en temps réel. Vous recevez une confirmation dès que l'argent arrive, et votre historique reste disponible hors ligne.";

const amounts = ["1 250,00", "18 900,50", "311,10", "7 040,00", "99 999,99"];
const total = "127 501,59";
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Familles</h2>
        <p>
          Cinq familles par identité. {{ theme.name }} en écrit trois ; « Display » reprend les
          titres et « Serif » une pile système, sauf si l'identité les définit.
        </p>
      </header>
      <div class="family-grid family-grid--five">
        <article v-for="family in families" :key="family.key" class="family family--stacked">
          <span
            class="family__specimen lab-preview"
            :style="{ fontFamily: `var(--ns-font-${family.key})` }"
          >
            Ag
          </span>
          <div class="family__meta">
            <small>{{ family.label }} · {{ family.use }}</small>
            <strong class="lab-preview" :style="{ fontFamily: `var(--ns-font-${family.key})` }">
              {{ family.stack[0] }}
            </strong>
            <span class="muted family__fallback">{{ family.stack.slice(1).join(", ") }}</span>
            <TokenCode :value="`--ns-font-${family.key}`" />
          </div>
        </article>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Testeur</h2>
        <p>
          Tapez votre texte, choisissez un style et une largeur d'écran. Les styles fluides
          grandissent de {{ fluidRange.min }} à {{ fluidRange.max }} px de large, sans palier.
        </p>
      </header>
      <div class="tester">
        <div class="tester__head">
          <label class="tester__text">
            <span class="sr-only">Texte à essayer</span>
            <Icon name="type" :size="18" />
            <input v-model="testerText" type="text" spellcheck="false" placeholder="Votre texte…" />
          </label>
          <div class="tester__toolbar">
            <label class="tester__control tester__control--select">
              <span>Style</span>
              <select v-model="testerStyle">
                <optgroup v-for="group in groups" :key="group.id" :label="group.label">
                  <option v-for="[name] in group.styles" :key="name" :value="name">
                    {{ name }}
                  </option>
                </optgroup>
              </select>
            </label>
            <label class="tester__control tester__control--range">
              <span>Écran</span>
              <input v-model.number="testerWidth" type="range" min="320" max="1600" step="1" />
              <output>{{ testerWidth }} px</output>
            </label>
            <div class="seg tester__presets" role="group" aria-label="Largeurs types">
              <button
                v-for="preset in presets"
                :key="preset.width"
                type="button"
                :aria-pressed="testerWidth === preset.width"
                @click="testerWidth = preset.width"
              >
                {{ preset.label }}
              </button>
            </div>
          </div>
        </div>
        <div class="tester__stage lab-preview">
          <p class="tester__sample" :style="tester.css">{{ testerText || "Aa" }}</p>
        </div>
        <dl class="tester__readout">
          <div>
            <dt>Taille</dt>
            <dd>
              {{ tester.size }} px
              <span v-if="tester.style.fluid" class="tag-derived">fluide</span>
            </dd>
          </div>
          <div>
            <dt>Interligne</dt>
            <dd>{{ tester.css.lineHeight }}</dd>
          </div>
          <div>
            <dt>Graisse</dt>
            <dd>{{ tester.style.weight }} · {{ fontWeight[tester.style.weight] }}</dd>
          </div>
          <div>
            <dt>Interlettrage</dt>
            <dd>{{ letterSpacing[tester.style.tracking] }} em</dd>
          </div>
          <div>
            <dt>Famille</dt>
            <dd>{{ tester.style.family }}</dd>
          </div>
          <div class="tester__token">
            <dt>Classe</dt>
            <dd><TokenCode :value="`ns-text-${testerStyle}`" /></dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Styles de texte</h2>
        <p>
          {{ styles.length }} styles nommés, en six familles d'usage. Disponibles en classe CSS
          (<code>.ns-text-h1</code>), en classe Tailwind (<code>text-ns-h1</code>) et en variables.
        </p>
      </header>
      <div v-for="group in groups" :key="group.id" class="type-group">
        <header class="type-group__head">
          <h3>{{ group.label }}</h3>
          <span class="type-group__count">{{ group.styles.length }}</span>
          <p>{{ group.description }}</p>
        </header>
        <div class="type-list">
          <article v-for="[name, style] in group.styles" :key="name" class="type-row">
            <div class="type-row__sample lab-preview">
              <p :class="`ns-text-${name}`">
                {{ samples[name] ?? "Paiement reçu de 25 000 FCFA" }}
              </p>
            </div>
            <div class="type-row__meta">
              <div class="type-row__name">
                <strong>{{ name }}</strong>
                <span v-if="style.fluid" class="tag-derived">fluide</span>
              </div>
              <span class="type-row__usage">{{ descriptions[name] }}</span>
              <ul class="type-row__chips">
                <li>
                  {{
                    style.fluid
                      ? `${fontSize[style.fluid.min]}→${fontSize[style.size]} px`
                      : `${fontSize[style.size]} px`
                  }}
                </li>
                <li>{{ fontWeight[style.weight] }}</li>
                <li>{{ letterSpacing[style.tracking] }} em</li>
                <li>{{ style.family }}</li>
              </ul>
              <TokenCode :value="`ns-text-${name}`" />
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Échelle</h2>
        <p>
          Treize tailles, de 11 à 96 px, avec leur interligne en pixels. Aperçu à 60 % pour tenir
          sur une ligne.
        </p>
      </header>
      <div class="type-scale lab-preview">
        <div v-for="[key, size] in sizes" :key="key" class="type-scale__step">
          <span class="type-scale__glyph" :style="{ fontSize: `${size * 0.6}px` }">Ag</span>
          <span class="type-scale__bar" :style="{ blockSize: `${(size / largest) * 100}%` }" />
          <strong>{{ key }}</strong>
          <small>{{ size }}/{{ lineHeight[key] }}</small>
        </div>
      </div>
      <div class="token-inline">
        <TokenCode value="--ns-font-size-md" />
        <TokenCode value="--ns-line-height-md" />
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Graisses</h2>
        <p>Sept graisses, de light à black. Les polices variables les affichent toutes.</p>
      </header>
      <div class="weights weights--cards lab-preview">
        <div v-for="(weight, key) in fontWeight" :key="key" class="weight">
          <span :style="{ fontWeight: weight, fontFamily: 'var(--ns-font-heading)' }">Aa</span>
          <small>{{ key }} · {{ weight }}</small>
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Interlignage et interlettrage</h2>
        <p>
          Des interlignes relatifs pour le texte hors échelle et les titres fluides ; des
          interlettrages qui resserrent les grands titres et aèrent les capitales.
        </p>
      </header>
      <div class="leading-grid lab-preview">
        <article v-for="(value, key) in leading" :key="key" class="leading-card">
          <header>
            <strong>{{ key }}</strong>
            <span class="leading-card__value">{{ value }}</span>
          </header>
          <p :style="{ lineHeight: value }">{{ paragraph }}</p>
          <TokenCode :value="`--ns-leading-${key}`" />
        </article>
      </div>
      <div class="tracking-table lab-preview" role="table" aria-label="Interlettrages">
        <div class="tracking-table__row tracking-table__row--head" role="row">
          <span role="columnheader">Titre</span>
          <span role="columnheader">Capitales</span>
          <span role="columnheader">Nom</span>
          <span role="columnheader" class="is-end">Valeur</span>
          <span role="columnheader">Variable</span>
        </div>
        <div
          v-for="(value, key) in letterSpacing"
          :key="key"
          class="tracking-table__row"
          role="row"
        >
          <span role="cell" class="tracking-table__title" :style="{ letterSpacing: `${value}em` }">
            Typographie
          </span>
          <span role="cell" class="tracking-table__caps" :style="{ letterSpacing: `${value}em` }">
            SURTITRE
          </span>
          <strong role="cell">{{ key }}</strong>
          <span role="cell" class="numeric is-end">{{ value }} em</span>
          <span role="cell"><TokenCode :value="`--ns-tracking-${key}`" /></span>
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Lisibilité</h2>
        <p>
          Une ligne confortable compte de 45 à 80 caractères. Les montants s'alignent avec des
          chiffres de largeur égale, et les liens gardent un soulignement visible et décalé.
        </p>
      </header>
      <div class="measure-list lab-preview">
        <article v-for="(value, key) in measure" :key="key" class="measure-row">
          <header class="measure-row__head">
            <strong>{{ key }}</strong>
            <span class="measure-row__chars">{{ value }} caractères par ligne</span>
            <TokenCode :value="`--ns-measure-${key}`" />
          </header>
          <div class="measure-row__track">
            <p :style="{ maxInlineSize: `var(--ns-measure-${key})` }">{{ paragraph }}</p>
          </div>
        </article>
      </div>
      <div class="readability-grid lab-preview">
        <article class="read-card">
          <header>
            <h3>Chiffres tabulaires</h3>
            <p>Chaque chiffre a la même largeur : les colonnes de montants s'alignent.</p>
          </header>
          <div class="numbers">
            <div class="numbers__col">
              <small>Proportionnels</small>
              <span v-for="amount in amounts" :key="amount">{{ amount }}</span>
              <strong>{{ total }}</strong>
            </div>
            <div class="numbers__col numbers__col--tabular">
              <small>Tabulaires</small>
              <span v-for="amount in amounts" :key="amount">{{ amount }}</span>
              <strong>{{ total }}</strong>
            </div>
          </div>
          <footer>
            <code>tabular-nums</code>
            <span class="muted">dans les styles</span>
            <TokenCode value="ns-text-stat" />
            <TokenCode value="ns-text-price" />
          </footer>
        </article>
        <article class="read-card">
          <header>
            <h3>Soulignement des liens</h3>
            <p>Un trait fin et décalé du texte, plus épais au survol, jamais retiré.</p>
          </header>
          <ul class="link-states">
            <li>
              <small>Au repos</small>
              <a href="#" class="link-demo" @click.prevent>Voir l'historique</a>
              <span class="numeric">{{ primitives.typography.underline.thickness }} px</span>
            </li>
            <li>
              <small>Survol</small>
              <a href="#" class="link-demo is-hover" @click.prevent>Voir l'historique</a>
              <span class="numeric">{{ primitives.typography.underline.hoverThickness }} px</span>
            </li>
            <li>
              <small>Visité</small>
              <a href="#" class="link-demo is-visited" @click.prevent>Voir l'historique</a>
              <span class="numeric">{{ primitives.typography.underline.thickness }} px</span>
            </li>
          </ul>
          <footer>
            <TokenCode value="--ns-underline-thickness" />
            <TokenCode value="--ns-underline-offset" />
            <span class="muted">décalé de {{ primitives.typography.underline.offset }} px</span>
          </footer>
        </article>
      </div>
    </section>
  </div>
</template>
