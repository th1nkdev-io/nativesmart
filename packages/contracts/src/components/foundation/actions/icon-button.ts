import { defineContract, property } from "../../../define";

export const iconButtonContract = defineContract({
  status: "preview",
  id: "icon-button",
  name: "IconButton",
  layer: "foundation",
  category: "actions",
  priority: "P1",
  description: "Icon-only action with required accessible label",
  anatomy: ["root", "icon", "tooltip", "badge"],
  properties: [
    property("icon", "string", "Icon name", { required: true, example: "bell" }),
    property("label", "string", "What the button does; read aloud and shown in the tooltip", {
      required: true,
      example: "Notifications"
    }),
    property("variant", "enum", "Visual emphasis", {
      values: ["ghost", "soft", "outline", "solid"],
      defaultValue: "ghost"
    }),
    property("intent", "enum", "Semantic intent", {
      values: ["neutral", "primary", "success", "warning", "danger"],
      defaultValue: "neutral"
    }),
    property("size", "enum", "Square of 28 to 56 px", {
      values: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md"
    }),
    property("shape", "enum", "Rounded square, circle or square", {
      values: ["rounded", "circle", "square"],
      defaultValue: "rounded"
    }),
    property("badge", "string", "A count on the corner, or a dot when set to an empty string", {
      example: "3"
    }),
    property("tooltip", "boolean", "Shows the label in a bubble on hover and focus", {
      defaultValue: true
    }),
    property("loading", "boolean", "A spinner replaces the icon", { defaultValue: false }),
    property("disabled", "boolean", "Whether interaction is unavailable", {
      defaultValue: false
    }),
    property("href", "string", "Renders a link")
  ],
  events: ["press"],
  states: ["default", "hovered", "focused", "pressed", "loading", "disabled"],
  accessibility: {
    role: "button",
    keyboard: ["Enter", "Space"],
    requirements: [
      "The label is required: it is the accessible name of a button without text",
      "The tooltip repeats the label for sighted users and is hidden from assistive tech",
      "A badge count is part of the name: « Notifications, 3 »",
      "The square never drops under the platform touch target"
    ]
  },
  semanticTokens: ["icon-button.size", "icon-button.radius", "icon-button.badge"],
  docs: {
    anatomy: {
      root: "A square Button: the same variants, intents and states",
      icon: "The glyph, sized with the button",
      tooltip: "The label in a bubble above, on hover and keyboard focus",
      badge: "A count or a dot on the top corner, in the danger color"
    },
    events: { press: { description: "Activated by click, Enter or Space" } },
    tokens: {
      "icon-button.size": "Control heights xs 28 to xl 56 px, as a square",
      "icon-button.radius": "Control radius, full for circle, extra small for square",
      "icon-button.badge": "Danger fill with its on-color, ringed with the surface"
    }
  }
});
