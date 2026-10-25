<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div class="anat-cp">
      <span class="anat-cp__caption">Numéro de compte</span>
      <span
        :class="['anat-cp__field', { 'is-active': active === 'root' }]"
        @mouseenter="emit('hover', 'root')"
      >
        <AnatomyPin
          class="anat-cp__pin anat-cp__pin--root"
          :number="number('root')"
          :active="active === 'root'"
        />
        <span
          :class="['anat-cp__value', { 'is-active': active === 'value' }]"
          @mouseenter.stop="emit('hover', 'value')"
        >
          CI93 0001 2345 6789 4521
          <AnatomyPin
            class="anat-cp__pin anat-cp__pin--below"
            :number="number('value')"
            :active="active === 'value'"
          />
        </span>
        <span
          :class="['anat-cp__button', { 'is-active': active === 'button' }]"
          @mouseenter.stop="emit('hover', 'button')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
          <AnatomyPin
            class="anat-cp__pin anat-cp__pin--above"
            :number="number('button')"
            :active="active === 'button'"
          />
        </span>
      </span>
      <span
        :class="['anat-cp__feedback', { 'is-active': active === 'feedback' }]"
        @mouseenter="emit('hover', 'feedback')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11 5 6 9H2v6h4l5 4V5ZM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
        </svg>
        « Copié »
        <AnatomyPin
          class="anat-cp__pin anat-cp__pin--side"
          :number="number('feedback')"
          :active="active === 'feedback'"
        />
      </span>
    </div>
  </div>
</template>
