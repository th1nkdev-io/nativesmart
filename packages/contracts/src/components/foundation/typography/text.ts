import { defineContract, property } from "../../../define";

export const textContract = defineContract({
  status: "preview",
  id: "text",
  name: "Text",
  layer: "foundation",
  category: "typography",
  priority: "P0",
  description: "Body, caption and label text with semantic roles",
  states: ["default", "disabled"],
  properties: [
    property("children", "slot", "Text content", { required: true }),
    property("role", "enum", "Semantic text role", {
      values: ["body", "label", "caption", "heading", "display"]
    })
  ],
  semanticTokens: ["text.foreground", "typography.body", "typography.heading"]
});
