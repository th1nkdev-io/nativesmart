import { defineContract } from "../../../define";

export const promoCodeInputContract = defineContract({
  id: "promo-code-input",
  name: "PromoCodeInput",
  layer: "business",
  category: "commerce",
  priority: "P2",
  description: "Apply and validate a discount code"
});
