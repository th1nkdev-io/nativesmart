<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();

const steps = [
  { name: "xs", size: 4 },
  { name: "sm", size: 8 },
  { name: "md", size: 16 },
  { name: "lg", size: 24 },
  { name: "xl", size: 32 },
  { name: "2xl", size: 48 }
];
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div class="anat-sp">
      <span class="anat-sp__logo">N</span>
      <strong class="anat-sp__brand">Pay</strong>
      <span
        :class="['anat-sp__root', { 'is-active': active === 'root' }]"
        @mouseenter="emit('hover', 'root')"
      >
        <AnatomyPin
          class="anat-sp__pin anat-sp__pin--root"
          :number="number('root')"
          :active="active === 'root'"
        />
        <span
          :class="['anat-sp__fill', { 'is-active': active === 'fill' }]"
          @mouseenter.stop="emit('hover', 'fill')"
        >
          <AnatomyPin
            class="anat-sp__pin anat-sp__pin--fill"
            :number="number('fill')"
            :active="active === 'fill'"
          />
        </span>
        <span
          :class="['anat-sp__label', { 'is-active': active === 'label' }]"
          @mouseenter.stop="emit('hover', 'label')"
        >
          auto
          <AnatomyPin
            class="anat-sp__pin anat-sp__pin--label"
            :number="number('label')"
            :active="active === 'label'"
          />
        </span>
      </span>
      <span class="anat-sp__avatar">KM</span>
    </div>
    <div class="anat-sp__steps" aria-hidden="true">
      <span v-for="step in steps" :key="step.name">
        <i :style="{ inlineSize: `${step.size}px` }" />
        <b>{{ step.name }}</b>
        <small>{{ step.size }}</small>
      </span>
    </div>
  </div>
</template>
