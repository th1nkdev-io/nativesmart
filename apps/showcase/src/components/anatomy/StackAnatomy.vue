<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();

const directions = [
  { name: "column", row: false, reverse: false },
  { name: "row", row: true, reverse: false },
  { name: "column-reverse", row: false, reverse: true },
  { name: "row-reverse", row: true, reverse: true }
];
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div
      :class="['anat-st', { 'is-active': active === 'root' }]"
      @mouseenter="emit('hover', 'root')"
    >
      <AnatomyPin
        class="anat-st__pin anat-st__pin--root"
        :number="number('root')"
        :active="active === 'root'"
      />
      <span
        :class="['anat-st__item', { 'is-active': active === 'item' }]"
        @mouseenter.stop="emit('hover', 'item')"
      >
        <i>KM</i><b>Kofi Mensah</b>
        <AnatomyPin
          class="anat-st__pin anat-st__pin--item"
          :number="number('item')"
          :active="active === 'item'"
        />
      </span>
      <span
        :class="['anat-st__gap', { 'is-active': active === 'gap' }]"
        @mouseenter.stop="emit('hover', 'gap')"
      >
        <small>md · 16</small>
        <AnatomyPin
          class="anat-st__pin anat-st__pin--gap"
          :number="number('gap')"
          :active="active === 'gap'"
        />
      </span>
      <span
        :class="['anat-st__item', { 'is-active': active === 'item' }]"
        @mouseenter.stop="emit('hover', 'item')"
        ><i>AD</i><b>Aïcha Diallo</b></span
      >
      <span
        :class="['anat-st__divider', { 'is-active': active === 'divider' }]"
        @mouseenter.stop="emit('hover', 'divider')"
      >
        <AnatomyPin
          class="anat-st__pin anat-st__pin--divider"
          :number="number('divider')"
          :active="active === 'divider'"
        />
      </span>
      <span
        :class="['anat-st__item', { 'is-active': active === 'item' }]"
        @mouseenter.stop="emit('hover', 'item')"
        ><i>MT</i><b>Moussa Traoré</b></span
      >
    </div>
    <div class="anat-st__directions" aria-hidden="true">
      <span v-for="direction in directions" :key="direction.name">
        <em :class="{ 'is-row': direction.row, 'is-reverse': direction.reverse }">
          <i>1</i><i>2</i><i>3</i>
        </em>
        <small>{{ direction.name }}</small>
      </span>
    </div>
  </div>
</template>
