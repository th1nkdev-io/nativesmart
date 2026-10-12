import { defineContract } from "../../../define";

export const iconButtonContract = defineContract({
  id: "icon-button",
  name: "IconButton",
  layer: "foundation",
  category: "actions",
  priority: "P1",
  description: "Icon-only action with required accessible label"
});
