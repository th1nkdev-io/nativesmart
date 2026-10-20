<script setup lang="ts">
import { brandThemes, contrastPairs, primitives, type BrandTheme } from "@nativesmart/tokens";
import { openPage } from "../state";
import DocPage from "./DocPage.vue";

const pillars = [
  {
    title: "Contraste vérifié",
    text: `${contrastPairs.length} paires texte/fond sont contrôlées pour chaque identité, en clair et en sombre (WCAG 2.2 AA : 4,5:1 pour le texte, 3:1 pour les indicateurs). Le build échoue en cas d'écart non documenté.`
  },
  {
    title: "Clavier d'abord",
    text: "Chaque composant interactif se pilote au clavier : Tab, Entrée, Espace, flèches et Échap selon son rôle. Les touches attendues sont écrites dans le contrat."
  },
  {
    title: "Focus toujours visible",
    text: `Un anneau de ${primitives.borders.focusRing.width} px décalé de ${primitives.borders.focusRing.offset} px, de la couleur focusRing de l'identité, signale l'élément actif au clavier.`
  },
  {
    title: "Zones tactiles",
    text: `Toute cible interactive mesure au moins ${primitives.sizing.touchTarget} × ${primitives.sizing.touchTarget} px, même si son dessin est plus petit.`
  },
  {
    title: "Rôles et états exposés",
    text: "Chaque contrat déclare son rôle ARIA, ses états (désactivé, occupé, invalide…) et ses exigences, que chaque technologie doit respecter."
  },
  {
    title: "Mouvement maîtrisé",
    text: "Les animations ralentissent ou s'arrêtent quand le système demande de réduire les animations."
  }
];

const exceptions = (Object.values(brandThemes) as BrandTheme[]).flatMap((theme) =>
  (theme.contrastExceptions ?? []).map((item) => ({ theme: theme.name, ...item }))
);
</script>

<template>
  <DocPage
    eyebrow="Démarrer"
    title="Accessibilité"
    lead="NativeSmart vise WCAG 2.2 niveau AA sur toutes les technologies. Les règles sont écrites dans les tokens et les contrats, et vérifiées automatiquement quand c'est possible."
  >
    <section class="doc__section">
      <h2>Nos engagements</h2>
      <div class="pillar-grid">
        <article v-for="pillar in pillars" :key="pillar.title" class="pillar">
          <h3>{{ pillar.title }}</h3>
          <p>{{ pillar.text }}</p>
        </article>
      </div>
    </section>

    <section class="doc__section">
      <h2>Exceptions documentées</h2>
      <p v-if="exceptions.length === 0">Aucune exception : toutes les paires passent.</p>
      <ul v-else>
        <li v-for="item in exceptions" :key="`${item.theme}-${item.foreground}`">
          <strong>{{ item.theme }}</strong> · <code>{{ item.foreground }}</code> sur
          <code>{{ item.background }}</code> ({{ item.mode === "light" ? "clair" : "sombre" }}) :
          {{ item.reason }}
        </li>
      </ul>
      <p>
        Le détail des ratios de chaque identité est sur la page
        <a href="#/tokens/colors" @click.prevent="openPage('tokens/colors')">Tokens · Couleurs</a>.
      </p>
    </section>

    <section class="doc__section">
      <h2>Tester dans le Lab</h2>
      <ul>
        <li><strong>RTL</strong> : vérifiez la mise en page pour l'arabe et l'hébreu.</li>
        <li><strong>Densité spacieuse</strong> : contrôles plus grands pour le tactile.</li>
        <li><strong>Mode sombre</strong> : contrastes et ombres adaptés.</li>
        <li><strong>Clavier</strong> : parcourez l'aperçu avec Tab et observez le focus.</li>
      </ul>
    </section>
  </DocPage>
</template>
