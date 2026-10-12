import { defineContract } from "../../../define";

export const skipLinkContract = defineContract({
  id: "skip-link",
  name: "SkipLink",
  layer: "foundation",
  category: "navigation",
  priority: "P1",
  description: "Keyboard shortcut to main content",
  platforms: ["web", "desktop"]
});
