<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div class="anat-bg">
      <span
        :class="['anat-bg__root', { 'is-active': active === 'root' }]"
        @mouseenter="emit('hover', 'root')"
      >
        <AnatomyPin
          class="anat-bg__pin anat-bg__pin--root"
          :number="number('root')"
          :active="active === 'root'"
        />
        <span
          :class="['anat-bg__button', { 'is-active': active === 'button' }]"
          @mouseenter.stop="emit('hover', 'button')"
        >
          PDF
          <AnatomyPin
            class="anat-bg__pin anat-bg__pin--below"
            :number="number('button')"
            :active="active === 'button'"
          />
        </span>
        <span
          :class="['anat-bg__seam', { 'is-active': active === 'seam' }]"
          @mouseenter.stop="emit('hover', 'seam')"
        >
          <AnatomyPin
            class="anat-bg__pin anat-bg__pin--above"
            :number="number('seam')"
            :active="active === 'seam'"
          />
        </span>
        <span class="anat-bg__button">CSV</span>
        <span class="anat-bg__seam" />
        <span class="anat-bg__button">Imprimer</span>
      </span>
      <span class="anat-bg__split">
        <span>Envoyer</span>
        <i />
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </span>
    </div>
  </div>
</template>
