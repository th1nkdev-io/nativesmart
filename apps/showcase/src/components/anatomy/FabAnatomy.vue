<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();

const actions = [
  { label: "Envoyer", path: "M22 2 11 13M22 2l-7 20-4-9-9-4Z" },
  { label: "Demander", path: "M12 4v11m-5-5 5 5 5-5M5 20h14" }
];
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div class="anat-fab">
      <span
        :class="['anat-fab__root', { 'is-active': active === 'root' }]"
        @mouseenter="emit('hover', 'root')"
      >
        <AnatomyPin
          class="anat-fab__pin anat-fab__pin--root"
          :number="number('root')"
          :active="active === 'root'"
        />
        <span
          :class="['anat-fab__actions', { 'is-active': active === 'actions' }]"
          @mouseenter.stop="emit('hover', 'actions')"
        >
          <AnatomyPin
            class="anat-fab__pin anat-fab__pin--actions"
            :number="number('actions')"
            :active="active === 'actions'"
          />
          <span
            v-for="(action, index) in actions"
            :key="action.label"
            :class="['anat-fab__action', { 'is-active': index === 0 && active === 'action' }]"
            @mouseenter.stop="index === 0 && emit('hover', 'action')"
          >
            <small>{{ action.label }}</small>
            <i
              ><svg viewBox="0 0 24 24" aria-hidden="true"><path :d="action.path" /></svg
            ></i>
            <AnatomyPin
              v-if="index === 0"
              class="anat-fab__pin anat-fab__pin--action"
              :number="number('action')"
              :active="active === 'action'"
            />
          </span>
        </span>
        <span
          :class="['anat-fab__button', { 'is-active': active === 'button' }]"
          @mouseenter.stop="emit('hover', 'button')"
        >
          <AnatomyPin
            class="anat-fab__pin anat-fab__pin--button"
            :number="number('button')"
            :active="active === 'button'"
          />
          <span
            :class="['anat-fab__part', { 'is-active': active === 'icon' }]"
            @mouseenter.stop="emit('hover', 'icon')"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" class="is-open">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <AnatomyPin
              class="anat-fab__pin anat-fab__pin--below"
              :number="number('icon')"
              :active="active === 'icon'"
            />
          </span>
          <span
            :class="['anat-fab__part', { 'is-active': active === 'label' }]"
            @mouseenter.stop="emit('hover', 'label')"
          >
            Nouveau transfert
            <AnatomyPin
              class="anat-fab__pin anat-fab__pin--below"
              :number="number('label')"
              :active="active === 'label'"
            />
          </span>
          <span
            :class="['anat-fab__badge', { 'is-active': active === 'badge' }]"
            @mouseenter.stop="emit('hover', 'badge')"
          >
            2
            <AnatomyPin
              class="anat-fab__pin anat-fab__pin--badge"
              :number="number('badge')"
              :active="active === 'badge'"
            />
          </span>
        </span>
      </span>
    </div>
  </div>
</template>
