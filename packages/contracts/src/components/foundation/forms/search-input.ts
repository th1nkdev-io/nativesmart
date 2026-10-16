import { defineContract, property } from "../../../define";

export const searchInputContract = defineContract({
  status: "preview",
  id: "search-input",
  name: "SearchInput",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Search field with clear action and debounced change",
  anatomy: ["root", "leading-icon", "control", "clear-trigger", "loading-indicator"],
  properties: [
    property("label", "string", "Accessible label, visible or not", { required: true }),
    property("value", "string", "Controlled query"),
    property("placeholder", "string", "Hint shown when empty"),
    property("debounce", "number", "Milliseconds to wait before emitting change", {
      defaultValue: 300
    }),
    property("loading", "boolean", "Whether results are being fetched", { defaultValue: false }),
    property("disabled", "boolean", "Whether interaction is unavailable", { defaultValue: false })
  ],
  states: ["default", "hovered", "focused", "loading", "disabled"],
  events: ["change", "search", "clear", "focus", "blur"],
  accessibility: {
    role: "searchbox",
    keyboard: ["Enter", "Escape"],
    requirements: [
      "Submit the query with Enter and clear it with Escape on keyboard platforms",
      "Label the clear trigger and hide it when the field is empty",
      "Announce loading and result count changes without moving focus",
      "Use the platform search keyboard on mobile"
    ]
  },
  semanticTokens: [
    "search-input.background",
    "search-input.foreground",
    "search-input.placeholder",
    "search-input.border",
    "search-input.radius",
    "search-input.icon.foreground",
    "search-input.focus.ring"
  ]
});
