import { defineContract } from "../../../define";

export const documentScannerContract = defineContract({
  id: "document-scanner",
  name: "DocumentScanner",
  layer: "foundation",
  category: "media",
  priority: "P2",
  description: "Edge detection and crop for identity documents",
  platforms: ["mobile"]
});
