import { parseAmount } from "./money";

export type ValidationResult = {
  valid: boolean;
  message?: string;
};

export function validatePhoneNumber(value: string): ValidationResult {
  const normalized = value.replace(/[\s-]/g, "");
  const valid = /^\+?[1-9]\d{7,14}$/.test(normalized);
  return valid ? { valid } : { valid: false, message: "Phone number is invalid." };
}

export function validateAmount(value: string, minimumMinor = 1): ValidationResult {
  const amountMinor = parseAmount(value);
  if (amountMinor === null) return { valid: false, message: "Amount is invalid." };
  if (amountMinor < minimumMinor) return { valid: false, message: "Amount is too low." };
  return { valid: true };
}

export function validateOtp(value: string, length = 6): ValidationResult {
  const valid = new RegExp(`^\\d{${length}}$`).test(value);
  return valid ? { valid } : { valid: false, message: "OTP is invalid." };
}
