import type { BrandPalette, ColorMode } from "./derive";
import { reachContrast } from "./color-math";
import { relativeLuminance } from "./contrast";
import { colorIntents, intentRole, type SemanticColors } from "./roles";

/** Ratios held by the high contrast themes: AAA for text, AA for borders and indicators. */
export const highContrastTargets = { text: 7, ui: 4.5 } as const;

/**
 * High contrast version of a brand theme: pure page backgrounds, text and fills pushed until text
 * reaches 7:1 (WCAG AAA) and borders 4.5:1. The brand hues stay recognizable.
 */
export function resolveHighContrast(
  colors: SemanticColors,
  palette: BrandPalette,
  mode: ColorMode
): SemanticColors {
  const light = mode === "light";
  const ink = light ? "#000000" : "#ffffff";
  const page = light ? "#ffffff" : "#000000";
  const surface = light ? "#ffffff" : palette.neutral[950];
  const muted = light ? palette.neutral[100] : palette.neutral[900];
  const result: Record<string, string> = { ...colors };
  const grounds = [page, surface, muted];
  const toward = (color: string, backgrounds: readonly string[], minimum: number) =>
    reachContrast(color, ink, backgrounds, minimum);

  Object.assign(result, {
    background: page,
    surface,
    surfaceRaised: surface,
    surfaceFloating: surface,
    surfaceMuted: muted,
    surfaceSunken: muted,
    surfaceHover: muted,
    surfaceDisabled: muted,
    text: light ? palette.neutral[950] : "#ffffff",
    overlay: "#000000"
  });
  for (const role of [
    "textMuted",
    "textSubtle",
    "textPlaceholder",
    "textLink",
    "textLinkHover",
    "textLinkVisited"
  ] as const) {
    result[role] = toward(colors[role], grounds, highContrastTargets.text);
  }
  for (const role of ["border", "borderSubtle", "borderStrong", "borderInput"] as const) {
    result[role] = toward(colors[role], grounds, highContrastTargets.ui);
  }
  result.borderInputHover = toward(colors.borderInputHover, grounds, highContrastTargets.text);
  result.focusRing = toward(colors.focusRing, grounds, highContrastTargets.ui);
  result.borderFocus = result.focusRing;
  result.borderSelected = toward(colors.borderSelected, grounds, highContrastTargets.ui);

  // Other filled surfaces move away from the text drawn on them.
  const fills = [
    ["surfaceBrand", "textOnBrand"],
    ["selection", "onSelection"],
    ["highlight", "onHighlight"],
    ["tooltip", "onTooltip"],
    ["surfaceInverse", "textInverse"]
  ] as const;
  for (const [fill, text] of fills) {
    const away = relativeLuminance(result[text]) > 0.4 ? "#000000" : "#ffffff";
    result[fill] = reachContrast(result[fill], away, [result[text]], highContrastTargets.text);
  }

  for (const intent of colorIntents) {
    const role = (variant: Parameters<typeof intentRole>[1]) => intentRole(intent, variant);
    // Fills move away from their text color until it reaches 7:1; the text keeps its color.
    const on = colors[role("on")];
    const away = relativeLuminance(on) > 0.4 ? "#000000" : "#ffffff";
    for (const variant of ["base", "hover", "pressed"] as const) {
      result[role(variant)] = reachContrast(
        colors[role(variant)],
        away,
        [on],
        highContrastTargets.text
      );
    }
    result[role("onMuted")] = toward(
      colors[role("onMuted")],
      [colors[role("muted")], colors[role("mutedHover")]],
      highContrastTargets.text
    );
    result[role("text")] = toward(colors[role("text")], grounds, highContrastTargets.text);
    result[role("border")] = toward(colors[role("border")], grounds, highContrastTargets.ui);
  }
  return result as SemanticColors;
}
