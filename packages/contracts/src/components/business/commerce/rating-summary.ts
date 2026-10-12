import { defineContract } from "../../../define";

export const ratingSummaryContract = defineContract({
  id: "rating-summary",
  name: "RatingSummary",
  layer: "business",
  category: "commerce",
  priority: "P2",
  description: "Average rating and distribution"
});
