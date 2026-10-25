<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div class="anat-bt">
      <span
        :class="['anat-bt__button', { 'is-active': active === 'root' }]"
        @mouseenter="emit('hover', 'root')"
      >
        <AnatomyPin
          class="anat-bt__pin anat-bt__pin--root"
          :number="number('root')"
          :active="active === 'root'"
        />
        <span
          :class="['anat-bt__part', { 'is-active': active === 'leading-icon' }]"
          @mouseenter.stop="emit('hover', 'leading-icon')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z" />
          </svg>
          <AnatomyPin
            class="anat-bt__pin anat-bt__pin--below"
            :number="number('leading-icon')"
            :active="active === 'leading-icon'"
          />
        </span>
        <span
          :class="['anat-bt__part', { 'is-active': active === 'label' }]"
          @mouseenter.stop="emit('hover', 'label')"
        >
          Envoyer 25 000 FCFA
          <AnatomyPin
            class="anat-bt__pin anat-bt__pin--above"
            :number="number('label')"
            :active="active === 'label'"
          />
        </span>
        <span
          :class="['anat-bt__part', { 'is-active': active === 'trailing-icon' }]"
          @mouseenter.stop="emit('hover', 'trailing-icon')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
          <AnatomyPin
            class="anat-bt__pin anat-bt__pin--below"
            :number="number('trailing-icon')"
            :active="active === 'trailing-icon'"
          />
        </span>
      </span>

      <span
        :class="['anat-bt__button', 'is-loading', { 'is-active': active === 'spinner' }]"
        @mouseenter="emit('hover', 'spinner')"
      >
        <span class="anat-bt__ghost">Envoyer 25 000 FCFA</span>
        <span class="anat-bt__spinner" />
        <AnatomyPin
          class="anat-bt__pin anat-bt__pin--side"
          :number="number('spinner')"
          :active="active === 'spinner'"
        />
      </span>
    </div>
    <div class="anat-bt__variants" aria-hidden="true">
      <span v-for="variant in ['solid', 'soft', 'outline', 'ghost', 'link']" :key="variant">
        <i :class="`is-${variant}`">Aa</i>
        <small>{{ variant }}</small>
      </span>
    </div>
  </div>
</template>
