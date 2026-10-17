import { describe, expect, it } from "vitest";
import { brandThemes } from "./brands";
import { cssColorVariable, toCss } from "./css";
import { semanticColorRoles } from "./semantic/roles";
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

  it("keeps the default themes identical to the Thinkdev brand theme", () => {
    expect(brandThemes.thinkdev.colors.light).toEqual(themes.light.colors);
    expect(brandThemes.thinkdev.colors.dark).toEqual(themes.dark.colors);
  });

  it("carries the CV Action identity", () => {
    expect(brandThemes["cv-action"].colors.light.primary).toBe("#4b14a3");
    expect(brandThemes["cv-action"].colors.light.secondary).toBe("#ff764d");
    expect(brandThemes["cv-action"].colors.dark.background).toBe("#041422");
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

  it("scopes dark mode under the dark class", () => {
    expect(css).toMatch(
      /\.dark,\n\[data-ns-theme="dark"\] \{\n {2}--ns-color-background: #041422;/
    );
  });
});
