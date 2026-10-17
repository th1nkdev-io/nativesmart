import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { validateArchitecture, componentContracts } from "@nativesmart/contracts";
import { designSystems } from "@nativesmart/design-systems";
import { getRendererManifest, getRenderersWrapping, rendererManifests } from "./renderers";
import {
  getIntegrationManifest,
  getIntegrationsForRenderer,
  integrationManifests
} from "./integrations";
import { validateNativesmartArchitecture } from "./index";

describe("platform registry", () => {
  it("models every strategic platform family", () => {
    expect(rendererManifests.some((item) => item.categories.includes("mobile"))).toBe(true);
    expect(rendererManifests.some((item) => item.categories.includes("web"))).toBe(true);
    expect(rendererManifests.some((item) => item.categories.includes("desktop"))).toBe(true);
  });

  it("covers the targeted web and mobile technologies", () => {
    const ids = rendererManifests.map((item) => item.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        "react-web",
        "vue",
        "svelte",
        "angular",
        "html-css",
        "react-native",
        "react-native-nativewind",
        "flutter",
        "compose",
        "swiftui",
        "ionic-capacitor",
        "maui"
      ])
    );
  });

  it("distinguishes implemented and planned renderers", () => {
    expect(getRendererManifest("react-native")?.status).toBe("preview");
    expect(getRendererManifest("react-web")?.status).toBe("planned");
    expect(getRendererManifest("vue")?.status).toBe("preview");
  });

  it("separates React Native styling engines", () => {
    expect(getRendererManifest("react-native")?.styling).toBe("StyleSheet");
    expect(getRendererManifest("react-native-nativewind")?.styling).toBe("NativeWind");
  });

  it("builds framework wrappers on the Web Components renderer", () => {
    const wrappers = getRenderersWrapping("html-css").map((item) => item.id);
    expect(wrappers).toEqual(expect.arrayContaining(["svelte", "angular", "ionic-capacitor"]));
    expect(getRendererManifest("react-web")?.wraps).toBeUndefined();
    expect(getRendererManifest("vue")?.wraps).toBeUndefined();
  });

  it("shares the Tailwind preset between NativeWind and the web", () => {
    expect(getIntegrationManifest("tailwind-preset")?.targets).toEqual(
      expect.arrayContaining(["react-native-nativewind", "react-web"])
    );
    expect(getIntegrationsForRenderer("swiftui").map((item) => item.id)).toContain("kmp-core");
  });

  it("maps every manifest to an existing repository directory", () => {
    const repoRoot = resolve(__dirname, "../../..");
    const paths = [
      ...rendererManifests.flatMap((item) => [item.packagePath, item.playgroundPath]),
      ...integrationManifests.map((item) => item.packagePath)
    ];
    expect(paths.filter((path) => !existsSync(resolve(repoRoot, path)))).toEqual([]);
  });

  it("is conformant with contracts and design-system definitions", () => {
    expect(validateNativesmartArchitecture()).toEqual([]);
  });

  it("rejects unknown wraps, integration targets and incompatible design systems", () => {
    const errors = validateArchitecture({
      contracts: componentContracts,
      designSystems,
      renderers: [
        ...rendererManifests,
        {
          ...rendererManifests[0]!,
          id: "broken",
          supportedDesignSystems: ["bootstrap"],
          wraps: "missing"
        }
      ],
      integrations: [
        ...integrationManifests,
        { ...integrationManifests[0]!, id: "x", targets: ["nope"] }
      ]
    });
    expect(errors).toEqual(
      expect.arrayContaining([
        "broken supports bootstrap, which targets none of its categories",
        "broken wraps unknown renderer: missing",
        "x targets unknown renderer: nope"
      ])
    );
  });
});
