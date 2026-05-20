import { describe, expect, it } from "vitest";
import { validateAmount, validateOtp, validatePhoneNumber } from "./validation";

describe("validation", () => {
  it("validates phone numbers", () => {
    expect(validatePhoneNumber("+2348012345678").valid).toBe(true);
    expect(validatePhoneNumber("123").valid).toBe(false);
  });

  it("validates amounts", () => {
    expect(validateAmount("100").valid).toBe(true);
    expect(validateAmount("0", 100).valid).toBe(false);
  });

  it("validates OTP values", () => {
    expect(validateOtp("123456").valid).toBe(true);
    expect(validateOtp("12345").valid).toBe(false);
  });
});
