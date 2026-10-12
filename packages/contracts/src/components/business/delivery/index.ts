import type { ComponentContract } from "../../../types";
import { deliveryTrackingCardContract } from "./delivery-tracking-card";
import { courierStatusCardContract } from "./courier-status-card";
import { locationPickerContract } from "./location-picker";
import { proofOfDeliveryStateContract } from "./proof-of-delivery-state";

export const deliveryContracts: readonly ComponentContract[] = [
  deliveryTrackingCardContract,
  courierStatusCardContract,
  locationPickerContract,
  proofOfDeliveryStateContract
];
