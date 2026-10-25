import { defineContract, property } from "../../../define";

export const buttonGroupContract = defineContract({
  status: "preview",
  id: "button-group",
  name: "ButtonGroup",
  layer: "foundation",
  category: "actions",
  priority: "P2",
  description: "Related buttons laid out together",
  anatomy: ["root", "button", "seam"],
  properties: [
    property("label", "string", "Accessible name of the group", { example: "Exporter le relevé" }),
    property("variant", "enum", "Look given to every button that does not set its own", {
      values: ["outline", "solid", "soft", "ghost"],
      defaultValue: "outline"
    }),
    property("intent", "enum", "Intent given to the buttons", {
      values: ["neutral", "primary", "success", "warning", "danger"],
      defaultValue: "neutral"
    }),
    property("size", "enum", "Size given to the buttons", {
      values: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md"
    }),
    property("orientation", "enum", "Row or column", {
      values: ["horizontal", "vertical"],
      defaultValue: "horizontal"
    }),
    property("attached", "boolean", "Joins the buttons: shared borders, outer corners only", {
      defaultValue: true
    }),
    property("block", "boolean", "Fills the width, buttons sharing it equally", {
      defaultValue: false
    }),
    property("disabled", "boolean", "Disables every button", { defaultValue: false }),
    property("children", "slot", "The buttons: Button, IconButton or ToggleButton")
  ],
  states: ["default", "disabled"],
  accessibility: {
    role: "group",
    requirements: [
      "The group has role group and a name when its buttons need context",
      "Each button keeps its own name and focus; Tab moves through them in order",
      "For one choice among several, use a SegmentedControl, which is a radio group",
      "The focused button rises above its neighbours so its ring is never cut"
    ]
  },
  semanticTokens: ["button-group.seam", "button-group.radius", "button-group.gap"],
  docs: {
    anatomy: {
      root: "The group: orientation, spacing or joined edges",
      button: "Each Button takes the group's variant, intent and size unless it sets its own",
      seam: "Where two attached buttons meet: one shared border, a light line on solid buttons"
    },
    tokens: {
      "button-group.seam": "The button border, or 30 % of the on-color between solid buttons",
      "button-group.radius": "Control radius on the outer corners only",
      "button-group.gap": "8 px between buttons that are not attached"
    }
  }
});
