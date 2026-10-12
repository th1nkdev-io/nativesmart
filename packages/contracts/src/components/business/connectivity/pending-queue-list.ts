import { defineContract } from "../../../define";

export const pendingQueueListContract = defineContract({
  id: "pending-queue-list",
  name: "PendingQueueList",
  layer: "business",
  category: "connectivity",
  priority: "P2",
  description: "Actions waiting to be sent"
});
