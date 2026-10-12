import { defineContract } from "../../../define";

export const alertContract = defineContract({
  id: "alert",
  name: "Alert",
  layer: "foundation",
  category: "feedback",
  priority: "P1",
  description: "Inline message with intent (info, success, warning, danger)"
});
