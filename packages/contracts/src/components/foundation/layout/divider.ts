import { defineContract, property } from "../../../define";

export const dividerContract = defineContract({
  status: "preview",
  id: "divider",
  name: "Divider",
  layer: "foundation",
  category: "layout",
  priority: "P0",
  description: "Horizontal or vertical separator",
  states: ["default", "disabled"],
  properties: [
    property("orientation", "enum", "Divider direction", {
      values: ["horizontal", "vertical"]
    })
  ],
  semanticTokens: ["divider.color", "divider.width"]
});
