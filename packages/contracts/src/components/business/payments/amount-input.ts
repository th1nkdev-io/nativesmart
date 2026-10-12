import { defineContract } from "../../../define";

export const amountInputContract = defineContract({
  id: "amount-input",
  name: "AmountInput",
  layer: "business",
  category: "payments",
  priority: "P1",
  description: "Currency-aware amount entry with limits"
});
