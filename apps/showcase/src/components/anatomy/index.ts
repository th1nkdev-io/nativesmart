import type { Component } from "vue";
import AspectRatioAnatomy from "./AspectRatioAnatomy.vue";
import BoxAnatomy from "./BoxAnatomy.vue";
import CodeAnatomy from "./CodeAnatomy.vue";
import ContainerAnatomy from "./ContainerAnatomy.vue";
import DividerAnatomy from "./DividerAnatomy.vue";
import GridAnatomy from "./GridAnatomy.vue";
import HeadingAnatomy from "./HeadingAnatomy.vue";
import IconAnatomy from "./IconAnatomy.vue";
import ImageAnatomy from "./ImageAnatomy.vue";
import KbdAnatomy from "./KbdAnatomy.vue";
import KeyboardAvoiderAnatomy from "./KeyboardAvoiderAnatomy.vue";
import SafeAreaAnatomy from "./SafeAreaAnatomy.vue";
import ScrollAreaAnatomy from "./ScrollAreaAnatomy.vue";
import SpacerAnatomy from "./SpacerAnatomy.vue";
import StackAnatomy from "./StackAnatomy.vue";
import SurfaceAnatomy from "./SurfaceAnatomy.vue";
import TextAnatomy from "./TextAnatomy.vue";

/**
 * Illustrated anatomies: a drawing of the component with a numbered pin on each part. Components
 * without one show their structure as a tree.
 */
export const anatomyFigures: Readonly<Record<string, Component>> = {
  "aspect-ratio": AspectRatioAnatomy,
  box: BoxAnatomy,
  code: CodeAnatomy,
  container: ContainerAnatomy,
  divider: DividerAnatomy,
  grid: GridAnatomy,
  heading: HeadingAnatomy,
  icon: IconAnatomy,
  image: ImageAnatomy,
  kbd: KbdAnatomy,
  "keyboard-avoider": KeyboardAvoiderAnatomy,
  "safe-area": SafeAreaAnatomy,
  "scroll-area": ScrollAreaAnatomy,
  spacer: SpacerAnatomy,
  stack: StackAnatomy,
  surface: SurfaceAnatomy,
  text: TextAnatomy
};
