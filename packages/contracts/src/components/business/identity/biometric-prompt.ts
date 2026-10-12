import { defineContract } from "../../../define";

export const biometricPromptContract = defineContract({
  id: "biometric-prompt",
  name: "BiometricPrompt",
  layer: "business",
  category: "identity",
  priority: "P2",
  description: "Fingerprint or face confirmation with fallback"
});
