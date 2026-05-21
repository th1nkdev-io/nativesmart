import { describe, expect, it } from "vitest";
import { formatMoney, parseAmount } from "./money";

describe("money", () => {
  it("parses decimal amounts to minor units", () => {
    expect(parseAmount("2500")).toBe(250000);
    expect(parseAmount("2,500.50")).toBe(250050);
  });

  it("rejects invalid amounts", () => {
    expect(parseAmount("12.999")).toBeNull();
    expect(parseAmount("abc")).toBeNull();
    expect(parseAmount("-12")).toBeNull();
    expect(parseAmount("12.")).toBeNull();
  });

  it("formats money for a locale", () => {
    expect(formatMoney({ amountMinor: 250000, currency: "NGN" }, "en-NG")).toContain("2,500");
  });
});
