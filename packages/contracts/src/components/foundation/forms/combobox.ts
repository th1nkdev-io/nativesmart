import { defineContract, property } from "../../../define";
import { fieldEvents, fieldProperties, fieldRequirements, fieldStates } from "./shared";

export const comboboxContract = defineContract({
  status: "preview",
  id: "combobox",
  name: "Combobox",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Searchable select with autocomplete",
  anatomy: [
    "root",
    "label",
    "input",
    "trigger",
    "listbox",
    "option",
    "empty",
    "loading",
    "description",
    "error"
  ],
  properties: [
    ...fieldProperties(),
    property("value", "string", "Selected option value"),
    property("inputValue", "string", "Text typed in the input"),
    property("placeholder", "string", "Hint shown when empty"),
    property("options", "slot", "Option items", { required: true }),
    property("filter", "enum", "How options are matched against the typed text", {
      values: ["contains", "starts-with", "none"],
      defaultValue: "contains"
    }),
    property("allowCustomValue", "boolean", "Whether a value outside the options is accepted", {
      defaultValue: false
    }),
    property("loading", "boolean", "Whether options are being fetched", { defaultValue: false }),
    property("open", "boolean", "Whether the list is displayed", { defaultValue: false })
  ],
  states: [...fieldStates, "open", "loading"],
  events: [...fieldEvents, "input-change", "open-change"],
  accessibility: {
    role: "combobox",
    keyboard: ["ArrowDown", "ArrowUp", "Enter", "Escape", "Home", "End"],
    requirements: [
      ...fieldRequirements,
      "Keep focus in the input and expose the highlighted option as the active descendant",
      "Announce the number of matching options and the empty state",
      "Restore the previous value on Escape when nothing was selected"
    ]
  },
  semanticTokens: [
    "combobox.input.background",
    "combobox.input.foreground",
    "combobox.input.border",
    "combobox.input.radius",
    "combobox.focus.ring",
    "combobox.error",
    "combobox.listbox.background",
    "combobox.listbox.shadow",
    "combobox.option.highlighted.background",
    "combobox.match.foreground"
  ]
});
