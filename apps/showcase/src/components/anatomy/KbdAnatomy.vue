<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();

const platforms = [
  { name: "Apple", keys: ["⌘", "⇧", "P"] },
  { name: "Windows, Linux", keys: ["Ctrl", "⇧", "P"] },
  { name: "Séquence", keys: ["G", "puis", "H"] }
];
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div class="anat-kbd">
      <span
        :class="['anat-kbd__root', { 'is-active': active === 'root' }]"
        @mouseenter="emit('hover', 'root')"
      >
        <AnatomyPin
          class="anat-kbd__pin anat-kbd__pin--root"
          :number="number('root')"
          :active="active === 'root'"
        />
        <span
          :class="['anat-kbd__key', { 'is-active': active === 'key' }]"
          @mouseenter.stop="emit('hover', 'key')"
        >
          ⌘
        </span>
        <span
          :class="['anat-kbd__plus', { 'is-active': active === 'separator' }]"
          @mouseenter.stop="emit('hover', 'separator')"
        >
          +
          <AnatomyPin
            class="anat-kbd__pin anat-kbd__pin--separator"
            :number="number('separator')"
            :active="active === 'separator'"
          />
        </span>
        <span :class="['anat-kbd__key', { 'is-active': active === 'key' }]">⇧</span>
        <span class="anat-kbd__plus">+</span>
        <span
          :class="['anat-kbd__key', { 'is-active': active === 'key' }]"
          @mouseenter.stop="emit('hover', 'key')"
        >
          P
          <AnatomyPin
            class="anat-kbd__pin anat-kbd__pin--key"
            :number="number('key')"
            :active="active === 'key'"
          />
        </span>
      </span>
      <small class="anat-kbd__spoken">Lu : « Command + Shift + P »</small>
    </div>
    <div class="anat-kbd__platforms" aria-hidden="true">
      <span v-for="platform in platforms" :key="platform.name">
        <span class="anat-kbd__mini">
          <template v-for="key in platform.keys" :key="key">
            <i v-if="key === 'puis'">puis</i>
            <b v-else>{{ key }}</b>
          </template>
        </span>
        <small>{{ platform.name }}</small>
      </span>
    </div>
  </div>
</template>
