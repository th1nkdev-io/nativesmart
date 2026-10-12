import { defineContract, property } from "../../../define";

export const inputContract = defineContract({
  status: "preview",
  id: "input",
  name: "Input",
  layer: "foundation",
  category: "forms",
  priority: "P0",
  description: "Single-line text field",
  anatomy: ["root", "label", "control", "leading", "trailing", "description", "error"],
  properties: [
    property("label", "string", "Input label"),
    property("value", "string", "Controlled value"),
    property("placeholder", "string", "Input hint"),
    property("invalid", "boolean", "Whether validation failed", { defaultValue: false }),
    property("disabled", "boolean", "Whether editing is unavailable", { defaultValue: false })
  ],
  states: ["default", "hovered", "focused", "invalid", "readonly", "disabled"],
  events: ["change", "focus", "blur", "submit"],
  accessibility: {
    role: "textbox",
    keyboard: ["Tab"],
    requirements: ["Associate labels, descriptions and errors with the control"]
  },
  semanticTokens: [
    "input.background",
    "input.foreground",
    "input.border",
    "input.radius",
    "input.focus.ring",
    "input.error"
  ]
});
