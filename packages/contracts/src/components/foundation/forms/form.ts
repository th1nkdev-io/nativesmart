import { defineContract, property } from "../../../define";

export const formContract = defineContract({
  status: "preview",
  id: "form",
  name: "Form",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Submission, validation summary and error focus management",
  anatomy: ["root", "fields", "error-summary", "actions"],
  properties: [
    property("children", "slot", "Fields and actions", { required: true }),
    property("validationMode", "enum", "When fields are validated", {
      values: ["submit", "blur", "change"],
      defaultValue: "submit"
    }),
    property("submitting", "boolean", "Whether a submission is in progress", {
      defaultValue: false
    }),
    property("disabled", "boolean", "Whether every field and action is unavailable", {
      defaultValue: false
    })
  ],
  states: ["idle", "submitting", "invalid", "disabled"],
  events: ["submit", "reset", "invalid"],
  accessibility: {
    role: "form",
    keyboard: ["Enter"],
    requirements: [
      "After a failed submission, move focus to the error summary or the first invalid field",
      "Link each error summary entry to its field",
      "Prevent duplicate submissions while submitting and announce the pending state",
      "Submit with Enter from a single-line field on keyboard platforms"
    ]
  },
  semanticTokens: [
    "form.gap",
    "form.actions.gap",
    "form.error-summary.background",
    "form.error-summary.border",
    "form.error-summary.foreground"
  ]
});
