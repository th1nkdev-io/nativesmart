<script setup lang="ts">
import EditorialPage from "../editorial/EditorialPage.vue";
import Icon from "../editorial/Icon.vue";
import PageHero from "../editorial/PageHero.vue";

const releases = [
  {
    date: "25 octobre 2026",
    title: "Icon : tons, conteneurs et mouvements",
    changes: [
      {
        kind: "Amélioré",
        text: "Icon : huit tailles de 10 à 48 px, sept tons, trait fin, normal ou gras"
      },
      {
        kind: "Amélioré",
        text: "Conteneur teinté, plein ou contour, en cercle, carré arrondi ou carré"
      },
      {
        kind: "Amélioré",
        text: "Rotation, miroir, rotation continue ; la bibliothèque se filtre et copie la balise"
      }
    ]
  },
  {
    date: "25 octobre 2026",
    title: "Heading : le niveau et la taille séparés",
    changes: [
      {
        kind: "Nouveau",
        text: "Heading : h1 à h6 pour le plan du document, taille visuelle indépendante"
      },
      {
        kind: "Nouveau",
        text: "Surtitre et sous-titre regroupés dans un hgroup, actions en bout de ligne"
      },
      {
        kind: "Nouveau",
        text: "Ton dégradé de marque, coupe après n lignes, ancre # avec un id tiré du texte"
      }
    ]
  },
  {
    date: "25 octobre 2026",
    title: "Code : blocs copiables et code en ligne",
    changes: [
      {
        kind: "Nouveau",
        text: "Code : bloc avec titre, langage et copie annoncée, ou mot de code dans une phrase"
      },
      {
        kind: "Nouveau",
        text: "Coloration légère pour TypeScript, Vue, HTML, CSS, JSON et le terminal"
      },
      {
        kind: "Nouveau",
        text: "Numéros de ligne, lignes surlignées, invite shell, retour à la ligne, repli après n lignes"
      }
    ]
  },
  {
    date: "25 octobre 2026",
    title: "Surface : des couches qui savent où elles sont",
    changes: [
      {
        kind: "Nouveau",
        text: "Surface : cinq niveaux, du creusé au calque, fond et ombre réglés ensemble"
      },
      {
        kind: "Nouveau",
        text: "Niveau auto : une surface imbriquée monte d'un cran, le niveau est donné au slot"
      },
      {
        kind: "Nouveau",
        text: "Ombrée, contour, pleine ou verre, huit tons, états survol, appui, sélection et clavier"
      }
    ]
  },
  {
    date: "25 octobre 2026",
    title: "Stack : piles, rangées et groupes",
    changes: [
      {
        kind: "Nouveau",
        text: "Stack : colonne ou rangée, inversées, avec direction et espacement par point de rupture"
      },
      {
        kind: "Nouveau",
        text: "Séparateurs entre les éléments, ligne ou contenu libre, centrés dans l'espacement"
      },
      {
        kind: "Nouveau",
        text: "Retour à la ligne, parts égales avec fill, groupe soudé avec compact, pile en ligne"
      }
    ]
  },
  {
    date: "25 octobre 2026",
    title: "Spacer : l'espace qui pousse ou qui réserve",
    changes: [
      {
        kind: "Nouveau",
        text: "Spacer : prend l'espace libre ou réserve un pas fixe, en ligne comme en colonne"
      },
      {
        kind: "Nouveau",
        text: "Partage pondéré avec grow, espace minimum, tailles par point de rupture"
      },
      {
        kind: "Nouveau",
        text: "reveal hachure l'espace et affiche sa taille, pour vérifier une mise en page"
      }
    ]
  },
  {
    date: "25 octobre 2026",
    title: "ScrollArea : barres dessinées et listes virtuelles",
    changes: [
      {
        kind: "Nouveau",
        text: "ScrollArea : barres au survol, au défilement, toujours ou natives, pouce déplaçable"
      },
      {
        kind: "Nouveau",
        text: "Bords estompés, accroche des éléments, défilement vertical, horizontal ou les deux"
      },
      {
        kind: "Nouveau",
        text: "Liste virtuelle de 10 000 lignes, chargement infini avec end-reached, scrollToIndex()"
      }
    ]
  },
  {
    date: "25 octobre 2026",
    title: "SafeArea : encoches, îlots et indicateurs d'accueil",
    changes: [
      {
        kind: "Nouveau",
        text: "SafeArea : bords choisis, padding ou marge, minimum et espace en plus, start et end"
      },
      {
        kind: "Nouveau",
        text: "Aperçu sur iPhone portrait et paysage et sur Android, zones à éviter hachurées"
      },
      { kind: "Nouveau", text: "useSafeAreaInsets() pour lire les zones sûres dans tout composant" }
    ]
  },
  {
    date: "25 octobre 2026",
    title: "KeyboardAvoider pour le mobile et le web sur téléphone",
    changes: [
      {
        kind: "Nouveau",
        text: "KeyboardAvoider : padding, hauteur ou translation, champ actif toujours visible"
      },
      {
        kind: "Nouveau",
        text: "Barre d'accessoire collée au clavier, décalage d'en-tête, hauteur fournie par un shell natif"
      },
      {
        kind: "Corrigé",
        text: "Input ne déborde plus des conteneurs étroits ; variations des options actives par défaut"
      }
    ]
  },
  {
    date: "25 octobre 2026",
    title: "Grid et GridItem",
    changes: [
      {
        kind: "Nouveau",
        text: "Grid : colonnes, gouttières et alignements par point de rupture, grille des tokens"
      },
      {
        kind: "Nouveau",
        text: "Grille fluide sans point de rupture, ruptures selon la largeur de la grille, dense"
      },
      { kind: "Nouveau", text: "Sous-composants documentés dans l'onglet API : GridItem" }
    ]
  },
  {
    date: "25 octobre 2026",
    title: "Divider complet, onglet API en lignes",
    changes: [
      {
        kind: "Nouveau",
        text: "Divider : plein, tirets, pointillés ou dégradé, 3 épaisseurs, 4 tons, retraits"
      },
      {
        kind: "Nouveau",
        text: "Libellé au début, au centre ou à la fin, ou contenu libre ; espacement par tokens"
      },
      {
        kind: "Amélioré",
        text: "API : emplacements, états, événements, accessibilité et tokens en lignes pleine largeur"
      }
    ]
  },
  {
    date: "25 octobre 2026",
    title: "Container, la colonne de page",
    changes: [
      {
        kind: "Nouveau",
        text: "Container : largeurs xl à 2xl et lecture, marges de grille, sections, zones sûres"
      },
      {
        kind: "Nouveau",
        text: "Bande pleine largeur, enfants data-bleed bord à bord, mode par paliers"
      },
      {
        kind: "Nouveau",
        text: "Aperçu sur une vraie page à 390, 768, 1280 et 1600 px, avec les mesures réelles"
      }
    ]
  },
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
