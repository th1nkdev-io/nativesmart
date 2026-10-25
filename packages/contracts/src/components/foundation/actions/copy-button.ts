import { defineContract, property } from "../../../define";

export const copyButtonContract = defineContract({
  status: "preview",
  id: "copy-button",
  name: "CopyButton",
  layer: "foundation",
  category: "actions",
  priority: "P1",
  description: "Copies a value (reference, account number) with feedback",
  anatomy: ["root", "value", "button", "feedback"],
  properties: [
    property("value", "string", "Text copied to the clipboard", {
      required: true,
      example: "CI93 0001 2345 6789 4521"
    }),
    property(
      "display",
      "enum",
      "The value in a field with its button, a labelled button or an icon",
      {
        values: ["field", "button", "icon"],
        defaultValue: "field"
      }
    ),
    property("caption", "string", "Name of the value, above the field", {
      example: "Numéro de compte"
    }),
    property("size", "enum", "Control size", {
      values: ["sm", "md", "lg"],
      defaultValue: "md"
    }),
    property("mask", "boolean", "Shows only the last four characters; the whole value is copied", {
      defaultValue: false
    }),
    property("timeout", "number", "Milliseconds the confirmation stays", { defaultValue: 2000 }),
    property("label", "string", "Name of the button", { defaultValue: "Copy" }),
    property("copiedLabel", "string", "Shown and announced once copied", {
      defaultValue: "Copied"
    }),
    property("failedLabel", "string", "Shown and announced when the clipboard refuses", {
      defaultValue: "Copy failed"
    }),
    property("disabled", "boolean", "Whether interaction is unavailable", {
      defaultValue: false
    })
  ],
  events: ["copy", "error"],
  states: ["default", "copied", "failed", "disabled"],
  accessibility: {
    role: "button",
    keyboard: ["Enter", "Space"],
    requirements: [
      "The button names what it copies: « Copy », with the caption when there is one",
      "The result is announced in a polite live region: copied or failed",
      "The value stays selectable text, so it can also be copied by hand",
      "A masked value says so to screen readers instead of reading the dots"
    ]
  },
  semanticTokens: ["copy.field", "copy.success", "copy.error"],
  docs: {
    anatomy: {
      root: "The field with its button, or the button alone",
      value: "The value in mono, selectable, masked if asked",
      button: "Copy icon, a check once copied, a warning if it failed",
      feedback: "Polite live region that announces the result"
    },
    events: {
      copy: { description: "The value is on the clipboard", payload: "The copied value" },
      error: { description: "The clipboard refused the value" }
    },
    states: {
      copied: "Check icon and copied label in the success color for the timeout",
      failed: "Warning icon and failed label in the danger color",
      disabled: "The button is disabled, the value stays readable"
    },
    tokens: {
      "copy.field": "Sunken surface, border and mono text",
      "copy.success": "Success text color while copied",
      "copy.error": "Danger text color when the copy fails"
    }
  }
});
