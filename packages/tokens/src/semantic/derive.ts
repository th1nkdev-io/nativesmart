import { palette as reference, type ColorScale } from "../primitives";
import { mix, mostReadable, reachContrast } from "./color-math";
import { contrastRatio } from "./contrast";
import {
  colorIntents,
  intentRole,
  type BrandColors,
  type ColorIntent,
  type SemanticColors
} from "./roles";

export type ColorMode = "light" | "dark";

export type BrandPalette = {
  primary: ColorScale;
  secondary: ColorScale;
  neutral: ColorScale;
};

const white = "#ffffff";
const black = "#000000";

/**
 * Completes the colors of a brand theme. Derived roles follow fixed rules (mixes toward black or
 * white, the brand palettes, the lightest value that keeps its contrast), so every identity gets
 * the full set from its core roles. A role the brand gives explicitly always wins.
 */
export function resolveColors(
  colors: BrandColors,
  palette: BrandPalette,
  mode: ColorMode
): SemanticColors {
  const light = mode === "light";
  const neutral = palette.neutral;
  const c = colors;

  const textSubtle = reachContrast(
    c.textDisabled,
    c.textMuted,
    [c.surface, c.background, c.surfaceMuted],
    4.5
  );
  const borderInput = reachContrast(c.borderStrong, c.text, [c.surface, c.background], 3);
  const surfaceBrand = light ? palette.primary[700] : palette.primary[900];
  const tooltip = light ? neutral[900] : neutral[700];

  const derived: Record<string, string> = {
    surfaceSunken: light ? mix(c.background, c.text, 0.035) : mix(c.background, black, 0.3),
    surfaceFloating: c.surfaceRaised,
    surfaceHover: mix(c.surface, c.text, light ? 0.04 : 0.06),
    surfaceSelected: mix(c.surface, c.primary, light ? 0.08 : 0.16),
    surfaceDisabled: c.surfaceMuted,
    surfaceInverse: c.text,
    surfaceBrand,

    textSubtle,
    textPlaceholder: textSubtle,
    textInverse: c.surface,
    textOnBrand: mostReadable(surfaceBrand, [white, neutral[950]]),
    textLinkVisited: light ? reference.purple[700] : reference.purple[300],

    borderSubtle: mix(c.border, c.surface, 0.5),
    borderInput,
    borderInputHover: mix(borderInput, c.text, 0.3),
    borderFocus: c.focusRing,
    borderSelected: c.primary,
    borderDisabled: c.border,

    selection: mix(c.surface, c.primary, light ? 0.2 : 0.35),
    onSelection: c.text,
    highlight: light ? reference.yellow[200] : reference.yellow[900],
    onHighlight: c.text,

    tooltip,
    onTooltip: mostReadable(tooltip, [white, neutral[950]]),
    skeleton: mix(c.surface, c.text, light ? 0.08 : 0.1),

    // Neutral intent, built from the neutral palette.
    neutral: light ? neutral[800] : neutral[100],
    neutralHover: light ? neutral[900] : neutral[50],
    neutralPressed: light ? neutral[950] : neutral[200],
    onNeutral: light ? white : neutral[900],
    neutralMuted: light ? neutral[100] : neutral[800],
    neutralMutedHover: light ? neutral[200] : neutral[700],
    onNeutralMuted: light ? neutral[800] : neutral[100],
    neutralBorder: light ? neutral[300] : neutral[600]
  };

  // Missing intent variants: hover and pressed darken in light mode; in dark mode hover lightens.
  for (const intent of colorIntents) {
    const role = (variant: Parameters<typeof intentRole>[1]) => intentRole(intent, variant);
    const value = (variant: Parameters<typeof intentRole>[1]) =>
      c[role(variant) as keyof BrandColors] ?? derived[role(variant)];
    const base = value("base") as string;
    const muted = value("muted") as string;
    const on = value("on") as string;

    derived[role("hover")] ??= light ? shade(base, black, 0.12, on) : shade(base, white, 0.18, on);
    derived[role("pressed")] ??= shade(base, black, light ? 0.24 : 0.15, on);
    derived[role("mutedHover")] ??= mix(muted, base, light ? 0.1 : 0.14);
    derived[role("border")] ??= mix(base, c.surface, light ? 0.6 : 0.55);
    derived[role("text")] ??= textOn(intent, base, value("onMuted") as string, c);
  }
  derived.textLink = (c.primaryText as string | undefined) ?? derived.primaryText;
  derived.textLinkHover = c.primaryHover;

  const resolved: Record<string, string> = {};
  for (const [role, value] of Object.entries({ ...derived, ...c })) {
    if (value !== undefined) resolved[role] = value;
  }
  return resolved as SemanticColors;
}

