import { defineContract } from "../../../define";

export const statContract = defineContract({
  id: "stat",
  name: "Stat",
  layer: "foundation",
  category: "data-display",
  priority: "P1",
  description: "Single metric with label, trend and delta"
});
