<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();

const heart = "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z";
const sizes = [
  { name: "2xs", size: 10 },
  { name: "xs", size: 12 },
  { name: "sm", size: 16 },
  { name: "md", size: 20 },
  { name: "lg", size: 24 },
  { name: "xl", size: 32 },
  { name: "2xl", size: 40 },
  { name: "3xl", size: 48 }
];
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div class="anat-ic">
      <span
        :class="['anat-ic__container', { 'is-active': active === 'container' }]"
        @mouseenter="emit('hover', 'container')"
      >
        <AnatomyPin
          class="anat-ic__pin anat-ic__pin--container"
          :number="number('container')"
          :active="active === 'container'"
        />
        <span
          :class="['anat-ic__root', { 'is-active': active === 'root' }]"
          @mouseenter.stop="emit('hover', 'root')"
        >
          <AnatomyPin
            class="anat-ic__pin anat-ic__pin--root"
            :number="number('root')"
            :active="active === 'root'"
          />
          <!-- The 24 × 24 grid the glyphs are drawn on, with its 2 px safe area. -->
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g class="anat-ic__grid">
              <path v-for="line in 23" :key="`v${line}`" :d="`M${line} 0V24`" />
              <path v-for="line in 23" :key="`h${line}`" :d="`M0 ${line}H24`" />
              <rect x="2" y="2" width="20" height="20" rx="1" />
            </g>
            <path
              :class="['anat-ic__glyph', { 'is-active': active === 'glyph' }]"
              :d="heart"
              @mouseenter.stop="emit('hover', 'glyph')"
            />
          </svg>
          <AnatomyPin
            class="anat-ic__pin anat-ic__pin--glyph"
            :number="number('glyph')"
            :active="active === 'glyph'"
          />
        </span>
      </span>
    </div>
    <div class="anat-ic__sizes" aria-hidden="true">
      <span v-for="item in sizes" :key="item.name">
        <svg viewBox="0 0 24 24" :style="{ inlineSize: `${item.size}px` }">
          <path :d="heart" />
        </svg>
        <b>{{ item.name }}</b>
        <small>{{ item.size }}</small>
      </span>
    </div>
  </div>
</template>
