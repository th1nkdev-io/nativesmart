<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

type Heading = { id: string; text: string; level: number; element: HTMLElement };

const props = withDefaults(defineProps<{ title?: string }>(), { title: "Sur cette page" });
const emit = defineEmits<{ visible: [boolean] }>();

const headings = ref<Heading[]>([]);
const active = ref("");
let mutations: MutationObserver | undefined;
let frame = 0;

const list = ref<HTMLElement>();
const marker = ref({ top: 0, height: 0 });
/** Share of the page already scrolled, from 0 to 100. */
const progress = ref(0);
const activeIndex = computed(() => headings.value.findIndex((item) => item.id === active.value));

// A single heading is not worth a summary.
const visible = computed(() => headings.value.length > 1);
watch(visible, (value) => emit("visible", value), { immediate: true });

function slug(text: string) {
  return (
    "section-" +
    text
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

/** Lists the h2 and h3 of the page content and tracks the one in view. */
function scan() {
  const root = document.querySelector<HTMLElement>("[data-toc-root]");
  if (!root) return;
  const elements = Array.from(root.querySelectorAll<HTMLElement>("h2, h3[data-toc]"));
  headings.value = elements.map((element) => {
    element.id ||= slug(element.textContent ?? "");
    return {
      id: element.id,
      text: element.textContent?.trim() ?? "",
      level: element.tagName === "H2" ? 2 : 3,
      element
    };
  });
  onScroll();
  if (!headings.value.some((heading) => heading.id === active.value)) {
    active.value = headings.value[0]?.id ?? "";
  }
}

function scheduleScan() {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(scan);
}

/** Slides the marker next to the active link. */
function placeMarker() {
  const link = list.value?.querySelector<HTMLElement>('[aria-current="location"]');
  marker.value = link ? { top: link.offsetTop, height: link.offsetHeight } : { top: 0, height: 0 };
}
watch([active, headings], () => void nextTick(placeMarker));

/** Distance from the top of the window under which a heading counts as read. */
const offset = 140;

function scrollRange() {
  return document.documentElement.scrollHeight - window.innerHeight;
}

function atBottom() {
  return scrollRange() > 0 && window.scrollY >= scrollRange() - 2;
}

function onScroll() {
  const range = scrollRange();
  progress.value = range > 0 ? Math.min(100, Math.round((window.scrollY / range) * 100)) : 100;
  if (headings.value.length === 0) return;
  // The active section is the last heading that went past the top bar. The last headings may
  // never get there, so the bottom of the page activates the last one.
  const passed = headings.value.filter(
    (heading) => heading.element.getBoundingClientRect().top <= offset
  );
  active.value = atBottom()
    ? headings.value[headings.value.length - 1].id
    : (passed[passed.length - 1] ?? headings.value[0]).id;
}

function toTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function go(heading: Heading) {
  active.value = heading.id;
  heading.element.scrollIntoView({ behavior: "smooth", block: "start" });
}

onMounted(async () => {
  await nextTick();
  scan();
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  const root = document.querySelector("[data-toc-root]");
  if (root) {
    mutations = new MutationObserver(scheduleScan);
    mutations.observe(root, { childList: true, subtree: true });
  }
});

onBeforeUnmount(() => {
  mutations?.disconnect();
  cancelAnimationFrame(frame);
  window.removeEventListener("scroll", onScroll);
});
</script>

<template>
  <nav v-if="visible" class="toc" :aria-label="props.title">
    <div class="toc__head">
      <svg class="toc__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16M4 12h10M4 18h13" />
      </svg>
      <h2 class="toc__title">{{ props.title }}</h2>
      <span class="toc__progress" role="img" :aria-label="`Lu à ${progress} %`">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <circle class="toc__progress-track" cx="10" cy="10" r="8" />
          <circle
            class="toc__progress-value"
            cx="10"
            cy="10"
            r="8"
            pathLength="100"
            :stroke-dasharray="`${progress} 100`"
          />
        </svg>
        {{ progress }}%
      </span>
    </div>

    <div ref="list" class="toc__list">
      <span
        class="toc__marker"
        aria-hidden="true"
        :style="{ transform: `translateY(${marker.top}px)`, height: `${marker.height}px` }"
      />
      <a
        v-for="(heading, index) in headings"
        :key="heading.id"
        :href="`#/`"
        :class="[
          'toc__link',
          {
            'toc__link--sub': heading.level === 3,
            'toc__link--read': activeIndex >= 0 && index < activeIndex
          }
        ]"
        :aria-current="active === heading.id ? 'location' : undefined"
        @click.prevent="go(heading)"
      >
        {{ heading.text }}
      </a>
    </div>

    <Transition name="toc-top">
      <button v-if="progress > 8" type="button" class="toc__top" @click="toTop">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5m0 0-6 6m6-6 6 6" /></svg>
        Haut de page
      </button>
    </Transition>
  </nav>
</template>
