<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();

/* Bound, so Vite keeps it as a plain URL into the public folder. */
const lagoon = "lab/lagoon.svg";
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div
      :class="['anat-img', { 'is-active': active === 'root' }]"
      @mouseenter="emit('hover', 'root')"
    >
      <AnatomyPin
        class="anat-img__pin anat-img__pin--root"
        :number="number('root')"
        :active="active === 'root'"
      />
      <span
        :class="['anat-img__frame', { 'is-active': active === 'frame' }]"
        @mouseenter.stop="emit('hover', 'frame')"
      >
        <AnatomyPin
          class="anat-img__pin anat-img__pin--frame"
          :number="number('frame')"
          :active="active === 'frame'"
        />
        <img
          :class="['anat-img__image', { 'is-active': active === 'image' }]"
          :src="lagoon"
          alt=""
          @mouseenter.stop="emit('hover', 'image')"
        />
        <AnatomyPin
          class="anat-img__pin anat-img__pin--image"
          :number="number('image')"
          :active="active === 'image'"
        />
        <span
          :class="['anat-img__preview', { 'is-active': active === 'preview' }]"
          @mouseenter.stop="emit('hover', 'preview')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4M11 8v6M8 11h6" />
          </svg>
          <AnatomyPin
            class="anat-img__pin anat-img__pin--preview"
            :number="number('preview')"
            :active="active === 'preview'"
          />
        </span>
      </span>
      <span
        :class="['anat-img__caption', { 'is-active': active === 'caption' }]"
        @mouseenter.stop="emit('hover', 'caption')"
      >
        Lagune d'Assinie, au lever du jour
        <AnatomyPin
          class="anat-img__pin anat-img__pin--caption"
          :number="number('caption')"
          :active="active === 'caption'"
        />
      </span>
    </div>

    <div class="anat-img__states">
      <span
        :class="['anat-img__state', 'is-shimmer', { 'is-active': active === 'placeholder' }]"
        @mouseenter="emit('hover', 'placeholder')"
      >
        <AnatomyPin
          class="anat-img__pin anat-img__pin--state"
          :number="number('placeholder')"
          :active="active === 'placeholder'"
        />
        <small>Chargement</small>
      </span>
      <span
        :class="['anat-img__state', 'is-fallback', { 'is-active': active === 'fallback' }]"
        @mouseenter="emit('hover', 'fallback')"
      >
        <AnatomyPin
          class="anat-img__pin anat-img__pin--state"
          :number="number('fallback')"
          :active="active === 'fallback'"
        />
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1ZM9 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM20 15l-5-5L5 20"
          />
        </svg>
        <small>Lagune bordée de palmiers</small>
      </span>
    </div>
  </div>
</template>
