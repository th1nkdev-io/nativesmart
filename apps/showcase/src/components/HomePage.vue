<script setup lang="ts">
import { componentContracts } from "@nativesmart/contracts";
import { brandThemes, semanticColorRoles } from "@nativesmart/tokens";
import { computed } from "vue";
import Marquee from "../editorial/art/Marquee.vue";
import StackArt from "../editorial/art/StackArt.vue";
import EditorialPage from "../editorial/EditorialPage.vue";
import Icon from "../editorial/Icon.vue";
import type { IconName } from "../editorial/icons";
import PageHero from "../editorial/PageHero.vue";
import SectionHead from "../editorial/SectionHead.vue";
import { brandDescriptions } from "../labels";
import { openPage, state } from "../state";
import { getTechnology, technologies } from "../technologies";

const technology = computed(() => getTechnology(state.tech));
const specified = componentContracts.filter((contract) => contract.status !== "draft").length;
const implemented = computed(
  () =>
    componentContracts.filter((contract) => technology.value.implemented.has(contract.id)).length
);
const firstImplemented = computed(
  () =>
    componentContracts.find((contract) => technology.value.implemented.has(contract.id))?.id ??
    "button"
);
const themes = Object.values(brandThemes);
const activeTheme = computed(() => brandThemes[state.brand]);

const stats = computed(() => [
  { value: componentContracts.length, label: "composants inventoriés" },
  { value: specified, label: "contrats spécifiés" },
  { value: technologies.length, label: "technologies ciblées" },
  { value: semanticColorRoles.length, label: "rôles de couleur" },
  { value: themes.length, label: "identités visuelles" },
  { value: implemented.value, label: `composants en ${technology.value.name}` }
]);

const steps: { icon: IconName; title: string; text: string; sample: string }[] = [
  {
    icon: "book",
    title: "Un contrat",
    text: "Chaque composant est décrit une fois : propriétés, états, événements, rôle ARIA et touches clavier. Aucune technologie n'y apparaît.",
    sample: "variant: solid | outline"
  },
  {
    icon: "palette",
    title: "Des tokens",
    text: "Couleurs, typographie, arrondis, ombres et mouvement viennent de l'identité active, en clair comme en sombre.",
    sample: "--ns-color-primary"
  },
  {
    icon: "layers",
    title: "Un rendu natif",
    text: "Chaque technologie implémente le contrat avec ses propres outils. Même nom, mêmes props, même comportement.",
    sample: '<NsButton variant="outline" />'
  }
];
</script>

