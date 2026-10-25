<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div class="anat-dv">
      <span class="anat-dv__block">Continuer avec Google</span>
      <div
        :class="['anat-dv__root', { 'is-active': active === 'root' }]"
        @mouseenter="emit('hover', 'root')"
      >
        <AnatomyPin
          class="anat-dv__pin anat-dv__pin--root"
          :number="number('root')"
          :active="active === 'root'"
        />
        <span
          :class="['anat-dv__line', { 'is-active': active === 'line' }]"
          @mouseenter.stop="emit('hover', 'line')"
        />
        <span
          :class="['anat-dv__label', { 'is-active': active === 'label' }]"
          @mouseenter.stop="emit('hover', 'label')"
        >
          ou
          <AnatomyPin
            class="anat-dv__pin anat-dv__pin--label"
            :number="number('label')"
            :active="active === 'label'"
          />
        </span>
        <span
          :class="['anat-dv__line', { 'is-active': active === 'line' }]"
          @mouseenter.stop="emit('hover', 'line')"
        >
          <AnatomyPin
            class="anat-dv__pin anat-dv__pin--line"
            :number="number('line')"
            :active="active === 'line'"
          />
        </span>
      </div>
      <span class="anat-dv__block is-field">Adresse e-mail</span>
    </div>
    <div class="anat-dv__styles" aria-hidden="true">
      <span><i class="is-solid" />solid</span>
      <span><i class="is-dashed" />dashed</span>
      <span><i class="is-dotted" />dotted</span>
      <span><i class="is-gradient" />gradient</span>
    </div>
  </div>
</template>
