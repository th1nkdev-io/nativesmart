import { defineContract } from "../../../define";

export const chartContract = defineContract({
  id: "chart",
  name: "Chart",
  layer: "foundation",
  category: "data-display",
  priority: "P2",
  description: "Line, bar, area and donut charts from tokens"
});
