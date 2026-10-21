import { palette } from "../primitives";
import { defineBrandTheme } from "./types";

/**
 * NativeSmart identity, taken from the official logo (docs/brand.md): a blue scale built around
 * the brand blue `#087fe8` and a turquoise scale from the logo gradient.
 */
const blue = {
  50: "#eef7ff",
  100: "#d9edff",
  200: "#b6dcff",
  300: "#84c4ff",
  400: "#4aa6fb",
  500: "#1f8ff2",
  600: "#087fe8",
  700: "#0a66cc",
  800: "#0c52a3",
  900: "#0f4380",
  950: "#0b2a52"
} as const;

const turquoise = {
  50: "#effefb",
  100: "#c8fff4",
  200: "#91feea",
  300: "#52f5dd",
  400: "#1fe0c9",
  500: "#06c4b0",
  600: "#019e90",
  700: "#067e74",
  800: "#0a645d",
  900: "#0d524d",
  950: "#003230"
} as const;

const { slate, emerald, amber, red } = palette;

export const nativesmartTheme = defineBrandTheme({
  id: "nativesmart",
  name: "NativeSmart",
  description: "NativeSmart identity: brand blue primary, turquoise secondary, slate neutrals.",
  palette: {
    primary: blue,
    secondary: turquoise,
    neutral: slate
  },
  colors: {
    light: {
      background: slate[50],
      surface: "#ffffff",
      surfaceMuted: slate[100],
      surfaceRaised: "#ffffff",
      border: slate[200],
      borderStrong: slate[300],
      text: slate[900],
      textMuted: slate[600],
      textDisabled: slate[400],
      primary: blue[700],
      primaryHover: blue[800],
      primaryPressed: blue[900],
      onPrimary: "#ffffff",
      primaryMuted: blue[50],
      onPrimaryMuted: blue[800],
      secondary: turquoise[700],
      secondaryHover: turquoise[800],
      onSecondary: "#ffffff",
      secondaryMuted: turquoise[50],
      onSecondaryMuted: turquoise[800],
      accent: turquoise[700],
      success: emerald[700],
      onSuccess: "#ffffff",
      successMuted: emerald[50],
      onSuccessMuted: emerald[800],
      warning: amber[600],
      onWarning: slate[950],
      warningMuted: amber[50],
      onWarningMuted: amber[800],
      danger: red[600],
      dangerHover: red[700],
      onDanger: "#ffffff",
      dangerMuted: red[50],
      onDangerMuted: red[700],
      info: blue[700],
      onInfo: "#ffffff",
      infoMuted: blue[50],
      onInfoMuted: blue[800],
      offline: amber[500],
      focusRing: blue[600],
      overlay: slate[950]
    },
    dark: {
      background: slate[950],
      surface: slate[900],
      surfaceMuted: slate[800],
      surfaceRaised: slate[800],
      border: slate[700],
      borderStrong: slate[600],
      text: slate[50],
      textMuted: slate[300],
      textDisabled: slate[500],
      primary: blue[400],
      primaryHover: blue[300],
      primaryPressed: blue[500],
      onPrimary: slate[950],
      primaryMuted: blue[950],
      onPrimaryMuted: blue[200],
      secondary: turquoise[400],
      secondaryHover: turquoise[300],
      onSecondary: slate[950],
      secondaryMuted: turquoise[950],
      onSecondaryMuted: turquoise[200],
      accent: turquoise[400],
      success: emerald[500],
      onSuccess: slate[950],
      successMuted: emerald[950],
      onSuccessMuted: emerald[200],
      warning: amber[400],
      onWarning: slate[950],
      warningMuted: amber[950],
      onWarningMuted: amber[200],
      danger: red[400],
      dangerHover: red[300],
      onDanger: slate[950],
      dangerMuted: red[950],
      onDangerMuted: red[200],
      info: blue[400],
      onInfo: slate[950],
      infoMuted: blue[950],
      onInfoMuted: blue[200],
      offline: amber[400],
      focusRing: blue[400],
      overlay: "#000000"
    }
  },
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
    light: slate[900],
    dark: "#000000"
  }
});
