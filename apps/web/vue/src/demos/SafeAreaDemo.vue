<script setup lang="ts">
import { NsIcon, NsSafeArea } from "@nativesmart/vue";
import { computed, ref, useAttrs } from "vue";
import { useVariation, useView } from "./view";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const view = useView();
const variation = useVariation();
const mini = computed(() => view.value !== "playground");

/* Insets of real devices, in points: what env(safe-area-inset-*) reports on them. */
const devices = {
  portrait: { label: "iPhone", icon: "phone", insets: { top: 47, bottom: 34 }, landscape: false },
  landscape: {
    label: "iPhone paysage",
    icon: "refresh",
    insets: { left: 47, right: 47, bottom: 21 },
    landscape: true
  },
  android: { label: "Android", icon: "phone", insets: { top: 28, bottom: 18 }, landscape: false }
} as const;
type DeviceId = keyof typeof devices;

const chosen = ref<DeviceId>("portrait");
const device = computed(() => {
  if (!mini.value) return devices[chosen.value];
  const sideways = variation?.group === "edges" && variation.value === "horizontal";
  return devices[sideways ? "landscape" : "portrait"];
});
/* The small phones of the variation grid are drawn at about 55 %: their insets shrink with them. */
const insets = computed(() => {
  const scale = mini.value ? 0.55 : 1;
  const all: Record<"top" | "right" | "bottom" | "left", number> = Object.assign(
    { top: 0, right: 0, bottom: 0, left: 0 },
    device.value.insets
  );
  return {
    top: Math.round(all.top * scale),
    right: Math.round(all.right * scale),
    bottom: Math.round(all.bottom * scale),
    left: Math.round(all.left * scale)
  };
});
const zones = ref(true);
const isAndroid = computed(() => !mini.value && chosen.value === "android");

const tabs = [
  { icon: "home", label: "Accueil" },
  { icon: "send", label: "Envoyer" },
  { icon: "user", label: "Profil" }
];
</script>

<template>
  <div :class="['demo-safe', { 'is-mini': mini }]">
    <div v-if="!mini" class="demo-safe__bar">
      <div class="demo-safe__devices" role="group" aria-label="Appareil">
        <button
          v-for="(item, id) in devices"
          :key="id"
          type="button"
          :aria-pressed="chosen === id"
          @click="chosen = id"
        >
          <NsIcon :name="item.icon" size="sm" /> {{ item.label }}
        </button>
      </div>
      <label class="demo-safe__toggle"
        ><input v-model="zones" type="checkbox" /> Zones à éviter</label
      >
    </div>

    <div
      :class="['demo-safe__phone', { 'is-landscape': device.landscape, 'is-android': isAndroid }]"
      :style="{
        '--inset-top': `${insets.top}px`,
        '--inset-bottom': `${insets.bottom}px`,
        '--inset-left': `${insets.left}px`,
        '--inset-right': `${insets.right}px`
      }"
    >
      <NsSafeArea class="demo-safe__screen" v-bind="$attrs" :insets="insets">
        <header class="demo-safe__header">
          <span class="demo-safe__avatar">KM</span>
          <span><small>Bonjour</small><strong>Kofi Mensah</strong></span>
          <NsIcon name="bell" size="sm" />
        </header>
        <div class="demo-safe__card">
          <small>Solde disponible</small>
          <strong>1 250 000 FCFA</strong>
        </div>
        <nav class="demo-safe__tabs">
          <span v-for="tab in tabs" :key="tab.label">
            <NsIcon :name="tab.icon" size="sm" />{{ tab.label }}
          </span>
        </nav>
      </NsSafeArea>

      <!-- Hardware drawn over the screen: the island or camera hole, and the home indicator. -->
      <i class="demo-safe__island" aria-hidden="true" />
      <i class="demo-safe__home" aria-hidden="true" />
      <template v-if="zones">
        <i class="demo-safe__zone is-top" aria-hidden="true" />
        <i class="demo-safe__zone is-bottom" aria-hidden="true" />
        <i class="demo-safe__zone is-left" aria-hidden="true" />
        <i class="demo-safe__zone is-right" aria-hidden="true" />
      </template>
    </div>
  </div>
</template>

<style>
.demo-safe {
  display: grid;
  justify-items: center;
  gap: var(--ns-space-4);
}

.demo-safe__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--ns-space-3);
}

.demo-safe__devices {
  display: flex;
  gap: 2px;
  padding: 3px;
  border-radius: var(--ns-radius-lg);
  background: var(--ns-color-surface-muted);
}

.demo-safe__devices button {
  display: inline-flex;
  align-items: center;
  gap: var(--ns-space-1-5);
  padding: var(--ns-space-1-5) var(--ns-space-3);
  border: 0;
  border-radius: var(--ns-radius-md);
  background: transparent;
  color: var(--ns-color-text-muted);
  font: inherit;
  font-size: var(--ns-text-label-sm-size);
  cursor: pointer;
}

.demo-safe__devices button[aria-pressed="true"] {
  background: var(--ns-color-surface);
  box-shadow: var(--ns-elevation-1);
  color: var(--ns-color-text);
}

.demo-safe__devices button:focus-visible {
  outline: var(--ns-focus-ring-width) solid var(--ns-color-focus-ring);
}

.demo-safe__toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--ns-space-1-5);
  color: var(--ns-color-text-muted);
  font-size: var(--ns-text-caption-size);
  cursor: pointer;
}

.demo-safe__toggle input {
  accent-color: var(--ns-color-primary);
}

