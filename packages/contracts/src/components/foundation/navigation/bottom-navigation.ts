import { defineContract } from "../../../define";

export const bottomNavigationContract = defineContract({
  id: "bottom-navigation",
  name: "BottomNavigation",
  layer: "foundation",
  category: "navigation",
  priority: "P1",
  description: "Primary destinations at the bottom of the screen",
  platforms: ["mobile"]
});
