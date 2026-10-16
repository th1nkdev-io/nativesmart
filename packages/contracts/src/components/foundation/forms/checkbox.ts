import { defineContract, property } from "../../../define";

export const checkboxContract = defineContract({
  status: "preview",
  id: "checkbox",
  name: "Checkbox",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Independent boolean choice, with indeterminate state",
  anatomy: ["root", "control", "indicator", "label", "description"],
  properties: [
    property("label", "string", "Visible label", { required: true }),
    property("name", "string", "Field name used when the form is submitted"),
    property("value", "string", "Value submitted when checked"),
    property("checked", "boolean", "Whether the box is checked", { defaultValue: false }),
    property("indeterminate", "boolean", "Whether the state is mixed", { defaultValue: false }),
    property("description", "string", "Helper text shown below the label"),
    property("required", "boolean", "Whether checking is mandatory", { defaultValue: false }),
    property("invalid", "boolean", "Whether validation failed", { defaultValue: false }),
    property("disabled", "boolean", "Whether interaction is unavailable", { defaultValue: false })
  ],
  states: ["unchecked", "checked", "indeterminate", "hovered", "focused", "invalid", "disabled"],
  events: ["change", "focus", "blur"],
  accessibility: {
    role: "checkbox",
    keyboard: ["Space"],
    requirements: [
      "Expose checked, unchecked and mixed states",
      "Make the label part of the touch and click target",
      "Meet the platform minimum touch target including the label"
    ]
  },
  semanticTokens: [
    "checkbox.size",
    "checkbox.radius",
    "checkbox.border",
    "checkbox.background",
    "checkbox.checked.background",
    "checkbox.indicator.foreground",
    "checkbox.focus.ring",
    "checkbox.error"
  ]
});
