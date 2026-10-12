import { defineContract, property } from "../../../define";

export const cardContract = defineContract({
  status: "preview",
  id: "card",
  name: "Card",
  layer: "foundation",
  category: "data-display",
  priority: "P0",
  description: "Grouped content with header, body and footer",
  states: ["default", "disabled"],
  anatomy: ["root", "header", "content", "footer"],
  properties: [property("children", "slot", "Card content")],
  semanticTokens: ["card.background", "card.border", "card.radius", "card.shadow"]
});
