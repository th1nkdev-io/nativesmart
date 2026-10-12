import { defineContract } from "../../../define";

export const tooltipContract = defineContract({
  id: "tooltip",
  name: "Tooltip",
  layer: "foundation",
  category: "overlays",
  priority: "P1",
  description: "Short description on hover, focus or long press"
});
