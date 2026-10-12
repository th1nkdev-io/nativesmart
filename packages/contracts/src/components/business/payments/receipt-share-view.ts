import { defineContract } from "../../../define";

export const receiptShareViewContract = defineContract({
  id: "receipt-share-view",
  name: "ReceiptShareView",
  layer: "business",
  category: "payments",
  priority: "P2",
  description: "Share receipt as image, PDF or message"
});
