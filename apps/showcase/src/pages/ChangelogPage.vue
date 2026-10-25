<script setup lang="ts">
import EditorialPage from "../editorial/EditorialPage.vue";
import Icon from "../editorial/Icon.vue";
import PageHero from "../editorial/PageHero.vue";

const releases = [
  {
    date: "25 octobre 2026",
    title: "Box, le conteneur de base refait",
    changes: [
      {
        kind: "Nouveau",
        text: "Box : padding, marge, gap, flex et grille par point de rupture, en côtés logiques"
      },
      {
        kind: "Nouveau",
        text: "Fonds avec couleur de texte appariée, bordures, ombres, matières translucides"
      },
      {
        kind: "Nouveau",
        text: "Anatomie illustrée en modèle de boîte : marge, bordure, padding, contenu"
      }
    ]
  },
  {
    date: "25 octobre 2026",
    title: "Onglets Variations et API repensés",
    changes: [
      {
        kind: "Amélioré",
        text: "Variations : un rail par propriété, valeur par défaut mise en avant, cartes titrées"
      },
      {
        kind: "Amélioré",
        text: "API : anatomie schématisée, valeurs et défauts, états et événements expliqués"
      },
      {
        kind: "Nouveau",
        text: "Contrats documentés : sens de chaque partie, état, événement, touche et token"
      },
      {
        kind: "Amélioré",
        text: "Panneau latéral : propriétés groupées, disponibilité par famille avec logos"
      },
      { kind: "Nouveau", text: "Anatomie illustrée d'AspectRatio, avec repères numérotés" }
    ]
  },
  {
    date: "24 octobre 2026",
    title: "AspectRatio, premier composant de mise en page",
    changes: [
      {
        kind: "Nouveau",
        text: "AspectRatio en Vue : 7 ratios, ratio par point de rupture, mode masonry"
      },
      {
        kind: "Nouveau",
        text: "Chargement en shimmer, image de secours, légende, voile et zoom au survol"
      },
      { kind: "Nouveau", text: "Token de ratio « nombre d'or » (1,618 : 1)" }
    ]
  },
  {
    date: "24 octobre 2026",
    title: "Vue : les 12 composants de base",
    changes: [
      {
        kind: "Nouveau",
        text: "Box, Divider, Text, Icon, Input, Avatar, Card, Toast et Modal en Vue"
      },
      { kind: "Nouveau", text: "Jeu de 42 icônes intégré, extensible à l'installation du plugin" },
      { kind: "Nouveau", text: "Démos réalistes dans le Lab : contenu, fenêtre ouvrable, états" },
      { kind: "Nouveau", text: "Déploiement automatique du Lab sur push dev (Docker et nginx)" }
    ]
  },
  {
    date: "24 octobre 2026",
    title: "3D, .NET MAUI et pages Tokens revues",
    changes: [
      {
        kind: "Nouveau",
        text: "Tokens 3D : perspective, profondeur, inclinaison, caméra, lumières, matières PBR"
      },
      { kind: "Nouveau", text: "Page 3D du Lab et 8 contrats de composants 3D et immersifs" },
      { kind: "Nouveau", text: "Export .NET MAUI en C# et XAML, couverture des 13 technologies" },
      {
        kind: "Amélioré",
        text: "Mouvement en lecture continue, Personnalité, Matières et Système redessinés"
      }
    ]
  },
  {
    date: "24 octobre 2026",
    title: "Transitions et apparitions",
    changes: [
      {
        kind: "Nouveau",
        text: "Transitions entre les pages, les sections des tokens et les onglets"
      },
      { kind: "Nouveau", text: "Apparition au défilement sur toutes les pages, cartes en cascade" },
      {
        kind: "Amélioré",
        text: "Pages Tokens : onglets à icônes, lignes alignées, variables en pied"
      }
    ]
  },
  {
    date: "21 octobre 2026",
    title: "Personnalités, contraste élevé et exports natifs",
    changes: [
      { kind: "Nouveau", text: "Personnalité d'identité : formes, mouvement, titres et densité" },
      {
        kind: "Nouveau",
        text: "Thèmes contraste élevé AAA en clair et en sombre pour chaque identité"
      },
      { kind: "Nouveau", text: "Exports W3C Design Tokens, SwiftUI, Jetpack Compose et Flutter" },
      {
        kind: "Nouveau",
        text: "Les tokens du Lab s'affichent dans le langage de la technologie active"
      },
      { kind: "Nouveau", text: "Pages Personnalité et Exports dans le Lab" }
    ]
  },
  {
    date: "21 octobre 2026",
    title: "Élévation, mouvement et accessibilité",
    changes: [
      { kind: "Nouveau", text: "Élévation par usage, ombres internes, halos et surfaces sombres" },
      { kind: "Nouveau", text: "Matières translucides et quatre niveaux de flou" },
      {
        kind: "Nouveau",
        text: "Ressorts physiques, transitions prêtes à l'emploi, huit animations"
      },
      { kind: "Nouveau", text: "Iconographie : grille, épaisseurs et accords avec le texte" },
      {
        kind: "Nouveau",
        text: "Contraste élevé, transparence et mouvement réduits, couleurs forcées"
      }
    ]
  },
  {
    date: "21 octobre 2026",
    title: "Typographie, espace et formes",
    changes: [
      { kind: "Nouveau", text: "30 styles de texte, titres fluides et familles display et serif" },
      { kind: "Nouveau", text: "Espacements par intention : inset, stack, inline et section" },
      { kind: "Nouveau", text: "Grille responsive, cadre d'application et zones sûres" },
      {
        kind: "Nouveau",
        text: "Avatars, zones tactiles, dialogues, ratios et onze rayons par usage"
      },
      { kind: "Nouveau", text: "Page Mise en page et testeur typographique dans le Lab" }
    ]
  },
  {
    date: "21 octobre 2026",
    title: "Système de couleurs complet",
    changes: [
      {
        kind: "Nouveau",
        text: "103 rôles de couleur : sept intentions à neuf déclinaisons chacune"
      },
      {
        kind: "Nouveau",
        text: "Rôles dérivés automatiquement de chaque identité, tous surchargeables"
      },
      {
        kind: "Nouveau",
        text: "Calques d'état, couleurs de données, avatars, dégradés et translucides"
      },
      { kind: "Nouveau", text: "Pages Couleurs, États et Données dans le Lab" },
      { kind: "Amélioré", text: "124 paires de contraste vérifiées par identité, contre 38" }
    ]
  },
  {
    date: "21 octobre 2026",
    title: "Pages éditoriales",
    changes: [
      { kind: "Nouveau", text: "Accueil, guides et ressources réécrits, avec illustrations 3D" },
      { kind: "Nouveau", text: "Apparitions au défilement, compteurs animés et effets de survol" },
      { kind: "Nouveau", text: "Comparateur clair/sombre et contrastes calculés en direct" },
      { kind: "Corrigé", text: "Les sidebars restent pleine hauteur au-dessus du pied de page" }
    ]
  },
  {
    date: "20 octobre 2026",
    title: "Identité NativeSmart et Lab complet",
    changes: [
      { kind: "Nouveau", text: "Identité NativeSmart par défaut, construite à partir du logo" },
      { kind: "Nouveau", text: "Logo officiel dans le Lab et les Kitchen Sink mobiles" },
      { kind: "Nouveau", text: "Kit de contrôles du Lab : listes, interrupteurs, segments" },
      { kind: "Nouveau", text: "Les 193 composants listés, avec un état « bientôt »" },
      { kind: "Nouveau", text: "Pages de documentation" },
      {
        kind: "Nouveau",
        text: "Recherche globale ⌘K / Ctrl K dans les pages et les 193 composants"
      },
      { kind: "Nouveau", text: "Barre du haut, rail des technologies et navigation redessinés" },
      { kind: "Nouveau", text: "Aperçu et code réunis, onglets Aperçu, Variations et API" },
      { kind: "Nouveau", text: "Code de la technologie active, avec ses syntaxes (Nuxt, Vue…)" },
      { kind: "Nouveau", text: "Toutes les technologies sélectionnables, avec leur API prévue" },
      {
        kind: "Corrigé",
        text: "Le Lab garde l'identité NativeSmart, l'identité choisie habille les composants"
      },
      { kind: "Corrigé", text: "Barres de défilement cohérentes dans tout le Lab" }
    ]
  },
  {
    date: "17 octobre 2026",
    title: "Tokens et premier renderer",
    changes: [
      { kind: "Nouveau", text: "Tokens complets et vérification du contraste WCAG" },
      { kind: "Nouveau", text: "Identité CV Action, sortie CSS et preset Tailwind" },
      { kind: "Nouveau", text: "@nativesmart/vue : Button, Badge et Spinner" },
      { kind: "Nouveau", text: "NativeSmart Lab avec rail des technologies" }
    ]
  },
  {
    date: "16 octobre 2026",
    title: "Contrats et plateformes",
    changes: [
      { kind: "Nouveau", text: "Inventaire de 193 composants, un contrat par composant" },
      { kind: "Nouveau", text: "Contrats des formulaires spécifiés" },
      { kind: "Nouveau", text: "Registre de 13 technologies et 14 intégrations" }
    ]
  }
];

