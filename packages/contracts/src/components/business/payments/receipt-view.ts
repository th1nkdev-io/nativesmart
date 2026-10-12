import { defineContract } from "../../../define";

export const receiptViewContract = defineContract({
  id: "receipt-view",
  name: "ReceiptView",
  layer: "business",
  category: "payments",
  priority: "P1",
  description: "Printable and shareable receipt"
});
