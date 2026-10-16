import { defineContract, property } from "../../../define";

export const switchContract = defineContract({
  status: "preview",
  id: "switch",
  name: "Switch",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Immediate on/off setting",
  anatomy: ["root", "track", "thumb", "label", "description"],
  properties: [
    property("label", "string", "Visible label", { required: true }),
    property("name", "string", "Field name used when the form is submitted"),
    property("checked", "boolean", "Whether the setting is on", { defaultValue: false }),
    property("description", "string", "Helper text shown below the label"),
    property("size", "enum", "Control size", { values: ["sm", "md"], defaultValue: "md" }),
    property("disabled", "boolean", "Whether interaction is unavailable", { defaultValue: false })
  ],
  states: ["off", "on", "hovered", "focused", "disabled"],
  events: ["change", "focus", "blur"],
  accessibility: {
    role: "switch",
    keyboard: ["Space", "Enter"],
    requirements: [
      "Expose the on and off state",
      "Apply the change immediately; use a checkbox when a submit step is needed",
      "Make the label part of the touch and click target"
    ]
  },
  semanticTokens: [
    "switch.width",
    "switch.height",
    "switch.track.off",
    "switch.track.on",
    "switch.thumb",
    "switch.focus.ring"
  ]
});
