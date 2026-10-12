import { defineContract } from "../../../define";

export const pinInputContract = defineContract({
  id: "pin-input",
  name: "PinInput",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Segmented code entry; base of OTP and PIN entry"
});
