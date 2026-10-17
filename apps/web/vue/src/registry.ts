import { NsBadge, NsButton, NsSpinner } from "@nativesmart/vue";
import type { Component } from "vue";

/** Contract id to Vue component. Props use the contract property names one to one. */
export const registry: Readonly<Record<string, Component>> = {
  badge: NsBadge,
  button: NsButton,
  spinner: NsSpinner
};
