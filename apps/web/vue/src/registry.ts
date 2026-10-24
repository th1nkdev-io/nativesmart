import { NsAvatar, NsBadge, NsButton, NsSpinner } from "@nativesmart/vue";
import type { Component } from "vue";
import AspectRatioDemo from "./demos/AspectRatioDemo.vue";
import BoxDemo from "./demos/BoxDemo.vue";
import CardDemo from "./demos/CardDemo.vue";
import DividerDemo from "./demos/DividerDemo.vue";
import IconDemo from "./demos/IconDemo.vue";
import InputDemo from "./demos/InputDemo.vue";
import ModalDemo from "./demos/ModalDemo.vue";
import TextDemo from "./demos/TextDemo.vue";
import ToastDemo from "./demos/ToastDemo.vue";

/**
 * Contract id to Vue component. Props use the contract property names one to one; demos wrap
 * components that need content or room, and pass the Lab's props through unchanged.
 */
export const registry: Readonly<Record<string, Component>> = {
  "aspect-ratio": AspectRatioDemo,
  avatar: NsAvatar,
  badge: NsBadge,
  box: BoxDemo,
  button: NsButton,
  card: CardDemo,
  divider: DividerDemo,
  icon: IconDemo,
  input: InputDemo,
  modal: ModalDemo,
  spinner: NsSpinner,
  text: TextDemo,
  toast: ToastDemo
};

/** Minimum width of one variation tile, in pixels, for components wider than a control. */
export const variationTiles: Readonly<Record<string, number>> = {
  "aspect-ratio": 130,
  box: 340,
  card: 340,
  input: 300,
  modal: 380,
  text: 300,
  toast: 400
};
