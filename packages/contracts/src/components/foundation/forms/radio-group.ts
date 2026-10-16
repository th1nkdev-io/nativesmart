import { defineContract, property } from "../../../define";

export const radioGroupContract = defineContract({
  status: "preview",
  id: "radio-group",
  name: "RadioGroup",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "One choice among a few visible options",
  anatomy: ["root", "label", "radio", "radio-indicator", "radio-label", "description", "error"],
  properties: [
    property("label", "string", "Group label", { required: true }),
    property("name", "string", "Field name shared by the radios"),
    property("value", "string", "Selected radio value"),
    property("children", "slot", "Radio items", { required: true }),
    property("orientation", "enum", "Layout direction", {
      values: ["vertical", "horizontal"],
      defaultValue: "vertical"
    }),
    property("description", "string", "Helper text shown below the group"),
    property("errorMessage", "string", "Message shown when the group is invalid"),
    property("required", "boolean", "Whether a choice is mandatory", { defaultValue: false }),
    property("invalid", "boolean", "Whether validation failed", { defaultValue: false }),
    property("disabled", "boolean", "Whether every radio is unavailable", { defaultValue: false })
  ],
  states: ["default", "invalid", "disabled"],
  events: ["change"],
  accessibility: {
    role: "radiogroup",
    keyboard: ["Tab", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"],
    requirements: [
      "Move into the group with Tab and between radios with the arrow keys",
      "Focus the selected radio, or the first one when nothing is selected",
      "Expose each radio's checked state and position in the group"
    ]
  },
  semanticTokens: [
    "radio-group.gap",
    "radio.size",
    "radio.border",
    "radio.checked.border",
    "radio.indicator.foreground",
    "radio.focus.ring",
    "radio.error"
  ]
});
