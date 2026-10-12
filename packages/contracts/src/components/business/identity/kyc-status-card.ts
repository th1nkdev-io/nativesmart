import { defineContract } from "../../../define";

export const kycStatusCardContract = defineContract({
  id: "kyc-status-card",
  name: "KYCStatusCard",
  layer: "business",
  category: "identity",
  priority: "P1",
  description: "Verification level, pending steps and next action"
});
