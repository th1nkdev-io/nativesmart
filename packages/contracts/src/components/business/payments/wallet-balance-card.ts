import { defineContract } from "../../../define";

export const walletBalanceCardContract = defineContract({
  id: "wallet-balance-card",
  name: "WalletBalanceCard",
  layer: "business",
  category: "payments",
  priority: "P1",
  description: "Balance, account and primary actions"
});
