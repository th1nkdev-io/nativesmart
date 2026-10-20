import { brandThemes, toCss, type BrandThemeId } from "@nativesmart/tokens";
import type { ShowcaseColorMode, ShowcaseDensity, ShowcaseDirection } from "./protocol";

const styleId = "ns-showcase-theme";

export function isBrandThemeId(value: string): value is BrandThemeId {
  return value in brandThemes;
}

/** Applies a direction and density to one element, for example a preview area. */
export function applyLayout(
  element: HTMLElement,
  options: { dir: ShowcaseDirection; density?: ShowcaseDensity }
) {
  element.dir = options.dir;
  if (options.density && options.density !== "comfortable") {
    element.dataset.nsDensity = options.density;
  } else {
    delete element.dataset.nsDensity;
  }
}

/**
 * Applies a brand theme, color mode, direction and density to a document. The theme stylesheet is
 * generated from the tokens at runtime, so every brand theme is available without extra files.
 */
export function applyTheme(
  doc: Document,
  options: {
    brand: string;
    mode: ShowcaseColorMode;
    dir: ShowcaseDirection;
    density?: ShowcaseDensity;
  }
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
  applyLayout(doc.documentElement, options);
  doc.documentElement.dataset.nsBrand = theme.id;
}
