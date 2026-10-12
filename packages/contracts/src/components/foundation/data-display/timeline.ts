import { defineContract } from "../../../define";

export const timelineContract = defineContract({
  id: "timeline",
  name: "Timeline",
  layer: "foundation",
  category: "data-display",
  priority: "P1",
  description: "Ordered events (order, delivery and case tracking)"
});
