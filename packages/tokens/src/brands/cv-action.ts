import { defineBrandTheme } from "./types";

/** CV Action brand values, taken from cv-action__web-v1 (app/assets/css/main.css). */
const brand = {
  violet: "#4b14a3",
  violetLight: "#6930c3",
  violetDeep: "#391085",
  night: "#041422",
  coral: "#ff764d",
  ink: "#454249"
} as const;

const gray = {
  50: "#f9fafb",
  100: "#f3f4f6",
  200: "#e5e7eb",
  300: "#d1d5db",
  400: "#9ca3af",
  500: "#6b7280"
} as const;

export const cvActionTheme = defineBrandTheme({
  id: "cv-action",
  name: "CV Action",
  description: "CV Action identity: deep violet primary, coral secondary, night-blue dark mode.",
  colors: {
    light: {
      background: gray[50],
      surface: "#ffffff",
      surfaceMuted: gray[100],
      border: gray[200],
      borderStrong: gray[300],
      text: brand.ink,
      textMuted: gray[500],
      textDisabled: gray[400],
      primary: brand.violet,
      primaryHover: brand.violetLight,
      primaryPressed: brand.violetDeep,
      onPrimary: "#ffffff",
      primaryMuted: "#ede8f6",
      onPrimaryMuted: brand.violet,
      secondary: brand.coral,
      secondaryHover: "#fa541c",
      onSecondary: "#ffffff",
      secondaryMuted: "#fff2e8",
      accent: "#096dd9",
      success: "#389e0d",
      onSuccess: "#ffffff",
      successMuted: "#f6ffed",
      warning: "#d48806",
      onWarning: brand.night,
      warningMuted: "#fffbe6",
      danger: "#cf1322",
      dangerHover: "#a8071a",
      onDanger: "#ffffff",
      dangerMuted: "#fff1f0",
      info: "#096dd9",
      onInfo: "#ffffff",
      infoMuted: "#e6f7ff",
      offline: "#faad14",
      focusRing: brand.violetLight,
      overlay: brand.night
    },
    dark: {
      background: brand.night,
      surface: "#0b2033",
      surfaceMuted: "#132c43",
      border: "#1e3a56",
      borderStrong: "#2c4c6b",
      text: "#f5f5f5",
      textMuted: "#bfbfbf",
      textDisabled: gray[500],
      primary: "#a78bfa",
      primaryHover: "#c4b5fd",
      primaryPressed: "#8b5cf6",
      onPrimary: brand.night,
      primaryMuted: "#1d2642",
      onPrimaryMuted: "#c4b5fd",
      secondary: "#ff9c6e",
      secondaryHover: "#ffbb96",
      onSecondary: brand.night,
      secondaryMuted: "#2a282d",
      accent: "#40a9ff",
      success: "#73d13d",
      onSuccess: brand.night,
      successMuted: "#092b00",
      warning: "#ffc53d",
      onWarning: brand.night,
      warningMuted: "#613400",
      danger: "#ff4d4f",
      dangerHover: "#ff7875",
      onDanger: brand.night,
      dangerMuted: "#5c0011",
      info: "#40a9ff",
      onInfo: brand.night,
      infoMuted: "#002766",
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
  }
});
