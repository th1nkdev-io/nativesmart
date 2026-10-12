import { defineContract } from "../../../define";

export const paymentConfirmationContract = defineContract({
  id: "payment-confirmation",
  name: "PaymentConfirmation",
  layer: "business",
  category: "payments",
  priority: "P1",
  description: "Review before validating a payment"
});
