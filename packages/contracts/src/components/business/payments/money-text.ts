import { defineContract } from "../../../define";

export const moneyTextContract = defineContract({
  id: "money-text",
  name: "MoneyText",
  layer: "business",
  category: "payments",
  priority: "P1",
  description: "Formatted amount display with currency and sign"
});
