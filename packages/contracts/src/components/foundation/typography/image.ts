import { defineContract } from "../../../define";

export const imageContract = defineContract({
  id: "image",
  name: "Image",
  layer: "foundation",
  category: "typography",
  priority: "P1",
  description: "Responsive image with placeholder, fallback and lazy load"
});
