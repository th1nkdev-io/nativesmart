import { semanticColors } from "../semantic/colors";
import { defineBrandTheme } from "./types";

export const thinkdevTheme = defineBrandTheme({
  id: "thinkdev",
  name: "Thinkdev",
  description: "Default Nativesmart theme, neutral and brandable.",
  colors: semanticColors,
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      heading: ["Inter", "system-ui", "sans-serif"],
      mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
    }
  }
});
