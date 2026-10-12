import { defineContract } from "../../../define";

export const priceTagContract = defineContract({
  id: "price-tag",
  name: "PriceTag",
  layer: "business",
  category: "commerce",
  priority: "P2",
  description: "Price, discount and old price"
});
