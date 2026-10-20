import type { SemanticColorRole } from "./roles";

function channel(value: number) {
  const srgb = value / 255;
  return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
}

/** WCAG relative luminance of a 6-digit hex color. */
export function relativeLuminance(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  const r = channel((value >> 16) & 255);
  const g = channel((value >> 8) & 255);
  const b = channel(value & 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two hex colors, from 1 to 21. */
export function contrastRatio(foreground: string, background: string) {
  const [light, dark] = [relativeLuminance(foreground), relativeLuminance(background)].sort(
    (a, b) => b - a
  );
  return (light + 0.05) / (dark + 0.05);
}

/** WCAG level reached by a ratio for normal-size text. */
export function contrastLevel(ratio: number): "AAA" | "AA" | "AA large" | "fail" {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA large";
  return "fail";
}

export type ContrastPair = {
  foreground: SemanticColorRole;
  background: SemanticColorRole;
  /** 4.5 for text, 3 for non-text indicators (WCAG 1.4.3 and 1.4.11). */
  minimum: 4.5 | 3;
  usage: string;
};

/** Pairs every brand theme must keep readable, in light and dark mode. */
export const contrastPairs: readonly ContrastPair[] = [
  { foreground: "text", background: "background", minimum: 4.5, usage: "Page text" },
  { foreground: "text", background: "surface", minimum: 4.5, usage: "Text on cards" },
  { foreground: "textMuted", background: "background", minimum: 4.5, usage: "Secondary text" },
  {
    foreground: "textMuted",
    background: "surface",
    minimum: 4.5,
    usage: "Secondary text on cards"
  },
  { foreground: "primary", background: "surface", minimum: 4.5, usage: "Links, outline buttons" },
  { foreground: "onPrimary", background: "primary", minimum: 4.5, usage: "Solid primary button" },
  {
    foreground: "onPrimaryMuted",
    background: "primaryMuted",
    minimum: 4.5,
    usage: "Selected item, soft primary badge"
  },
  { foreground: "onSecondary", background: "secondary", minimum: 4.5, usage: "Secondary button" },
  {
    foreground: "onSecondaryMuted",
    background: "secondaryMuted",
    minimum: 4.5,
    usage: "Soft secondary badge"
  },
  { foreground: "onSuccess", background: "success", minimum: 4.5, usage: "Success button" },
  {
    foreground: "onSuccessMuted",
    background: "successMuted",
    minimum: 4.5,
    usage: "Success alert and badge"
  },
  { foreground: "onWarning", background: "warning", minimum: 4.5, usage: "Warning button" },
  {
    foreground: "onWarningMuted",
    background: "warningMuted",
    minimum: 4.5,
    usage: "Warning alert and badge"
  },
  { foreground: "onDanger", background: "danger", minimum: 4.5, usage: "Danger button" },
  {
    foreground: "onDangerMuted",
    background: "dangerMuted",
    minimum: 4.5,
    usage: "Error alert and badge"
  },
  { foreground: "danger", background: "surface", minimum: 4.5, usage: "Error messages" },
  { foreground: "onInfo", background: "info", minimum: 4.5, usage: "Info button" },
  {
    foreground: "onInfoMuted",
    background: "infoMuted",
    minimum: 4.5,
    usage: "Info alert and badge"
  },
  { foreground: "focusRing", background: "background", minimum: 3, usage: "Focus indicator" }
];
