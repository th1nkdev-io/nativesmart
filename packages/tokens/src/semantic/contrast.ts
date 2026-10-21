import {
  colorIntents,
  intentRole,
  type ColorIntent,
  type IntentVariant,
  type SemanticColorRole
} from "./roles";

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

const intentLabels: Record<ColorIntent, string> = {
  primary: "Primary",
  secondary: "Secondary",
  neutral: "Neutral",
  success: "Success",
  warning: "Warning",
  danger: "Danger",
  info: "Info"
};

/** Every intent keeps its text readable on its fills, at rest, hovered and pressed. */
const intentPairs = colorIntents.flatMap((intent): ContrastPair[] => {
  const role = (variant: IntentVariant) => intentRole(intent, variant);
  const label = intentLabels[intent];
  return [
    { foreground: role("on"), background: role("base"), minimum: 4.5, usage: `${label} solid` },
    {
      foreground: role("on"),
      background: role("hover"),
      minimum: 4.5,
      usage: `${label} solid, hovered`
    },
    {
      foreground: role("on"),
      background: role("pressed"),
      minimum: 4.5,
      usage: `${label} solid, pressed`
    },
    {
      foreground: role("onMuted"),
      background: role("muted"),
      minimum: 4.5,
      usage: `${label} soft`
    },
    {
      foreground: role("onMuted"),
      background: role("mutedHover"),
      minimum: 4.5,
      usage: `${label} soft, hovered`
    },
    {
      foreground: role("text"),
      background: "surface",
      minimum: 4.5,
      usage: `${label} text on surfaces`
    }
  ];
});

/** Pairs every brand theme must keep readable, in light and dark mode. */
export const contrastPairs: readonly ContrastPair[] = [
  { foreground: "text", background: "background", minimum: 4.5, usage: "Page text" },
  { foreground: "text", background: "surface", minimum: 4.5, usage: "Text on cards" },
  { foreground: "text", background: "surfaceSunken", minimum: 4.5, usage: "Text in wells" },
  { foreground: "textMuted", background: "background", minimum: 4.5, usage: "Secondary text" },
  {
    foreground: "textMuted",
    background: "surface",
    minimum: 4.5,
    usage: "Secondary text on cards"
  },
  {
    foreground: "textSubtle",
    background: "surface",
    minimum: 4.5,
    usage: "Helper text, placeholders"
  },
  {
    foreground: "textSubtle",
    background: "background",
    minimum: 4.5,
    usage: "Helper text on the page"
  },
  {
    foreground: "textInverse",
    background: "surfaceInverse",
    minimum: 4.5,
    usage: "Inverse surfaces"
  },
  { foreground: "textOnBrand", background: "surfaceBrand", minimum: 4.5, usage: "Brand surfaces" },
  { foreground: "textLink", background: "surface", minimum: 4.5, usage: "Links" },
  { foreground: "textLinkVisited", background: "surface", minimum: 4.5, usage: "Visited links" },
  { foreground: "primary", background: "surface", minimum: 4.5, usage: "Links, outline buttons" },
  { foreground: "danger", background: "surface", minimum: 4.5, usage: "Error messages" },
  ...intentPairs,
  { foreground: "onSelection", background: "selection", minimum: 4.5, usage: "Selected text" },
  { foreground: "onHighlight", background: "highlight", minimum: 4.5, usage: "Highlighted text" },
  { foreground: "onTooltip", background: "tooltip", minimum: 4.5, usage: "Tooltips" },
  { foreground: "borderInput", background: "surface", minimum: 3, usage: "Input boundaries" },
  {
    foreground: "borderInput",
    background: "background",
    minimum: 3,
    usage: "Input boundaries on the page"
  },
  { foreground: "focusRing", background: "background", minimum: 3, usage: "Focus indicator" },
  {
    foreground: "focusRing",
    background: "surface",
    minimum: 3,
    usage: "Focus indicator on cards"
  }
];
