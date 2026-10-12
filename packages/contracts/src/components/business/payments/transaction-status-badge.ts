import { defineContract } from "../../../define";

export const transactionStatusBadgeContract = defineContract({
  id: "transaction-status-badge",
  name: "TransactionStatusBadge",
  layer: "business",
  category: "payments",
  priority: "P1",
  description: "Standard status labels and colors"
});
