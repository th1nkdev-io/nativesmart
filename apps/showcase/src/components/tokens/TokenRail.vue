<script setup lang="ts">
import { nextTick, onMounted, onBeforeUnmount, ref, watch } from "vue";
import Icon from "../../editorial/Icon.vue";
import { tokenGroups, tokenSections } from "../../pages";
import { openPage } from "../../state";

const props = defineProps<{ current: string }>();

const groups = tokenGroups.map((group) => ({
  ...group,
  items: tokenSections.filter((section) => section.group === group.id)
}));

/* Scroll buttons appear only when the rail overflows on that side. */
const track = ref<HTMLElement>();
const canStart = ref(false);
const canEnd = ref(false);

function update() {
  const element = track.value;
  if (!element) return;
  const scrolled = Math.abs(element.scrollLeft);
  canStart.value = scrolled > 2;
  canEnd.value = scrolled + element.clientWidth < element.scrollWidth - 2;
}

function scroll(direction: 1 | -1) {
  const element = track.value;
  if (!element) return;
  const sign = getComputedStyle(element).direction === "rtl" ? -1 : 1;
  element.scrollBy({ left: direction * sign * element.clientWidth * 0.7, behavior: "smooth" });
}

/**
 * Centers the current section in the rail, for example after a link from the command palette.
 * Only the rail scrolls: the page keeps its position.
 */
function reveal() {
  const element = track.value;
  const item = element?.querySelector<HTMLElement>('[aria-current="page"]');
  if (!element || !item) return;
  const rail = element.getBoundingClientRect();
  const box = item.getBoundingClientRect();
  const offset = box.left + box.width / 2 - (rail.left + rail.width / 2);
  element.scrollBy({ left: offset, behavior: "instant" });
  update();
}

let observer: ResizeObserver | undefined;
onMounted(() => {
  observer = new ResizeObserver(update);
  if (track.value) observer.observe(track.value);
  reveal();
  update();
});
onBeforeUnmount(() => observer?.disconnect());
watch(
  () => props.current,
  () => nextTick(reveal)
);
</script>

<template>
  <nav class="token-rail" aria-label="Sections des tokens">
    <button
      v-show="canStart"
      type="button"
      class="token-rail__scroll token-rail__scroll--start"
      aria-label="Sections précédentes"
      @click="scroll(-1)"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
    </button>
    <div
      ref="track"
      :class="['token-rail__track', { 'fade-start': canStart, 'fade-end': canEnd }]"
      @scroll.passive="update"
    >
      <div v-for="group in groups" :key="group.id" class="token-rail__group">
        <span class="token-rail__label">{{ group.label }}</span>
        <div class="token-rail__items">
          <a
            v-for="section in group.items"
            :key="section.id"
            :href="`#/tokens/${section.id}`"
            class="token-rail__item"
            :aria-current="current === section.id ? 'page' : undefined"
            @click.prevent="openPage(`tokens/${section.id}`)"
          >
            <span class="token-rail__icon"><Icon :name="section.icon" :size="16" /></span>
            {{ section.label }}
          </a>
        </div>
      </div>
    </div>
    <button
      v-show="canEnd"
      type="button"
      class="token-rail__scroll token-rail__scroll--end"
      aria-label="Sections suivantes"
      @click="scroll(1)"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
    </button>
  </nav>
</template>
