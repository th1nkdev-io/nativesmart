import { defineContract } from "../../../define";

export const sellerCardContract = defineContract({
  id: "seller-card",
  name: "SellerCard",
  layer: "business",
  category: "commerce",
  priority: "P2",
  description: "Seller identity, rating and contact"
});
