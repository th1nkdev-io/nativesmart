<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();

const markers = [
  { name: "bullet", glyph: "•" },
  { name: "number", glyph: "1." },
  { name: "check", glyph: "✓" },
  { name: "dash", glyph: "–" },
  { name: "steps", glyph: "1" }
];
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div
      :class="['anat-ls', { 'is-active': active === 'root' }]"
      @mouseenter="emit('hover', 'root')"
    >
      <AnatomyPin
        class="anat-ls__pin anat-ls__pin--root"
        :number="number('root')"
        :active="active === 'root'"
      />
      <ol class="anat-ls__list">
        <li
          :class="['anat-ls__item', { 'is-active': active === 'item' }]"
          @mouseenter.stop="emit('hover', 'item')"
        >
          <span
            :class="['anat-ls__marker', { 'is-active': active === 'marker' }]"
            @mouseenter.stop="emit('hover', 'marker')"
            >1<AnatomyPin
              class="anat-ls__pin anat-ls__pin--marker"
              :number="number('marker')"
              :active="active === 'marker'"
          /></span>
          <span
            :class="['anat-ls__connector', { 'is-active': active === 'connector' }]"
            @mouseenter.stop="emit('hover', 'connector')"
          >
            <AnatomyPin
              class="anat-ls__pin anat-ls__pin--connector"
              :number="number('connector')"
              :active="active === 'connector'"
            />
          </span>
          <span class="anat-ls__body">
            <b
              :class="['anat-ls__part', { 'is-active': active === 'title' }]"
              @mouseenter.stop="emit('hover', 'title')"
              >Créez votre compte<AnatomyPin
                class="anat-ls__pin anat-ls__pin--side"
                :number="number('title')"
                :active="active === 'title'"
            /></b>
            <small
              :class="['anat-ls__part', { 'is-active': active === 'description' }]"
              @mouseenter.stop="emit('hover', 'description')"
              >Un numéro de téléphone suffit.<AnatomyPin
                class="anat-ls__pin anat-ls__pin--side"
                :number="number('description')"
                :active="active === 'description'"
            /></small>
          </span>
          <AnatomyPin
            class="anat-ls__pin anat-ls__pin--item"
            :number="number('item')"
            :active="active === 'item'"
          />
        </li>
        <li class="anat-ls__item">
          <span class="anat-ls__marker">2</span>
          <span class="anat-ls__body">
            <b>Ajoutez un bénéficiaire</b>
            <small>Kofi, Aïcha ou Moussa.</small>
          </span>
        </li>
      </ol>
    </div>
    <div class="anat-ls__markers" aria-hidden="true">
      <span v-for="marker in markers" :key="marker.name">
        <i :class="`is-${marker.name}`">{{ marker.glyph }}</i>
        <small>{{ marker.name }}</small>
      </span>
    </div>
  </div>
</template>
