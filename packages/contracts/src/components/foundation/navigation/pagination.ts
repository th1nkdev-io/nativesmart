import { defineContract } from "../../../define";

export const paginationContract = defineContract({
  id: "pagination",
  name: "Pagination",
  layer: "foundation",
  category: "navigation",
  priority: "P1",
  description: "Page navigation for long lists and tables"
});
