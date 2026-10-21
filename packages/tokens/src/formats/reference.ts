import { textStyles } from "../semantic/text-styles";
import { identifier } from "./shared";

/** Formats a token can be written in, one per family of technologies. */
export type TokenPlatform = "css" | "swift" | "kotlin" | "dart" | "react-native";

/** CSS variable prefixes of the native scales, longest first. */
const scales: readonly [prefix: string, name: string, rn?: string][] = [
  ["control-height", "ControlHeight"],
  ["line-height", "LineHeight", "theme.typography.lineHeight"],
  ["font-size", "FontSize", "theme.typography.fontSize"],
  ["font-weight", "FontWeight", "theme.typography.fontWeight"],
  ["avatar-size", "AvatarSize"],
  ["icon-size", "IconSize"],
  ["touch-target", "TouchTarget"],
  ["tracking", "LetterSpacing", "theme.typography.letterSpacing"],
  ["duration", "Duration", "primitives.motion.duration"],
  ["easing", "Easing", "primitives.motion.easing"],
  ["spring", "Spring", "primitives.motion.spring"],
  ["opacity", "Opacity", "primitives.opacity"],
  ["space", "Space", "theme.spacing"],
  ["radius", "Radius", "theme.radius"]
];

const radiusScale = new Set(["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full"]);

function camel(value: string) {
  return value.replace(/-([a-z0-9])/g, (_, letter: string) => letter.toUpperCase());
}

function themeAccess(platform: TokenPlatform, path: string) {
  switch (platform) {
    case "swift":
      return `theme.${path}`;
    case "kotlin":
      return `NsTheme.${path}`;
    case "dart":
      return `NsTheme.of(context).${path}`;
    default:
      return `theme.${path}`;
  }
}

function scaleAccess(platform: TokenPlatform, name: string, key: string) {
  if (platform === "dart") return `Ns${name === "FontWeight" ? "FontWeight" : name}.${key}`;
  if (platform === "kotlin" && name === "FontWeight") return `NsTokens.Weight.${key}`;
  return `NsTokens.${name}.${key}`;
}

/**
 * How a token is written in a platform, from its CSS name (`--ns-color-primary`, `ns-text-h1`).
 * Returns null when the token only exists in CSS (gradients, state layers, materials...).
 */
export function tokenReference(css: string, platform: TokenPlatform): string | null {
  if (platform === "css") return css;
  const name = css.replace(/^\.?-?-?ns-/, "").replace(/^text-/, "text:");

  if (name.startsWith("text:")) {
    const style = name.slice(5);
    if (!(style in textStyles)) return null;
    if (platform === "react-native") return `textStyles["${style}"]`;
    return platform === "dart"
      ? `NsTextStyles.${camel(style)}`
      : `NsTokens.TextStyle.${camel(style)}`;
  }
  if (name.startsWith("color-")) {
    return themeAccess(platform, `colors.${camel(name.slice(6))}`);
  }
  if (/^font-(sans|heading|display|serif|mono)$/.test(name)) {
    return platform === "react-native" ? null : themeAccess(platform, `fonts.${name.slice(5)}`);
  }
  if (name.startsWith("radius-") && !radiusScale.has(name.slice(7))) {
    return platform === "react-native" ? null : themeAccess(platform, `shape.${name.slice(7)}`);
  }
  if (name.startsWith("elevation-") && /^\d$/.test(name.slice(10))) {
    return platform === "react-native"
      ? null
      : scaleAccess(platform, "Elevation", `level${name.slice(10)}`);
  }
  if (name === "touch-target") return scaleAccess(platform, "TouchTarget", "comfortable");

  for (const [prefix, scale, rn] of scales) {
    if (!name.startsWith(`${prefix}-`)) continue;
    const raw = name.slice(prefix.length + 1);
    if (raw.endsWith("-duration")) return null;
    const key = prefix === "space" ? raw.replace("-", ".") : raw;
    if (platform === "react-native") {
      return rn ? `${rn}${/^\d/.test(key) ? `[${JSON.stringify(key)}]` : `.${camel(key)}`}` : null;
    }
    return scaleAccess(platform, scale, identifier(key, scale === "Space" ? "s" : "s"));
  }
  return null;
}
