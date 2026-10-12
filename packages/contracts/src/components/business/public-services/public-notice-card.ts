import { defineContract } from "../../../define";

export const publicNoticeCardContract = defineContract({
  id: "public-notice-card",
  name: "PublicNoticeCard",
  layer: "business",
  category: "public-services",
  priority: "P2",
  description: "Official announcement"
});
