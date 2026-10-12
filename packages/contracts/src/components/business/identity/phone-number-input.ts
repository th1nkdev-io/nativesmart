import { defineContract } from "../../../define";

export const phoneNumberInputContract = defineContract({
  id: "phone-number-input",
  name: "PhoneNumberInput",
  layer: "business",
  category: "identity",
  priority: "P1",
  description: "Country code plus number, validated per country"
});
