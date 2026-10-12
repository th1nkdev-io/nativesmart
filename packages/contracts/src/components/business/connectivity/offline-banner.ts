import { defineContract } from "../../../define";

export const offlineBannerContract = defineContract({
  id: "offline-banner",
  name: "OfflineBanner",
  layer: "business",
  category: "connectivity",
  priority: "P1",
  description: "Signals lost connectivity"
});
