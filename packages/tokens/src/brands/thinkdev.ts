import { palette } from "../primitives";
import { thinkdevColors } from "../semantic/colors";
import { defineBrandTheme } from "./types";

export const thinkdevTheme = defineBrandTheme({
  id: "thinkdev",
  name: "Thinkdev",
  description: "Thinkdev company theme: emerald primary, blue secondary, slate neutrals.",
  palette: {
    primary: palette.emerald,
    secondary: palette.blue,
    neutral: palette.slate
  },
  colors: thinkdevColors,
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      heading: ["Inter", "system-ui", "sans-serif"],
      mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
    }
  },
  personality: {
    shape: "soft",
    motion: "standard",
    headings: "balanced",
    density: "comfortable"
  },
  shadowTint: {
    light: palette.slate[900],
    dark: "#000000"
  }
});
