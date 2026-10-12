import { defineContract } from "../../../define";

export const kycDocumentUploadContract = defineContract({
  id: "kyc-document-upload",
  name: "KYCDocumentUpload",
  layer: "business",
  category: "identity",
  priority: "P1",
  description: "Identity document capture and upload with status"
});
