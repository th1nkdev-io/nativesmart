<script setup lang="ts">
import { NsButton, NsIcon, NsInput, NsKeyboardAvoider } from "@nativesmart/vue";
import { computed, nextTick, onMounted, ref, useAttrs } from "vue";
import { useVariation, useView } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const view = useView();
const variation = useVariation();
const mini = computed(() => view.value !== "playground");

/* A drawn keyboard: it opens when a field of the phone takes focus, like the real one. */
const keyboardSize = computed(() => (mini.value ? 150 : 236));
const open = ref(mini.value);
const phone = ref<HTMLElement>();
const inset = computed(() => (open.value ? keyboardSize.value : 0));
/* A height typed in the Lab panel wins over the drawn keyboard. */
const height = computed(() =>
  typeof attrs.keyboardHeight === "number" && attrs.keyboardHeight > 0
    ? attrs.keyboardHeight
    : inset.value
);

function onFocusOut(event: FocusEvent) {
  if (mini.value) return;
  const next = event.relatedTarget as Node | null;
  if (!next || !phone.value?.contains(next)) open.value = false;
}

function openKeyboard() {
  phone.value?.querySelector<HTMLInputElement>("[data-target] input")?.focus();
}

function closeKeyboard() {
  (document.activeElement as HTMLElement | null)?.blur();
  open.value = false;
}

const keys = ["azertyuiop", "qsdfghjklm", "wxcvbn"];

/* In the variation grid nothing has focus: scroll the target field the way focus would. */
onMounted(async () => {
  if (!mini.value || variation?.value === "none" || attrs.scrollToFocused === false) return;
  await nextTick();
  setTimeout(() => {
    const content = phone.value?.querySelector<HTMLElement>(".ns-keyboard-avoider__content");
    const target = phone.value?.querySelector<HTMLElement>("[data-target]");
    if (!content || !target) return;
    content.scrollTop = target.offsetTop + target.offsetHeight - content.clientHeight + 12;
  }, 320);
});
</script>

<template>
  <div :class="['demo-kb', { 'is-mini': mini }]">
    <div v-if="!mini" class="demo-kb__bar">
      <NsButton
        :label="open ? 'Fermer le clavier' : 'Ouvrir le clavier'"
        variant="outline"
        size="sm"
        @press="open ? closeKeyboard() : openKeyboard()"
      />
      <span class="demo-kb__inset">clavier {{ height }} px</span>
    </div>

    <div ref="phone" class="demo-kb__phone" @focusin="open = true" @focusout="onFocusOut">
      <div class="demo-kb__status" aria-hidden="true"><span>9:41</span><i /></div>
      <header class="demo-kb__header">
        <NsIcon name="arrow-left" size="sm" />
        <strong>Envoyer de l'argent</strong>
      </header>

      <NsKeyboardAvoider class="demo-kb__avoider" v-bind="$attrs" :keyboard-height="height">
        <div class="demo-kb__form">
          <NsInput label="Bénéficiaire" placeholder="Nom complet" size="sm" />
          <NsInput label="Téléphone" placeholder="+225 07 00 00 00" size="sm" type="tel" />
          <NsInput label="Motif" placeholder="Loyer, études, cadeau…" size="sm" />
          <div data-target class="demo-kb__target">
            <NsInput label="Montant" placeholder="25 000 FCFA" size="sm" />
          </div>
        </div>
        <template #accessory>
          <div class="demo-kb__accessory">
            <span><small>Total</small><strong>25 000 FCFA</strong></span>
            <NsButton label="Envoyer" size="sm" />
          </div>
        </template>
      </NsKeyboardAvoider>

      <div
        :class="['demo-kb__keyboard', { 'is-open': open }]"
        :style="{ blockSize: `${keyboardSize}px` }"
        aria-hidden="true"
        @mousedown.prevent
      >
        <div v-for="row in keys" :key="row" class="demo-kb__row">
          <span v-for="key in row" :key="key">{{ key }}</span>
        </div>
        <div class="demo-kb__row">
          <span class="is-wide">123</span>
          <span class="is-space">espace</span>
          <span class="is-wide" @click="closeKeyboard">↓</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.demo-kb {
  display: grid;
  justify-items: center;
  gap: var(--ns-space-3);
}

.demo-kb__bar {
  display: flex;
  align-items: center;
  gap: var(--ns-space-3);
}

