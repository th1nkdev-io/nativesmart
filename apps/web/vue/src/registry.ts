import { NsAvatar, NsBadge, NsSpinner } from "@nativesmart/vue";
import type { Component } from "vue";
import AspectRatioDemo from "./demos/AspectRatioDemo.vue";
import BoxDemo from "./demos/BoxDemo.vue";
import ButtonDemo from "./demos/ButtonDemo.vue";
import CardDemo from "./demos/CardDemo.vue";
import CodeDemo from "./demos/CodeDemo.vue";
import ContainerDemo from "./demos/ContainerDemo.vue";
import DividerDemo from "./demos/DividerDemo.vue";
import GridDemo from "./demos/GridDemo.vue";
import HeadingDemo from "./demos/HeadingDemo.vue";
import IconDemo from "./demos/IconDemo.vue";
import IconButtonDemo from "./demos/IconButtonDemo.vue";
import ImageDemo from "./demos/ImageDemo.vue";
import InputDemo from "./demos/InputDemo.vue";
import KbdDemo from "./demos/KbdDemo.vue";
import KeyboardAvoiderDemo from "./demos/KeyboardAvoiderDemo.vue";
import LabelDemo from "./demos/LabelDemo.vue";
import LinkDemo from "./demos/LinkDemo.vue";
import ListDemo from "./demos/ListDemo.vue";
import ModalDemo from "./demos/ModalDemo.vue";
import SafeAreaDemo from "./demos/SafeAreaDemo.vue";
import ScrollAreaDemo from "./demos/ScrollAreaDemo.vue";
import SpacerDemo from "./demos/SpacerDemo.vue";
import StackDemo from "./demos/StackDemo.vue";
import SurfaceDemo from "./demos/SurfaceDemo.vue";
import TextDemo from "./demos/TextDemo.vue";
import ToastDemo from "./demos/ToastDemo.vue";
import ToggleButtonDemo from "./demos/ToggleButtonDemo.vue";

/**
 * Contract id to Vue component. Props use the contract property names one to one; demos wrap
 * components that need content or room, and pass the Lab's props through unchanged.
 */
export const registry: Readonly<Record<string, Component>> = {
  "aspect-ratio": AspectRatioDemo,
  avatar: NsAvatar,
  badge: NsBadge,
  box: BoxDemo,
  button: ButtonDemo,
  card: CardDemo,
  code: CodeDemo,
  container: ContainerDemo,
  divider: DividerDemo,
  grid: GridDemo,
  heading: HeadingDemo,
  icon: IconDemo,
  "icon-button": IconButtonDemo,
  image: ImageDemo,
  input: InputDemo,
  kbd: KbdDemo,
  "keyboard-avoider": KeyboardAvoiderDemo,
  label: LabelDemo,
  link: LinkDemo,
  list: ListDemo,
  modal: ModalDemo,
  "safe-area": SafeAreaDemo,
  "scroll-area": ScrollAreaDemo,
  spacer: SpacerDemo,
  stack: StackDemo,
  surface: SurfaceDemo,
  spinner: NsSpinner,
  text: TextDemo,
  toast: ToastDemo,
  "toggle-button": ToggleButtonDemo
};

/** Minimum width of one variation tile, in pixels, for components wider than a control. */
export const variationTiles: Readonly<Record<string, number>> = {
  "aspect-ratio": 168,
  box: 240,
  button: 200,
  card: 340,
  code: 320,
  container: 240,
  divider: 260,
  grid: 240,
  heading: 280,
  icon: 200,
  "icon-button": 200,
  image: 260,
  input: 300,
  kbd: 260,
  "keyboard-avoider": 230,
  label: 260,
  link: 260,
  list: 260,
  modal: 380,
  "safe-area": 220,
  "scroll-area": 220,
  spacer: 240,
  stack: 260,
  surface: 240,
  text: 280,
  toast: 400,
  "toggle-button": 300
};
