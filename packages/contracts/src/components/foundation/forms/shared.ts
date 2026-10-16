import { property } from "../../../define";
import type { ComponentProperty } from "../../../types";

/** Interaction states shared by every text-like form control. */
export const fieldStates = ["default", "hovered", "focused", "invalid", "readonly", "disabled"];

/** Events shared by every form control. */
export const fieldEvents = ["change", "focus", "blur"];

/** Accessibility requirements every form control must meet. */
export const fieldRequirements = [
  "Associate the label, description and error message with the control",
  "Expose required, invalid, read-only and disabled states to assistive technologies",
  "Announce the error message when validation fails",
  "Never rely on color alone to signal an error or a required field"
];

/** Properties every labelled form control exposes. */
export function fieldProperties(): ComponentProperty[] {
  return [
    property("label", "string", "Visible label", { required: true }),
    property("name", "string", "Field name used when the form is submitted"),
    property("description", "string", "Helper text shown below the control"),
    property("errorMessage", "string", "Message shown when the field is invalid"),
    property("required", "boolean", "Whether a value is mandatory", { defaultValue: false }),
    property("invalid", "boolean", "Whether validation failed", { defaultValue: false }),
    property("disabled", "boolean", "Whether interaction is unavailable", { defaultValue: false }),
    property("readOnly", "boolean", "Whether the value can be read but not changed", {
      defaultValue: false
    })
  ];
}
