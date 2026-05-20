import { describe, expect, it } from "vitest";
import { getCountryProfile } from "./countries";

describe("countries", () => {
  it("returns market defaults for supported countries", () => {
    expect(getCountryProfile("NG")?.currency).toBe("NGN");
    expect(getCountryProfile("SN")?.dialCode).toBe("+221");
  });

  it("returns null for unknown countries", () => {
    expect(getCountryProfile("XX")).toBeNull();
  });
});
