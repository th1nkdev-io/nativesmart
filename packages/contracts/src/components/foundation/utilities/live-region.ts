import { defineContract } from "../../../define";

export const liveRegionContract = defineContract({
  id: "live-region",
  name: "LiveRegion",
  layer: "foundation",
  category: "utilities",
  priority: "P1",
  description: "Announces dynamic changes to screen readers"
});
