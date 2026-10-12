import { defineContract } from "../../../define";

export const actionSheetContract = defineContract({
  id: "action-sheet",
  name: "ActionSheet",
  layer: "foundation",
  category: "overlays",
  priority: "P1",
  description: "List of actions in a sheet",
  platforms: ["mobile"]
});
