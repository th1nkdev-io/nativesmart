import { defineContract } from "../../../define";

export const passwordInputContract = defineContract({
  id: "password-input",
  name: "PasswordInput",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Masked input with visibility toggle"
});
