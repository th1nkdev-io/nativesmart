import { defineContract } from "../../../define";

export const countrySelectorContract = defineContract({
  id: "country-selector",
  name: "CountrySelector",
  layer: "business",
  category: "identity",
  priority: "P1",
  description: "Searchable country list with flags and dial codes"
});
