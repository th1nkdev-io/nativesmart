import { describe, expect, it } from "vitest";
import { updateOtpAtIndex } from "./useOtpInput";

describe("updateOtpAtIndex", () => {
  it("updates a digit by index", () => {
    expect(updateOtpAtIndex("123", 3, "4", 6)).toBe("1234");
  });

  it("ignores non numeric input", () => {
    expect(updateOtpAtIndex("123", 1, "x", 6)).toBe("13");
  });
});
