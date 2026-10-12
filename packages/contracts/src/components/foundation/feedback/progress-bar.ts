import { defineContract } from "../../../define";

export const progressBarContract = defineContract({
  id: "progress-bar",
  name: "ProgressBar",
  layer: "foundation",
  category: "feedback",
  priority: "P1",
  description: "Determinate or indeterminate linear progress"
});
