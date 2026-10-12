import { defineContract } from "../../../define";

export const orderStatusCardContract = defineContract({
  id: "order-status-card",
  name: "OrderStatusCard",
  layer: "business",
  category: "commerce",
  priority: "P2",
  description: "Order progress and next step"
});
