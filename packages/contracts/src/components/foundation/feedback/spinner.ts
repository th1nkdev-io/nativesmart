import { defineContract, property } from "../../../define";

export const spinnerContract = defineContract({
  status: "preview",
  id: "spinner",
  name: "Spinner",
  layer: "foundation",
  category: "feedback",
  priority: "P0",
  description: "Indeterminate loading indicator",
  properties: [property("label", "string", "Accessible loading label")],
  states: ["indeterminate"],
  accessibility: { role: "progressbar", requirements: ["Announce ongoing activity when needed"] },
  semanticTokens: ["spinner.color", "spinner.size", "motion.duration.normal"]
});
