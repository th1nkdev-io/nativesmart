import { describe, expect, it } from "vitest";
import { brandThemes, defaultBrandThemeId } from "./brands";
import { cssColorVariable, toCss, toScopedCss } from "./css";
import { primitives, palette } from "./primitives";
import { mix } from "./semantic/color-math";
import { contrastRatio } from "./semantic/contrast";
import { avatarColorIndex } from "./semantic/derive";
import { colorIntents, intentRole, intentVariants, semanticColorRoles } from "./semantic/roles";
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

describe("color system", () => {
  it("gives every intent the same nine roles in every theme", () => {
    for (const theme of Object.values(brandThemes)) {
      for (const mode of ["light", "dark"] as const) {
        for (const intent of colorIntents) {
          for (const variant of intentVariants) {
            expect(theme.colors[mode][intentRole(intent, variant)]).toMatch(/^#[0-9a-f]{6}$/);
          }
        }
      }
    }
    expect(intentRole("danger", "onMuted")).toBe("onDangerMuted");
  });

  it("keeps the roles a brand writes and derives the others", () => {
    const theme = brandThemes["cv-action"];
    expect(theme.colors.light.primaryHover).toBe("#6930c3");
    expect(theme.colors.light.textLink).toBe(theme.colors.light.primaryText);
    expect(theme.colors.light.borderFocus).toBe(theme.colors.light.focusRing);
  });

  it("derives the lightest input border that keeps 3:1", () => {
    const { borderInput, surface, borderStrong } = brandThemes.nativesmart.colors.light;
    expect(contrastRatio(borderInput, surface)).toBeGreaterThanOrEqual(3);
    expect(contrastRatio(borderInput, surface)).toBeLessThan(3.3);
    expect(contrastRatio(borderStrong, surface)).toBeLessThan(3);
  });

  it("mixes colors in sRGB", () => {
    expect(mix("#000000", "#ffffff", 0.5)).toBe("#808080");
    expect(mix("#123456", "#abcdef", 0)).toBe("#123456");
  });

  it("gives a name the same avatar color every time", () => {
    expect(avatarColorIndex("Biya Paul")).toBe(avatarColorIndex(" biya paul "));
    expect(avatarColorIndex("Ada")).toBeLessThan(8);
  });

  it("writes chart, avatar, alpha, state layer and gradient variables", () => {
    const css = toCss(brandThemes.nativesmart);
    expect(css).toContain("--ns-data-cat-10:");
    expect(css).toContain("--ns-data-seq-9:");
    expect(css).toContain("--ns-avatar-8-fg:");
    expect(css).toContain("--ns-alpha-black-12: rgba(0, 0, 0, 0.92);");
    expect(css).toContain("--ns-state-hover: color-mix(in srgb, currentColor 8%, transparent);");
    expect(css).toContain(
      "--ns-gradient-brand: linear-gradient(135deg, var(--ns-color-primary), var(--ns-color-secondary));"
    );
    expect(semanticColorRoles.length).toBeGreaterThan(100);
  });
});
