import { describe, expect, it } from "vitest";
import { sanitizeAmountInput } from "./useAmountInput";

describe("sanitizeAmountInput", () => {
  it("keeps decimal amount characters", () => {
    expect(sanitizeAmountInput("NGN 2,500.50")).toBe("2500.50");
    expect(sanitizeAmountInput("12a3..45")).toBe("123..45");
  });
});
