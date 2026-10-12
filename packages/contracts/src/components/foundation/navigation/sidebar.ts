import { defineContract } from "../../../define";

export const sidebarContract = defineContract({
  id: "sidebar",
  name: "Sidebar",
  layer: "foundation",
  category: "navigation",
  priority: "P1",
  description: "Primary navigation for wide layouts",
  platforms: ["web", "desktop"]
});
