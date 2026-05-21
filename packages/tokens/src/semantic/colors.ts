import { primitives } from "../primitives";

export const semanticColors = {
  light: {
    background: primitives.colors.neutral[50],
    surface: primitives.colors.neutral[0],
    surfaceMuted: primitives.colors.neutral[100],
    border: primitives.colors.neutral[200],
    text: primitives.colors.neutral[900],
    textMuted: primitives.colors.neutral[600],
    primary: primitives.colors.green[600],
    onPrimary: primitives.colors.neutral[0],
    primaryMuted: primitives.colors.green[50],
    accent: primitives.colors.blue[600],
    success: primitives.colors.green[600],
    warning: primitives.colors.amber[600],
    danger: primitives.colors.red[600],
    offline: primitives.colors.amber[500]
  },
  dark: {
    background: primitives.colors.neutral[950],
    surface: primitives.colors.neutral[900],
    surfaceMuted: primitives.colors.neutral[800],
    border: primitives.colors.neutral[700],
    text: primitives.colors.neutral[50],
    textMuted: primitives.colors.neutral[300],
    primary: primitives.colors.green[500],
    onPrimary: primitives.colors.neutral[950],
    primaryMuted: primitives.colors.green[700],
    accent: primitives.colors.blue[500],
    success: primitives.colors.green[500],
    warning: primitives.colors.amber[500],
    danger: primitives.colors.red[500],
    offline: primitives.colors.amber[500]
  }
} as const;
