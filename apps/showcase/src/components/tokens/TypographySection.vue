<script setup lang="ts">
import { brandThemes, primitives, textStyles, type TextStyleName } from "@nativesmart/tokens";
import { computed } from "vue";
import { state } from "../../state";
import TokenCode from "./TokenCode.vue";

const theme = computed(() => brandThemes[state.brand]);
const families = computed(() => [
  { key: "heading", label: "Titres", stack: theme.value.typography.fontFamily.heading },
  { key: "sans", label: "Texte", stack: theme.value.typography.fontFamily.sans },
  { key: "mono", label: "Code", stack: theme.value.typography.fontFamily.mono }
]);

const { fontSize, lineHeight, fontWeight, letterSpacing } = primitives.typography;
const styles = Object.entries(textStyles) as [TextStyleName, (typeof textStyles)[TextStyleName]][];

const descriptions: Record<TextStyleName, string> = {
  "display-lg": "Grands titres des pages vitrines",
  "display-md": "Ouvertures de section",
  h1: "Titre de page",
  h2: "Titre de section",
  h3: "Titre de sous-section",
  h4: "Titre de carte et de dialogue",
  h5: "Titre de groupe",
  h6: "Petit titre de groupe",
  "body-lg": "Paragraphes d'introduction",
  "body-md": "Texte de lecture par défaut",
  "body-sm": "Interfaces denses, texte secondaire",
  "label-lg": "Grands boutons et onglets",
  "label-md": "Boutons, champs, éléments de menu",
  "label-sm": "Badges, puces, petits contrôles",
  caption: "Aide, horodatages, légendes",
  overline: "Surtitres au-dessus des titres",
  code: "Code, identifiants, références"
};

const samples: Partial<Record<TextStyleName, string>> = {
  "display-lg": "Envoyez sans frontières",
  "display-md": "Votre argent, partout",
  overline: "Nouveau",
  code: "--ns-color-primary"
};

function spec(name: TextStyleName) {
  const style = textStyles[name];
  const tracking = letterSpacing[style.tracking];
  return [
    `${fontSize[style.size]}/${lineHeight[style.size]}`,
    `${fontWeight[style.weight]}`,
    tracking === 0 ? "0" : `${tracking}em`
  ].join(" · ");
}
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Familles</h2>
        <p>
          Trois familles par identité. Les polices de secours s'appliquent si la première manque.
        </p>
      </header>
      <div class="family-grid">
        <article v-for="family in families" :key="family.key" class="family">
          <span class="family__specimen" :style="{ fontFamily: `var(--ns-font-${family.key})` }">
            Aa
          </span>
          <div class="family__meta">
            <small>{{ family.label }}</small>
            <strong :style="{ fontFamily: `var(--ns-font-${family.key})` }">
              {{ family.stack[0] }}
            </strong>
            <span class="muted">{{ family.stack.slice(1).join(", ") }}</span>
            <TokenCode :value="`--ns-font-${family.key}`" />
          </div>
        </article>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Styles de texte</h2>
        <p>
          Chaque texte de l'interface utilise un style nommé, jamais une taille brute. Disponible en
          classe CSS (<code>.ns-text-h1</code>), en classe Tailwind (<code>text-ns-h1</code>) et en
          variables.
        </p>
      </header>
      <div class="type-list">
        <article v-for="[name, style] in styles" :key="name" class="type-row">
          <div class="type-row__sample">
            <p :class="`ns-text-${name}`">{{ samples[name] ?? "Paiement reçu de 25 000 FCFA" }}</p>
          </div>
          <div class="type-row__meta">
            <strong>{{ name }}</strong>
            <span class="muted">{{ descriptions[name] }}</span>
            <span class="type-row__spec">{{ spec(name) }} · {{ style.family }}</span>
            <TokenCode :value="`ns-text-${name}`" />
          </div>
        </article>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Échelle</h2>
        <p>Tailles et interlignes de base, en pixels, sur lesquels reposent les styles.</p>
      </header>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Clé</th>
              <th>Taille</th>
              <th>Interligne</th>
              <th>Variable</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(size, key) in fontSize" :key="key">
              <td>
                <span :style="{ fontSize: `${size}px`, lineHeight: 1.2 }">{{ key }}</span>
              </td>
              <td class="numeric">{{ size }}px</td>
              <td class="numeric">{{ lineHeight[key] }}px</td>
              <td><TokenCode :value="`--ns-font-size-${key}`" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="weights">
        <div v-for="(weight, key) in fontWeight" :key="key" class="weight">
          <span :style="{ fontWeight: weight }">Aa</span>
          <small>{{ key }} · {{ weight }}</small>
        </div>
      </div>
    </section>
  </div>
</template>
