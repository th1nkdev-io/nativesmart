/**
 * Semantic color roles every brand theme must define, in light and dark mode.
 * Components reference roles, never raw palette values.
 */
export const semanticColorRoles = [
  "background",
  "surface",
  "surfaceMuted",
  "surfaceRaised",
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
  "onSecondaryMuted",
  "accent",
  "success",
  "onSuccess",
  "successMuted",
  "onSuccessMuted",
  "warning",
  "onWarning",
  "warningMuted",
  "onWarningMuted",
  "danger",
  "dangerHover",
  "onDanger",
  "dangerMuted",
  "onDangerMuted",
  "info",
  "onInfo",
  "infoMuted",
  "onInfoMuted",
  "offline",
  "focusRing",
  "overlay"
] as const;

export type SemanticColorRole = (typeof semanticColorRoles)[number];

export type SemanticColors = Readonly<Record<SemanticColorRole, string>>;
