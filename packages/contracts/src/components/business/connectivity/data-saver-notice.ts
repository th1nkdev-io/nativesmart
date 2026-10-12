import { defineContract } from "../../../define";

export const dataSaverNoticeContract = defineContract({
  id: "data-saver-notice",
  name: "DataSaverNotice",
  layer: "business",
  category: "connectivity",
  priority: "P2",
  description: "Low-data mode indicator and controls"
});
