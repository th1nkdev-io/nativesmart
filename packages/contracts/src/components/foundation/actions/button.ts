import { defineContract, property } from "../../../define";

export const buttonContract = defineContract({
  status: "preview",
  id: "button",
  name: "Button",
  layer: "foundation",
  category: "actions",
  priority: "P0",
  description: "Primary action with variants, intents and loading",
  anatomy: ["root", "leading-icon", "label", "trailing-icon", "spinner"],
  properties: [
    property("label", "string", "Accessible button label", { required: true }),
    property("variant", "enum", "Visual emphasis", {
      values: ["solid", "outline", "ghost", "link"],
      defaultValue: "solid"
    }),
    property("intent", "enum", "Semantic intent", {
      values: ["primary", "neutral", "danger"],
      defaultValue: "primary"
    }),
    property("size", "enum", "Control size", {
      values: ["sm", "md", "lg"],
      defaultValue: "md"
    }),
    property("loading", "boolean", "Whether an action is pending", { defaultValue: false }),
    property("disabled", "boolean", "Whether interaction is unavailable", {
      defaultValue: false
    })
  ],
  states: ["default", "hovered", "focused", "pressed", "loading", "disabled"],
  events: ["press", "focus", "blur"],
  accessibility: {
    role: "button",
    keyboard: ["Enter", "Space"],
    requirements: [
      "Expose disabled and busy states",
      "Keep a visible focus indicator where keyboard input exists",
      "Meet the target platform minimum touch target"
    ]
  },
  semanticTokens: [
    "button.background",
    "button.foreground",
    "button.border",
    "button.radius",
    "button.height",
    "button.padding.inline",
    "button.focus.ring"
  ]
});
