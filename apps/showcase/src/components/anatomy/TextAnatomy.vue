<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div
      :class="['anat-tx', { 'is-active': active === 'root' }]"
      @mouseenter="emit('hover', 'root')"
    >
      <AnatomyPin
        class="anat-tx__pin anat-tx__pin--root"
        :number="number('root')"
        :active="active === 'root'"
      />
      <p
        :class="['anat-tx__content', { 'is-active': active === 'content' }]"
        @mouseenter.stop="emit('hover', 'content')"
      >
        Votre transfert de
        <mark :class="{ 'is-active': active === 'mark' }" @mouseenter.stop="emit('hover', 'mark')"
          >25 000 FCFA<AnatomyPin
            class="anat-tx__pin anat-tx__pin--mark"
            :number="number('mark')"
            :active="active === 'mark'"
        /></mark>
        est arrivé. Aïcha Diallo a été prévenue par SMS et peut retirer l'argent dans n'importe
        quelle agence…
        <AnatomyPin
          class="anat-tx__pin anat-tx__pin--content"
          :number="number('content')"
          :active="active === 'content'"
        />
      </p>
      <span class="anat-tx__actions">
        <span
          :class="['anat-tx__expand', { 'is-active': active === 'expand' }]"
          @mouseenter.stop="emit('hover', 'expand')"
        >
          Lire la suite
          <AnatomyPin
            class="anat-tx__pin anat-tx__pin--action"
            :number="number('expand')"
            :active="active === 'expand'"
          />
        </span>
        <span
          :class="['anat-tx__copy', { 'is-active': active === 'copy' }]"
          @mouseenter.stop="emit('hover', 'copy')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 9h11v11H9ZM5 15H4V4h11v1" /></svg>
          <AnatomyPin
            class="anat-tx__pin anat-tx__pin--action"
            :number="number('copy')"
            :active="active === 'copy'"
          />
        </span>
      </span>
    </div>
    <div class="anat-tx__decorations" aria-hidden="true">
      <span><strong>strong</strong></span>
      <span><em>italic</em></span>
      <span><u>underline</u></span>
      <span><s>strike</s></span>
      <span><mark>mark</mark></span>
      <span class="is-numeric">1 250,00</span>
    </div>
  </div>
</template>
