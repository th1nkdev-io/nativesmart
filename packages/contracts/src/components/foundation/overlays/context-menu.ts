import { defineContract } from "../../../define";

export const contextMenuContract = defineContract({
  id: "context-menu",
  name: "ContextMenu",
  layer: "foundation",
  category: "overlays",
  priority: "P2",
  description: "Menu on right click or long press"
});
