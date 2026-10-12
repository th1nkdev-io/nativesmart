import { defineContract } from "../../../define";

export const providerSelectorContract = defineContract({
  id: "provider-selector",
  name: "ProviderSelector",
  layer: "business",
  category: "payments",
  priority: "P2",
  description: "Choose a biller or service provider"
});
