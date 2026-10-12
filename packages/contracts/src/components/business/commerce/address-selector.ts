import { defineContract } from "../../../define";

export const addressSelectorContract = defineContract({
  id: "address-selector",
  name: "AddressSelector",
  layer: "business",
  category: "commerce",
  priority: "P2",
  description: "Choose a saved address or add one"
});
