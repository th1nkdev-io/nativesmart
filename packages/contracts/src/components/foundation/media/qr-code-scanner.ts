import { defineContract } from "../../../define";

export const qrCodeScannerContract = defineContract({
  id: "qr-code-scanner",
  name: "QRCodeScanner",
  layer: "foundation",
  category: "media",
  priority: "P1",
  description: "Scans QR and barcodes with permission handling",
  platforms: ["mobile"]
});
