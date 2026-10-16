import { defineContract, property } from "../../../define";

export const checkboxGroupContract = defineContract({
  status: "preview",
  id: "checkbox-group",
  name: "CheckboxGroup",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Related checkboxes with shared label and validation",
  anatomy: ["root", "label", "items", "description", "error"],
  properties: [
    property("label", "string", "Group label", { required: true }),
    property("name", "string", "Field name shared by the checkboxes"),
    property("value", "string-list", "Values of the checked items"),
    property("children", "slot", "Checkbox items", { required: true }),
    property("orientation", "enum", "Layout direction", {
      values: ["vertical", "horizontal"],
      defaultValue: "vertical"
    }),
    property("description", "string", "Helper text shown below the group"),
    property("errorMessage", "string", "Message shown when the group is invalid"),
    property("required", "boolean", "Whether at least one item must be checked", {
      defaultValue: false
    }),
    property("invalid", "boolean", "Whether validation failed", { defaultValue: false }),
    property("disabled", "boolean", "Whether every item is unavailable", { defaultValue: false })
  ],
  states: ["default", "invalid", "disabled"],
  events: ["change"],
  accessibility: {
    role: "group",
    keyboard: ["Tab", "Space"],
    requirements: [
      "Label the group, for example with a fieldset legend on the web",
      "Associate the description and error message with the group",
      "Keep each checkbox individually focusable"
    ]
  },
  semanticTokens: ["checkbox-group.gap", "checkbox-group.label.foreground"]
});
