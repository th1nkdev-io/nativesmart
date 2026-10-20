import { describe, expect, it } from "vitest";
import { brandThemes, defaultBrandThemeId } from "./brands";
import { cssColorVariable, toCss, toScopedCss } from "./css";
import { primitives, palette } from "./primitives";
import { contrastRatio } from "./semantic/contrast";
import { semanticColorRoles } from "./semantic/roles";
import { textStyles } from "./semantic/text-styles";
import { themes } from "./themes";
import { checkContrast, validateTokens } from "./validate";

describe("tokens", () => {
  it("validates the current token set", () => {
    expect(() => validateTokens()).not.toThrow();
  });

  it("keeps the mobile renderer contract", () => {
    expect(themes.light.colors.background).toBeDefined();
    expect(themes.dark.colors.background).toBeDefined();
    expect(primitives.colors.neutral[0]).toBe("#ffffff");
    expect(primitives.breakpoints.tablet).toBe(768);
  });

  it("keeps the default themes identical to the Thinkdev brand theme", () => {
    expect(brandThemes.thinkdev.colors.light).toEqual(themes.light.colors);
    expect(brandThemes.thinkdev.colors.dark).toEqual(themes.dark.colors);
    expect(themes.light.colors.primary).toBe(palette.emerald[700]);
  });

  it("defaults to the NativeSmart identity built from the logo", () => {
    expect(defaultBrandThemeId).toBe("nativesmart");
    expect(Object.keys(brandThemes)[0]).toBe("nativesmart");
    expect(brandThemes.nativesmart.palette.primary[600]).toBe("#087fe8");
  });

  it("carries the CV Action identity", () => {
    const theme = brandThemes["cv-action"];
    expect(theme.colors.light.primary).toBe("#4b14a3");
    expect(theme.colors.light.secondary).toBe("#ff764d");
    expect(theme.colors.dark.background).toBe("#041422");
    expect(theme.palette.primary[700]).toBe("#4b14a3");
  });
});

describe("contrast", () => {
  it("computes WCAG ratios", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 0);
    expect(contrastRatio("#ffffff", "#ffffff")).toBe(1);
  });

  it("only lets documented exceptions fall below their minimum", () => {
    for (const theme of Object.values(brandThemes)) {
      const failures = checkContrast(theme).filter((result) => result.ratio < result.minimum);
      for (const failure of failures) expect(failure.exception).toBeTruthy();
    }
  });
});

describe("css output", () => {
  const css = toCss(brandThemes["cv-action"]);

  it("declares every semantic role", () => {
    for (const role of semanticColorRoles) {
      expect(css).toContain(`${cssColorVariable(role)}:`);
    }
  });

  it("uses kebab-case variable names and pixel units", () => {
    expect(cssColorVariable("onPrimaryMuted")).toBe("--ns-color-on-primary-muted");
    expect(css).toContain("--ns-space-4: 16px;");
    expect(css).toContain("--ns-radius-full: 9999px;");
    expect(css).toContain('--ns-font-heading: "TT Commons", Oswald, Poppins, sans-serif;');
  });

  it("exposes brand palettes, shapes and sizes", () => {
    expect(css).toContain("--ns-palette-primary-700: #4b14a3;");
    expect(css).toContain("--ns-radius-control: var(--ns-radius-sm);");
    expect(css).toContain("--ns-control-height-md: 40px;");
    expect(css).toContain("--ns-touch-target: 44px;");
  });

  it("generates a class and variables for every text style", () => {
    for (const name of Object.keys(textStyles)) {
      expect(css).toContain(`.ns-text-${name} {`);
      expect(css).toContain(`--ns-text-${name}-size:`);
    }
  });

  it("scopes dark mode, elevation and density", () => {
    expect(css).toMatch(
      /\.dark,\n\[data-ns-theme="dark"\] \{\n {2}--ns-color-background: #041422;/
    );
    expect(css).toContain("--ns-elevation-0: none;");
    expect(css).toMatch(/\[data-ns-density="compact"\] \{\n {2}--ns-control-height-xs: 22px;/);
  });

  it("scopes brand variables without redefining foundations", () => {
    const scoped = toScopedCss(brandThemes["cv-action"], ".preview");
    expect(scoped).toContain(".preview {");
    expect(scoped).toContain(".dark .preview,");
    expect(scoped).toContain("--ns-palette-primary-700: #4b14a3;");
    expect(scoped).not.toContain("--ns-space-4:");
  });
});
