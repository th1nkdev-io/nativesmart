<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div class="anat-lk">
      <p>
        Le
        <span
          :class="['anat-lk__root', { 'is-active': active === 'root' }]"
          @mouseenter="emit('hover', 'root')"
        >
          <AnatomyPin
            class="anat-lk__pin anat-lk__pin--root"
            :number="number('root')"
            :active="active === 'root'"
          />
          <span
            :class="['anat-lk__part', 'anat-lk__text', { 'is-active': active === 'text' }]"
            @mouseenter.stop="emit('hover', 'text')"
            >centre d'aide<AnatomyPin
              class="anat-lk__pin anat-lk__pin--below"
              :number="number('text')"
              :active="active === 'text'"
          /></span>
          <span
            :class="['anat-lk__part', { 'is-active': active === 'external' }]"
            @mouseenter.stop="emit('hover', 'external')"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
              />
            </svg>
            <AnatomyPin
              class="anat-lk__pin anat-lk__pin--above"
              :number="number('external')"
              :active="active === 'external'"
            />
          </span>
        </span>
        répond vite.
      </p>
      <span class="anat-lk__standalone">
        <span
          :class="['anat-lk__part', { 'is-active': active === 'icon' }]"
          @mouseenter="emit('hover', 'icon')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4v11m-5-5 5 5 5-5M5 20h14" />
          </svg>
          <AnatomyPin
            class="anat-lk__pin anat-lk__pin--below"
            :number="number('icon')"
            :active="active === 'icon'"
          />
        </span>
        Tous les transferts
        <span
          :class="['anat-lk__part', { 'is-active': active === 'arrow' }]"
          @mouseenter="emit('hover', 'arrow')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
          <AnatomyPin
            class="anat-lk__pin anat-lk__pin--below"
            :number="number('arrow')"
            :active="active === 'arrow'"
          />
        </span>
      </span>
    </div>
    <div class="anat-lk__underlines" aria-hidden="true">
      <span><u class="is-always">always</u></span>
      <span><u class="is-hover">hover</u></span>
      <span><u class="is-none">none</u></span>
    </div>
  </div>
</template>
