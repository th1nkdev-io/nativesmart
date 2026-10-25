<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();

const rows = [
  "Kofi Mensah",
  "Aïcha Diallo",
  "Moussa Traoré",
  "Awa Koné",
  "Yao Kouassi",
  "Fatou Ndiaye"
];
</script>

<template>
  <div class="anatomy-figure anat-scroll-figure" @mouseleave="emit('hover', undefined)">
    <div
      :class="['anat-scroll', { 'is-active': active === 'root' }]"
      @mouseenter="emit('hover', 'root')"
    >
      <AnatomyPin
        class="anat-scroll__pin anat-scroll__pin--root"
        :number="number('root')"
        :active="active === 'root'"
      />
      <div
        :class="['anat-scroll__viewport', { 'is-active': active === 'viewport' }]"
        @mouseenter.stop="emit('hover', 'viewport')"
      >
        <AnatomyPin
          class="anat-scroll__pin anat-scroll__pin--viewport"
          :number="number('viewport')"
          :active="active === 'viewport'"
        />
        <div
          :class="['anat-scroll__content', { 'is-active': active === 'content' }]"
          @mouseenter.stop="emit('hover', 'content')"
        >
          <AnatomyPin
            class="anat-scroll__pin anat-scroll__pin--content"
            :number="number('content')"
            :active="active === 'content'"
          />
          <span v-for="name in rows" :key="name" class="anat-scroll__row">
            <i>{{
              name
                .split(" ")
                .map((part) => part[0])
                .join("")
            }}</i
            >{{ name }}
          </span>
        </div>
      </div>
      <span
        :class="['anat-scroll__fade is-top', { 'is-active': active === 'fade' }]"
        @mouseenter.stop="emit('hover', 'fade')"
      >
        <AnatomyPin
          class="anat-scroll__pin anat-scroll__pin--fade"
          :number="number('fade')"
          :active="active === 'fade'"
        />
      </span>
      <span
        :class="['anat-scroll__fade is-bottom', { 'is-active': active === 'fade' }]"
        @mouseenter.stop="emit('hover', 'fade')"
      />
      <span
        :class="['anat-scroll__bar', { 'is-active': active === 'scrollbar' }]"
        @mouseenter.stop="emit('hover', 'scrollbar')"
      >
        <AnatomyPin
          class="anat-scroll__pin anat-scroll__pin--bar"
          :number="number('scrollbar')"
          :active="active === 'scrollbar'"
        />
        <span
          :class="['anat-scroll__thumb', { 'is-active': active === 'thumb' }]"
          @mouseenter.stop="emit('hover', 'thumb')"
        >
          <AnatomyPin
            class="anat-scroll__pin anat-scroll__pin--thumb"
            :number="number('thumb')"
            :active="active === 'thumb'"
          />
        </span>
      </span>
    </div>
    <p class="anat-scroll__note">défilement natif · barres dessinées par-dessus</p>
  </div>
</template>
