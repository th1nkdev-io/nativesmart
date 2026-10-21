<script setup lang="ts">
import {
  brandThemes,
  checkContrast,
  contrastPairs,
  primitives,
  type BrandTheme
} from "@nativesmart/tokens";
import { computed } from "vue";
import ContrastArt from "../editorial/art/ContrastArt.vue";
import EditorialPage from "../editorial/EditorialPage.vue";
import Icon from "../editorial/Icon.vue";
import type { IconName } from "../editorial/icons";
import PageHero from "../editorial/PageHero.vue";
import SectionHead from "../editorial/SectionHead.vue";
import { openPage, state } from "../state";

const themes = Object.values(brandThemes) as BrandTheme[];
const checks = themes.length * contrastPairs.length * 2;

const pillars: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "contrast",
    title: "Contraste vérifié au build",
    text: `${contrastPairs.length} paires texte/fond par identité, en clair et en sombre : 4,5:1 pour le texte, 3:1 pour les indicateurs. Un écart non documenté fait échouer le build.`
  },
  {
    icon: "keyboard",
    title: "Clavier d'abord",
    text: "Tab, Entrée, Espace, flèches et Échap selon le rôle du composant. Les touches attendues sont écrites dans son contrat."
  },
  {
    icon: "focus",
    title: "Focus toujours visible",
    text: `Un anneau de ${primitives.borders.focusRing.width} px, décalé de ${primitives.borders.focusRing.offset} px, dans la couleur focusRing de l'identité.`
  },
  {
    icon: "hand",
    title: "Cibles tactiles généreuses",
    text: `Toute cible interactive mesure au moins ${primitives.sizing.touchTarget} × ${primitives.sizing.touchTarget} px, même si son dessin est plus petit.`
  },
  {
    icon: "accessibility",
    title: "Rôles et états exposés",
    text: "Chaque contrat déclare son rôle ARIA et ses états (désactivé, occupé, invalide…), que chaque technologie doit restituer."
  },
  {
    icon: "wave",
    title: "Mouvement maîtrisé",
    text: "Les animations s'effacent quand le système demande de les réduire. Ce Lab le fait aussi."
  }
];

const results = computed(() => checkContrast(brandThemes[state.brand]));
const passing = computed(
  () => results.value.filter((item) => item.ratio >= item.minimum || item.exception).length
);
const sample = computed(() => results.value.filter((item) => item.mode === state.mode).slice(0, 8));
const colors = computed(() => brandThemes[state.brand].colors[state.mode]);

const exceptions = themes.flatMap((theme) =>
  (theme.contrastExceptions ?? []).map((item) => ({ theme: theme.name, ...item }))
);

const labChecks: {
  icon: IconName;
  title: string;
  text: string;
  action: () => void;
  label: string;
}[] = [
  {
    icon: "direction",
    title: "Droite à gauche",
    text: "La mise en page se retourne pour l'arabe et l'hébreu.",
    action: () => (state.dir = "rtl"),
    label: "Passer en RTL"
  },
  {
    icon: "hand",
    title: "Densité spacieuse",
    text: "Des contrôles plus grands pour le tactile et la basse vision.",
    action: () => (state.density = "spacious"),
    label: "Activer"
  },
  {
    icon: "moon",
    title: "Mode sombre",
    text: "Contrastes et ombres recalculés pour le noir.",
    action: () => (state.mode = "dark"),
    label: "Passer en sombre"
  },
  {
    icon: "keyboard",
    title: "Clavier seul",
    text: "Parcourez un aperçu avec Tab et observez l'anneau de focus.",
    action: () => openPage("button"),
    label: "Ouvrir Button"
  }
];
</script>

