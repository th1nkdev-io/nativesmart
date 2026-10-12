import { defineContract } from "../../../define";

export const locationPickerContract = defineContract({
  id: "location-picker",
  name: "LocationPicker",
  layer: "business",
  category: "delivery",
  priority: "P2",
  description: "Pick a point on a map or from current location"
});
