import { defineContract } from "../../../define";

export const tableContract = defineContract({
  id: "table",
  name: "Table",
  layer: "foundation",
  category: "data-display",
  priority: "P1",
  description: "Tabular data with sorting and selection"
});