<template>
  <EditorialPage>
    <PageHero
      eyebrow="Accessibilité"
      icon="accessibility"
      lead="NativeSmart vise WCAG 2.2 niveau AA sur toutes les technologies. Les règles sont écrites dans les tokens et les contrats, puis vérifiées automatiquement à chaque build. Pas de promesse : des preuves."
    >
      <template #title>
        Accessible par défaut, <span class="ed-gradient">vérifié au build.</span>
      </template>
      <template #meta>
        <span><Icon name="check" :size="16" /> WCAG 2.2 AA</span>
        <span><Icon name="check" :size="16" /> {{ checks }} contrôles de contraste</span>
        <span><Icon name="check" :size="16" /> RTL natif</span>
      </template>
      <template #art>
        <ContrastArt />
      </template>
    </PageHero>

    <div v-reveal class="ed-stats">
      <div class="ed-stat">
        <strong v-count="checks">{{ checks }}</strong>
        <span>contrôles de contraste</span>
      </div>
      <div class="ed-stat">
        <strong>
          <span v-count="primitives.sizing.touchTarget">{{ primitives.sizing.touchTarget }}</span
          ><small class="ed-unit">px</small>
        </strong>
        <span>cible tactile minimale</span>
      </div>
      <div class="ed-stat">
        <strong>4,5<small class="ed-unit">:1</small></strong>
        <span>contraste minimal du texte</span>
      </div>
    </div>

    <section class="ed-section">
      <SectionHead
        kicker="Nos engagements"
        icon="shield"
        title="Six règles, sur chaque composant"
        lead="Elles ne dépendent pas de la bonne volonté de chacun : elles sont dans les données, et les outils les contrôlent."
      />
      <div class="ed-grid">
        <article
          v-for="(pillar, index) in pillars"
          :key="pillar.title"
          v-reveal="(index % 3) * 100"
          v-spotlight
          class="ed-card"
        >
          <span class="ed-tile"><Icon :name="pillar.icon" :size="22" /></span>
          <h3>{{ pillar.title }}</h3>
          <p>{{ pillar.text }}</p>
        </article>
      </div>
    </section>

    <section class="ed-split">
      <div class="ed-section">
        <SectionHead
          kicker="En direct"
          icon="contrast"
          :title="`${brandThemes[state.brand].name} : ${passing} paires sur ${results.length} conformes`"
          lead="Les ratios ci-contre sont calculés à l'instant depuis l'identité et le mode choisis dans la barre du haut. Changez-les : tout se recalcule."
        />
        <p v-reveal>
          <a
            href="#/tokens/colors"
            class="ed-inline-link"
            @click.prevent="openPage('tokens/colors')"
          >
            Voir toutes les paires <Icon name="arrowRight" :size="16" />
          </a>
        </p>
      </div>
      <ul v-reveal:right class="contrast-list">
        <li v-for="item in sample" :key="`${item.foreground}-${item.background}`">
          <span
            class="contrast-list__sample"
            :style="{
              background: colors[item.background as keyof typeof colors],
              color: colors[item.foreground as keyof typeof colors]
            }"
          >
            Aa
          </span>
          <span class="contrast-list__pair">
            <code>{{ item.foreground }}</code>
            <small>sur {{ item.background }}</small>
          </span>
          <span class="contrast-list__ratio">{{ item.ratio.toFixed(2) }}</span>
          <span
            :class="[
              'contrast-list__level',
              item.ratio >= item.minimum ? 'is-pass' : item.exception ? 'is-known' : 'is-fail'
            ]"
          >
            {{ item.ratio >= 7 ? "AAA" : item.ratio >= item.minimum ? "AA" : "Exception" }}
          </span>
        </li>
      </ul>
    </section>

    <section class="ed-section">
      <SectionHead
        kicker="Transparence"
        icon="flag"
        title="Exceptions documentées"
        lead="Quand une paire passe sous le seuil pour une bonne raison, elle est écrite, justifiée et visible. Jamais silencieuse."
      />
      <p v-if="exceptions.length === 0" v-reveal class="ed-note">
        <Icon name="check" :size="20" />
        Aucune exception : toutes les paires passent.
      </p>
      <ul v-else class="exception-list">
        <li
          v-for="(item, index) in exceptions"
          :key="`${item.theme}-${item.foreground}-${item.mode}`"
          v-reveal="index * 80"
        >
          <span class="exception-list__theme">{{ item.theme }}</span>
          <span>
            <code>{{ item.foreground }}</code> sur <code>{{ item.background }}</code>
            <small>· {{ item.mode === "light" ? "clair" : "sombre" }}</small>
          </span>
          <p>{{ item.reason }}</p>
        </li>
      </ul>
    </section>

    <section class="ed-section">
      <SectionHead
        kicker="À vous de vérifier"
        icon="eye"
        title="Testez-le dans le Lab"
        lead="Un clic suffit pour mettre chaque composant à l'épreuve."
      />
      <div class="ed-grid ed-grid--4">
        <article
          v-for="(item, index) in labChecks"
          :key="item.title"
          v-reveal="index * 90"
          v-spotlight
          class="ed-card"
        >
          <span class="ed-tile"><Icon :name="item.icon" :size="22" /></span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
          <button type="button" class="ed-inline-link" @click="item.action">
            {{ item.label }} <Icon name="arrowRight" :size="16" />
          </button>
        </article>
      </div>
    </section>
  </EditorialPage>
</template>
