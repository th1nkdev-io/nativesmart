import { defineContract } from "../../../define";

export const safeAreaContract = defineContract({
  id: "safe-area",
  name: "SafeArea",
  layer: "foundation",
  category: "layout",
  priority: "P1",
  description: "Respects notches, status and navigation bars",
  platforms: ["mobile"]
});
