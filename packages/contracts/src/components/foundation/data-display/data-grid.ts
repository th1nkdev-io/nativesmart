import { defineContract } from "../../../define";

export const dataGridContract = defineContract({
  id: "data-grid",
  name: "DataGrid",
  layer: "foundation",
  category: "data-display",
  priority: "P2",
  description: "Large data sets with virtualization and column controls",
  platforms: ["web", "desktop"]
});
