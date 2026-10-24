<script setup lang="ts">
import { primitives, spaceVariable } from "@nativesmart/tokens";
import { ref } from "vue";
import Icon from "../../editorial/Icon.vue";
import type { IconName } from "../../editorial/icons";
import SegControl from "./SegControl.vue";
import TokenCode from "./TokenCode.vue";

const steps = (Object.entries(primitives.spacing) as [string, number][]).sort(
  (a, b) => a[1] - b[1]
);
const largest = Math.max(...steps.map(([, value]) => value));

type Usage = keyof typeof primitives.spaceUsages;
const usageText: Record<Usage, { label: string; description: string; icon: IconName }> = {
  inset: {
    label: "Inset",
    description: "Marge intérieure d'une boîte : carte, bouton, cellule.",
    icon: "inset"
  },
  stack: {
    label: "Stack",
    description: "Écart vertical entre des éléments empilés.",
    icon: "stack"
  },
  inline: {
    label: "Inline",
    description: "Écart horizontal entre des éléments alignés.",
    icon: "inline"
  },
  section: {
    label: "Section",
    description: "Respiration entre les grands blocs d'une page.",
    icon: "section"
  }
};
const usages = (Object.keys(primitives.spaceUsages) as Usage[]).map((usage) => {
  const sizes = Object.entries(primitives.spaceUsages[usage]).map(([size, step]) => ({
    size,
    step: String(step),
    value: primitives.spacing[step as keyof typeof primitives.spacing]
  }));
  const largest = Math.max(...sizes.map((item) => item.value));
  return {
    usage,
    ...usageText[usage],
    sizes: sizes.map((item) => ({ ...item, share: item.value / largest }))
  };
});

/* Anatomy: highlight one kind of space on a real layout. */
const highlight = ref<Usage>("inset");
const highlightOptions = usages
  .filter((item) => item.usage !== "section")
  .map((item) => ({ value: item.usage, label: item.label, icon: item.icon }));
</script>

<template>
  <div class="token-sections">
    <section class="token-section">
      <header class="token-section__header">
        <h2>Anatomie de l'espace</h2>
        <p>
          Les composants ne choisissent pas un nombre de pixels : ils choisissent un type d'espace.
          Choisissez un type pour le voir sur une carte réelle.
        </p>
      </header>
      <div class="space-anatomy">
        <SegControl v-model="highlight" :options="highlightOptions" label="Type d'espace" />
        <div :class="['space-card-stage', 'lab-preview', highlight && `show-${highlight}`]">
          <article class="space-card">
            <header class="space-card__head">
              <span class="space-card__avatar">AN</span>
              <span class="space-card__who">
                <strong>Aïcha Ndiaye</strong>
                <small>Il y a 2 minutes</small>
              </span>
            </header>
            <p class="space-card__text">
              Le transfert de 25 000 FCFA est arrivé. Merci pour la rapidité, tout est parfait.
            </p>
            <div class="space-card__actions">
              <span class="space-card__button space-card__button--solid">Répondre</span>
              <span class="space-card__button">Archiver</span>
            </div>
          </article>
          <ul class="space-card-legend">
            <li><i class="is-inset" /> inset-lg · 16 px</li>
            <li><i class="is-stack" /> stack-md · 16 px</li>
            <li><i class="is-inline" /> inline-sm · 8 px</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Espacements par intention</h2>
        <p>
          Quatre familles qui pointent vers l'échelle. Changer une famille change tous les
          composants qui l'utilisent, sans chercher les valeurs une à une. Les barres comparent les
          tailles d'une même famille.
        </p>
      </header>
      <div class="intent-cards">
        <article
          v-for="item in usages"
          :key="item.usage"
          :class="['intent-card', `intent-card--${item.usage}`]"
        >
          <header class="intent-card__head">
            <span class="intent-card__icon"><Icon :name="item.icon" :size="20" /></span>
            <div>
              <h3>{{ item.label }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </header>
          <div class="intent-card__figure lab-preview" aria-hidden="true">
            <span v-if="item.usage === 'inset'" class="fig-inset"><i /></span>
            <span v-else-if="item.usage === 'stack'" class="fig-stack"><i /><i /><i /></span>
            <span v-else-if="item.usage === 'inline'" class="fig-inline"><i /><i /><i /></span>
            <span v-else class="fig-section"><i /><i /></span>
          </div>
          <ul class="intent-card__rows">
            <li v-for="size in item.sizes" :key="size.size">
              <strong>{{ size.size }}</strong>
              <span class="intent-card__bar"
                ><i :style="{ inlineSize: `${size.share * 100}%` }"
              /></span>
              <span class="numeric">{{ size.value }} px</span>
              <TokenCode :value="`--ns-${item.usage}-${size.size}`" />
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="token-section">
      <header class="token-section__header">
        <h2>Échelle</h2>
        <p>
          {{ steps.length }} pas sur une grille de 4 px, avec des demi-pas de 2 px pour les détails
          fins. Les clés suivent Tailwind : <code>space-4</code> vaut 16 px, comme <code>p-4</code>.
        </p>
      </header>
      <div class="space-ruler">
        <div v-for="[key, value] in steps" :key="key" class="space-ruler__row">
          <strong>{{ key }}</strong>
          <small class="numeric">{{ value }} px</small>
          <span class="space-ruler__track">
            <span
              :class="['space-ruler__bar', { 'is-half': key.includes('.') }]"
              :style="{ inlineSize: `${Math.max((value / largest) * 100, 0.4)}%` }"
            />
          </span>
          <TokenCode :value="spaceVariable(key)" />
        </div>
      </div>
    </section>
  </div>
</template>