const total = releases.reduce((sum, release) => sum + release.changes.length, 0);
</script>

<template>
  <EditorialPage>
    <PageHero
      eyebrow="Journal des modifications"
      icon="clock"
      lead="Les évolutions de NativeSmart, des plus récentes aux plus anciennes. Aucune version n'est encore publiée : tout fait partie de la 0.1.0 en préparation."
    >
      <template #title>
        Ce qui a changé, <span class="ed-gradient">jour après jour.</span>
      </template>
      <template #meta>
        <span><Icon name="check" :size="16" /> {{ total }} changements</span>
        <span><Icon name="check" :size="16" /> {{ releases.length }} étapes</span>
      </template>
    </PageHero>

    <ol class="releases">
      <li v-for="(release, index) in releases" :key="release.date" class="release-item">
        <div v-reveal:left class="release-item__date">
          <span class="release-item__dot" :class="{ 'is-latest': index === 0 }" />
          <time>{{ release.date }}</time>
          <small v-if="index === 0">Dernière mise à jour</small>
        </div>
        <section v-reveal v-spotlight class="ed-card release-item__card">
          <h2>{{ release.title }}</h2>
          <ul>
            <li v-for="change in release.changes" :key="change.text">
              <span :class="['release-kind', change.kind === 'Corrigé' ? 'is-fix' : 'is-new']">
                <Icon :name="change.kind === 'Corrigé' ? 'bug' : 'sparkles'" :size="13" />
                {{ change.kind }}
              </span>
              <span>{{ change.text }}</span>
            </li>
          </ul>
        </section>
      </li>
    </ol>
  </EditorialPage>
</template>
