<script setup lang="ts">
import {
  primitives,
  brandThemes,
  checkContrast,
  colorIntents,
  colorRoleGroups,
  colorSteps,
  contrastLevel,
  cssColorVariable,
  gradients,
  intentRole,
  intentVariants,
  kebab,
  palette,
  semanticColorRoles,
  type ColorIntent,
  type SemanticColorRole
} from "@nativesmart/tokens";
import { computed, ref } from "vue";
import { state } from "../../state";
import {
  colorOrigin,
  contrastUsage,
  intentNames,
  intentUsages,
  isDerived,
  outlinedRoles,
  pairedBackground,
  roleUsages,
  variantNames
} from "./colorLabels";
import type { IconName } from "../../editorial/icons";
import SegControl from "./SegControl.vue";
import TokenCode from "./TokenCode.vue";

const theme = computed(() => brandThemes[state.brand]);
const colors = computed(() => theme.value.colors[state.mode]);
const derivedCount = semanticColorRoles.filter(isDerived).length;

/* Anatomy: one role followed from its primitive to a component variable. */
const anatomyExamples: {
  role: SemanticColorRole;
  component: string;
  owner: string;
  demo: "button" | "badge" | "input" | "link" | "menu";
}[] = [
  { role: "primary", component: "--ns-button-tone", owner: "NsButton", demo: "button" },
  {
    role: "onSuccessMuted",
    component: "--ns-badge-foreground",
    owner: "NsBadge · success",
    demo: "badge"
  },
  { role: "borderInput", component: "--ns-input-border", owner: "NsInput", demo: "input" },
  { role: "textLink", component: "--ns-link-color", owner: "NsLink", demo: "link" },
  { role: "surfaceFloating", component: "--ns-menu-background", owner: "NsMenu", demo: "menu" }
];
const anatomyIndex = ref(0);
const anatomyIcons: IconName[] = ["palette", "check", "inset", "type", "layers"];
const anatomyOptions = anatomyExamples.map((example, index) => ({
  value: index,
  label: example.role,
  icon: anatomyIcons[index]
}));
const anatomy = computed(() => {
  const example = anatomyExamples[anatomyIndex.value];
  const hex = colors.value[example.role];
  return {
    ...example,
    hex,
    origin: colorOrigin(theme.value, hex),
    derived: isDerived(example.role)
  };
});

/* Role groups, intents apart. */
const groupText: Record<string, { title: string; description: string }> = {
  surfaces: {
    title: "Surfaces",
    description:
      "Du fond de la page aux calques flottants, avec leurs états survolé et sélectionné."
  },
  text: {
    title: "Texte",
    description: "Quatre niveaux de lecture, le texte inversé, de marque et les liens."
  },
  borders: {
    title: "Bordures",
    description: "Des séparateurs discrets au contour des champs, qui garde 3:1 sur la surface."
  },
  interaction: {
    title: "Interaction",
    description: "Focus clavier, sélection de texte et surlignage."
  },
  utility: {
    title: "Utilitaires",
    description: "Accent, infobulles, squelettes de chargement et état hors ligne."
  }
};
const roleGroups = colorRoleGroups
  .filter((group) => group.id !== "intents")
  .map((group) => ({ ...group, ...groupText[group.id] }));

function rolePreview(role: SemanticColorRole) {
  const paired = pairedBackground[role];
  if (paired) {
    return {
      background: `var(${cssColorVariable(paired)})`,
      color: `var(${cssColorVariable(role)})`
    };
  }
  if (outlinedRoles.has(role)) {
    return {
      background: "var(--ns-color-surface)",
      boxShadow: `inset 0 0 0 2px var(${cssColorVariable(role)})`
    };
  }
  return { background: `var(${cssColorVariable(role)})` };
}

/* Intents */
const activeIntent = ref<ColorIntent>("primary");
const intentVar = (intent: ColorIntent, variant: (typeof intentVariants)[number]) =>
  `var(${cssColorVariable(intentRole(intent, variant))})`;
const specimenStyle = computed(() =>
  Object.fromEntries(
    intentVariants.map((variant) => [
      `--i-${kebab(variant)}`,
      intentVar(activeIntent.value, variant)
    ])
  )
);

