import { defineContract } from "../../../define";

export const transferFormContract = defineContract({
  id: "transfer-form",
  name: "TransferForm",
  layer: "business",
  category: "payments",
  priority: "P1",
  description: "Beneficiary, amount, reason and fees in one form"
});
