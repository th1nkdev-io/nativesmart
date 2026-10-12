import { defineContract } from "../../../define";

export const currencySelectorContract = defineContract({
  id: "currency-selector",
  name: "CurrencySelector",
  layer: "business",
  category: "payments",
  priority: "P2",
  description: "Choose a currency"
});
