import { defineContract } from "../../../define";

export const selectContract = defineContract({
  id: "select",
  name: "Select",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Pick one option from a list"
});
