import { defineContract } from "../../../define";

export const reviewCardContract = defineContract({
  id: "review-card",
  name: "ReviewCard",
  layer: "business",
  category: "commerce",
  priority: "P2",
  description: "One customer review"
});
