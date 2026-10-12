import { defineContract } from "../../../define";

export const transactionDetailsContract = defineContract({
  id: "transaction-details",
  name: "TransactionDetails",
  layer: "business",
  category: "payments",
  priority: "P1",
  description: "Full transaction record with references"
});
