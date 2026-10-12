import { defineContract } from "../../../define";

export const proofOfDeliveryStateContract = defineContract({
  id: "proof-of-delivery-state",
  name: "ProofOfDeliveryState",
  layer: "business",
  category: "delivery",
  priority: "P2",
  description: "Photo, signature or code confirmation"
});
