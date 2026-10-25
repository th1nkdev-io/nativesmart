<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();

const levels = ["sunken", "base", "raised", "floating", "overlay"];
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div class="anat-sf">
      <span
        :class="['anat-sf__shadow', { 'is-active': active === 'shadow' }]"
        @mouseenter="emit('hover', 'shadow')"
      >
        <AnatomyPin
          class="anat-sf__pin anat-sf__pin--shadow"
          :number="number('shadow')"
          :active="active === 'shadow'"
        />
      </span>
      <div
        :class="[
          'anat-sf__root',
          { 'is-active': active === 'root', 'is-border': active === 'border' }
        ]"
        @mouseenter="emit('hover', 'root')"
      >
        <AnatomyPin
          class="anat-sf__pin anat-sf__pin--root"
          :number="number('root')"
          :active="active === 'root'"
        />
        <span class="anat-sf__border-hit" @mouseenter.stop="emit('hover', 'border')">
          <AnatomyPin
            class="anat-sf__pin anat-sf__pin--border"
            :number="number('border')"
            :active="active === 'border'"
          />
        </span>
        <span
          :class="['anat-sf__content', { 'is-active': active === 'content' }]"
          @mouseenter.stop="emit('hover', 'content')"
        >
          <small>Solde disponible</small>
          <strong>125 000 FCFA</strong>
          <AnatomyPin
            class="anat-sf__pin anat-sf__pin--content"
            :number="number('content')"
            :active="active === 'content'"
          />
        </span>
      </div>
    </div>
    <div class="anat-sf__levels" aria-hidden="true">
      <span v-for="level in levels" :key="level">
        <i :class="`is-${level}`" />
        <small>{{ level }}</small>
      </span>
    </div>
  </div>
</template>
