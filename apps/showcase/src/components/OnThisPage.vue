<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

type Heading = { id: string; text: string; level: number; element: HTMLElement };

const props = withDefaults(defineProps<{ title?: string }>(), { title: "Sur cette page" });
const emit = defineEmits<{ visible: [boolean] }>();

const headings = ref<Heading[]>([]);
const active = ref("");
let observer: IntersectionObserver | undefined;
let mutations: MutationObserver | undefined;
let frame = 0;

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
  observer?.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length > 0) active.value = (visible[0].target as HTMLElement).id;
    },
    { rootMargin: "-96px 0px -65% 0px" }
  );
  for (const heading of headings.value) observer.observe(heading.element);
  if (!headings.value.some((heading) => heading.id === active.value)) {
    active.value = headings.value[0]?.id ?? "";
  }
}

function scheduleScan() {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(scan);
}

function go(heading: Heading) {
  active.value = heading.id;
  heading.element.scrollIntoView({ behavior: "smooth", block: "start" });
}

onMounted(async () => {
  await nextTick();
  scan();
  const root = document.querySelector("[data-toc-root]");
  if (root) {
    mutations = new MutationObserver(scheduleScan);
    mutations.observe(root, { childList: true, subtree: true });
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
  mutations?.disconnect();
  cancelAnimationFrame(frame);
});
</script>

<template>
  <nav v-if="visible" class="toc" :aria-label="props.title">
    <h2 class="aside__title">{{ props.title }}</h2>
    <a
      v-for="heading in headings"
      :key="heading.id"
      :href="`#/`"
      :class="['toc__link', { 'toc__link--sub': heading.level === 3 }]"
      :aria-current="active === heading.id ? 'location' : undefined"
      @click.prevent="go(heading)"
    >
      {{ heading.text }}
    </a>
  </nav>
</template>
