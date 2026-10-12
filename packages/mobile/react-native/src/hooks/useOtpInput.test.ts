import { describe, expect, it } from "vitest";
import { updateOtpAtIndex } from "./useOtpInput";

describe("updateOtpAtIndex", () => {
  it("updates a digit by index", () => {
    expect(updateOtpAtIndex("123", 3, "4", 6)).toBe("1234");
  });

  it("ignores non numeric input", () => {
    expect(updateOtpAtIndex("123", 1, "x", 6)).toBe("13");
  });

  it("keeps the requested length", () => {
    expect(updateOtpAtIndex("123456", 5, "9", 6)).toBe("123459");
    expect(updateOtpAtIndex("123456", 6, "9", 6)).toBe("123456");
  });
});
