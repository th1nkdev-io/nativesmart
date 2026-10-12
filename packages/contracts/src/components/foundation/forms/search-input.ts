import { defineContract } from "../../../define";

export const searchInputContract = defineContract({
  id: "search-input",
  name: "SearchInput",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Search field with clear action and debounced change"
});
