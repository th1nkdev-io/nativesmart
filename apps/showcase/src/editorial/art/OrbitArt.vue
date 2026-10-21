<script setup lang="ts">
import { logoImage } from "../../brand";
import { technologies } from "../../technologies";

const logo = logoImage(64);
const inner = technologies.slice(0, 6);
const outer = technologies.slice(6);
</script>

<template>
  <div v-tilt="10" class="orbit-art" role="img" aria-label="Les technologies autour de NativeSmart">
    <div class="orbit-art__scene">
      <div
        v-for="(ring, ringIndex) in [inner, outer]"
        :key="ringIndex"
        :class="['orbit-art__ring', `orbit-art__ring--${ringIndex}`]"
      >
        <span
          v-for="(technology, index) in ring"
          :key="technology.id"
          class="orbit-art__item"
          :style="{ '--angle': `${(360 / ring.length) * index}deg` }"
        >
          <span class="orbit-art__logo" :class="{ 'is-live': technology.url }">
            <svg v-if="technology.icon" viewBox="0 0 24 24">
              <path :d="technology.icon.path" :style="{ fill: `#${technology.icon.hex}` }" />
            </svg>
            <b v-else>{{ technology.name.slice(0, 2) }}</b>
          </span>
        </span>
      </div>
    </div>
    <span class="orbit-art__core"><img v-bind="logo" alt="" /></span>
  </div>
</template>
