<script setup lang="ts">
import { brandThemes, primitives, stateLayers, type StateLayer } from "@nativesmart/tokens";
import { computed, ref } from "vue";
import { state } from "../../state";
import TokenCode from "./TokenCode.vue";

const colors = computed(() => brandThemes[state.brand].colors[state.mode]);

const stateNames: Record<StateLayer, { label: string; usage: string }> = {
  hover: { label: "Survol", usage: "Le pointeur passe sur l'élément" },
  focus: { label: "Focus", usage: "Élément atteint au clavier" },
  pressed: { label: "Pression", usage: "Pendant le clic ou l'appui" },
  selected: { label: "Sélection", usage: "Élément choisi dans une liste" },
  dragged: { label: "Glisser", usage: "Élément en cours de déplacement" }
};

const contexts = [
  { id: "surface", label: "Sur une surface", bg: "--ns-color-surface", fg: "--ns-color-text" },
  {
    id: "muted",
    label: "Sur un fond doux",
    bg: "--ns-color-primary-muted",
    fg: "--ns-color-on-primary-muted"
  },
  { id: "solid", label: "Sur un plein", bg: "--ns-color-primary", fg: "--ns-color-on-primary" }
];

const layers = ["rest", ...stateLayers] as const;

/* Live list */
const items = ["Tableau de bord", "Candidatures", "Messages", "Paramètres"];
const selected = ref(1);

