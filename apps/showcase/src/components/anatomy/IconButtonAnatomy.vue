<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div class="anat-ib">
      <span
        :class="['anat-ib__tooltip', { 'is-active': active === 'tooltip' }]"
        @mouseenter="emit('hover', 'tooltip')"
      >
        Notifications
        <AnatomyPin
          class="anat-ib__pin anat-ib__pin--side"
          :number="number('tooltip')"
          :active="active === 'tooltip'"
        />
      </span>
      <span
        :class="['anat-ib__root', { 'is-active': active === 'root' }]"
        @mouseenter="emit('hover', 'root')"
      >
        <AnatomyPin
          class="anat-ib__pin anat-ib__pin--root"
          :number="number('root')"
          :active="active === 'root'"
        />
        <span
          :class="['anat-ib__icon', { 'is-active': active === 'icon' }]"
          @mouseenter.stop="emit('hover', 'icon')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M6 9a6 6 0 0 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9ZM10 20a2.2 2.2 0 0 0 4 0"
            />
          </svg>
          <AnatomyPin
            class="anat-ib__pin anat-ib__pin--below"
            :number="number('icon')"
            :active="active === 'icon'"
          />
        </span>
        <span
          :class="['anat-ib__badge', { 'is-active': active === 'badge' }]"
          @mouseenter.stop="emit('hover', 'badge')"
        >
          3
          <AnatomyPin
            class="anat-ib__pin anat-ib__pin--badge"
            :number="number('badge')"
            :active="active === 'badge'"
          />
        </span>
      </span>
    </div>
    <div class="anat-ib__shapes" aria-hidden="true">
      <span v-for="shape in ['rounded', 'circle', 'square']" :key="shape">
        <i :class="`is-${shape}`" />
        <small>{{ shape }}</small>
      </span>
    </div>
  </div>
</template>
