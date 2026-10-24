import { defineContract } from "../../../define";

export const tiltCardContract = defineContract({
  id: "tilt-card",
  name: "TiltCard",
  layer: "foundation",
  category: "immersive",
  priority: "P1",
  description: "Card that tilts with the pointer or gyroscope, with glare"
});