/* Inputs */
const fields = [
  { id: "rest", label: "Au repos", hint: "borderInput" },
  { id: "hover", label: "Survolé", hint: "borderInputHover" },
  { id: "focus", label: "Actif", hint: "borderFocus + focusRing" },
  { id: "error", label: "Erreur", hint: "danger + dangerText" },
  { id: "disabled", label: "Désactivé", hint: "surfaceDisabled · textDisabled" }
];
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Calques d'état</h2>
        <p>
          Survol, focus, pression, sélection et glisser ne demandent aucune nouvelle couleur : un
          calque de la couleur du contenu, à faible opacité, se pose sur n'importe quel fond. Le
          même token fonctionne sur une surface, un fond doux ou un bouton plein, dans toutes les
          identités.
        </p>
      </header>

      <div class="layer-board lab-preview">
        <div class="layer-board__row layer-board__row--head" aria-hidden="true">
          <span />
          <small v-for="layer in layers" :key="layer">
            {{ layer === "rest" ? "Repos" : stateNames[layer].label }}
          </small>
        </div>
        <div v-for="context in contexts" :key="context.id" class="layer-board__row">
          <strong>{{ context.label }}</strong>
          <span
            v-for="layer in layers"
            :key="layer"
            class="layer-tile"
            :style="{
              background: `var(${context.bg})`,
              color: `var(${context.fg})`,
              '--layer': layer === 'rest' ? 'transparent' : `var(--ns-state-${layer})`
            }"
          >
            Aa
          </span>
        </div>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>État</th>
              <th>Opacité</th>
              <th>Quand</th>
              <th>Variable</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="layer in stateLayers" :key="layer">
              <td>
                <strong>{{ stateNames[layer].label }}</strong>
              </td>
              <td class="numeric">{{ Math.round(primitives.opacity[layer] * 100) }} %</td>
              <td>{{ stateNames[layer].usage }}</td>
              <td><TokenCode :value="`--ns-state-${layer}`" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Essayez</h2>
        <p>
          Survolez, cliquez, ou naviguez avec Tab et Entrée : chaque état vient des tokens
          ci-dessus, sans couleur ajoutée.
        </p>
      </header>
      <div class="try-grid lab-preview">
        <ul class="try-list" role="listbox" aria-label="Exemple de liste">
          <li
            v-for="(item, index) in items"
            :key="item"
            role="option"
            tabindex="0"
            :aria-selected="selected === index"
            @click="selected = index"
            @keydown.enter.space.prevent="selected = index"
          >
            <span class="try-list__dot" aria-hidden="true" />
            {{ item }}
          </li>
        </ul>
        <div class="try-buttons">
          <button type="button" class="try-button try-button--solid">Plein</button>
          <button type="button" class="try-button try-button--soft">Doux</button>
          <button type="button" class="try-button try-button--ghost">Discret</button>
          <button type="button" class="try-button try-button--solid" disabled>Désactivé</button>
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Focus</h2>
        <p>
          L'anneau de focus garde 3:1 sur le fond de page et sur les cartes. Son épaisseur et son
          décalage sont fixes, pour qu'il ne soit jamais masqué par un contour.
        </p>
      </header>
      <div class="focus-demo lab-preview">
        <span class="focus-demo__item">Sur la page</span>
        <span class="focus-demo__item focus-demo__item--card">Sur une carte</span>
        <span class="focus-demo__item focus-demo__item--solid">Sur un plein</span>
      </div>
      <div class="token-inline">
        <TokenCode value="--ns-color-focus-ring" />
        <TokenCode value="--ns-focus-ring-width" />
        <TokenCode value="--ns-focus-ring-offset" />
        <span class="muted">
          {{ primitives.borders.focusRing.width }} px, décalé de
          {{ primitives.borders.focusRing.offset }} px
        </span>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Champs</h2>
        <p>
          Le contour d'un champ est le plus clair possible tout en gardant 3:1 sur la surface (WCAG
          1.4.11) : {{ colors.borderInput }} pour cette identité.
        </p>
      </header>
      <div class="field-grid lab-preview">
        <label v-for="field in fields" :key="field.id" :class="['field', `field--${field.id}`]">
          <span class="field__label">{{ field.label }}</span>
          <span class="field__box">
            <span class="field__value">{{
              field.id === "rest" || field.id === "hover" ? "Votre e-mail" : "ada@exemple.com"
            }}</span>
          </span>
          <span class="field__hint">
            {{ field.id === "error" ? "Adresse invalide" : field.hint }}
          </span>
        </label>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Sélection, surlignage et liens</h2>
        <p>Sélectionnez ce texte : la couleur de sélection vient de l'identité.</p>
      </header>
      <div class="reading-demo lab-preview">
        <p>
          NativeSmart décrit chaque composant une fois, puis le livre dans chaque technologie.
          <mark>Le surlignage</mark> marque un résultat de recherche ;
          <a href="#" class="reading-demo__link" @click.prevent>un lien</a>,
          <a href="#" class="reading-demo__link reading-demo__link--hover" @click.prevent>
            un lien survolé
          </a>
          et
          <a href="#" class="reading-demo__link reading-demo__link--visited" @click.prevent>
            un lien visité
          </a>
          gardent tous 4,5:1.
        </p>
        <div class="token-inline">
          <TokenCode value="--ns-color-selection" />
          <TokenCode value="--ns-color-highlight" />
          <TokenCode value="--ns-color-text-link" />
          <TokenCode value="--ns-color-text-link-visited" />
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Désactivé</h2>
        <p>
          Deux approches : des couleurs dédiées pour les champs, une opacité de
          {{ primitives.opacity.disabled }} pour le reste. Les éléments désactivés sont exemptés du
          contraste minimal, mais restent identifiables.
        </p>
      </header>
      <div class="disabled-demo lab-preview">
        <span class="disabled-demo__field">Champ désactivé</span>
        <span class="disabled-demo__button">Bouton désactivé</span>
        <span class="disabled-demo__check" aria-hidden="true" />
      </div>
      <div class="token-inline">
        <TokenCode value="--ns-color-surface-disabled" />
        <TokenCode value="--ns-color-border-disabled" />
        <TokenCode value="--ns-color-text-disabled" />
        <TokenCode value="--ns-opacity-disabled" />
      </div>
    </section>
  </div>
</template>
