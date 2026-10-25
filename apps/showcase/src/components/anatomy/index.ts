import type { Component } from "vue";
import AspectRatioAnatomy from "./AspectRatioAnatomy.vue";
import BoxAnatomy from "./BoxAnatomy.vue";
import ContainerAnatomy from "./ContainerAnatomy.vue";
import DividerAnatomy from "./DividerAnatomy.vue";

/**
 * Illustrated anatomies: a drawing of the component with a numbered pin on each part. Components
 * without one show their structure as a tree.
 */
export const anatomyFigures: Readonly<Record<string, Component>> = {
  "aspect-ratio": AspectRatioAnatomy,
  box: BoxAnatomy,
  container: ContainerAnatomy,
  divider: DividerAnatomy
};
