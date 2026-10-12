import { defineContract } from "../../../define";

export const selfieCaptureContract = defineContract({
  id: "selfie-capture",
  name: "SelfieCapture",
  layer: "business",
  category: "identity",
  priority: "P2",
  description: "Guided face capture for identity checks"
});
