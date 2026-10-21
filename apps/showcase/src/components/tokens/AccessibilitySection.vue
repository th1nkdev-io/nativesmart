<script setup lang="ts">
import {
  brandThemes,
  checkContrast,
  contrastRatio,
  cssColorVariable,
  forcedColor,
  primitives,
  reachContrast,
  semanticColorRoles,
  type SemanticColorRole
} from "@nativesmart/tokens";
import { computed, reactive } from "vue";
import { state } from "../../state";
import TokenCode from "./TokenCode.vue";

const { accessibility } = primitives;
const colors = computed(() => brandThemes[state.brand].colors[state.mode]);

/* Thresholds, each shown with the faintest gray that still reaches it. */
const thresholds = computed(() =>
  (
    [
      { key: "largeText", label: "Grand texte", detail: "24 px, ou 18,66 px en gras" },
      { key: "ui", label: "Interface", detail: "Contours, icônes, focus" },
      { key: "text", label: "Texte", detail: "Niveau AA, tout le texte courant" },
      { key: "enhanced", label: "Renforcé", detail: "Niveau AAA, lecture longue" }
    ] as const
  ).map((item) => {
    const minimum = accessibility.contrast[item.key];
    const { surface, text } = colors.value;
    const color = reachContrast(surface, text, [surface], minimum);
    return { ...item, minimum, color, ratio: contrastRatio(color, surface) };
  })
);

/* High contrast themes, next to the standard one of the current mode. */
const hcVariants = computed(() => [
  { label: "Standard", detail: "AA : 4,5:1 pour le texte", theme: undefined },
  {
    label: "Contraste élevé",
    detail: "AAA : 7:1 pour le texte, 4,5:1 pour les bordures",
    theme: state.mode === "dark" ? "dark-hc" : "light-hc"
  }
]);
const hcSummary = computed(() => {
  const results = Object.values(brandThemes).flatMap((theme) => checkContrast(theme, true));
  return {
    total: results.length,
    pass: results.filter((result) => result.ratio >= result.minimum).length
  };
});

/* System preferences, simulated on the preview below. */
const prefs = reactive({ contrast: false, transparency: false, motion: false, forced: false });
const forcedStyle = computed(() =>
  prefs.forced
    ? Object.fromEntries(
        semanticColorRoles.map((role) => [cssColorVariable(role), forcedColor(role)])
      )
    : {}
);

const forcedSamples: SemanticColorRole[] = [
  "background",
  "text",
  "textMuted",
  "border",
  "primary",
  "onPrimary",
  "dangerMuted",
  "onDangerMuted",
  "textLink",
  "focusRing",
  "highlight",
  "surfaceDisabled"
];

