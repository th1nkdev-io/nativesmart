import { defineContract } from "../../../define";

export const checkoutSummaryContract = defineContract({
  id: "checkout-summary",
  name: "CheckoutSummary",
  layer: "business",
  category: "commerce",
  priority: "P2",
  description: "Final order review"
});
