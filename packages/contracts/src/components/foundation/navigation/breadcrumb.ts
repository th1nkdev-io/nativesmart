import { defineContract } from "../../../define";

export const breadcrumbContract = defineContract({
  id: "breadcrumb",
  name: "Breadcrumb",
  layer: "foundation",
  category: "navigation",
  priority: "P2",
  description: "Location within a hierarchy",
  platforms: ["web", "desktop"]
});
