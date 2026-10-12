import { defineContract } from "../../../define";

export const fabContract = defineContract({
  id: "fab",
  name: "FloatingActionButton",
  layer: "foundation",
  category: "actions",
  priority: "P2",
  description: "Main screen action floating above content",
  platforms: ["mobile"]
});
