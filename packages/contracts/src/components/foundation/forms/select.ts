import { defineContract, property } from "../../../define";
import { fieldEvents, fieldProperties, fieldRequirements, fieldStates } from "./shared";

export const selectContract = defineContract({
  status: "preview",
  id: "select",
  name: "Select",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Pick one option from a list",
  anatomy: [
    "root",
    "label",
    "trigger",
    "value",
    "placeholder",
    "indicator",
    "listbox",
    "option",
    "description",
    "error"
  ],
  properties: [
    ...fieldProperties(),
    property("value", "string", "Selected option value"),
    property("placeholder", "string", "Text shown when nothing is selected"),
    property("options", "slot", "Option items", { required: true }),
    property("open", "boolean", "Whether the list is displayed", { defaultValue: false })
  ],
  states: [...fieldStates, "open"],
  events: [...fieldEvents, "open-change"],
  accessibility: {
    role: "combobox",
    keyboard: ["Enter", "Space", "ArrowDown", "ArrowUp", "Home", "End", "Escape"],
    requirements: [
      ...fieldRequirements,
      "Expose the list as a listbox and the selected option as selected",
      "Support type-ahead to jump to an option on keyboard platforms",
      "Return focus to the trigger when the list closes",
      "May use the native platform picker on mobile"
    ]
  },
  semanticTokens: [
    "select.trigger.background",
    "select.trigger.foreground",
    "select.trigger.border",
    "select.trigger.radius",
    "select.focus.ring",
    "select.error",
    "select.listbox.background",
    "select.listbox.shadow",
    "select.option.highlighted.background",
    "select.option.selected.foreground"
  ]
});
