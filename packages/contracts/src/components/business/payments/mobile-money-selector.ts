import { defineContract } from "../../../define";

export const mobileMoneySelectorContract = defineContract({
  id: "mobile-money-selector",
  name: "MobileMoneySelector",
  layer: "business",
  category: "payments",
  priority: "P1",
  description: "Choose an operator (Orange Money, MTN MoMo, Wave…)"
});
