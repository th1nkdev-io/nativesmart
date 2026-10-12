import { defineContract } from "../../../define";

export const pinCodeInputContract = defineContract({
  id: "pin-code-input",
  name: "PINCodeInput",
  layer: "business",
  category: "identity",
  priority: "P1",
  description: "Transaction PIN with numeric keypad and masking"
});
