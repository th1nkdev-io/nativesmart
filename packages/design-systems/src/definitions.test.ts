import { describe, expect, it } from "vitest";
import {
  createBrand,
  designSystems,
  getComponentRecipe,
  getDesignSystem,
  resolveDesignConfiguration
} from "./definitions";

describe("design systems", () => {
  it("covers the initial strategic families", () => {
    expect(designSystems.map((item) => item.id)).toEqual([
      "thinkdev",
      "material",
      "bootstrap",
      "cupertino"
    ]);
  });

  it("keeps Bootstrap web-oriented and Cupertino platform-oriented", () => {
    expect(getDesignSystem("bootstrap")?.supportedCategories).not.toContain("mobile");
    expect(getDesignSystem("cupertino")?.supportedCategories).not.toContain("web");
  });

  it("provides independently resolvable component recipes", () => {
    expect(getComponentRecipe("material", "button")?.variants.base["button.radius"]).toBe(
      "radius.full"
    );
  });

  it("composes design system, brand and product overrides deterministically", () => {
    const brand = createBrand({
      id: "acme-bank",
      name: "Acme Bank",
      tokenOverrides: { "color.action.primary": "#0047ab" }
    });
    const result = resolveDesignConfiguration({
      designSystem: "thinkdev",
      brand,
      mode: "dark",
      density: "compact",
      direction: "ltr",
      tokenOverrides: { "shape.radius.control": "radius.none" }
    });

    expect(result.metadata.brand).toBe("acme-bank");
    expect(result.tokens["color.action.primary"]).toBe("#0047ab");
    expect(result.tokens["shape.radius.control"]).toBe("radius.none");
  });
});
