import { defineContract } from "../../../define";

export const keyboardAvoiderContract = defineContract({
  id: "keyboard-avoider",
  name: "KeyboardAvoider",
  layer: "foundation",
  category: "layout",
  priority: "P1",
  description: "Keeps focused inputs visible above the keyboard",
  platforms: ["mobile"]
});
