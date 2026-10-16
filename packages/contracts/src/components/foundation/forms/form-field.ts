import { defineContract, property } from "../../../define";

export const formFieldContract = defineContract({
  status: "preview",
  id: "form-field",
  name: "FormField",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Wraps a control with label, helper text, error and counter",
  anatomy: ["root", "label", "required-indicator", "control", "description", "error", "counter"],
  properties: [
    property("label", "string", "Visible label", { required: true }),
    property("children", "slot", "The wrapped control", { required: true }),
    property("description", "string", "Helper text shown below the control"),
    property("errorMessage", "string", "Message shown when the field is invalid"),
    property("required", "boolean", "Whether a value is mandatory", { defaultValue: false }),
    property("invalid", "boolean", "Whether validation failed", { defaultValue: false }),
    property("disabled", "boolean", "Whether the wrapped control is unavailable", {
      defaultValue: false
    }),
    property("maxLength", "number", "Character limit displayed by the counter")
  ],
  states: ["default", "invalid", "disabled"],
  accessibility: {
    requirements: [
      "Programmatically associate the label with the wrapped control",
      "Reference the description and error message from the control",
      "Announce the error message when it appears",
      "Mark required fields with text or an accessible name, not color alone"
    ]
  },
  semanticTokens: [
    "form-field.gap",
    "form-field.label.foreground",
    "form-field.required.foreground",
    "form-field.description.foreground",
    "form-field.error.foreground",
    "form-field.counter.foreground"
  ]
});
