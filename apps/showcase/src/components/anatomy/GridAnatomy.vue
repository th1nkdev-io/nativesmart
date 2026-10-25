<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();

const items = [
  { span: 8, label: "span 8" },
  { span: 4, label: "span 4" },
  { span: 4, label: "4" },
  { span: 4, label: "4" },
  { span: 4, label: "4" }
];
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div
      :class="['anat-gr', { 'is-active': active === 'root' }]"
      @mouseenter="emit('hover', 'root')"
    >
      <AnatomyPin
        class="anat-gr__pin anat-gr__pin--root"
        :number="number('root')"
        :active="active === 'root'"
      />
      <div class="anat-gr__columns" aria-hidden="true">
        <i
          v-for="index in 12"
          :key="index"
          :class="{ 'is-active': active === 'column' && index === 3 }"
          @mouseenter.stop="emit('hover', 'column')"
        />
      </div>
      <span
        :class="['anat-gr__gutter', { 'is-active': active === 'gutter' }]"
        @mouseenter.stop="emit('hover', 'gutter')"
      />
      <div class="anat-gr__items">
        <span
          v-for="(item, index) in items"
          :key="index"
          :class="['anat-gr__item', { 'is-active': active === 'item' && index === 0 }]"
          :style="{ gridColumn: `span ${item.span}` }"
          @mouseenter.stop="emit('hover', 'item')"
          >{{ item.label }}</span
        >
      </div>
      <AnatomyPin
        class="anat-gr__pin anat-gr__pin--column"
        :number="number('column')"
        :active="active === 'column'"
      />
      <AnatomyPin
        class="anat-gr__pin anat-gr__pin--gutter"
        :number="number('gutter')"
        :active="active === 'gutter'"
      />
      <AnatomyPin
        class="anat-gr__pin anat-gr__pin--item"
        :number="number('item')"
        :active="active === 'item'"
      />
    </div>
    <p class="anat-gr__scale" aria-hidden="true">
      <span v-for="index in 12" :key="index">{{ index }}</span>
    </p>
  </div>
</template>
