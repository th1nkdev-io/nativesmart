import { defineContract } from "../../../define";

export const retryActionContract = defineContract({
  id: "retry-action",
  name: "RetryAction",
  layer: "business",
  category: "connectivity",
  priority: "P2",
  description: "Inline retry control with backoff feedback"
});
