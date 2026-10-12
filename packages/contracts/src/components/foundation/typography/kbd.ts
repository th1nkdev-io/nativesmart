import { defineContract } from "../../../define";

export const kbdContract = defineContract({
  id: "kbd",
  name: "Kbd",
  layer: "foundation",
  category: "typography",
  priority: "P2",
  description: "Keyboard shortcut hint",
  platforms: ["web", "desktop"]
});
