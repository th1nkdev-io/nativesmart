import { defineContract } from "../../../define";

export const appointmentSlotPickerContract = defineContract({
  id: "appointment-slot-picker",
  name: "AppointmentSlotPicker",
  layer: "business",
  category: "public-services",
  priority: "P2",
  description: "Available dates and times"
});
