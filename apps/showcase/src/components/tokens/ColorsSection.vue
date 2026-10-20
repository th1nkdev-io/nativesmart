<script setup lang="ts">
import {
  brandThemes,
  checkContrast,
  colorSteps,
  contrastLevel,
  cssColorVariable,
  kebab,
  palette,
  type SemanticColorRole
} from "@nativesmart/tokens";
import { computed } from "vue";
import { state } from "../../state";
import TokenCode from "./TokenCode.vue";

const theme = computed(() => brandThemes[state.brand]);
const colors = computed(() => theme.value.colors[state.mode]);

const roleGroups: { title: string; description: string; roles: SemanticColorRole[] }[] = [
  {
    title: "Surfaces",
    description: "Fonds de page, cartes, zones en retrait et bordures.",
    roles: [
      "background",
      "surface",
      "surfaceMuted",
      "surfaceRaised",
      "border",
      "borderStrong",
      "overlay"
    ]
  },
  {
    title: "Texte",
    description: "Texte principal, secondaire et désactivé.",
    roles: ["text", "textMuted", "textDisabled"]
  },
  {
    title: "Primaire",
    description: "Couleur de marque : actions principales, liens, sélection.",
    roles: [
      "primary",
      "primaryHover",
      "primaryPressed",
      "onPrimary",
      "primaryMuted",
      "onPrimaryMuted"
    ]
  },
  {
    title: "Secondaire",
    description: "Couleur d'accent de la marque.",
    roles: [
      "secondary",
      "secondaryHover",
      "onSecondary",
      "secondaryMuted",
      "onSecondaryMuted",
      "accent"
    ]
  },
  {
    title: "Statuts",
    description: "Succès, avertissement, erreur et information, avec leurs fonds adoucis.",
    roles: [
      "success",
      "onSuccess",
      "successMuted",
      "onSuccessMuted",
      "warning",
      "onWarning",
      "warningMuted",
      "onWarningMuted",
      "danger",
      "dangerHover",
      "onDanger",
      "dangerMuted",
      "onDangerMuted",
      "info",
      "onInfo",
      "infoMuted",
      "onInfoMuted"
    ]
  },
  {
    title: "Système",
    description: "Anneau de focus et état hors ligne.",
    roles: ["focusRing", "offline"]
  }
];

/** Foreground roles are shown as text on the background they are made for. */
const pairedBackground: Partial<Record<SemanticColorRole, SemanticColorRole>> = {
  text: "surface",
  textMuted: "surface",
  textDisabled: "surface",
  onPrimary: "primary",
  onPrimaryMuted: "primaryMuted",
  onSecondary: "secondary",
  onSecondaryMuted: "secondaryMuted",
  onSuccess: "success",
  onSuccessMuted: "successMuted",
  onWarning: "warning",
  onWarningMuted: "warningMuted",
  onDanger: "danger",
  onDangerMuted: "dangerMuted",
  onInfo: "info",
  onInfoMuted: "infoMuted"
};

const contrast = computed(() =>
  checkContrast(theme.value).filter((result) => result.mode === state.mode)
);

const usageLabels: Record<string, string> = {
  "Page text": "Texte de la page",
  "Text on cards": "Texte sur les cartes",
  "Secondary text": "Texte secondaire",
  "Secondary text on cards": "Texte secondaire sur les cartes",
  "Links, outline buttons": "Liens, boutons contour",
  "Solid primary button": "Bouton primaire plein",
  "Selected item, soft primary badge": "Élément sélectionné, badge primaire doux",
  "Secondary button": "Bouton secondaire",
  "Soft secondary badge": "Badge secondaire doux",
  "Success button": "Bouton de succès",
  "Success alert and badge": "Alerte et badge de succès",
  "Warning button": "Bouton d'avertissement",
  "Warning alert and badge": "Alerte et badge d'avertissement",
  "Danger button": "Bouton de danger",
  "Error alert and badge": "Alerte et badge d'erreur",
  "Error messages": "Messages d'erreur",
  "Info button": "Bouton d'information",
  "Info alert and badge": "Alerte et badge d'information",
  "Focus indicator": "Indicateur de focus"
};

function levelClass(ratio: number, minimum: number, exception?: string) {
  if (ratio < minimum) return exception ? "level level--exception" : "level level--fail";
  return contrastLevel(ratio) === "AAA" ? "level level--aaa" : "level level--aa";
}

