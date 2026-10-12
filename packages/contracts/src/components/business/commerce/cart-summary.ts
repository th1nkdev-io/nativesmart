import { defineContract } from "../../../define";

export const cartSummaryContract = defineContract({
  id: "cart-summary",
  name: "CartSummary",
  layer: "business",
  category: "commerce",
  priority: "P2",
  description: "Items, subtotal and checkout action"
});
