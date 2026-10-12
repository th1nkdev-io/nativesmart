import { defineContract } from "../../../define";

export const deliveryTrackingCardContract = defineContract({
  id: "delivery-tracking-card",
  name: "DeliveryTrackingCard",
  layer: "business",
  category: "delivery",
  priority: "P2",
  description: "Package status, ETA and timeline"
});
