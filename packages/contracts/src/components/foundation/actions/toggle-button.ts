import { defineContract, property } from "../../../define";

export const toggleButtonContract = defineContract({
  status: "preview",
  id: "toggle-button",
  name: "ToggleButton",
  layer: "foundation",
  category: "actions",
  priority: "P2",
  description: "Button with pressed and unpressed state",
  anatomy: ["root", "icon", "label"],
  properties: [
    property("label", "string", "What it switches; the name stays the same pressed or not", {
      required: true,
      example: "Favori"
    }),
    property("pressed", "boolean", "Whether it is on; v-model in Vue", { defaultValue: false }),
    property("icon", "string", "Icon when off", { example: "heart" }),
    property("iconPressed", "string", "Icon when on, such as eye-off after eye"),
    property("variant", "enum", "Look when off; on, it takes the intent's tint and border", {
      values: ["outline", "ghost", "soft"],
      defaultValue: "outline"
    }),
    property("intent", "enum", "Color when on", {
      values: ["primary", "neutral", "success", "warning", "danger"],
      defaultValue: "primary"
    }),
    property("size", "enum", "Control size", {
      values: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md"
    }),
    property("iconOnly", "boolean", "A square showing only the icon, the label as tooltip", {
      defaultValue: false
    }),
    property("disabled", "boolean", "Whether interaction is unavailable", {
      defaultValue: false
    })
  ],
  events: ["change"],
  states: ["default", "pressed", "hovered", "focused", "disabled"],
  accessibility: {
    role: "button",
    keyboard: ["Enter", "Space"],
    requirements: [
      "Expose the state with aria-pressed, true or false",
      "Keep the same name in both states: the state, not the label, says it is on",
      "The pressed look never relies on color alone: the border and the icon change too",
      "For one choice among several, use a SegmentedControl instead"
    ]
  },
  semanticTokens: ["toggle.background", "toggle.border", "toggle.foreground"],
  docs: {
    anatomy: {
      root: "A Button with aria-pressed: tint and border when on",
      icon: "Optional icon, swapped for iconPressed when on",
      label: "The visible name, the same in both states"
    },
    events: {
      change: { description: "The state switched", payload: "The new pressed value" }
    },
    states: {
      pressed: "The intent's muted tint, its border and text color, and the pressed icon"
    },
    tokens: {
      "toggle.background": "Transparent or muted when off, the intent's tint when on",
      "toggle.border": "Default border when off, the intent color when on",
      "toggle.foreground": "Text color when off, the intent text color when on"
    }
  }
});
