import { defineContract, property } from "../../../define";

export const pinInputContract = defineContract({
  status: "preview",
  id: "pin-input",
  name: "PinInput",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Segmented code entry; base of OTP and PIN entry",
  anatomy: ["root", "label", "cell", "separator", "description", "error"],
  properties: [
    property("label", "string", "Accessible label for the whole code", { required: true }),
    property("length", "number", "Number of cells", { defaultValue: 6 }),
    property("value", "string", "Controlled code"),
    property("type", "enum", "Accepted characters", {
      values: ["numeric", "alphanumeric"],
      defaultValue: "numeric"
    }),
    property("mask", "boolean", "Whether entered characters are hidden", { defaultValue: false }),
    property("oneTimeCode", "boolean", "Whether platform one-time-code autofill is enabled", {
      defaultValue: false
    }),
    property("errorMessage", "string", "Message shown when the code is invalid"),
    property("invalid", "boolean", "Whether validation failed", { defaultValue: false }),
    property("disabled", "boolean", "Whether entry is unavailable", { defaultValue: false })
  ],
  states: ["default", "focused", "filled", "invalid", "disabled"],
  events: ["change", "complete", "focus", "blur"],
  accessibility: {
    role: "group",
    keyboard: ["ArrowLeft", "ArrowRight", "Backspace", "Delete"],
    requirements: [
      "Label the group once and each cell by position, such as digit 2 of 6",
      "Distribute a pasted or autofilled code across the cells",
      "Move focus back on Backspace from an empty cell",
      "Never read masked characters aloud"
    ]
  },
  semanticTokens: [
    "pin-input.gap",
    "pin-input.cell.size",
    "pin-input.cell.background",
    "pin-input.cell.foreground",
    "pin-input.cell.border",
    "pin-input.cell.radius",
    "pin-input.focus.ring",
    "pin-input.error"
  ]
});
