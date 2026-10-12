import { defineContract } from "../../../define";

export const visuallyHiddenContract = defineContract({
  id: "visually-hidden",
  name: "VisuallyHidden",
  layer: "foundation",
  category: "utilities",
  priority: "P1",
  description: "Content for assistive technologies only"
});
