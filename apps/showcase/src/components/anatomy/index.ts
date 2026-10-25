import type { Component } from "vue";
import AspectRatioAnatomy from "./AspectRatioAnatomy.vue";
import BoxAnatomy from "./BoxAnatomy.vue";
import ButtonAnatomy from "./ButtonAnatomy.vue";
import CodeAnatomy from "./CodeAnatomy.vue";
import ContainerAnatomy from "./ContainerAnatomy.vue";
import DividerAnatomy from "./DividerAnatomy.vue";
import GridAnatomy from "./GridAnatomy.vue";
import HeadingAnatomy from "./HeadingAnatomy.vue";
import IconAnatomy from "./IconAnatomy.vue";
import IconButtonAnatomy from "./IconButtonAnatomy.vue";
import ImageAnatomy from "./ImageAnatomy.vue";
import KbdAnatomy from "./KbdAnatomy.vue";
import KeyboardAvoiderAnatomy from "./KeyboardAvoiderAnatomy.vue";
import LabelAnatomy from "./LabelAnatomy.vue";
import LinkAnatomy from "./LinkAnatomy.vue";
import ListAnatomy from "./ListAnatomy.vue";
import SafeAreaAnatomy from "./SafeAreaAnatomy.vue";
import ScrollAreaAnatomy from "./ScrollAreaAnatomy.vue";
import SpacerAnatomy from "./SpacerAnatomy.vue";
import StackAnatomy from "./StackAnatomy.vue";
import SurfaceAnatomy from "./SurfaceAnatomy.vue";
import TextAnatomy from "./TextAnatomy.vue";
import ToggleButtonAnatomy from "./ToggleButtonAnatomy.vue";

/**
 * Illustrated anatomies: a drawing of the component with a numbered pin on each part. Components
 * without one show their structure as a tree.
 */
export const anatomyFigures: Readonly<Record<string, Component>> = {
  "aspect-ratio": AspectRatioAnatomy,
  box: BoxAnatomy,
  button: ButtonAnatomy,
  code: CodeAnatomy,
  container: ContainerAnatomy,
  divider: DividerAnatomy,
  grid: GridAnatomy,
  heading: HeadingAnatomy,
  icon: IconAnatomy,
  "icon-button": IconButtonAnatomy,
  image: ImageAnatomy,
  kbd: KbdAnatomy,
  "keyboard-avoider": KeyboardAvoiderAnatomy,
  label: LabelAnatomy,
  link: LinkAnatomy,
  list: ListAnatomy,
  "safe-area": SafeAreaAnatomy,
  "scroll-area": ScrollAreaAnatomy,
  spacer: SpacerAnatomy,
  stack: StackAnatomy,
  surface: SurfaceAnatomy,
  text: TextAnatomy,
  "toggle-button": ToggleButtonAnatomy
};