/* The phone: the screen fills it edge to edge, like viewport-fit=cover. */
.demo-safe__phone {
  position: relative;
  inline-size: 280px;
  block-size: 560px;
  overflow: hidden;
  border: 8px solid #0f172a;
  border-radius: 44px;
  background: #0f172a;
  box-shadow: var(--ns-elevation-4);
  transition:
    inline-size var(--ns-duration-slow) var(--ns-easing-emphasized),
    block-size var(--ns-duration-slow) var(--ns-easing-emphasized);
}

.demo-safe__phone.is-landscape {
  inline-size: 560px;
  block-size: 270px;
}

.demo-safe.is-mini .demo-safe__phone {
  inline-size: 160px;
  block-size: 320px;
  border-width: 5px;
  border-radius: 28px;
}

.demo-safe.is-mini .demo-safe__phone.is-landscape {
  inline-size: 200px;
  block-size: 100px;
}

.demo-safe__screen {
  display: flex;
  flex-direction: column;
  gap: var(--ns-space-3);
  box-sizing: border-box;
  block-size: 100%;
  background: linear-gradient(
    180deg,
    var(--ns-color-primary) 0 34%,
    var(--ns-color-background) 34%
  );
  color: var(--ns-color-text);
  font-size: var(--ns-text-body-sm-size);
}

.demo-safe.is-mini .demo-safe__screen {
  gap: 6px;
  font-size: 9px;
}

.demo-safe__header {
  display: flex;
  align-items: center;
  gap: var(--ns-space-2);
  padding: var(--ns-space-2) var(--ns-space-3) 0;
  color: var(--ns-color-on-primary);
}

.demo-safe__header > span:nth-child(2) {
  display: grid;
  flex: 1;
  line-height: 1.2;
}

.demo-safe__avatar {
  display: inline-grid;
  place-items: center;
  inline-size: 30px;
  block-size: 30px;
  border-radius: var(--ns-radius-full);
  background: rgb(255 255 255 / 0.2);
  font-size: 11px;
  font-weight: var(--ns-font-weight-semibold);
}

.demo-safe.is-mini .demo-safe__avatar {
  inline-size: 18px;
  block-size: 18px;
  font-size: 7px;
}

.demo-safe__card {
  display: grid;
  gap: 2px;
  margin-inline: var(--ns-space-3);
  padding: var(--ns-space-3);
  border-radius: var(--ns-radius-lg);
  background: var(--ns-color-surface);
  box-shadow: var(--ns-elevation-2);
}

.demo-safe.is-mini .demo-safe__card {
  padding: 6px;
}

.demo-safe__card small {
  color: var(--ns-color-text-muted);
}

.demo-safe__card strong {
  font-size: var(--ns-text-title-sm-size);
}

.demo-safe.is-mini .demo-safe__card strong {
  font-size: 11px;
}

.demo-safe__tabs {
  display: flex;
  justify-content: space-around;
  margin-block-start: auto;
  padding-block: var(--ns-space-2) var(--ns-space-1);
  border-block-start: 1px solid var(--ns-color-border-subtle);
  background: var(--ns-color-surface);
}

.demo-safe__tabs span {
  display: grid;
  justify-items: center;
  gap: 2px;
  color: var(--ns-color-text-muted);
  font-size: 10px;
}

.demo-safe__tabs span:first-child {
  color: var(--ns-color-primary);
}

.demo-safe.is-mini .demo-safe__tabs span {
  font-size: 7px;
}

/* Hardware */
.demo-safe__island {
  position: absolute;
  inset-block-start: 10px;
  inset-inline-start: 50%;
  z-index: 3;
  inline-size: 34%;
  block-size: 24px;
  border-radius: var(--ns-radius-full);
  background: #000;
  transform: translateX(-50%);
}

.demo-safe__phone.is-android .demo-safe__island {
  inline-size: 12px;
  block-size: 12px;
}

.demo-safe__phone.is-landscape .demo-safe__island {
  inset-block-start: 50%;
  inset-inline-start: 10px;
  inline-size: 24px;
  block-size: 34%;
  transform: translateY(-50%);
}

.demo-safe.is-mini .demo-safe__island {
  inset-block-start: 6px;
  block-size: 12px;
}

.demo-safe.is-mini .demo-safe__phone.is-landscape .demo-safe__island {
  inset-block-start: 50%;
  inset-inline-start: 5px;
  inline-size: 10px;
}

.demo-safe__home {
  position: absolute;
  inset-block-end: 8px;
  inset-inline-start: 50%;
  z-index: 3;
  inline-size: 36%;
  block-size: 5px;
  border-radius: var(--ns-radius-full);
  background: #0f172a;
  opacity: 0.85;
  transform: translateX(-50%);
}

.demo-safe.is-mini .demo-safe__home {
  inset-block-end: 4px;
  block-size: 3px;
}

/* Zones the screen reserves, hatched */
.demo-safe__zone {
  position: absolute;
  z-index: 2;
  background: repeating-linear-gradient(
    45deg,
    color-mix(in srgb, var(--ns-color-danger) 30%, transparent) 0 4px,
    transparent 4px 9px
  );
  pointer-events: none;
}

.demo-safe__zone.is-top {
  inset: 0 0 auto;
  block-size: var(--inset-top);
}

.demo-safe__zone.is-bottom {
  inset: auto 0 0;
  block-size: var(--inset-bottom);
}

.demo-safe__zone.is-left {
  inset: 0 auto 0 0;
  inline-size: var(--inset-left);
}

.demo-safe__zone.is-right {
  inset: 0 0 0 auto;
  inline-size: var(--inset-right);
}
</style>
