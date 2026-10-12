import { defineContract } from "../../../define";

export const formFieldContract = defineContract({
  id: "form-field",
  name: "FormField",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Wraps a control with label, helper text, error and counter"
});
