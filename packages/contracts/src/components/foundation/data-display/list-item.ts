import { defineContract } from "../../../define";

export const listItemContract = defineContract({
  id: "list-item",
  name: "ListItem",
  layer: "foundation",
  category: "data-display",
  priority: "P1",
  description: "Row with leading, content, trailing and press action"
});
