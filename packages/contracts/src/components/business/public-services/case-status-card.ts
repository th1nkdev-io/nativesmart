import { defineContract } from "../../../define";

export const caseStatusCardContract = defineContract({
  id: "case-status-card",
  name: "CaseStatusCard",
  layer: "business",
  category: "public-services",
  priority: "P2",
  description: "Case progress and next action"
});
