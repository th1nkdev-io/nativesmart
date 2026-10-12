import { defineContract } from "../../../define";

export const textareaContract = defineContract({
  id: "textarea",
  name: "TextArea",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Multi-line text field with optional auto-grow"
});
