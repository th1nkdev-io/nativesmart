import { defineContract } from "../../../define";

export const commandPaletteContract = defineContract({
  id: "command-palette",
  name: "CommandPalette",
  layer: "foundation",
  category: "overlays",
  priority: "P2",
  description: "Keyboard-driven search over actions",
  platforms: ["web", "desktop"]
});
