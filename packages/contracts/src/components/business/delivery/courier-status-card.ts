import { defineContract } from "../../../define";

export const courierStatusCardContract = defineContract({
  id: "courier-status-card",
  name: "CourierStatusCard",
  layer: "business",
  category: "delivery",
  priority: "P2",
  description: "Courier identity, location and contact"
});
