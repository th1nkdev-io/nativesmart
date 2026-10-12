import { defineContract } from "../../../define";

export const focusTrapContract = defineContract({
  id: "focus-trap",
  name: "FocusTrap",
  layer: "foundation",
  category: "utilities",
  priority: "P1",
  description: "Keeps focus inside overlays"
});
