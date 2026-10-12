import { defineContract } from "../../../define";

export const appBarContract = defineContract({
  id: "app-bar",
  name: "AppBar",
  layer: "foundation",
  category: "navigation",
  priority: "P1",
  description: "Top bar with title, back and actions"
});