/* Contrast */
const contrastFilters = [
  { value: "all", label: "Toutes", icon: "layers" },
  { value: "intents", label: "Intentions", icon: "palette" },
  { value: "text", label: "Textes et surfaces", icon: "type" },
  { value: "ui", label: "Indicateurs 3:1", icon: "target" }
] as const;
const contrastFilter = ref<(typeof contrastFilters)[number]["value"]>("all");
const contrast = computed(() =>
  checkContrast(theme.value)
    .filter((result) => result.mode === state.mode)
    .map((result) => ({ ...result, ...contrastUsage(result) }))
);
const visibleContrast = computed(() =>
  contrast.value.filter((result) => {
    if (contrastFilter.value === "intents") return result.intent;
    if (contrastFilter.value === "ui") return result.minimum === 3;
    if (contrastFilter.value === "text") return !result.intent && result.minimum === 4.5;
    return true;
  })
);
const contrastSummary = computed(() => ({
  total: contrast.value.length,
  aaa: contrast.value.filter((result) => result.minimum === 4.5 && result.ratio >= 7).length,
  exceptions: contrast.value.filter((result) => result.ratio < result.minimum).length
}));

function levelClass(ratio: number, minimum: number, exception?: string) {
  if (ratio < minimum) return exception ? "level level--exception" : "level level--fail";
  return contrastLevel(ratio) === "AAA" ? "level level--aaa" : "level level--aa";
}

function levelLabel(ratio: number, minimum: number, exception?: string) {
  if (ratio < minimum) return exception ? "Exception" : "Échec";
  return minimum === 3 && ratio < 4.5 ? "AA (UI)" : contrastLevel(ratio);
}

/* Gradients and translucency */
const gradientNames: Record<keyof typeof gradients, string> = {
  brand: "Marque",
  brandSoft: "Marque adoucie",
  brandDeep: "Marque profonde",
  surface: "Surface"
};
const alphaSteps = Object.entries(primitives.alpha);

const brandScales = computed(() => [
  { name: "primary", label: "Primaire", scale: theme.value.palette.primary },
  { name: "secondary", label: "Secondaire", scale: theme.value.palette.secondary },
  { name: "neutral", label: "Neutre", scale: theme.value.palette.neutral }
]);
</script>

