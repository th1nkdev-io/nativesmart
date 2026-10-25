<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();

/* Shared public folder; bound so Vite keeps it a plain URL. */
const image = "lab/lagoon.svg";
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div :class="['anat-ar', { 'is-root': active === 'root' }]" @mouseenter="emit('hover', 'root')">
      <img :src="image" alt="" class="anat-ar__media" @mouseenter.stop="emit('hover', 'media')" />
      <div class="anat-ar__overlay" @mouseenter.stop="emit('hover', 'overlay')">
        <span class="anat-ar__chip">16 : 9</span>
        <span class="anat-ar__like">♡</span>
      </div>
      <div class="anat-ar__caption" @mouseenter.stop="emit('hover', 'caption')">
        <strong>Lagune de Grand-Bassam</strong>
        <span>Côte d'Ivoire</span>
      </div>
      <AnatomyPin
        class="anat-ar__pin anat-ar__pin--root"
        :number="number('root')"
        :active="active === 'root'"
      />
      <AnatomyPin
        class="anat-ar__pin anat-ar__pin--media"
        :number="number('media')"
        :active="active === 'media'"
      />
      <AnatomyPin
        class="anat-ar__pin anat-ar__pin--overlay"
        :number="number('overlay')"
        :active="active === 'overlay'"
      />
      <AnatomyPin
        class="anat-ar__pin anat-ar__pin--caption"
        :number="number('caption')"
        :active="active === 'caption'"
      />
    </div>
    <div class="anat-ar__states">
      <figure @mouseenter="emit('hover', 'placeholder')">
        <div class="anat-ar__mini anat-ar__mini--loading">
          <AnatomyPin :number="number('placeholder')" :active="active === 'placeholder'" />
        </div>
        <figcaption>Pendant le chargement</figcaption>
      </figure>
      <figure @mouseenter="emit('hover', 'fallback')">
        <div class="anat-ar__mini anat-ar__mini--error">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1ZM9 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM20 15l-5-5L5 20"
            />
          </svg>
          <AnatomyPin :number="number('fallback')" :active="active === 'fallback'" />
        </div>
        <figcaption>Si l'image échoue</figcaption>
      </figure>
    </div>
  </div>
</template>
