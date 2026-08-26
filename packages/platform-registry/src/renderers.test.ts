import { describe, expect, it } from "vitest";
import { getRendererManifest, rendererManifests } from "./renderers";
import { validateNativesmartArchitecture } from "./index";

describe("platform registry", () => {
  it("models every strategic platform family", () => {
    expect(rendererManifests.some((item) => item.categories.includes("mobile"))).toBe(true);
    expect(rendererManifests.some((item) => item.categories.includes("web"))).toBe(true);
    expect(rendererManifests.some((item) => item.categories.includes("desktop"))).toBe(true);
  });

  it("distinguishes implemented and planned renderers", () => {
    expect(getRendererManifest("react-native")?.status).toBe("preview");
    expect(getRendererManifest("react-web")?.status).toBe("planned");
  });

  it("is conformant with contracts and design-system definitions", () => {
    expect(validateNativesmartArchitecture()).toEqual([]);
  });
});
