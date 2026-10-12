import { defineContract } from "../../../define";

export const paymentMethodSelectorContract = defineContract({
  id: "payment-method-selector",
  name: "PaymentMethodSelector",
  layer: "business",
  category: "payments",
  priority: "P1",
  description: "Choose between mobile money, card, bank or cash"
});
