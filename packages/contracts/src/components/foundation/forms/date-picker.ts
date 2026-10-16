import { defineContract, property } from "../../../define";
import { fieldEvents, fieldProperties, fieldRequirements, fieldStates } from "./shared";

export const datePickerContract = defineContract({
  status: "preview",
  id: "date-picker",
  name: "DatePicker",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Date selection with locale-aware formats",
  anatomy: ["root", "label", "input", "trigger", "calendar", "description", "error"],
  properties: [
    ...fieldProperties(),
    property("value", "string", "Selected date in ISO 8601 format (YYYY-MM-DD)"),
    property("min", "string", "Earliest selectable date in ISO 8601 format"),
    property("max", "string", "Latest selectable date in ISO 8601 format"),
    property("placeholder", "string", "Hint shown when empty"),
    property("locale", "string", "BCP 47 locale for display format and month names"),
    property("firstDayOfWeek", "number", "First weekday column, 0 for Sunday to 6 for Saturday"),
    property("open", "boolean", "Whether the calendar is displayed", { defaultValue: false })
  ],
  states: [...fieldStates, "open"],
  events: [...fieldEvents, "open-change"],
  accessibility: {
    role: "textbox",
    keyboard: [
      "Enter",
      "Escape",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "PageUp",
      "PageDown",
      "Home",
      "End"
    ],
    requirements: [
      ...fieldRequirements,
      "Allow typing the date as well as picking it from the calendar",
      "Expose the calendar as a grid with the selected and current dates announced",
      "Move by day with arrows, by month with Page keys and within the week with Home and End",
      "Return focus to the input when the calendar closes"
    ]
  },
  semanticTokens: [
    "date-picker.input.background",
    "date-picker.input.border",
    "date-picker.input.radius",
    "date-picker.focus.ring",
    "date-picker.error",
    "date-picker.calendar.background",
    "date-picker.calendar.shadow",
    "date-picker.day.selected.background",
    "date-picker.day.today.border",
    "date-picker.day.disabled.foreground"
  ]
});
