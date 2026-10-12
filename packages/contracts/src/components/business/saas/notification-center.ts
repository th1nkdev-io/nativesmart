import { defineContract } from "../../../define";

export const notificationCenterContract = defineContract({
  id: "notification-center",
  name: "NotificationCenter",
  layer: "business",
  category: "saas",
  priority: "P2",
  description: "Notification list with read state and actions"
});
