import { defineContract } from "../../../define";

export const qrCodeContract = defineContract({
  id: "qr-code",
  name: "QRCode",
  layer: "foundation",
  category: "data-display",
  priority: "P1",
  description: "Renders a QR code (payment requests, tickets)"
});
