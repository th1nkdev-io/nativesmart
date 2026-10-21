import { defineBrandTheme } from "./types";

/**
 * CV Action identity, taken from cv-action__web-v1 (app/assets/css/main.css): deep violet
 * `#4b14a3`, coral `#ff764d`, ink text `#454249` and a night-blue dark mode `#041422`.
 */
const violet = {
  50: "#f5f0fc",
  100: "#e9defa",
  200: "#d3bdf3",
  300: "#b48fe9",
  400: "#9160dc",
  500: "#6930c3",
  600: "#5a1fb4",
  700: "#4b14a3",
  800: "#391085",
  900: "#22075e",
  950: "#120338"
} as const;

const coral = {
  50: "#fff2e8",
  100: "#ffd8bf",
  200: "#ffbb96",
  300: "#ff9c6e",
  400: "#ff764d",
  500: "#fa541c",
  600: "#d4380d",
  700: "#ad2102",
  800: "#871400",
  900: "#610b00",
  950: "#3d0600"
} as const;

const night = {
  50: "#f3f6fa",
  100: "#e3eaf4",
  200: "#c2d1e5",
  300: "#97afd0",
  400: "#7189a6",
  500: "#4a6584",
  600: "#2c4c6b",
  700: "#1e3a56",
  800: "#132c43",
  900: "#0b2033",
  950: "#041422"
} as const;

const gray = {
  50: "#f9fafb",
  100: "#f3f4f6",
  200: "#e5e7eb",
  300: "#d1d5db",
  400: "#9ca3af",
  500: "#6b7280"
} as const;

const ink = "#454249";

export const cvActionTheme = defineBrandTheme({
  id: "cv-action",
  name: "CV Action",
  description: "CV Action identity: deep violet primary, coral secondary, night-blue dark mode.",
  palette: {
    primary: violet,
    secondary: coral,
    neutral: night
  },
  colors: {
    light: {
      background: gray[50],
      surface: "#ffffff",
      surfaceMuted: gray[100],
      surfaceRaised: "#ffffff",
      border: gray[200],
      borderStrong: gray[300],
      text: ink,
      textMuted: gray[500],
      textDisabled: gray[400],
      primary: violet[700],
      primaryHover: violet[500],
      primaryPressed: violet[800],
      onPrimary: "#ffffff",
      primaryMuted: violet[50],
      onPrimaryMuted: violet[700],
      secondary: coral[400],
      secondaryHover: coral[500],
      onSecondary: "#ffffff",
      secondaryMuted: coral[50],
      onSecondaryMuted: coral[700],
      accent: "#096dd9",
      success: "#237804",
      onSuccess: "#ffffff",
      successMuted: "#f6ffed",
      onSuccessMuted: "#135200",
      warning: "#d48806",
      onWarning: night[950],
      warningMuted: "#fffbe6",
      onWarningMuted: "#874d00",
      danger: "#cf1322",
      dangerHover: "#a8071a",
      onDanger: "#ffffff",
      dangerMuted: "#fff1f0",
      onDangerMuted: "#a8071a",
      info: "#096dd9",
      onInfo: "#ffffff",
      infoMuted: "#e6f7ff",
      onInfoMuted: "#0050b3",
      offline: "#faad14",
      focusRing: violet[500],
      overlay: night[950]
    },
    dark: {
      background: night[950],
      surface: night[900],
      surfaceMuted: night[800],
      surfaceRaised: night[800],
      border: night[700],
      borderStrong: night[600],
      text: "#f5f5f5",
      textMuted: night[300],
      textDisabled: night[500],
      primary: "#a78bfa",
      primaryHover: "#c4b5fd",
      primaryPressed: "#9165f7",
      onPrimary: night[950],
      primaryMuted: "#1d2642",
      onPrimaryMuted: "#c4b5fd",
      secondary: coral[300],
      secondaryHover: coral[200],
      onSecondary: night[950],
      secondaryMuted: coral[950],
      onSecondaryMuted: coral[200],
      accent: "#40a9ff",
      success: "#73d13d",
      onSuccess: night[950],
      successMuted: "#092b00",
      onSuccessMuted: "#b7eb8f",
      warning: "#ffc53d",
      onWarning: night[950],
      warningMuted: "#613400",
      onWarningMuted: "#ffe58f",
      danger: "#ff4d4f",
      dangerHover: "#ff7875",
      onDanger: night[950],
      dangerMuted: "#5c0011",
      onDangerMuted: "#ffa39e",
      info: "#40a9ff",
      onInfo: night[950],
      infoMuted: "#002766",
      onInfoMuted: "#91d5ff",
      offline: "#faad14",
      focusRing: "#c4b5fd",
      overlay: "#000000"
    }
  },
  typography: {
    fontFamily: {
      sans: ["Dosis", "Lato", "Open Sans", "system-ui", "sans-serif"],
      heading: ["TT Commons", "Oswald", "Poppins", "sans-serif"],
      mono: ["Inconsolata", "ui-monospace", "monospace"]
    }
  },
  shape: {
    control: "sm",
    card: "lg",
    overlay: "xl",
    badge: "full"
  },
  shadowTint: {
    light: night[950],
    dark: "#000000"
  },
  contrastExceptions: [
    {
      foreground: "onSecondary",
      background: "secondary",
      mode: "light",
      reason:
        "White on coral (2.6:1) is part of the CV Action identity; use it for large text and icons only."
    },
    {
      foreground: "onSecondary",
      background: "secondaryHover",
      mode: "light",
      reason: "Hovered coral button, same rule as its resting state: large text and icons only."
    },
    {
      foreground: "onSecondary",
      background: "secondaryPressed",
      mode: "light",
      reason: "Pressed coral button, same rule as its resting state: large text and icons only."
    }
  ]
});
