import { defineContract } from "../../../define";

export const paymentStatusContract = defineContract({
  id: "payment-status",
  name: "PaymentStatus",
  layer: "business",
  category: "payments",
  priority: "P1",
  description: "Pending, success, failed or timeout outcome"
});
