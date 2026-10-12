import { defineContract } from "../../../define";

export const bankCardInputContract = defineContract({
  id: "bank-card-input",
  name: "BankCardInput",
  layer: "business",
  category: "payments",
  priority: "P2",
  description: "Card number, expiry and CVV with brand detection"
});
