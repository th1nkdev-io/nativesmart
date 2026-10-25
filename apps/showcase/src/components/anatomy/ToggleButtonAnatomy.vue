<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();

const heart = "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z";
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div class="anat-tg">
      <span class="anat-tg__state">
        <span class="anat-tg__button">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="heart" /></svg>
          Favori
        </span>
        <small>aria-pressed="false"</small>
      </span>
      <svg class="anat-tg__arrow" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h14m-6-6 6 6-6 6" />
      </svg>
      <span class="anat-tg__state">
        <span
          :class="['anat-tg__button', 'is-pressed', { 'is-active': active === 'root' }]"
          @mouseenter="emit('hover', 'root')"
        >
          <AnatomyPin
            class="anat-tg__pin anat-tg__pin--root"
            :number="number('root')"
            :active="active === 'root'"
          />
          <span
            :class="['anat-tg__part', { 'is-active': active === 'icon' }]"
            @mouseenter.stop="emit('hover', 'icon')"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="heart" /></svg>
            <AnatomyPin
              class="anat-tg__pin anat-tg__pin--below"
              :number="number('icon')"
              :active="active === 'icon'"
            />
          </span>
          <span
            :class="['anat-tg__part', { 'is-active': active === 'label' }]"
            @mouseenter.stop="emit('hover', 'label')"
          >
            Favori
            <AnatomyPin
              class="anat-tg__pin anat-tg__pin--above"
              :number="number('label')"
              :active="active === 'label'"
            />
          </span>
        </span>
        <small>aria-pressed="true"</small>
      </span>
    </div>
  </div>
</template>
