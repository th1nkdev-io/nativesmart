import { describe, expect, it } from "vitest";
import { primitives } from "./tokens";
import { themes } from "./themes";
import { validateTokens } from "./validate";

describe("tokens", () => {
  it("validates the current token set", () => {
    expect(() => validateTokens()).not.toThrow();
  });

  it("contains required semantic themes", () => {
    expect(themes.light.colors.background).toBeDefined();
    expect(themes.dark.colors.background).toBeDefined();
    expect(themes.light.colors.primary).toBe(primitives.colors.green[600]);
    expect(themes.light.colors.onPrimary).toBe(primitives.colors.neutral[0]);
    expect(themes.dark.colors.onPrimary).toBe(primitives.colors.neutral[950]);
  });
});