/**
 * Moves a fill toward `target` by up to `amount`, backing off while its text would lose readability,
 * so a hovered or pressed button never becomes harder to read than WCAG AA allows.
 */
function shade(base: string, target: string, amount: number, on: string) {
  const minimum = Math.min(4.5, contrastRatio(on, base));
  for (let step = amount; step > 0; step -= 0.01) {
    const color = mix(base, target, step);
    if (contrastRatio(on, color) >= minimum) return color;
  }
  return base;
}

/** Text in the intent color on the page: the base color when readable, else its muted text. */
function textOn(intent: ColorIntent, base: string, onMuted: string, colors: BrandColors) {
  if (intent === "neutral") return colors.textMuted;
  const readable = [colors.surface, colors.background].every(
    (background) => contrastRatio(base, background) >= 4.5
  );
  return readable ? base : onMuted;
}

/** Colors for charts, the same for every brand so series stay distinct. */
export type DataVizColors = {
  /** Up to ten series, in order. */
  categorical: readonly string[];
  /** Low to high values. */
  sequential: readonly string[];
  /** Negative, neutral, positive. */
  diverging: readonly string[];
  grid: string;
  axis: string;
};

const categoricalHues = [
  "blue",
  "orange",
  "emerald",
  "violet",
  "pink",
  "cyan",
  "amber",
  "lime",
  "indigo",
  "slate"
] as const;

/** Light mode steps chosen to keep 3:1 on white (WCAG 1.4.11). */
const categoricalLightSteps: Record<(typeof categoricalHues)[number], keyof ColorScale> = {
  blue: 600,
  orange: 600,
  emerald: 600,
  violet: 600,
  pink: 600,
  cyan: 700,
  amber: 700,
  lime: 700,
  indigo: 500,
  slate: 500
};

export function resolveDataViz(
  colors: SemanticColors,
  palette: BrandPalette,
  mode: ColorMode
): DataVizColors {
  const light = mode === "light";
  const ramp = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
  const sequential = ramp.map((step) => palette.primary[step]);
  const { red } = reference;
  return {
    categorical: categoricalHues.map((hue) =>
      light ? reference[hue][categoricalLightSteps[hue]] : reference[hue][400]
    ),
    sequential: light ? sequential : [...sequential].reverse(),
    diverging: light
      ? [
          red[700],
          red[500],
          red[300],
          red[100],
          palette.neutral[100],
          palette.primary[100],
          palette.primary[300],
          palette.primary[500],
          palette.primary[700]
        ]
      : [
          red[300],
          red[500],
          red[700],
          red[900],
          palette.neutral[800],
          palette.primary[900],
          palette.primary[700],
          palette.primary[500],
          palette.primary[300]
        ],
    grid: colors.borderSubtle,
    axis: colors.borderInput
  };
}

/** Background and initials color pairs for avatars, picked from a name with `avatarColorIndex`. */
export type AvatarColors = readonly { background: string; foreground: string }[];

const avatarHues = [
  "blue",
  "emerald",
  "amber",
  "violet",
  "pink",
  "cyan",
  "orange",
  "indigo"
] as const;

export function resolveAvatars(mode: ColorMode): AvatarColors {
  return avatarHues.map((hue) =>
    mode === "light"
      ? { background: reference[hue][100], foreground: reference[hue][800] }
      : { background: reference[hue][900], foreground: reference[hue][200] }
  );
}

/** Stable avatar color for a name, so a person keeps the same color everywhere. */
export function avatarColorIndex(name: string, count = avatarHues.length) {
  let hash = 0;
  for (const character of name.trim().toLowerCase()) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }
  return hash % count;
}