const attributes = [
  {
    name: "data-ns-contrast",
    values: '"more" · "normal"',
    media: "prefers-contrast: more",
    effect: "Textes secondaires plus foncés, bordures à 3:1, focus de 3 px"
  },
  {
    name: "data-ns-transparency",
    values: '"reduce" · "full"',
    media: "prefers-reduced-transparency",
    effect: "Matières opaques, sans flou"
  },
  {
    name: "data-ns-motion",
    values: '"reduce" · "full"',
    media: "prefers-reduced-motion",
    effect: "Durées courtes, sans déplacement, ressorts sans rebond"
  },
  {
    name: "—",
    values: "automatique",
    media: "forced-colors: active",
    effect: "Chaque rôle prend une couleur système Windows"
  }
];
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Seuils de contraste</h2>
        <p>
          Les ratios que chaque identité doit tenir, vérifiés à la compilation. Chaque exemple est
          écrit avec le gris le plus clair qui atteint tout juste le seuil sur une surface de
          l'identité.
        </p>
      </header>
      <div class="threshold-grid lab-preview">
        <article v-for="item in thresholds" :key="item.key" class="threshold">
          <span class="threshold__ratio">{{ String(item.minimum).replace(".", ",") }}:1</span>
          <p :style="{ color: item.color }">Le transfert est arrivé.</p>
          <strong>{{ item.label }}</strong>
          <small class="muted">{{ item.detail }}</small>
          <small class="numeric">
            {{ item.color }} · {{ item.ratio.toFixed(2).replace(".", ",") }}:1
          </small>
        </article>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Tailles minimales</h2>
        <p>Des planchers que les composants ne franchissent jamais.</p>
      </header>
      <div class="minimum-grid">
        <article class="minimum">
          <strong class="minimum__value">{{ accessibility.minimumFontSize }} px</strong>
          <span>Plus petit texte</span>
          <small class="muted"
            >Compteurs et pastilles seulement ; le texte courant reste à 14 px et plus.</small
          >
        </article>
        <article class="minimum">
          <strong class="minimum__value">{{ accessibility.inputFontSize }} px</strong>
          <span>Texte des champs sur mobile</span>
          <small class="muted">En dessous, iOS zoome sur le champ quand il prend le focus.</small>
          <TokenCode value="--ns-input-font-size" />
        </article>
        <article class="minimum">
          <strong class="minimum__value">{{ primitives.sizing.touchTargets.minimum }} px</strong>
          <span>Cible tactile</span>
          <small class="muted">Minimum WCAG 2.2 ; 44 px conseillés, 48 px sur Android.</small>
          <TokenCode value="--ns-touch-target-minimum" />
        </article>
        <article class="minimum">
          <strong class="minimum__value">{{ accessibility.targetSpacing }} px</strong>
          <span>Entre deux cibles</span>
          <small class="muted">Pour ne pas toucher la mauvaise action du bout du doigt.</small>
          <TokenCode value="--ns-target-spacing" />
        </article>
        <article class="minimum">
          <strong class="minimum__value">{{ accessibility.maxAutoplay / 1000 }} s</strong>
          <span>Animation sans pause</span>
          <small class="muted"
            >Au-delà, l'utilisateur doit pouvoir la mettre en pause (2.2.2).</small
          >
        </article>
        <article class="minimum">
          <strong class="minimum__value">&lt; {{ accessibility.maxFlashes }}</strong>
          <span>Flashs par seconde</span>
          <small class="muted">Jamais atteint, pour les personnes photosensibles (2.3.1).</small>
        </article>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Préférences du système</h2>
        <p>
          Les tokens suivent les réglages d'accessibilité de l'appareil, sans une ligne de code dans
          les composants. Activez-les pour voir l'aperçu changer.
        </p>
      </header>
      <div class="prefs">
        <div class="prefs__toggles">
          <label class="motion-toggle">
            <input v-model="prefs.contrast" type="checkbox" class="switch" />
            Contraste élevé
          </label>
          <label class="motion-toggle">
            <input v-model="prefs.transparency" type="checkbox" class="switch" />
            Réduire la transparence
          </label>
          <label class="motion-toggle">
            <input v-model="prefs.motion" type="checkbox" class="switch" />
            Réduire les animations
          </label>
          <label class="motion-toggle">
            <input v-model="prefs.forced" type="checkbox" class="switch" />
            Couleurs forcées (Windows)
          </label>
        </div>
        <div class="lab-preview">
          <div
            class="prefs__preview"
            :data-ns-contrast="prefs.contrast ? 'more' : undefined"
            :data-ns-transparency="prefs.transparency ? 'reduce' : undefined"
            :data-ns-motion="prefs.motion ? 'reduce' : undefined"
            :style="forcedStyle"
          >
            <article class="prefs__card">
              <header>
                <strong>Virement programmé</strong>
                <span class="prefs__badge">Actif</span>
              </header>
              <p>Chaque mois, le 5, vers le compte épargne. Modifiable à tout moment.</p>
              <span class="prefs__field">Montant · 25 000 FCFA</span>
              <div class="prefs__actions">
                <span class="prefs__button">Modifier</span>
                <span class="prefs__link">Voir l'historique</span>
              </div>
            </article>
            <div class="prefs__glass">
              <span class="prefs__glass-blob" aria-hidden="true" />
              <div class="prefs__glass-panel">
                <strong>Matière</strong>
                <small>Flou et transparence</small>
              </div>
            </div>
            <div class="prefs__motion">
              <span class="prefs__mover ns-animate-pulse" />
              <span class="prefs__slider" />
            </div>
          </div>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Réglage du système</th>
              <th>Forcer sur un élément</th>
              <th>Effet</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in attributes" :key="item.media">
              <td>
                <code>{{ item.media }}</code>
              </td>
              <td>
                <code v-if="item.name !== '—'">{{ item.name }}</code>
                <small class="muted"> {{ item.values }}</small>
              </td>
              <td>{{ item.effect }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Thèmes contraste élevé</h2>
        <p>
          Chaque identité a aussi une version contraste élevé, en clair et en sombre : fond pur,
          texte à 7:1 (AAA), bordures à 4,5:1, teintes de la marque conservées. Activez-la avec
          <code>data-ns-theme="light-hc"</code> ou <code>"dark-hc"</code>, par exemple depuis un
          réglage de l'app.
        </p>
      </header>
      <div class="hc-compare lab-preview">
        <figure v-for="variant in hcVariants" :key="variant.label">
          <div class="hc-sample" :data-ns-theme="variant.theme">
            <header>
              <strong>Virement programmé</strong>
              <span class="hc-sample__badge">Actif</span>
            </header>
            <p>Chaque mois, le 5, vers le compte épargne.</p>
            <span class="hc-sample__field">Montant · 25 000 FCFA</span>
            <div class="hc-sample__actions">
              <span class="hc-sample__button">Modifier</span>
              <span class="hc-sample__soft">Plus tard</span>
              <span class="hc-sample__link">Historique</span>
            </div>
          </div>
          <figcaption>
            <strong>{{ variant.label }}</strong>
            <small class="muted">{{ variant.detail }}</small>
          </figcaption>
        </figure>
      </div>
      <p class="token-note">
        {{ hcSummary.pass }} paires sur {{ hcSummary.total }} atteignent leur cible en contraste
        élevé, sans exception, pour les trois identités et les deux modes.
      </p>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Couleurs forcées</h2>
        <p>
          En mode contraste élevé de Windows, le navigateur impose ses couleurs. Les rôles basculent
          sur les couleurs système, pour que les indicateurs dessinés en couleur restent visibles.
        </p>
      </header>
      <div class="forced-grid">
        <div v-for="role in forcedSamples" :key="role" class="forced-row">
          <code>{{ role }}</code>
          <span class="forced-row__arrow" aria-hidden="true">→</span>
          <span class="forced-row__swatch" :style="{ background: forcedColor(role) }" />
          <strong>{{ forcedColor(role) }}</strong>
        </div>
      </div>
    </section>
  </div>
</template>
