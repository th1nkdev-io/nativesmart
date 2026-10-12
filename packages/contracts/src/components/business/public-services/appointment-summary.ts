import { defineContract } from "../../../define";

export const appointmentSummaryContract = defineContract({
  id: "appointment-summary",
  name: "AppointmentSummary",
  layer: "business",
  category: "public-services",
  priority: "P2",
  description: "Booked appointment details"
});
