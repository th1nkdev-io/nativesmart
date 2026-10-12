import { defineContract } from "../../../define";

export const signaturePadContract = defineContract({
  id: "signature-pad",
  name: "SignaturePad",
  layer: "foundation",
  category: "media",
  priority: "P2",
  description: "Captures a handwritten signature"
});
