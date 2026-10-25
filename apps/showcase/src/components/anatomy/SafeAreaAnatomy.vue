<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();
</script>

<template>
  <div class="anatomy-figure anat-sa-figure" @mouseleave="emit('hover', undefined)">
    <div
      :class="['anat-sa', { 'is-active': active === 'root' }]"
      @mouseenter="emit('hover', 'root')"
    >
      <AnatomyPin
        class="anat-sa__pin anat-sa__pin--root"
        :number="number('root')"
        :active="active === 'root'"
      />
      <span
        :class="['anat-sa__inset is-top', { 'is-active': active === 'inset' }]"
        @mouseenter.stop="emit('hover', 'inset')"
      >
        <AnatomyPin
          class="anat-sa__pin anat-sa__pin--inset"
          :number="number('inset')"
          :active="active === 'inset'"
        />
      </span>
      <div
        :class="['anat-sa__content', { 'is-active': active === 'content' }]"
        @mouseenter.stop="emit('hover', 'content')"
      >
        <AnatomyPin
          class="anat-sa__pin anat-sa__pin--content"
          :number="number('content')"
          :active="active === 'content'"
        />
        <span class="anat-sa__line" style="inline-size: 60%" />
        <span class="anat-sa__card" />
        <span class="anat-sa__tabs"><i /><i /><i /></span>
      </div>
      <span
        :class="['anat-sa__inset is-bottom', { 'is-active': active === 'inset' }]"
        @mouseenter.stop="emit('hover', 'inset')"
      />
      <i class="anat-sa__island" aria-hidden="true" />
      <i class="anat-sa__home" aria-hidden="true" />
    </div>
    <p class="anat-sa__note">top 47 · bottom 34 px sur iPhone · start et end en paysage</p>
  </div>
</template>
