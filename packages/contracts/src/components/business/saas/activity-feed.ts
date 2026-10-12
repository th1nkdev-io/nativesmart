import { defineContract } from "../../../define";

export const activityFeedContract = defineContract({
  id: "activity-feed",
  name: "ActivityFeed",
  layer: "business",
  category: "saas",
  priority: "P2",
  description: "Chronological events"
});
