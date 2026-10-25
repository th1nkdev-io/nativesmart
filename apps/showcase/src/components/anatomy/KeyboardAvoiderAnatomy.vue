<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();
</script>

<template>
  <div class="anatomy-figure anat-kb-figure" @mouseleave="emit('hover', undefined)">
    <div class="anat-kb">
      <div class="anat-kb__header">Envoyer de l'argent</div>
      <div
        :class="['anat-kb__root', { 'is-active': active === 'root' }]"
        @mouseenter="emit('hover', 'root')"
      >
        <AnatomyPin
          class="anat-kb__pin anat-kb__pin--root"
          :number="number('root')"
          :active="active === 'root'"
        />
        <div
          :class="['anat-kb__content', { 'is-active': active === 'content' }]"
          @mouseenter.stop="emit('hover', 'content')"
        >
          <AnatomyPin
            class="anat-kb__pin anat-kb__pin--content"
            :number="number('content')"
            :active="active === 'content'"
          />
          <span class="anat-kb__field" /><span class="anat-kb__field" />
          <span class="anat-kb__field is-focused" />
        </div>
        <div
          :class="['anat-kb__accessory', { 'is-active': active === 'accessory' }]"
          @mouseenter.stop="emit('hover', 'accessory')"
        >
          <AnatomyPin
            class="anat-kb__pin anat-kb__pin--accessory"
            :number="number('accessory')"
            :active="active === 'accessory'"
          />
          <span>25 000 FCFA</span><b>Envoyer</b>
        </div>
      </div>
      <div
        :class="['anat-kb__keyboard', { 'is-active': active === 'inset' }]"
        @mouseenter="emit('hover', 'inset')"
      >
        <AnatomyPin
          class="anat-kb__pin anat-kb__pin--inset"
          :number="number('inset')"
          :active="active === 'inset'"
        />
        <span class="anat-kb__measure">inset</span>
        <i v-for="index in 3" :key="index" />
      </div>
    </div>
  </div>
</template>
