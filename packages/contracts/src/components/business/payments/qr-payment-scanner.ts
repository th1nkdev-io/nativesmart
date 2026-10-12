import { defineContract } from "../../../define";

export const qrPaymentScannerContract = defineContract({
  id: "qr-payment-scanner",
  name: "QRPaymentScanner",
  layer: "business",
  category: "payments",
  priority: "P2",
  description: "Scans a merchant or user QR to pay"
});
