/**
 * Semantic color roles every brand theme must define, in light and dark mode.
 * Components reference roles, never raw palette values.
 */
export const semanticColorRoles = [
  "background",
  "surface",
  "surfaceMuted",
  "border",
  "borderStrong",
  "text",
  "textMuted",
  "textDisabled",
  "primary",
  "primaryHover",
  "primaryPressed",
  "onPrimary",
  "primaryMuted",
  "onPrimaryMuted",
  "secondary",
  "secondaryHover",
  "onSecondary",
  "secondaryMuted",
  "accent",
  "success",
  "onSuccess",
  "successMuted",
  "warning",
  "onWarning",
  "warningMuted",
  "danger",
  "dangerHover",
  "onDanger",
  "dangerMuted",
  "info",
  "onInfo",
  "infoMuted",
  "offline",
  "focusRing",
  "overlay"
] as const;

export type SemanticColorRole = (typeof semanticColorRoles)[number];

export type SemanticColors = Readonly<Record<SemanticColorRole, string>>;
