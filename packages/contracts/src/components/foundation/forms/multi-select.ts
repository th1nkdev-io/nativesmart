import { defineContract } from "../../../define";

export const multiSelectContract = defineContract({
  id: "multi-select",
  name: "MultiSelect",
  layer: "foundation",
  category: "forms",
  priority: "P2",
  description: "Pick several options, shown as tags"
});
