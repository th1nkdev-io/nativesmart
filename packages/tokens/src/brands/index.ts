import { cvActionTheme } from "./cv-action";
import { thinkdevTheme } from "./thinkdev";

export { cvActionTheme, thinkdevTheme };
export * from "./types";

export const brandThemes = {
  thinkdev: thinkdevTheme,
  "cv-action": cvActionTheme
} as const;

export type BrandThemeId = keyof typeof brandThemes;
