<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div class="anat-box">
      <span class="anat-box__label anat-box__label--margin">margin</span>
      <div
        :class="['anat-box__root', { 'is-active': active === 'root' }]"
        @mouseenter="emit('hover', 'root')"
      >
        <AnatomyPin
          class="anat-box__pin anat-box__pin--root"
          :number="number('root')"
          :active="active === 'root'"
        />
        <span class="anat-box__label anat-box__label--padding">padding</span>
        <div
          :class="['anat-box__content', { 'is-active': active === 'content' }]"
          @mouseenter.stop="emit('hover', 'content')"
        >
          <AnatomyPin
            class="anat-box__pin anat-box__pin--content"
            :number="number('content')"
            :active="active === 'content'"
          />
          <span class="anat-box__child">Envoyer</span>
          <span class="anat-box__gap">gap</span>
          <span class="anat-box__child">Recevoir</span>
          <span class="anat-box__gap">gap</span>
          <span class="anat-box__child">Payer</span>
        </div>
      </div>
    </div>
    <p class="anat-box__legend">
      <span><i class="is-margin" /> margin</span>
      <span><i class="is-border" /> border · radius · elevation</span>
      <span><i class="is-padding" /> padding</span>
      <span><i class="is-content" /> contenu · gap</span>
    </p>
  </div>
</template>