.demo-kb__inset {
  padding: 2px 8px;
  border-radius: var(--ns-radius-full);
  background: var(--ns-color-surface-muted);
  color: var(--ns-color-text-muted);
  font-family: var(--ns-font-mono);
  font-size: 11px;
}

.demo-kb__phone {
  position: relative;
  display: flex;
  flex-direction: column;
  inline-size: 300px;
  block-size: 560px;
  overflow: hidden;
  border: 8px solid #0f172a;
  border-radius: 40px;
  background: var(--ns-color-background);
  box-shadow: var(--ns-elevation-4);
}

.demo-kb.is-mini .demo-kb__phone {
  inline-size: 190px;
  block-size: 360px;
  border-width: 5px;
  border-radius: 26px;
  font-size: 11px;
}

.demo-kb__status {
  display: flex;
  justify-content: space-between;
  padding: 8px 20px 2px;
  font-size: 11px;
  font-weight: var(--ns-font-weight-semibold);
}

.demo-kb__status i {
  inline-size: 18px;
  block-size: 9px;
  border-radius: 3px;
  background: currentColor;
}

.demo-kb__header {
  display: flex;
  align-items: center;
  gap: var(--ns-space-2);
  padding: var(--ns-space-2) var(--ns-space-4) var(--ns-space-3);
  border-block-end: 1px solid var(--ns-color-border-subtle);
  font-size: var(--ns-text-body-sm-size);
}

.demo-kb__avoider {
  flex: 1;
  min-block-size: 0;
}

.demo-kb__form {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--ns-space-4);
  padding: var(--ns-space-4);
  padding-block-end: var(--ns-space-24);
}

.demo-kb.is-mini .demo-kb__header {
  padding: 4px 10px 6px;
  font-size: 10px;
}

.demo-kb.is-mini .demo-kb__form {
  gap: var(--ns-space-2);
  padding: var(--ns-space-2-5);
  padding-block-end: var(--ns-space-16);
}

.demo-kb.is-mini .ns-input {
  --ns-input-height: 26px;
  gap: 2px;
  font-size: 10px;
}

.demo-kb.is-mini .ns-input__label {
  font-size: 10px;
}

.demo-kb__target {
  min-inline-size: 0;
  border-radius: var(--ns-radius-md);
  outline: 2px dashed var(--ns-color-warning);
  outline-offset: 4px;
}

.demo-kb__accessory {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--ns-space-3);
  padding: var(--ns-space-2-5) var(--ns-space-4);
  border-block-start: 1px solid var(--ns-color-border-subtle);
  background: var(--ns-color-surface);
}

.demo-kb.is-mini .demo-kb__accessory {
  padding: var(--ns-space-1-5) var(--ns-space-2-5);
}

.demo-kb.is-mini .demo-kb__accessory .ns-button {
  --ns-button-height: 24px;
  --ns-button-font-size: 10px;
}

.demo-kb__accessory span {
  display: grid;
  line-height: 1.2;
}

.demo-kb__accessory small {
  color: var(--ns-color-text-muted);
}

/* The drawn keyboard slides up from the bottom of the phone. */
.demo-kb__keyboard {
  box-sizing: border-box;
  position: absolute;
  inset: auto 0 0;
  z-index: 2;
  display: grid;
  align-content: center;
  gap: 6px;
  padding: 8px 4px 14px;
  background: #d1d5db;
  transform: translateY(100%);
  transition: transform var(--ns-duration-moderate) var(--ns-easing-emphasized-decelerate);
}

.demo-kb__keyboard.is-open {
  transform: none;
}

.demo-kb__row {
  display: flex;
  justify-content: center;
  gap: 4px;
}

.demo-kb__row span {
  display: grid;
  flex: 1;
  place-items: center;
  max-inline-size: 26px;
  block-size: 34px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 1px 0 rgb(0 0 0 / 0.25);
  color: #0f172a;
  font-size: 13px;
}

.demo-kb.is-mini .demo-kb__row span {
  max-inline-size: 16px;
  block-size: 20px;
  font-size: 8px;
}

.demo-kb__row span.is-wide {
  max-inline-size: 44px;
  background: #aeb4bd;
  cursor: pointer;
}

.demo-kb__row span.is-space {
  max-inline-size: none;
  flex: 4;
}

@media (prefers-reduced-motion: reduce) {
  .demo-kb__keyboard {
    transition: none;
  }
}
</style>
