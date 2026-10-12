import { defineContract } from "../../../define";

export const numericKeypadContract = defineContract({
  id: "numeric-keypad",
  name: "NumericKeypad",
  layer: "business",
  category: "identity",
  priority: "P1",
  description: "On-screen keypad for amounts and PINs"
});
