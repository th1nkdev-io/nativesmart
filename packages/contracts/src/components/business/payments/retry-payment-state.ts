import { defineContract } from "../../../define";

export const retryPaymentStateContract = defineContract({
  id: "retry-payment-state",
  name: "RetryPaymentState",
  layer: "business",
  category: "payments",
  priority: "P1",
  description: "Guided recovery after a failed or expired payment"
});
