import { defineContract, property } from "../../../define";
import { fieldEvents, fieldProperties, fieldRequirements, fieldStates } from "./shared";

export const textareaContract = defineContract({
  status: "preview",
  id: "textarea",
  name: "TextArea",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Multi-line text field with optional auto-grow",
  anatomy: ["root", "label", "control", "description", "error", "counter"],
  properties: [
    ...fieldProperties(),
    property("value", "string", "Controlled value"),
    property("placeholder", "string", "Hint shown when empty"),
    property("rows", "number", "Visible lines when empty", { defaultValue: 3 }),
    property("maxRows", "number", "Maximum visible lines before scrolling"),
    property("autoResize", "boolean", "Whether the height follows the content", {
      defaultValue: false
    }),
    property("maxLength", "number", "Character limit")
  ],
  states: fieldStates,
  events: fieldEvents,
  accessibility: {
    role: "textbox",
    keyboard: ["Tab", "Enter"],
    requirements: [
      ...fieldRequirements,
      "Expose the control as multi-line so Enter inserts a line break",
      "Announce the remaining characters when a limit is set"
    ]
  },
  semanticTokens: [
    "textarea.background",
    "textarea.foreground",
    "textarea.placeholder",
    "textarea.border",
    "textarea.radius",
    "textarea.padding",
    "textarea.focus.ring",
    "textarea.error"
  ]
});
