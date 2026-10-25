<script setup lang="ts">
import AnatomyPin from "./AnatomyPin.vue";

defineProps<{ number: (part: string) => number; active?: string }>();
const emit = defineEmits<{ hover: [part: string | undefined] }>();
</script>

<template>
  <div class="anatomy-figure" @mouseleave="emit('hover', undefined)">
    <div
      :class="['anat-code', { 'is-active': active === 'root' }]"
      @mouseenter="emit('hover', 'root')"
    >
      <AnatomyPin
        class="anat-code__pin anat-code__pin--root"
        :number="number('root')"
        :active="active === 'root'"
      />
      <div
        :class="['anat-code__header', { 'is-active': active === 'header' }]"
        @mouseenter.stop="emit('hover', 'header')"
      >
        <AnatomyPin
          class="anat-code__pin anat-code__pin--header"
          :number="number('header')"
          :active="active === 'header'"
        />
        <span
          :class="['anat-code__title', { 'is-active': active === 'title' }]"
          @mouseenter.stop="emit('hover', 'title')"
        >
          send.ts
          <AnatomyPin
            class="anat-code__pin anat-code__pin--title"
            :number="number('title')"
            :active="active === 'title'"
          />
        </span>
        <small>TypeScript</small>
        <span
          :class="['anat-code__copy', { 'is-active': active === 'copy' }]"
          @mouseenter.stop="emit('hover', 'copy')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 9h11v11H9ZM5 15H4V4h11v1" /></svg>
          <AnatomyPin
            class="anat-code__pin anat-code__pin--copy"
            :number="number('copy')"
            :active="active === 'copy'"
          />
        </span>
      </div>
      <div class="anat-code__body">
        <span
          :class="['anat-code__gutter', { 'is-active': active === 'gutter' }]"
          @mouseenter.stop="emit('hover', 'gutter')"
        >
          <i>1</i><i>2</i><i>3</i>
          <AnatomyPin
            class="anat-code__pin anat-code__pin--gutter"
            :number="number('gutter')"
            :active="active === 'gutter'"
          />
        </span>
        <span class="anat-code__lines">
          <span class="anat-code__line"
            ><b class="is-keyword">const</b> total = <b class="is-number">25000</b>;</span
          >
          <span
            :class="['anat-code__line', 'is-highlighted', { 'is-active': active === 'line' }]"
            @mouseenter.stop="emit('hover', 'line')"
          >
            <b class="is-comment">// envoi</b>
            <AnatomyPin
              class="anat-code__pin anat-code__pin--line"
              :number="number('line')"
              :active="active === 'line'"
            />
          </span>
          <span class="anat-code__line"
            >send(<b
              :class="['is-string', { 'is-active': active === 'token' }]"
              @mouseenter.stop="emit('hover', 'token')"
              >"Aïcha"<AnatomyPin
                class="anat-code__pin anat-code__pin--token"
                :number="number('token')"
                :active="active === 'token'" /></b
            >, total);</span
          >
        </span>
      </div>
    </div>
  </div>
</template>
