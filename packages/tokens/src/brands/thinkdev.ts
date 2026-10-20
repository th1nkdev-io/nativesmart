import { palette } from "../primitives";
import { semanticColors } from "../semantic/colors";
import { defineBrandTheme } from "./types";

export const thinkdevTheme = defineBrandTheme({
  id: "thinkdev",
  name: "Thinkdev",
  description: "Default Nativesmart theme: emerald primary, blue secondary, slate neutrals.",
  palette: {
    primary: palette.emerald,
    secondary: palette.blue,
    neutral: palette.slate
  },
  colors: semanticColors,
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      heading: ["Inter", "system-ui", "sans-serif"],
      mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
    }
  },
  shape: {
    control: "md",
    card: "lg",
    overlay: "xl",
    badge: "full"
  },
  shadowTint: {
    light: palette.slate[900],
    dark: "#000000"
  }
});
