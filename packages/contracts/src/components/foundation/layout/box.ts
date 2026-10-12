import { defineContract, property } from "../../../define";

export const boxContract = defineContract({
  status: "preview",
  id: "box",
  name: "Box",
  layer: "foundation",
  category: "layout",
  priority: "P0",
  description: "Base container with spacing, background and border tokens",
  states: ["default", "disabled"],
  properties: [property("children", "slot", "Box content")],
  semanticTokens: ["layout.spacing"]
});
