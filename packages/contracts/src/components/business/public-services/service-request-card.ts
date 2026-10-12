import { defineContract } from "../../../define";

export const serviceRequestCardContract = defineContract({
  id: "service-request-card",
  name: "ServiceRequestCard",
  layer: "business",
  category: "public-services",
  priority: "P2",
  description: "Service description, cost and requirements"
});
