<script setup lang="ts" generic="T extends string">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from "vue";

export type LabOption<V extends string = string> = {
  value: V;
  label: string;
  description?: string;
  /** Colors shown as small dots before the label, for example a theme preview. */
  swatches?: readonly string[];
};

const props = withDefaults(
  defineProps<{
    options: readonly LabOption<T>[];
    label: string;
    /** Shows the label inside the trigger, before the value. */
    inlineLabel?: boolean;
    size?: "sm" | "md";
    placeholder?: string;
  }>(),
  { inlineLabel: false, size: "md", placeholder: "Choisir…" }
);

const model = defineModel<T | undefined>();

const id = useId();
const open = ref(false);
const active = ref(0);
const trigger = ref<HTMLButtonElement>();
const listbox = ref<HTMLUListElement>();
const position = ref({ top: 0, left: 0, minWidth: 0, maxHeight: 320 });
let typeahead = "";
let typeaheadTimer: ReturnType<typeof setTimeout> | undefined;

const selected = computed(() => props.options.find((option) => option.value === model.value));
const selectedIndex = computed(() =>
  Math.max(
    0,
    props.options.findIndex((option) => option.value === model.value)
  )
);

function place() {
  const rect = trigger.value?.getBoundingClientRect();
  if (!rect) return;
  const below = window.innerHeight - rect.bottom - 12;
  const above = rect.top - 12;
  const openAbove = below < 200 && above > below;
  position.value = {
    top: openAbove ? Math.max(8, rect.top - Math.min(320, above) - 4) : rect.bottom + 4,
    left: Math.min(rect.left, window.innerWidth - Math.max(rect.width, 220) - 8),
    minWidth: rect.width,
    maxHeight: Math.min(320, openAbove ? above : below)
  };
}

async function show() {
  if (open.value) return;
  active.value = selectedIndex.value;
  place();
  open.value = true;
  await nextTick();
  scrollActiveIntoView();
}

function hide(focusTrigger = true) {
  open.value = false;
  if (focusTrigger) trigger.value?.focus();
}

function choose(index: number) {
  const option = props.options[index];
  if (option) model.value = option.value;
  hide();
}

function scrollActiveIntoView() {
  listbox.value
    ?.querySelector<HTMLElement>(`[data-index="${active.value}"]`)
    ?.scrollIntoView({ block: "nearest" });
}

function move(to: number) {
  active.value = Math.min(props.options.length - 1, Math.max(0, to));
  void nextTick(scrollActiveIntoView);
}

function onKeydown(event: KeyboardEvent) {
  const keys: Record<string, () => void> = {
    ArrowDown: () => (open.value ? move(active.value + 1) : show()),
    ArrowUp: () => (open.value ? move(active.value - 1) : show()),
    Home: () => open.value && move(0),
    End: () => open.value && move(props.options.length - 1),
    Enter: () => (open.value ? choose(active.value) : show()),
    " ": () => (open.value ? choose(active.value) : show()),
    Escape: () => open.value && hide(),
    Tab: () => open.value && hide(false)
  };
  const action = keys[event.key];
  if (action) {
    if (event.key !== "Tab") event.preventDefault();
    action();
    return;
  }
  if (event.key.length === 1 && /\S/.test(event.key)) {
    typeahead += event.key.toLowerCase();
    clearTimeout(typeaheadTimer);
    typeaheadTimer = setTimeout(() => (typeahead = ""), 500);
    const match = props.options.findIndex((option) =>
      option.label.toLowerCase().startsWith(typeahead)
    );
    if (match >= 0) {
      if (!open.value) void show();
      move(match);
    }
  }
}

function onPointerDown(event: PointerEvent) {
  const target = event.target as Node;
  if (!trigger.value?.contains(target) && !listbox.value?.contains(target)) hide(false);
}

function onViewportChange(event: Event) {
  if (listbox.value?.contains(event.target as Node)) return;
  hide(false);
}

function listen(enabled: boolean) {
  if (enabled) {
    document.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("scroll", onViewportChange, true);
    window.addEventListener("resize", onViewportChange);
  } else {
    document.removeEventListener("pointerdown", onPointerDown, true);
    window.removeEventListener("scroll", onViewportChange, true);
    window.removeEventListener("resize", onViewportChange);
  }
}

watch(open, listen);
onBeforeUnmount(() => listen(false));
</script>

<template>
  <div :class="['lab-select', `lab-select--${size}`]">
    <button
      :id="`${id}-trigger`"
      ref="trigger"
      type="button"
      class="lab-select__trigger"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :aria-controls="`${id}-listbox`"
      :aria-activedescendant="open ? `${id}-option-${active}` : undefined"
      :aria-labelledby="`${id}-label ${id}-value`"
      @click="open ? hide() : show()"
      @keydown="onKeydown"
    >
      <span :id="`${id}-label`" :class="inlineLabel ? 'lab-select__label' : 'sr-only'">
        {{ label }}
      </span>
      <span v-if="selected?.swatches" class="lab-select__swatches" aria-hidden="true">
        <span v-for="color in selected.swatches" :key="color" :style="{ background: color }" />
      </span>
      <span
        :id="`${id}-value`"
        :class="['lab-select__value', { 'lab-select__value--empty': !selected }]"
      >
        {{ selected?.label ?? placeholder }}
      </span>
      <svg class="lab-select__chevron" viewBox="0 0 24 24" aria-hidden="true">
        <path d="m7 10 5 5 5-5" />
      </svg>
    </button>

    <Teleport to="body">
      <Transition name="lab-pop">
        <ul
          v-if="open"
          :id="`${id}-listbox`"
          ref="listbox"
          class="lab-listbox"
          role="listbox"
          :aria-labelledby="`${id}-label`"
          :style="{
            top: `${position.top}px`,
            left: `${position.left}px`,
            minWidth: `${Math.max(position.minWidth, 200)}px`,
            maxHeight: `${position.maxHeight}px`
          }"
        >
          <li
            v-for="(option, index) in options"
            :id="`${id}-option-${index}`"
            :key="option.value"
            :data-index="index"
            role="option"
            :aria-selected="option.value === model"
            :class="['lab-option', { 'lab-option--active': index === active }]"
            @pointermove="active = index"
            @click="choose(index)"
          >
            <span v-if="option.swatches" class="lab-select__swatches" aria-hidden="true">
              <span v-for="color in option.swatches" :key="color" :style="{ background: color }" />
            </span>
            <span class="lab-option__text">
              <span class="lab-option__label">{{ option.label }}</span>
              <span v-if="option.description" class="lab-option__description">
                {{ option.description }}
              </span>
            </span>
            <svg
              v-if="option.value === model"
              class="lab-option__check"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </li>
        </ul>
      </Transition>
    </Teleport>
  </div>
</template>
