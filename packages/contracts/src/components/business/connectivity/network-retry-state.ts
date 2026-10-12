import { defineContract } from "../../../define";

export const networkRetryStateContract = defineContract({
  id: "network-retry-state",
  name: "NetworkRetryState",
  layer: "business",
  category: "connectivity",
  priority: "P1",
  description: "Failed request recovery with retry"
});
