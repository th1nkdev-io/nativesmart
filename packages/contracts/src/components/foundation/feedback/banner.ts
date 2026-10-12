import { defineContract } from "../../../define";

export const bannerContract = defineContract({
  id: "banner",
  name: "Banner",
  layer: "foundation",
  category: "feedback",
  priority: "P1",
  description: "Persistent page or app-level message"
});
