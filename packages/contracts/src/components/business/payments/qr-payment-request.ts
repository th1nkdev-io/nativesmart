import { defineContract } from "../../../define";

export const qrPaymentRequestContract = defineContract({
  id: "qr-payment-request",
  name: "QRPaymentRequest",
  layer: "business",
  category: "payments",
  priority: "P2",
  description: "Displays a QR code to receive money"
});
