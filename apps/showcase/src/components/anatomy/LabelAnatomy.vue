<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div class="anat-lb">
      <span
        :class="['anat-lb__root', { 'is-active': active === 'root' }]"
        @mouseenter="emit('hover', 'root')"
      >
        <AnatomyPin
          class="anat-lb__pin anat-lb__pin--root"
          :number="number('root')"
          :active="active === 'root'"
        />
        <span class="anat-lb__line">
          <span
            :class="['anat-lb__part', 'anat-lb__text', { 'is-active': active === 'text' }]"
            @mouseenter.stop="emit('hover', 'text')"
          >
            Montant à envoyer
            <AnatomyPin
              class="anat-lb__pin anat-lb__pin--top"
              :number="number('text')"
              :active="active === 'text'"
            />
          </span>
          <span
            :class="['anat-lb__part', 'anat-lb__required', { 'is-active': active === 'indicator' }]"
            @mouseenter.stop="emit('hover', 'indicator')"
          >
            *
            <AnatomyPin
              class="anat-lb__pin anat-lb__pin--top"
              :number="number('indicator')"
              :active="active === 'indicator'"
            />
          </span>
          <span
            :class="['anat-lb__part', 'anat-lb__info', { 'is-active': active === 'info' }]"
            @mouseenter.stop="emit('hover', 'info')"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 11v5M12 8h.01" />
            </svg>
            <AnatomyPin
              class="anat-lb__pin anat-lb__pin--bottom"
              :number="number('info')"
              :active="active === 'info'"
            />
          </span>
          <span
            :class="['anat-lb__part', 'anat-lb__counter', { 'is-active': active === 'counter' }]"
            @mouseenter.stop="emit('hover', 'counter')"
          >
            5/12
            <AnatomyPin
              class="anat-lb__pin anat-lb__pin--top"
              :number="number('counter')"
              :active="active === 'counter'"
            />
          </span>
        </span>
        <span
          :class="[
            'anat-lb__part',
            'anat-lb__description',
            { 'is-active': active === 'description' }
          ]"
          @mouseenter.stop="emit('hover', 'description')"
        >
          Entre 500 et 500 000 FCFA
          <AnatomyPin
            class="anat-lb__pin anat-lb__pin--side"
            :number="number('description')"
            :active="active === 'description'"
          />
        </span>
      </span>
      <span class="anat-lb__input">25000</span>
    </div>
  </div>
</template>