<template>
  <div class="token-sections">
    <!-- Anatomy -->
    <section class="token-section">
      <header class="token-section__header">
        <h2>Trois niveaux, une seule source</h2>
        <p>
          Une valeur brute de la palette devient un rôle sémantique, que chaque composant reprend
          sous son propre nom. {{ theme.name }} écrit
          {{ semanticColorRoles.length - derivedCount }} rôles ; les {{ derivedCount }} autres sont
          dérivés automatiquement, et chacun peut être surchargé.
        </p>
      </header>

      <div class="anatomy">
        <SegControl v-model="anatomyIndex" :options="anatomyOptions" label="Exemple" />

        <ol class="anatomy__flow">
          <li class="anatomy__tier">
            <span class="anatomy__step">1 · Primitive</span>
            <span class="anatomy__swatch lab-preview" :style="{ background: anatomy.hex }" />
            <strong>{{ anatomy.origin ?? "Valeur calculée" }}</strong>
            <code class="anatomy__value">{{ anatomy.hex }}</code>
            <small>
              {{
                anatomy.origin
                  ? "Un pas d'une gamme : jamais utilisé tel quel par un composant."
                  : "Obtenue par mélange ou par recherche du contraste minimal."
              }}
            </small>
          </li>
          <li class="anatomy__tier anatomy__tier--focus">
            <span class="anatomy__step">2 · Sémantique</span>
            <span
              class="anatomy__swatch lab-preview"
              :style="{ background: `var(${cssColorVariable(anatomy.role)})` }"
            />
            <strong>{{ anatomy.role }}</strong>
            <TokenCode :value="cssColorVariable(anatomy.role)" />
            <small>
              {{ roleUsages[anatomy.role] ?? "Couleur d'intention" }} ·
              <span :class="['tag-derived', { 'tag-derived--core': !anatomy.derived }]">
                {{ anatomy.derived ? "dérivé" : "écrit par l'identité" }}
              </span>
            </small>
          </li>
          <li class="anatomy__tier">
            <span class="anatomy__step">3 · Composant</span>
            <span class="anatomy__demo lab-preview">
              <span v-if="anatomy.demo === 'button'" class="demo-button">Continuer</span>
              <span v-else-if="anatomy.demo === 'badge'" class="demo-badge">Actif</span>
              <span v-else-if="anatomy.demo === 'input'" class="demo-input">Votre e-mail</span>
              <span v-else-if="anatomy.demo === 'link'" class="demo-link">Lire la suite</span>
              <span v-else class="demo-menu"><i /><i /><i /></span>
            </span>
            <strong>{{ anatomy.owner }}</strong>
            <code class="anatomy__value">{{ anatomy.component }}</code>
            <small>Le composant expose sa variable : surchargez-la pour un cas précis.</small>
          </li>
        </ol>
      </div>
    </section>

    <!-- Roles -->
    <section class="token-section">
      <header class="token-section__header">
        <h2>Rôles sémantiques</h2>
        <p>
          Les composants n'utilisent jamais une couleur brute : ils utilisent un rôle. Cliquez sur
          une variable pour la copier. Les rôles marqués « dérivé » sont calculés à partir de
          l'identité.
        </p>
      </header>

      <div v-for="group in roleGroups" :key="group.id" class="token-group">
        <div class="token-group__title">
          <h3>{{ group.title }}</h3>
          <p>{{ group.description }}</p>
        </div>
        <div class="role-grid">
          <article v-for="role in group.roles" :key="role" class="role">
            <div class="role__preview lab-preview" :style="rolePreview(role)">
              <span v-if="pairedBackground[role]" class="role__sample">Aa</span>
              <span v-if="isDerived(role)" class="role__derived" title="Dérivé de l'identité">
                dérivé
              </span>
            </div>
            <div class="role__meta">
              <strong>{{ role }}</strong>
              <span class="role__hex">{{ colors[role] }}</span>
            </div>
            <p class="role__usage">{{ roleUsages[role] }}</p>
            <TokenCode :value="cssColorVariable(role)" />
          </article>
        </div>
      </div>
    </section>

    <!-- Intents -->
    <section class="token-section">
      <header class="token-section__header">
        <h2>Intentions</h2>
        <p>
          Sept intentions, neuf déclinaisons chacune, toujours les mêmes. Un composant change
          d'intention en changeant un seul préfixe : <code>danger</code>, <code>dangerHover</code>,
          <code>onDangerMuted</code>…
        </p>
      </header>

      <div class="intent-matrix">
        <div class="intent-matrix__row intent-matrix__row--head" aria-hidden="true">
          <span />
          <small v-for="variant in intentVariants" :key="variant">
            {{ variantNames[variant].label }}
          </small>
        </div>
        <button
          v-for="intent in colorIntents"
          :key="intent"
          type="button"
          class="intent-matrix__row"
          :aria-pressed="activeIntent === intent"
          @click="activeIntent = intent"
        >
          <span class="intent-matrix__name">
            <strong>{{ intentNames[intent] }}</strong>
            <small>{{ intent }}</small>
          </span>
          <span
            v-for="variant in intentVariants"
            :key="variant"
            class="intent-matrix__cell lab-preview"
            :title="`${intentRole(intent, variant)} · ${colors[intentRole(intent, variant)]}`"
            :style="{ background: intentVar(intent, variant) }"
          />
        </button>
      </div>

      <div class="specimen lab-preview" :style="specimenStyle">
        <div class="specimen__head">
          <div>
            <h3>{{ intentNames[activeIntent] }}</h3>
            <p>{{ intentUsages[activeIntent] }}</p>
          </div>
          <TokenCode :value="`--ns-color-${kebab(activeIntent)}-*`" />
        </div>
        <div class="specimen__grid">
          <figure>
            <div class="specimen__buttons">
              <span class="sp-button">Au repos</span>
              <span class="sp-button sp-button--hover">Survolé</span>
              <span class="sp-button sp-button--pressed">Pressé</span>
            </div>
            <figcaption>base · hover · pressed · on</figcaption>
          </figure>
          <figure>
            <div class="specimen__buttons">
              <span class="sp-soft">Doux</span>
              <span class="sp-soft sp-soft--hover">Survolé</span>
              <span class="sp-outline">Contour</span>
            </div>
            <figcaption>muted · mutedHover · onMuted · border</figcaption>
          </figure>
          <figure class="specimen__wide">
            <div class="sp-alert">
              <span class="sp-alert__icon" aria-hidden="true">!</span>
              <span>
                <strong>Message {{ intentNames[activeIntent].toLowerCase() }}</strong>
                Une alerte douce, son contour et son texte, sans une ligne de CSS spécifique.
              </span>
            </div>
            <figcaption>muted · border · onMuted</figcaption>
          </figure>
          <figure class="specimen__wide">
            <p class="sp-text">
              Le texte <strong>{{ intentRole(activeIntent, "text") }}</strong> reste lisible
              directement sur une surface, en clair comme en sombre.
            </p>
            <figcaption>text</figcaption>
          </figure>
        </div>
        <ul class="specimen__variants">
          <li v-for="variant in intentVariants" :key="variant">
            <span class="specimen__dot" :style="{ background: intentVar(activeIntent, variant) }" />
            <span>
              <strong>{{ intentRole(activeIntent, variant) }}</strong>
              <small>{{ variantNames[variant].usage }}</small>
            </span>
            <code>{{ colors[intentRole(activeIntent, variant)] }}</code>
          </li>
        </ul>
      </div>
    </section>

    <!-- Gradients and alpha -->
    <section class="token-section">
      <header class="token-section__header">
        <h2>Dégradés et translucides</h2>
        <p>
          Les dégradés reprennent des rôles : ils suivent l'identité et le mode. Les échelles
          translucides posent du contenu lisible sur une image ou une vidéo.
        </p>
      </header>
      <div class="gradient-grid">
        <article v-for="(gradient, name) in gradients" :key="name" class="gradient-card">
          <span
            class="gradient-card__swatch lab-preview"
            :style="{ background: `var(--ns-gradient-${kebab(name)})` }"
          />
          <strong>{{ gradientNames[name] }}</strong>
          <small>{{ gradient.angle }}° · {{ gradient.stops.join(" → ") }}</small>
          <TokenCode :value="`--ns-gradient-${kebab(name)}`" />
        </article>
      </div>
      <div class="alpha-ladders lab-preview">
        <div class="alpha-ladder alpha-ladder--white">
          <span
            v-for="[step, value] in alphaSteps"
            :key="step"
            :style="{ background: `var(--ns-alpha-white-${step})` }"
            :title="`--ns-alpha-white-${step} · ${value}`"
          >
            {{ step }}
          </span>
        </div>
        <div class="alpha-ladder alpha-ladder--black">
          <span
            v-for="[step, value] in alphaSteps"
            :key="step"
            :style="{ background: `var(--ns-alpha-black-${step})` }"
            :title="`--ns-alpha-black-${step} · ${value}`"
          >
            {{ step }}
          </span>
        </div>
      </div>
      <div class="token-inline">
        <TokenCode value="--ns-alpha-white-1" /> à <TokenCode value="--ns-alpha-white-12" /> et
        leurs équivalents noirs, de 2 % à 92 % d'opacité.
      </div>
    </section>

    <!-- Contrast -->
    <section class="token-section">
      <header class="token-section__header">
        <h2>Contraste</h2>
        <p>
          Chaque paire est vérifiée selon WCAG 2.2 à la compilation : 4,5:1 pour le texte, 3:1 pour
          les contours et indicateurs. Une paire sous le seuil sans exception documentée bloque la
          publication.
        </p>
      </header>
      <div class="contrast-summary">
        <span
          ><strong>{{ contrastSummary.total }}</strong> paires vérifiées</span
        >
        <span
          ><strong>{{ contrastSummary.aaa }}</strong> au niveau AAA</span
        >
        <span>
          <strong>{{ contrastSummary.exceptions }}</strong>
          {{ contrastSummary.exceptions > 1 ? "exceptions documentées" : "exception documentée" }}
        </span>
        <SegControl
          v-model="contrastFilter"
          class="seg--end"
          :options="contrastFilters"
          label="Filtrer les paires"
          compact
        />
      </div>
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
            <tr
              v-for="result in visibleContrast"
              :key="`${result.foreground}-${result.background}`"
            >
              <td>
                <span
                  :class="['contrast-sample', { 'contrast-sample--ui': result.minimum === 3 }]"
                  :style="
                    result.minimum === 3
                      ? {
                          background: colors[result.background as SemanticColorRole],
                          borderColor: colors[result.foreground as SemanticColorRole]
                        }
                      : {
                          background: colors[result.background as SemanticColorRole],
                          color: colors[result.foreground as SemanticColorRole]
                        }
                  "
                >
                  {{ result.minimum === 3 ? "" : "Aa Texte" }}
                </span>
              </td>
              <td>
                <code>{{ result.foreground }}</code> sur <code>{{ result.background }}</code>
              </td>
              <td>
                {{ result.label }}
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

    <!-- Palettes -->
    <section class="token-section">
      <header class="token-section__header">
        <h2>Palette de la marque</h2>
        <p>
          Les gammes de {{ theme.name }}, de 50 (le plus clair) à 950 (le plus foncé). Les rôles
          sémantiques sont choisis ou dérivés de ces gammes.
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
          Les {{ Object.keys(palette).length }} gammes communes à toutes les identités, alignées sur
          Tailwind CSS. Elles alimentent les graphiques, les avatars et les identités futures.
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
