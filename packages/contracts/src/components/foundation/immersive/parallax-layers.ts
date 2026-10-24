import { defineContract } from "../../../define";

export const parallaxLayersContract = defineContract({
  id: "parallax-layers",
  name: "ParallaxLayers",
  layer: "foundation",
  category: "immersive",
  priority: "P2",
  description: "Depth layers that follow scroll or pointer"
});
