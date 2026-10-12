import { defineContract } from "../../../define";

export const passwordStrengthMeterContract = defineContract({
  id: "password-strength-meter",
  name: "PasswordStrengthMeter",
  layer: "business",
  category: "identity",
  priority: "P2",
  description: "Strength feedback on password creation"
});
