<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import EditorialPage from "../editorial/EditorialPage.vue";
import Icon from "../editorial/Icon.vue";
import type { IconName } from "../editorial/icons";
import PageHero from "../editorial/PageHero.vue";
import SectionHead from "../editorial/SectionHead.vue";

type Status = "done" | "current" | "next";

const phases: { status: Status; icon: IconName; title: string; text: string; items: string[] }[] = [
  {
    status: "done",
    icon: "book",
    title: "Fondations",
    text: "Décider une fois pour toutes ce qu'est chaque composant.",
    items: [
      "Inventaire des 193 composants et un contrat par composant",
      "Tokens complets : couleurs, typographie, tailles, formes, élévation, mouvement",
      "Identités NativeSmart, Thinkdev et CV Action, contraste vérifié",
      "Registre des 13 technologies et des intégrations"
    ]
  },
  {
    status: "done",
    icon: "eye",
    title: "NativeSmart Lab",
    text: "Un lieu public pour tout voir, tout essayer et tout partager.",
    items: [
      "Aperçu, variations, API et code de chaque technologie",
      "Identité, mode, densité, sens d'écriture et largeur en direct",
      "Recherche globale, documentation et pages éditoriales"
    ]
  },
  {
    status: "current",
    icon: "layers",
    title: "Composants Vue, groupe par groupe",
    text: "Une technologie complète, validée sur un vrai produit : CV Action.",
    items: [
      "Formulaires : Input, Textarea, Select, Checkbox, Radio, Switch…",
      "Surfaces flottantes : Dialog, Drawer, Bottom Sheet, Popover, Tooltip, Menu",
      "Navigation, affichage de données, feedback",
      "Remplacement progressif des composants cva-* dans CV Action"
    ]
  },
  {
    status: "next",
    icon: "globe",
    title: "Toutes les plateformes",
    text: "Les autres technologies, sur des contrats et des tokens déjà stables.",
    items: [
      "React et Next.js",
      "Web Components, puis Svelte et Angular",
      "React Native avec NativeWind, Flutter aligné sur les contrats",
      "Compose, SwiftUI et .NET MAUI à la demande"
    ]
  }
];

const statusLabels: Record<Status, string> = {
  done: "Terminé",
  current: "En cours",
  next: "Ensuite"
};

const principles: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "target",
    title: "Une technologie complète d'abord",
    text: "Mieux vaut Vue entièrement fini que treize technologies à moitié."
  },
  {
    icon: "rocket",
    title: "Validé en production",
    text: "Chaque composant sert un vrai produit avant d'être déclaré stable."
  },
  {
    icon: "refresh",
    title: "Les contrats d'abord",
    text: "Les autres plateformes arrivent sur une API qui ne bouge plus."
  }
];

// The line of the timeline fills up as the reader scrolls through it.
const timeline = ref<HTMLElement>();
const progress = ref(0);
let frame = 0;

function measure() {
  const rect = timeline.value?.getBoundingClientRect();
  if (!rect) return;
  const anchor = window.innerHeight * 0.55;
  progress.value = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
}

function onScroll() {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(measure);
}

onMounted(() => {
  measure();
  window.addEventListener("scroll", onScroll, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  cancelAnimationFrame(frame);
});
</script>

<template>
  <EditorialPage>
    <PageHero
      eyebrow="Feuille de route"
      icon="compass"
      lead="Une technologie complète d'abord, Vue, validée sur un vrai produit, CV Action. Puis les autres plateformes, sur des contrats et des tokens déjà stables. Voici où nous en sommes."
    >
      <template #title>
        Une trajectoire claire, <span class="ed-gradient">étape par étape.</span>
      </template>
    </PageHero>

    <section class="ed-section">
      <SectionHead kicker="Nos principes" icon="star" title="Lentement, mais sûrement" />
      <div class="ed-grid">
        <article
          v-for="(item, index) in principles"
          :key="item.title"
          v-reveal="index * 100"
          v-spotlight
          class="ed-card"
        >
          <span class="ed-tile"><Icon :name="item.icon" :size="22" /></span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="ed-section">
      <SectionHead kicker="Les étapes" icon="flag" title="Du contrat à toutes les plateformes" />
      <ol ref="timeline" class="road" :style="{ '--progress': progress }">
        <li
          v-for="phase in phases"
          :key="phase.title"
          v-reveal
          :class="['road__phase', `road__phase--${phase.status}`]"
        >
          <span class="road__marker">
            <Icon :name="phase.status === 'done' ? 'check' : phase.icon" :size="18" />
          </span>
          <div v-spotlight class="ed-card road__card">
            <span :class="['road__status', `road__status--${phase.status}`]">
              {{ statusLabels[phase.status] }}
            </span>
            <h3>{{ phase.title }}</h3>
            <p>{{ phase.text }}</p>
            <ul>
              <li v-for="item in phase.items" :key="item">
                <Icon :name="phase.status === 'done' ? 'check' : 'arrowRight'" :size="15" />
                {{ item }}
              </li>
            </ul>
          </div>
        </li>
      </ol>
    </section>
  </EditorialPage>
</template>
