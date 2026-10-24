import { defineContract } from "../../../define";

export const flipCardContract = defineContract({
  id: "flip-card",
  name: "FlipCard",
  layer: "foundation",
  category: "immersive",
  priority: "P2",
  description: "Two-sided card that turns in 3D"
});
