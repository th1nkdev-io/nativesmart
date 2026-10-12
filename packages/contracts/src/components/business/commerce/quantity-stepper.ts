import { defineContract } from "../../../define";

export const quantityStepperContract = defineContract({
  id: "quantity-stepper",
  name: "QuantityStepper",
  layer: "business",
  category: "commerce",
  priority: "P2",
  description: "Increase or decrease item quantity"
});
