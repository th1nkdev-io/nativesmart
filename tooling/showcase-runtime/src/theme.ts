import { brandThemes, toCss, type BrandThemeId } from "@nativesmart/tokens";
import type { ShowcaseColorMode, ShowcaseDirection } from "./protocol";

const styleId = "ns-showcase-theme";

export function isBrandThemeId(value: string): value is BrandThemeId {
  return value in brandThemes;
}

/**
 * Applies a brand theme, color mode and direction to a document. The theme stylesheet is
 * generated from the tokens at runtime, so every brand theme is available without extra files.
 */
export function applyTheme(
  doc: Document,
  options: { brand: string; mode: ShowcaseColorMode; dir: ShowcaseDirection }
) {
  const theme = brandThemes[isBrandThemeId(options.brand) ? options.brand : "thinkdev"];
  let style = doc.getElementById(styleId) as HTMLStyleElement | null;
  if (!style) {
    style = doc.createElement("style");
    style.id = styleId;
    doc.head.prepend(style);
  }
  if (style.dataset.brand !== theme.id) {
    style.textContent = toCss(theme);
    style.dataset.brand = theme.id;
  }
  doc.documentElement.classList.toggle("dark", options.mode === "dark");
  doc.documentElement.style.colorScheme = options.mode;
  doc.documentElement.dir = options.dir;
  doc.documentElement.dataset.nsBrand = theme.id;
}