<template>
  <EditorialPage>
    <PageHero
      eyebrow="Système de design multi-plateforme"
      icon="sparkles"
      lead="NativeSmart décrit chaque composant une seule fois, puis le livre dans chaque technologie avec la même API, le même comportement et votre identité visuelle. Ce Lab vous laisse tout essayer, en direct."
    >
      <template #title>
        Un contrat. <span class="ed-gradient">Toutes vos plateformes.</span>
      </template>
      <template #actions>
        <button
          type="button"
          class="ed-button ed-button--primary"
          @click="openPage(firstImplemented)"
        >
          Explorer les composants
          <Icon name="arrowRight" :size="18" />
        </button>
        <button
          type="button"
          class="ed-button ed-button--ghost"
          @click="openPage('docs/installation')"
        >
          <Icon name="terminal" :size="18" />
          Installer
        </button>
      </template>
      <template #meta>
        <span><Icon name="check" :size="16" /> WCAG 2.2 AA vérifié</span>
        <span><Icon name="check" :size="16" /> Clair, sombre et RTL</span>
        <span><Icon name="check" :size="16" /> CSS pur, compatible Tailwind</span>
      </template>
      <template #art>
        <StackArt />
      </template>
    </PageHero>

    <section v-reveal:fade class="home-marquee">
      <p>Pensé pour les équipes web, mobile et desktop</p>
      <Marquee />
    </section>

    <section class="ed-section">
      <SectionHead
        kicker="Comment ça marche"
        icon="zap"
        title="Trois couches, une seule source de vérité"
        lead="Les décisions de design ne sont prises qu'une fois. Ensuite, chaque plateforme les applique à sa manière, sans jamais s'en écarter."
      />
      <ol class="home-steps">
        <li
          v-for="(step, index) in steps"
          :key="step.title"
          v-reveal="index * 120"
          v-spotlight
          class="ed-card home-step"
        >
          <span class="home-step__index">0{{ index + 1 }}</span>
          <span class="ed-tile"><Icon :name="step.icon" :size="22" /></span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
          <code class="home-step__sample">{{ step.sample }}</code>
        </li>
      </ol>
    </section>

    <section class="ed-section">
      <SectionHead
        kicker="En chiffres"
        icon="gauge"
        title="Un catalogue pensé pour de vrais produits"
        lead="Des actions aux paiements, des formulaires aux tableaux de données : l'inventaire couvre ce qu'une application moderne attend, des fondations aux kits métier."
      />
      <div v-reveal class="ed-stats ed-stats--6">
        <div v-for="stat in stats" :key="stat.label" class="ed-stat">
          <strong v-count="stat.value">{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <section class="ed-section">
      <SectionHead
        kicker="Pourquoi NativeSmart"
        icon="star"
        title="Tout ce qu'il faut pour livrer vite, sans rien sacrifier"
      />
      <div class="bento">
        <article v-reveal v-spotlight class="ed-card bento__identity">
          <span class="ed-tile"><Icon name="palette" :size="22" /></span>
          <h3>Votre marque, sur chaque écran</h3>
          <p>
            Une identité fixe les couleurs, les polices, les arrondis et les ombres. Changez-la et
            tous les composants suivent, sur toutes les plateformes. Essayez :
          </p>
          <div class="identity-picker" role="group" aria-label="Identité des composants">
            <button
              v-for="theme in themes"
              :key="theme.id"
              type="button"
              :aria-pressed="state.brand === theme.id"
              @click="state.brand = theme.id"
            >
              <span class="identity-picker__dots" aria-hidden="true">
                <i :style="{ background: theme.colors.light.primary }" />
                <i :style="{ background: theme.colors.light.secondary }" />
              </span>
              {{ theme.name }}
            </button>
          </div>
          <div
            class="identity-preview"
            :style="{
              '--p': activeTheme.colors.light.primary,
              '--op': activeTheme.colors.light.onPrimary,
              '--s': activeTheme.colors.light.secondary,
              '--sm': activeTheme.colors.light.successMuted,
              '--osm': activeTheme.colors.light.onSuccessMuted
            }"
          >
            <span class="identity-preview__title">{{ activeTheme.name }}</span>
            <span class="identity-preview__text">{{ brandDescriptions[activeTheme.id] }}</span>
            <span class="identity-preview__row">
              <i class="identity-preview__button">Continuer</i>
              <i class="identity-preview__outline">Plus tard</i>
              <i class="identity-preview__badge">Actif</i>
            </span>
          </div>
        </article>

        <article v-reveal="80" v-spotlight class="ed-card bento__a11y">
          <span class="ed-tile"><Icon name="shield" :size="22" /></span>
          <h3>Accessible par défaut</h3>
          <p>Contrastes vérifiés au build, focus visible, clavier et zones tactiles de 44 px.</p>
          <span class="bento__ratio" aria-hidden="true">AA<small>4,5:1</small></span>
        </article>

        <article v-reveal="120" v-spotlight class="ed-card">
          <span class="ed-tile"><Icon name="moon" :size="22" /></span>
          <h3>Clair, sombre, RTL et densité</h3>
          <p>
            Chaque composant suit le mode, le sens d'écriture et la densité, sans une ligne de
            JavaScript.
          </p>
        </article>

        <article v-reveal="160" v-spotlight class="ed-card">
          <span class="ed-tile"><Icon name="code" :size="22" /></span>
          <h3>Le code de votre technologie</h3>
          <p>
            Vue, React, Flutter, SwiftUI… Le Lab affiche l'usage exact dans la syntaxe de chaque
            plateforme.
          </p>
        </article>

        <article v-reveal="200" v-spotlight class="ed-card">
          <span class="ed-tile"><Icon name="eye" :size="22" /></span>
          <h3>Un Lab vivant</h3>
          <p>
            Chaque réglage se partage par un lien : identité, mode, densité, technologie et largeur
            d'écran.
          </p>
        </article>

        <article v-reveal="240" v-spotlight class="ed-card">
          <span class="ed-tile"><Icon name="plug" :size="22" /></span>
          <h3>CSS pur, sans enfermement</h3>
          <p>
            Des variables CSS et des classes <code>ns-</code>. Compatible Tailwind, Bootstrap ou
            votre CSS existant.
          </p>
        </article>
      </div>
    </section>

    <section v-reveal:scale class="ed-cta">
      <h2>Construisez une fois. Livrez partout.</h2>
      <p>
        Ouvrez un composant, changez d'identité, passez en sombre ou en arabe : le Lab vous montre
        exactement ce que vos utilisateurs verront.
      </p>
      <div class="ed-hero__actions">
        <button
          type="button"
          class="ed-button ed-button--primary"
          @click="openPage(firstImplemented)"
        >
          Ouvrir le Lab
          <Icon name="arrowRight" :size="18" />
        </button>
        <button type="button" class="ed-button ed-button--ghost" @click="openPage('tokens')">
          Découvrir les tokens
        </button>
      </div>
    </section>
  </EditorialPage>
</template>
