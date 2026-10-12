import { defineContract } from "../../../define";

export const ratingInputContract = defineContract({
  id: "rating-input",
  name: "RatingInput",
  layer: "foundation",
  category: "forms",
  priority: "P2",
  description: "Star or scale rating entry"
});
