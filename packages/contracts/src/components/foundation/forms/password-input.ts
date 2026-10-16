import { defineContract, property } from "../../../define";
import { fieldEvents, fieldProperties, fieldRequirements, fieldStates } from "./shared";

export const passwordInputContract = defineContract({
  status: "preview",
  id: "password-input",
  name: "PasswordInput",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Masked input with visibility toggle",
  anatomy: ["root", "label", "control", "visibility-toggle", "description", "error"],
  properties: [
    ...fieldProperties(),
    property("value", "string", "Controlled value"),
    property("placeholder", "string", "Hint shown when empty"),
    property("revealable", "boolean", "Whether the visibility toggle is shown", {
      defaultValue: true
    }),
    property("visible", "boolean", "Whether the characters are shown in clear", {
      defaultValue: false
    }),
    property("autoComplete", "enum", "Password manager hint", {
      values: ["current-password", "new-password"],
      defaultValue: "current-password"
    })
  ],
  states: [...fieldStates, "revealed"],
  events: [...fieldEvents, "visibility-change"],
  accessibility: {
    role: "textbox",
    keyboard: ["Tab", "Enter", "Space"],
    requirements: [
      ...fieldRequirements,
      "Expose the visibility toggle as a button with a show or hide label and a pressed state",
      "Do not announce typed characters while the value is masked",
      "Support password managers and platform autofill"
    ]
  },
  semanticTokens: [
    "password-input.background",
    "password-input.foreground",
    "password-input.border",
    "password-input.radius",
    "password-input.focus.ring",
    "password-input.error",
    "password-input.toggle.foreground"
  ]
});
