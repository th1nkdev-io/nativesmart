import { NsAvatar, NsBadge, NsButton, NsSpinner } from "@nativesmart/vue";
import type { Component } from "vue";
import AspectRatioDemo from "./demos/AspectRatioDemo.vue";
import BoxDemo from "./demos/BoxDemo.vue";
import CardDemo from "./demos/CardDemo.vue";
import CodeDemo from "./demos/CodeDemo.vue";
import ContainerDemo from "./demos/ContainerDemo.vue";
import DividerDemo from "./demos/DividerDemo.vue";
import GridDemo from "./demos/GridDemo.vue";
import HeadingDemo from "./demos/HeadingDemo.vue";
import IconDemo from "./demos/IconDemo.vue";
import InputDemo from "./demos/InputDemo.vue";
import KeyboardAvoiderDemo from "./demos/KeyboardAvoiderDemo.vue";
import ModalDemo from "./demos/ModalDemo.vue";
import SafeAreaDemo from "./demos/SafeAreaDemo.vue";
import ScrollAreaDemo from "./demos/ScrollAreaDemo.vue";
import SpacerDemo from "./demos/SpacerDemo.vue";
import StackDemo from "./demos/StackDemo.vue";
import SurfaceDemo from "./demos/SurfaceDemo.vue";
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
  code: CodeDemo,
  container: ContainerDemo,
  divider: DividerDemo,
  grid: GridDemo,
  heading: HeadingDemo,
  icon: IconDemo,
  input: InputDemo,
  "keyboard-avoider": KeyboardAvoiderDemo,
  modal: ModalDemo,
  "safe-area": SafeAreaDemo,
  "scroll-area": ScrollAreaDemo,
  spacer: SpacerDemo,
  stack: StackDemo,
  surface: SurfaceDemo,
  spinner: NsSpinner,
  text: TextDemo,
  toast: ToastDemo
};

/** Minimum width of one variation tile, in pixels, for components wider than a control. */
export const variationTiles: Readonly<Record<string, number>> = {
  "aspect-ratio": 168,
  box: 240,
  card: 340,
  code: 320,
  container: 240,
  divider: 260,
  grid: 240,
  heading: 280,
  input: 300,
  "keyboard-avoider": 230,
  modal: 380,
  "safe-area": 220,
  "scroll-area": 220,
  spacer: 240,
  stack: 260,
  surface: 240,
  text: 300,
  toast: 400
};
