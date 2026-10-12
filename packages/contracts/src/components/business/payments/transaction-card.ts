import { defineContract } from "../../../define";

export const transactionCardContract = defineContract({
  id: "transaction-card",
  name: "TransactionCard",
  layer: "business",
  category: "payments",
  priority: "P1",
  description: "One transaction summary"
});
