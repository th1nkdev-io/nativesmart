import { defineContract } from "../../../define";

export const productListContract = defineContract({
  id: "product-list",
  name: "ProductList",
  layer: "business",
  category: "commerce",
  priority: "P2",
  description: "Grid or list of products with loading states"
});
