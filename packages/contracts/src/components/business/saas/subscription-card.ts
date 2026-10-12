import { defineContract } from "../../../define";

export const subscriptionCardContract = defineContract({
  id: "subscription-card",
  name: "SubscriptionCard",
  layer: "business",
  category: "saas",
  priority: "P2",
  description: "Plan, renewal and billing status"
});
