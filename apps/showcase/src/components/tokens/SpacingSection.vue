<script setup lang="ts">
import { primitives, spaceVariable } from "@nativesmart/tokens";
import { ref } from "vue";
import TokenCode from "./TokenCode.vue";

const steps = (Object.entries(primitives.spacing) as [string, number][]).sort(
  (a, b) => a[1] - b[1]
);
const largest = Math.max(...steps.map(([, value]) => value));

type Usage = keyof typeof primitives.spaceUsages;
const usageText: Record<Usage, { label: string; description: string }> = {
  inset: { label: "Inset", description: "Marge intérieure d'une boîte : carte, bouton, cellule." },
  stack: { label: "Stack", description: "Écart vertical entre des éléments empilés." },
  inline: { label: "Inline", description: "Écart horizontal entre des éléments alignés." },
  section: { label: "Section", description: "Respiration entre les grands blocs d'une page." }
};
const usages = (Object.keys(primitives.spaceUsages) as Usage[]).map((usage) => ({
  usage,
  ...usageText[usage],
  sizes: Object.entries(primitives.spaceUsages[usage]).map(([size, step]) => ({
    size,
    step: String(step),
    value: primitives.spacing[step as keyof typeof primitives.spacing]
  }))
}));

/* Anatomy: highlight one kind of space on a real layout. */
const highlight = ref<Usage | null>("inset");
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
        <div class="seg" role="radiogroup" aria-label="Type d'espace">
          <button
            v-for="item in usages.filter((entry) => entry.usage !== 'section')"
            :key="item.usage"
            type="button"
            role="radio"
            :aria-checked="highlight === item.usage"
            @click="highlight = item.usage"
          >
            {{ item.label }}
          </button>
        </div>
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
          composants qui l'utilisent, sans chercher les valeurs une à une. Aperçus à taille réelle,
          sauf les sections, au quart.
        </p>
      </header>
      <div class="usage-columns">
        <article v-for="item in usages" :key="item.usage" class="usage-column">
          <h3>{{ item.label }}</h3>
          <p class="muted">{{ item.description }}</p>
          <ul>
            <li v-for="size in item.sizes" :key="size.size">
              <span :class="['space-sample', `space-sample--${item.usage}`]">
                <i
                  :style="{
                    '--gap': `${item.usage === 'section' ? size.value / 4 : size.value}px`
                  }"
                />
              </span>
              <strong>{{ size.size }}</strong>
              <small class="numeric">{{ size.value }} px · space-{{ size.step }}</small>
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
