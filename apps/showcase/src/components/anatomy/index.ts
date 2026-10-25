import type { Component } from "vue";
import AspectRatioAnatomy from "./AspectRatioAnatomy.vue";

/**
 * Illustrated anatomies: a drawing of the component with a numbered pin on each part. Components
 * without one show their structure as a tree.
 */
export const anatomyFigures: Readonly<Record<string, Component>> = {
  "aspect-ratio": AspectRatioAnatomy
};
