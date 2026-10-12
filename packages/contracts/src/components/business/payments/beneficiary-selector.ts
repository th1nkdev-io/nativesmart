import { defineContract } from "../../../define";

export const beneficiarySelectorContract = defineContract({
  id: "beneficiary-selector",
  name: "BeneficiarySelector",
  layer: "business",
  category: "payments",
  priority: "P1",
  description: "Pick a saved or new beneficiary"
});
