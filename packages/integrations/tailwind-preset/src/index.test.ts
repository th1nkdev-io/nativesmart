import { describe, expect, it } from "vitest";
import { semanticColorRoles } from "@nativesmart/tokens";
import { nativesmartPreset } from "./index";

describe("tailwind preset", () => {
  const { extend } = nativesmartPreset.theme;

  it("maps every semantic color role to its CSS variable", () => {
    expect(Object.keys(extend.colors.ns)).toHaveLength(semanticColorRoles.length);
    expect(extend.colors.ns["on-primary-muted"]).toBe("var(--ns-color-on-primary-muted)");
  });

  it("namespaces scales to avoid clashing with an app's own theme", () => {
    expect(extend.borderRadius["ns-md"]).toBe("var(--ns-radius-md)");
    expect(extend.fontFamily["ns-heading"]).toBe("var(--ns-font-heading)");
  });
});
