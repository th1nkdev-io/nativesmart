import { describe, expect, it } from "vitest";
import { brandThemes, defaultBrandThemeId } from "./brands";
import { cssColorVariable, forcedColor, toCss, toScopedCss } from "./css";
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

describe("type, space, layout and shape", () => {
  const css = toCss(brandThemes.nativesmart);

  it("makes display and page titles fluid between 375px and 1440px", () => {
    expect(css).toContain("--ns-text-display-xl-size: clamp(48px, 31.10px + 4.507vw, 96px);");
    expect(css).toContain("--ns-text-h1-line-height: var(--ns-leading-snug);");
    expect(css).toContain("--ns-text-body-md-line-height: var(--ns-line-height-md);");
  });

  it("writes half spacing steps with a dash and spacing by intent", () => {
    expect(css).toContain("--ns-space-0-5: 2px;");
    expect(css).toContain("--ns-inset-md: var(--ns-space-3);");
    expect(css).toContain("--ns-section-xl: var(--ns-space-32);");
  });

  it("changes the grid at each breakpoint", () => {
    expect(css).toContain("--ns-grid-columns: 4;");
    expect(css).toMatch(
      /@media \(min-width: 1024px\) \{\n {2}:root \{\n {4}--ns-grid-columns: 12;/
    );
  });

  it("completes the fonts and shapes a brand does not set", () => {
    const theme = brandThemes["cv-action"];
    expect(theme.typography.fontFamily.display).toEqual(theme.typography.fontFamily.heading);
    expect(theme.typography.fontFamily.serif.at(-1)).toBe("serif");
    expect(theme.shape.input).toBe(theme.shape.control);
    expect(theme.shape.avatar).toBe("full");
    expect(css).toContain("--ns-radius-sheet: var(--ns-radius-xl);");
  });

  it("adds a class modifier for tabular, italic and underlined styles", () => {
    expect(css).toMatch(/\.ns-text-price \{[^}]*font-variant-numeric: tabular-nums;/);
    expect(css).toMatch(/\.ns-text-quote \{[^}]*font-style: italic;/);
    expect(css).toMatch(/\.ns-text-link \{[^}]*text-decoration-line: underline;/);
  });
});

describe("elevation, motion and preferences", () => {
  const css = toCss(brandThemes.nativesmart);

  it("samples springs into a CSS linear() easing that overshoots and settles", () => {
    const line = css.split("\n").find((entry) => entry.includes("--ns-spring-bouncy:")) ?? "";
    const values = line
      .slice(line.indexOf("(") + 1, line.lastIndexOf(")"))
      .split(", ")
      .map(Number);
    expect(values[0]).toBe(0);
    expect(values.at(-1)).toBe(1);
    expect(Math.max(...values)).toBeGreaterThan(1.1);
  });

  it("writes transitions from duration and easing variables", () => {
    expect(css).toContain(
      "--ns-transition-enter: var(--ns-duration-normal) var(--ns-easing-decelerate);"
    );
    expect(css).toContain("--ns-elevation-modal: var(--ns-elevation-5);");
    expect(css).toContain("--ns-shadow-inset-sm: inset 0 1px 2px 0 rgba(15, 23, 42, 0.06);");
  });

  it("lightens raised surfaces in dark mode only", () => {
    const dark = css.slice(css.indexOf('.dark,\n[data-ns-theme="dark"]'));
    expect(css).toContain("--ns-surface-level-5: #ffffff;");
    expect(dark).toContain("--ns-surface-level-0: #0f172a;");
    expect(dark).not.toContain("--ns-surface-level-5: #ffffff;");
  });

  it("follows system preferences and lets an element force them", () => {
    expect(css).toMatch(
      /@media \(prefers-reduced-motion: reduce\) \{\n {2}:root:not\(\[data-ns-motion="full"\]\) \{\n {4}--ns-duration-moderate: 120ms;/
    );
    expect(css).toContain('[data-ns-transparency="reduce"] {');
    expect(css).toContain('[data-ns-contrast="more"] {');
    expect(css).toContain("--ns-color-text-link-visited: VisitedText;");
  });

  it("maps every role to a system color in forced colors mode", () => {
    expect(forcedColor("primary")).toBe("Highlight");
    expect(forcedColor("onPrimary")).toBe("HighlightText");
    expect(forcedColor("onDangerMuted")).toBe("CanvasText");
    expect(forcedColor("dangerMuted")).toBe("Canvas");
    expect(forcedColor("surfaceDisabled")).toBe("GrayText");
    expect(forcedColor("borderInput")).toBe("CanvasText");
  });

  it("ships named animations", () => {
    expect(css).toContain("@keyframes ns-slide-up {");
    expect(css).toContain(
      ".ns-animate-fade-in {\n  animation: ns-fade-in var(--ns-transition-enter) both;"
    );
  });
});
