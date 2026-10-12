import { defineContract, property } from "../../../define";

export const iconContract = defineContract({
  status: "preview",
  id: "icon",
  name: "Icon",
  layer: "foundation",
  category: "typography",
  priority: "P0",
  description: "Named icon with decorative or meaningful semantics",
  states: ["default", "disabled"],
  properties: [
    property("name", "string", "Icon identifier", { required: true }),
    property("label", "string", "Meaning when the icon is not decorative")
  ],
  semanticTokens: ["icon.color", "icon.size"]
});
