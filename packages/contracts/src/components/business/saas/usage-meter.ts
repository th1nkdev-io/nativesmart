import { defineContract } from "../../../define";

export const usageMeterContract = defineContract({
  id: "usage-meter",
  name: "UsageMeter",
  layer: "business",
  category: "saas",
  priority: "P2",
  description: "Quota consumption"
});
