import { describe, expect, it } from "vitest";
import { sanitizeAmountInput } from "./useAmountInput";

describe("sanitizeAmountInput", () => {
  it("keeps decimal amount characters", () => {
    expect(sanitizeAmountInput("NGN 2,500.50")).toBe("2500.50");
  });
});
