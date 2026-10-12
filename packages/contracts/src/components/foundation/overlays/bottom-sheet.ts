import { defineContract } from "../../../define";

export const bottomSheetContract = defineContract({
  id: "bottom-sheet",
  name: "BottomSheet",
  layer: "foundation",
  category: "overlays",
  priority: "P1",
  description: "Panel rising from the bottom, with snap points"
});
