import { defineContract } from "../../../define";

export const errorStateContract = defineContract({
  id: "error-state",
  name: "ErrorState",
  layer: "foundation",
  category: "feedback",
  priority: "P1",
  description: "Recoverable error section with retry"
});
