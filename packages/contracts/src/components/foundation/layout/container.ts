import { defineContract } from "../../../define";

export const containerContract = defineContract({
  id: "container",
  name: "Container",
  layer: "foundation",
  category: "layout",
  priority: "P1",
  description: "Max-width page wrapper with responsive gutters"
});
