import { defineContract, property } from "../../../define";

export const labelContract = defineContract({
  status: "preview",
  id: "label",
  name: "Label",
  layer: "foundation",
  category: "typography",
  priority: "P1",
  description: "Accessible label bound to a form control",
  anatomy: ["root", "text", "indicator", "info", "counter", "description"],
  properties: [
    property("text", "string", "The label; the default slot can hold it instead", {
      example: "Montant à envoyer"
    }),
    property("for", "string", "Id of the control it names"),
    property("size", "enum", "Label size", { values: ["sm", "md", "lg"], defaultValue: "md" }),
    property("required", "boolean", "Shows an asterisk; the control carries required itself", {
      defaultValue: false
    }),
    property("optional", "boolean", "Shows a muted optional mention", { defaultValue: false }),
    property("description", "string", "Hint under the label, linked to the control", {
      example: "Entre 500 et 500 000 FCFA"
    }),
    property("info", "string", "Extra help behind an info icon"),
    property("counter", "string", "Text at the end of the line, such as 12/80"),
    property("invalid", "boolean", "Danger color, with the control's error", {
      defaultValue: false
    }),
    property("disabled", "boolean", "Disabled color, with its control", { defaultValue: false }),
    property("as", "string", "label, or legend to name a fieldset, or span", {
      defaultValue: "label"
    }),
    property("optionalLabel", "string", "Word for optional fields", { defaultValue: "Optional" }),
    property("requiredLabel", "string", "Tooltip of the asterisk", { defaultValue: "Required" }),
    property("children", "slot", "The label, when text is not set"),
    property("end", "slot", "Content at the end of the line, such as a link")
  ],
  states: ["default", "invalid", "disabled"],
  accessibility: {
    role: "none",
    requirements: [
      "A label element names its control through for, so clicking it focuses the control",
      "A group of radios or checkboxes is named by a legend inside its fieldset",
      "The asterisk is decorative: the control itself is required and says so",
      "The description has an id the control lists in aria-describedby",
      "The info icon is a button with an accessible name, reachable by keyboard"
    ]
  },
  semanticTokens: ["label.style", "label.color", "label.required", "label.description"],
  docs: {
    anatomy: {
      root: "The label, legend or span, laid out as one line above the control",
      text: "The name of the field in the label text style",
      indicator: "Danger asterisk when required, muted mention when optional",
      info: "An info icon whose help shows on hover and focus",
      counter: "Text at the end of the line, such as a character count",
      description: "Muted hint under the line, linked to the control"
    },
    states: {
      invalid: "Text and asterisk take the danger color",
      disabled: "Everything takes the disabled color"
    },
    tokens: {
      "label.style": "Label text styles sm, md and lg",
      "label.color": "Text, danger text or disabled text",
      "label.required": "Danger text color for the asterisk",
      "label.description": "Caption style in the muted color"
    }
  }
});
