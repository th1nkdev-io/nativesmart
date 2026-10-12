import { defineContract } from "../../../define";

export const portalContract = defineContract({
  id: "portal",
  name: "Portal",
  layer: "foundation",
  category: "utilities",
  priority: "P1",
  description: "Renders overlays at the root layer"
});
