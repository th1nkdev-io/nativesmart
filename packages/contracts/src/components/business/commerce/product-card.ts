import { defineContract } from "../../../define";

export const productCardContract = defineContract({
  id: "product-card",
  name: "ProductCard",
  layer: "business",
  category: "commerce",
  priority: "P2",
  description: "Product image, name, price and action"
});
