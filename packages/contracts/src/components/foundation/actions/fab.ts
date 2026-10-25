import { defineContract, property } from "../../../define";

export const fabContract = defineContract({
  status: "preview",
  id: "fab",
  name: "FloatingActionButton",
  layer: "foundation",
  category: "actions",
  priority: "P2",
  description: "Main screen action floating above content",
  platforms: ["mobile", "web"],
  anatomy: ["root", "button", "icon", "label", "actions", "action", "badge"],
  properties: [
    property("label", "string", "The action; its accessible name, and the text when extended", {
      required: true,
      example: "Nouveau transfert"
    }),
    property("icon", "string", "Icon of the main button", { defaultValue: "plus" }),
    property("tone", "enum", "Fill: the primary color, a raised surface or the inverse surface", {
      values: ["primary", "surface", "inverse"],
      defaultValue: "primary"
    }),
    property("size", "enum", "40, 56 or 72 px", {
      values: ["sm", "md", "lg"],
      defaultValue: "md"
    }),
    property("shape", "enum", "Circle, or the rounded square of Material 3", {
      values: ["circle", "rounded"],
      defaultValue: "circle"
    }),
    property("placement", "enum", "Corner it floats in", {
      values: ["bottom-end", "bottom-start", "bottom-center", "top-end"],
      defaultValue: "bottom-end"
    }),
    property("position", "enum", "fixed to the window, absolute in its container, or static", {
      values: ["fixed", "absolute", "static"],
      defaultValue: "fixed"
    }),
    property("extended", "boolean", "Shows the label beside the icon", { defaultValue: false }),
    property("badge", "string", "A count on the corner"),
    property("open", "boolean", "Whether its actions are shown; v-model:open in Vue", {
      defaultValue: false
    }),
    property("actions", "slot", "Speed dial items: icon, label and key, listed above the button"),
    property("disabled", "boolean", "Whether interaction is unavailable", { defaultValue: false })
  ],
  events: ["press", "action", "open-change"],
  states: ["default", "hovered", "focused", "pressed", "open", "disabled"],
  accessibility: {
    role: "button",
    keyboard: ["Enter", "Space", "Escape", "ArrowUp", "ArrowDown"],
    requirements: [
      "One floating action per screen: the main thing the screen is for",
      "The label is required: it names the icon-only button and shows when extended",
      "With actions, the button has aria-expanded and controls a menu of menuitems",
      "Opening moves focus to the first action; Escape closes and brings focus back",
      "It never covers the last content: leave space at the end of scrolling pages"
    ]
  },
  semanticTokens: ["fab.background", "fab.elevation", "fab.size", "fab.offset"],
  docs: {
    anatomy: {
      root: "Places the button in its corner, fixed or in its container",
      button: "The raised button: circle or rounded square",
      icon: "The main icon; it turns into a close cross while actions are open",
      label: "The text of an extended button, also its accessible name",
      actions: "The menu of speed dial actions, stacked above the button",
      action: "One small button with its label, opening with a short stagger",
      badge: "A count on the corner"
    },
    events: {
      press: { description: "The button was pressed, when it has no actions" },
      action: { description: "An action was chosen", payload: "Its key" },
      "open-change": { description: "The actions opened or closed", payload: "Whether open" }
    },
    states: {
      hovered: "The shadow rises and the fill darkens",
      pressed: "The button sinks slightly",
      open: "Actions shown, icon rotated, a soft scrim behind"
    },
    tokens: {
      "fab.background": "Primary, raised surface or inverse surface",
      "fab.elevation": "Raised shadow, modal shadow on hover",
      "fab.size": "40, 56 or 72 px; extended keeps the height and grows in width",
      "fab.offset": "24 px from the edges, more above a bottom navigation"
    }
  }
});
