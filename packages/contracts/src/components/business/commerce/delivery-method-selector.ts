import { defineContract } from "../../../define";

export const deliveryMethodSelectorContract = defineContract({
  id: "delivery-method-selector",
  name: "DeliveryMethodSelector",
  layer: "business",
  category: "commerce",
  priority: "P2",
  description: "Delivery or pickup options with price and delay"
});
