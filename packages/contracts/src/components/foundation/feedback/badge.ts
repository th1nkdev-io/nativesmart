import { defineContract, property } from "../../../define";

export const badgeContract = defineContract({
  status: "preview",
  id: "badge",
  name: "Badge",
  layer: "foundation",
  category: "feedback",
  priority: "P0",
  description: "Small status or count label",
  states: ["default", "disabled"],
  anatomy: ["root", "label"],
  properties: [
    property("label", "string", "Badge content", { required: true }),
    property("intent", "enum", "Semantic intent", {
      values: ["neutral", "info", "success", "warning", "danger"]
    })
  ],
  semanticTokens: ["badge.background", "badge.foreground", "badge.radius"]
});
