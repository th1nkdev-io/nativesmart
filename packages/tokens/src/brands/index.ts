import { cvActionTheme } from "./cv-action";
import { nativesmartTheme } from "./nativesmart";
import { thinkdevTheme } from "./thinkdev";

export { cvActionTheme, nativesmartTheme, thinkdevTheme };
export * from "./types";

/** Brand themes, the default one first. */
export const brandThemes = {
  nativesmart: nativesmartTheme,
  thinkdev: thinkdevTheme,
  "cv-action": cvActionTheme
} as const;

export type BrandThemeId = keyof typeof brandThemes;

/** Brand theme used when none is chosen: the NativeSmart identity. */
export const defaultBrandThemeId: BrandThemeId = "nativesmart";
