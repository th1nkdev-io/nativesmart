<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div class="anat-sg">
      <span
        :class="['anat-sg__root', { 'is-active': active === 'root' }]"
        @mouseenter="emit('hover', 'root')"
      >
        <AnatomyPin
          class="anat-sg__pin anat-sg__pin--root"
          :number="number('root')"
          :active="active === 'root'"
        />
        <span
          :class="['anat-sg__track', { 'is-active': active === 'track' }]"
          @mouseenter.stop="emit('hover', 'track')"
        >
          <AnatomyPin
            class="anat-sg__pin anat-sg__pin--track"
            :number="number('track')"
            :active="active === 'track'"
          />
          <span class="anat-sg__segment">Jour</span>
          <span
            :class="['anat-sg__segment', 'is-selected', { 'is-active': active === 'indicator' }]"
            @mouseenter.stop="emit('hover', 'indicator')"
          >
            <span
              :class="['anat-sg__part', { 'is-active': active === 'icon' }]"
              @mouseenter.stop="emit('hover', 'icon')"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM4 10h16M8 3v4M16 3v4"
                />
              </svg>
              <AnatomyPin
                class="anat-sg__pin anat-sg__pin--below"
                :number="number('icon')"
                :active="active === 'icon'"
              />
            </span>
            <span
              :class="['anat-sg__part', { 'is-active': active === 'label' }]"
              @mouseenter.stop="emit('hover', 'label')"
            >
              Semaine
              <AnatomyPin
                class="anat-sg__pin anat-sg__pin--below"
                :number="number('label')"
                :active="active === 'label'"
              />
            </span>
            <AnatomyPin
              class="anat-sg__pin anat-sg__pin--above"
              :number="number('indicator')"
              :active="active === 'indicator'"
            />
          </span>
          <span
            :class="['anat-sg__segment', { 'is-active': active === 'segment' }]"
            @mouseenter.stop="emit('hover', 'segment')"
          >
            Mois
            <AnatomyPin
              class="anat-sg__pin anat-sg__pin--above"
              :number="number('segment')"
              :active="active === 'segment'"
            />
          </span>
        </span>
      </span>
    </div>
    <div class="anat-sg__variants" aria-hidden="true">
      <span
        ><i class="is-surface"><b>Semaine</b></i
        ><small>surface</small></span
      >
      <span
        ><i class="is-primary"><b>Semaine</b></i
        ><small>primary</small></span
      >
      <span
        ><i class="is-underline"><b>Semaine</b></i
        ><small>underline</small></span
      >
    </div>
  </div>
</template>