function levelLabel(ratio: number, minimum: number, exception?: string) {
  if (ratio < minimum) return exception ? "Exception" : "Échec";
  return minimum === 3 && ratio < 4.5 ? "AA (UI)" : contrastLevel(ratio);
}

const brandScales = computed(() => [
  { name: "primary", label: "Primaire", scale: theme.value.palette.primary },
  { name: "secondary", label: "Secondaire", scale: theme.value.palette.secondary },
  { name: "neutral", label: "Neutre", scale: theme.value.palette.neutral }
]);
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Rôles sémantiques</h2>
        <p>
          Les composants n'utilisent jamais une couleur brute : ils utilisent un rôle. Chaque
          identité donne une valeur à chaque rôle, en mode clair et en mode sombre. Cliquez sur une
          variable pour la copier.
        </p>
      </header>

      <div v-for="group in roleGroups" :key="group.title" class="token-group">
        <div class="token-group__title">
          <h3>{{ group.title }}</h3>
          <p>{{ group.description }}</p>
        </div>
        <div class="role-grid">
          <article v-for="role in group.roles" :key="role" class="role">
            <div
              class="role__preview"
              :style="{
                background: `var(${cssColorVariable(pairedBackground[role] ?? role)})`,
                color: pairedBackground[role] ? `var(${cssColorVariable(role)})` : undefined
              }"
            >
              <span v-if="pairedBackground[role]" class="role__sample">Aa</span>
            </div>
            <div class="role__meta">
              <strong>{{ role }}</strong>
              <span class="role__hex">{{ colors[role] }}</span>
            </div>
            <TokenCode :value="cssColorVariable(role)" />
            <span class="role__tailwind">ns-{{ kebab(role) }}</span>
          </article>
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Contraste</h2>
        <p>
          Chaque paire texte/fond est vérifiée selon WCAG 2.2 : 4,5:1 minimum pour le texte, 3:1
          pour les indicateurs visuels. La validation des tokens échoue si une paire passe sous le
          seuil sans exception documentée.
        </p>
      </header>
      <div class="table-wrap">
        <table class="contrast-table">
          <thead>
            <tr>
              <th>Aperçu</th>
              <th>Paire</th>
              <th>Usage</th>
              <th>Ratio</th>
              <th>Niveau</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in contrast" :key="`${result.foreground}-${result.background}`">
              <td>
                <span
                  class="contrast-sample"
                  :style="{
                    background: colors[result.background as SemanticColorRole],
                    color: colors[result.foreground as SemanticColorRole]
                  }"
                >
                  Aa Texte
                </span>
              </td>
              <td>
                <code>{{ result.foreground }}</code> sur <code>{{ result.background }}</code>
              </td>
              <td>
                {{ usageLabels[result.usage] ?? result.usage }}
                <small v-if="result.exception" class="contrast-exception">
                  {{ result.exception }}
                </small>
              </td>
              <td class="numeric">{{ result.ratio.toFixed(2) }}:1</td>
              <td>
                <span :class="levelClass(result.ratio, result.minimum, result.exception)">
                  {{ levelLabel(result.ratio, result.minimum, result.exception) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Palette de la marque</h2>
        <p>
          Les gammes de {{ theme.name }}, de 50 (le plus clair) à 950 (le plus foncé). Les rôles
          sémantiques sont choisis dans ces gammes.
        </p>
      </header>
      <div v-for="item in brandScales" :key="item.name" class="scale">
        <div class="scale__head">
          <h3>{{ item.label }}</h3>
          <TokenCode :value="`--ns-palette-${item.name}-500`" />
        </div>
        <div class="scale__steps">
          <div v-for="step in colorSteps" :key="step" class="scale__step">
            <span :style="{ background: item.scale[step] }" />
            <strong>{{ step }}</strong>
            <small>{{ item.scale[step] }}</small>
          </div>
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Palette de référence</h2>
        <p>
          Les 19 gammes communes à toutes les identités, alignées sur Tailwind CSS. Elles servent
          aux illustrations, graphiques et identités futures.
        </p>
      </header>
      <div class="reference">
        <div class="reference__row reference__row--head">
          <span />
          <small v-for="step in colorSteps" :key="step">{{ step }}</small>
        </div>
        <div v-for="(scale, name) in palette" :key="name" class="reference__row">
          <strong>{{ name }}</strong>
          <span
            v-for="step in colorSteps"
            :key="step"
            class="reference__swatch"
            :style="{ background: scale[step] }"
            :title="`${name}-${step} · ${scale[step]}`"
          />
        </div>
      </div>
    </section>
  </div>
</template>
