import { defineContract } from "../../../define";

export const feeBreakdownContract = defineContract({
  id: "fee-breakdown",
  name: "FeeBreakdown",
  layer: "business",
  category: "payments",
  priority: "P1",
  description: "Amount, fees, taxes and total (FeeSummary, FeesBreakdown)"
});
