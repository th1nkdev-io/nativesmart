import { defineContract } from "../../../define";

export const planSelectorContract = defineContract({
  id: "plan-selector",
  name: "PlanSelector",
  layer: "business",
  category: "saas",
  priority: "P2",
  description: "Compare and pick a plan"
});
