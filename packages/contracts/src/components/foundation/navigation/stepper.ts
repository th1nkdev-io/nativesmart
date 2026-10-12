import { defineContract } from "../../../define";

export const stepperContract = defineContract({
  id: "stepper",
  name: "Stepper",
  layer: "foundation",
  category: "navigation",
  priority: "P1",
  description: "Progress through a multi-step flow"
});
