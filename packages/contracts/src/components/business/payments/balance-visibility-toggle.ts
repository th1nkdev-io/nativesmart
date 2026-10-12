import { defineContract } from "../../../define";

export const balanceVisibilityToggleContract = defineContract({
  id: "balance-visibility-toggle",
  name: "BalanceVisibilityToggle",
  layer: "business",
  category: "payments",
  priority: "P1",
  description: "Hides and reveals balances"
});
