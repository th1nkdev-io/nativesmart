import { defineContract } from "../../../define";

export const treeViewContract = defineContract({
  id: "tree-view",
  name: "TreeView",
  layer: "foundation",
  category: "data-display",
  priority: "P2",
  description: "Hierarchical expandable data",
  platforms: ["web", "desktop"]
});
