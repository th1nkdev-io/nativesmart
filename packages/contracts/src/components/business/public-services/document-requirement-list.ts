import { defineContract } from "../../../define";

export const documentRequirementListContract = defineContract({
  id: "document-requirement-list",
  name: "DocumentRequirementList",
  layer: "business",
  category: "public-services",
  priority: "P2",
  description: "Required documents with upload status"
});
