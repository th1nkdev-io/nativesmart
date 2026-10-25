<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();

const levels = [1, 2, 3, 4, 5, 6];
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div
      :class="['anat-hd', { 'is-active': active === 'root' }]"
      @mouseenter="emit('hover', 'root')"
    >
      <AnatomyPin
        class="anat-hd__pin anat-hd__pin--root"
        :number="number('root')"
        :active="active === 'root'"
      />
      <span
        :class="['anat-hd__eyebrow', { 'is-active': active === 'eyebrow' }]"
        @mouseenter.stop="emit('hover', 'eyebrow')"
      >
        Transferts
        <AnatomyPin
          class="anat-hd__pin anat-hd__pin--side"
          :number="number('eyebrow')"
          :active="active === 'eyebrow'"
        />
      </span>
      <span class="anat-hd__line">
        <span
          :class="['anat-hd__title', { 'is-active': active === 'title' }]"
          @mouseenter.stop="emit('hover', 'title')"
        >
          Envoyez vite
          <AnatomyPin
            class="anat-hd__pin anat-hd__pin--title"
            :number="number('title')"
            :active="active === 'title'"
          />
        </span>
        <span
          :class="['anat-hd__anchor', { 'is-active': active === 'anchor' }]"
          @mouseenter.stop="emit('hover', 'anchor')"
        >
          #
          <AnatomyPin
            class="anat-hd__pin anat-hd__pin--anchor"
            :number="number('anchor')"
            :active="active === 'anchor'"
          />
        </span>
      </span>
      <span
        :class="['anat-hd__subtitle', { 'is-active': active === 'subtitle' }]"
        @mouseenter.stop="emit('hover', 'subtitle')"
      >
        Kofi, Aïcha ou Moussa reçoivent leur argent en quelques secondes.
        <AnatomyPin
          class="anat-hd__pin anat-hd__pin--side"
          :number="number('subtitle')"
          :active="active === 'subtitle'"
        />
      </span>
    </div>
    <div class="anat-hd__levels" aria-hidden="true">
      <span v-for="level in levels" :key="level" :style="{ '--level': level }">
        <b>Aa</b>
        <small>h{{ level }}</small>
      </span>
    </div>
  </div>
</template>
