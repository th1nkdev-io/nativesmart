import { defineContract } from "../../../define";

export const aspectRatioContract = defineContract({
  id: "aspect-ratio",
  name: "AspectRatio",
  layer: "foundation",
  category: "layout",
  priority: "P2",
  description: "Keeps media at a fixed ratio"
});
