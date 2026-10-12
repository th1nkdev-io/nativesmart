import { defineContract } from "../../../define";

export const otpInputContract = defineContract({
  id: "otp-input",
  name: "OTPInput",
  layer: "business",
  category: "identity",
  priority: "P1",
  description: "One-time code entry with resend timer and autofill"
});
