import { defineContract } from "../../../define";

export const consentCheckboxContract = defineContract({
  id: "consent-checkbox",
  name: "ConsentCheckbox",
  layer: "business",
  category: "identity",
  priority: "P1",
  description: "Terms and privacy acceptance with links"
});
