import { defineContract } from "../../../define";

export const beneficiaryCardContract = defineContract({
  id: "beneficiary-card",
  name: "BeneficiaryCard",
  layer: "business",
  category: "payments",
  priority: "P2",
  description: "Beneficiary identity and account"
});
