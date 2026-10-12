import { defineContract } from "../../../define";

export const toggleButtonContract = defineContract({
  id: "toggle-button",
  name: "ToggleButton",
  layer: "foundation",
  category: "actions",
  priority: "P2",
  description: "Button with pressed and unpressed state"
});
