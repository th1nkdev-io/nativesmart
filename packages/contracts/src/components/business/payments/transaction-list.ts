import { defineContract } from "../../../define";

export const transactionListContract = defineContract({
  id: "transaction-list",
  name: "TransactionList",
  layer: "business",
  category: "payments",
  priority: "P1",
  description: "Grouped, filterable transaction history"
});
