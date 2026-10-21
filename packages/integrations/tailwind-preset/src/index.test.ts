import { describe, expect, it } from "vitest";
import { semanticColorRoles } from "@nativesmart/tokens";
import { nativesmartPreset } from "./index";

describe("tailwind preset", () => {
  const { extend } = nativesmartPreset.theme;

  it("maps every semantic color role to its CSS variable", () => {
    expect(extend.colors.ns["on-primary-muted"]).toBe("var(--ns-color-on-primary-muted)");
    for (const role of semanticColorRoles) {
      const key = role.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
      expect(extend.colors.ns).toHaveProperty([key]);
    }
  });

  it("exposes brand palettes next to the roles", () => {
    expect(extend.colors.ns.primary.DEFAULT).toBe("var(--ns-color-primary)");
    expect(extend.colors.ns.primary[500]).toBe("var(--ns-palette-primary-500)");
    expect(extend.colors.ns.neutral[950]).toBe("var(--ns-palette-neutral-950)");
  });

  it("namespaces scales to avoid clashing with an app's own theme", () => {
    expect(extend.borderRadius["ns-md"]).toBe("var(--ns-radius-md)");
    expect(extend.borderRadius["ns-card"]).toBe("var(--ns-radius-card)");
    expect(extend.fontFamily["ns-heading"]).toBe("var(--ns-font-heading)");
    expect(extend.fontSize["ns-h1"][0]).toBe("var(--ns-text-h1-size)");
    expect(extend.boxShadow["ns-elevation-3"]).toBe("var(--ns-elevation-3)");
    expect(extend.height["ns-md"]).toBe("var(--ns-control-height-md)");
    expect(extend.backgroundImage["ns-brand-soft"]).toBe("var(--ns-gradient-brand-soft)");
    expect(extend.colors.ns["data-cat-10"]).toBe("var(--ns-data-cat-10)");
    expect(extend.colors.ns["state-hover"]).toBe("var(--ns-state-hover)");
    expect(extend.spacing["ns-0-5"]).toBe("var(--ns-space-0-5)");
    expect(extend.spacing["ns-inset-md"]).toBe("var(--ns-inset-md)");
    expect(extend.maxWidth["ns-normal"]).toBe("var(--ns-measure-normal)");
    expect(extend.aspectRatio["ns-video"]).toBe("var(--ns-aspect-video)");
    expect(extend.borderRadius["ns-sheet"]).toBe("var(--ns-radius-sheet)");
    expect(extend.fontFamily["ns-serif"]).toBe("var(--ns-font-serif)");
    expect(extend.boxShadow["ns-elevation-modal"]).toBe("var(--ns-elevation-modal)");
    expect(extend.backdropBlur["ns-md"]).toBe("var(--ns-blur-md)");
    expect(extend.transitionTimingFunction["ns-spring-bouncy"]).toBe("var(--ns-spring-bouncy)");
    expect(extend.animation["ns-fade-in"]).toBe("ns-fade-in var(--ns-transition-enter) both");
  });
});
