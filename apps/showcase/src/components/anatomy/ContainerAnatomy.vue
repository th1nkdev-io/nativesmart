<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div class="anat-ct">
      <div class="anat-ct__chrome" aria-hidden="true"><i /><i /><i /></div>
      <div
        :class="['anat-ct__band', { 'is-active': active === 'root' }]"
        @mouseenter="emit('hover', 'root')"
      >
        <AnatomyPin
          class="anat-ct__pin anat-ct__pin--root"
          :number="number('root')"
          :active="active === 'root'"
        />
        <div
          :class="['anat-ct__gutter', { 'is-active': active === 'gutter' }]"
          @mouseenter.stop="emit('hover', 'gutter')"
        >
          <AnatomyPin
            class="anat-ct__pin anat-ct__pin--gutter"
            :number="number('gutter')"
            :active="active === 'gutter'"
          />
        </div>
        <div
          :class="['anat-ct__content', { 'is-active': active === 'content' }]"
          @mouseenter.stop="emit('hover', 'content')"
        >
          <AnatomyPin
            class="anat-ct__pin anat-ct__pin--content"
            :number="number('content')"
            :active="active === 'content'"
          />
          <span class="anat-ct__line" style="inline-size: 70%" />
          <span class="anat-ct__line is-soft" style="inline-size: 90%" />
          <span class="anat-ct__line is-soft" style="inline-size: 80%" />
          <span class="anat-ct__cards"><i /><i /><i /></span>
        </div>
        <div
          :class="['anat-ct__gutter', { 'is-active': active === 'gutter' }]"
          @mouseenter.stop="emit('hover', 'gutter')"
        />
      </div>
      <div class="anat-ct__bleed">data-bleed</div>
    </div>
    <p class="anat-ct__ruler" aria-hidden="true">
      <span>marge</span><b>largeur max · xl 1280 px</b><span>marge</span>
    </p>
  </div>
</template>
