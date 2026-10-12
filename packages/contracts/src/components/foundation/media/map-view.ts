import { defineContract } from "../../../define";

export const mapViewContract = defineContract({
  id: "map-view",
  name: "MapView",
  layer: "foundation",
  category: "media",
  priority: "P2",
  description: "Map with markers and routes, provider-agnostic"
});
