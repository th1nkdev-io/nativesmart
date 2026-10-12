import { defineContract } from "../../../define";

export const calendarContract = defineContract({
  id: "calendar",
  name: "Calendar",
  layer: "foundation",
  category: "forms",
  priority: "P2",
  description: "Month grid used by pickers and booking"
});
