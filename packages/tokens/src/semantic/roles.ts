/**
 * Color intents. Each intent has the same nine roles, so components switch intent by changing a
 * single prefix: `primary`, `primaryHover`, `primaryPressed`, `onPrimary`, `primaryMuted`,
 * `primaryMutedHover`, `onPrimaryMuted`, `primaryBorder`, `primaryText`.
 */
export const colorIntents = [
  "primary",
  "secondary",
  "neutral",
  "success",
  "warning",
  "danger",
  "info"
] as const;

export type ColorIntent = (typeof colorIntents)[number];

export type IntentRole<I extends string = ColorIntent> =
  | I
  | `${I}Hover`
  | `${I}Pressed`
  | `on${Capitalize<I>}`
  | `${I}Muted`
  | `${I}MutedHover`
  | `on${Capitalize<I>}Muted`
  | `${I}Border`
  | `${I}Text`;

/** The nine variants of an intent, in display order. */
export const intentVariants = [
  "base",
  "hover",
  "pressed",
  "on",
  "muted",
  "mutedHover",
  "onMuted",
  "border",
  "text"
] as const;

export type IntentVariant = (typeof intentVariants)[number];

function capitalize<I extends string>(value: I) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}` as Capitalize<I>;
}

/** Role name of one variant of an intent: `intentRole("danger", "onMuted")` is `onDangerMuted`. */
export function intentRole<I extends ColorIntent>(
  intent: I,
  variant: IntentVariant
): IntentRole<I> {
  const name = capitalize(intent);
  const roles: Record<IntentVariant, string> = {
    base: intent,
    hover: `${intent}Hover`,
    pressed: `${intent}Pressed`,
    on: `on${name}`,
    muted: `${intent}Muted`,
    mutedHover: `${intent}MutedHover`,
    onMuted: `on${name}Muted`,
    border: `${intent}Border`,
    text: `${intent}Text`
  };
  return roles[variant] as IntentRole<I>;
}

/** Surfaces, from the page background to floating layers. */
export const surfaceRoles = [
  "background",
  "surface",
  "surfaceMuted",
  "surfaceRaised",
  "surfaceSunken",
  "surfaceFloating",
  "surfaceHover",
  "surfaceSelected",
  "surfaceDisabled",
  "surfaceInverse",
  "surfaceBrand",
  "overlay"
] as const;

export const textRoles = [
  "text",
  "textMuted",
  "textSubtle",
  "textDisabled",
  "textPlaceholder",
  "textInverse",
  "textOnBrand",
  "textLink",
  "textLinkHover",
  "textLinkVisited"
] as const;

export const borderRoles = [
  "border",
  "borderSubtle",
  "borderStrong",
  "borderInput",
  "borderInputHover",
  "borderFocus",
  "borderSelected",
  "borderDisabled"
] as const;

/** Focus, text selection and highlights. */
export const interactionRoles = [
  "focusRing",
  "selection",
  "onSelection",
  "highlight",
  "onHighlight"
] as const;

/** Supporting roles: brand accent, tooltips, loading placeholders, connectivity. */
export const utilityRoles = ["accent", "tooltip", "onTooltip", "skeleton", "offline"] as const;

export const intentRoles = colorIntents.flatMap((intent) =>
  intentVariants.map((variant) => intentRole(intent, variant))
) as IntentRole[];

export type SemanticColorRole =
  | (typeof surfaceRoles)[number]
  | (typeof textRoles)[number]
  | (typeof borderRoles)[number]
  | IntentRole
  | (typeof interactionRoles)[number]
  | (typeof utilityRoles)[number];

/**
 * Semantic color roles every brand theme defines, in light and dark mode.
 * Components reference roles, never raw palette values.
 */
export const semanticColorRoles: readonly SemanticColorRole[] = [
  ...surfaceRoles,
  ...textRoles,
  ...borderRoles,
  ...intentRoles,
  ...interactionRoles,
  ...utilityRoles
];

/** Roles grouped for documentation, in display order. */
export const colorRoleGroups = [
  { id: "surfaces", roles: surfaceRoles },
  { id: "text", roles: textRoles },
  { id: "borders", roles: borderRoles },
  { id: "intents", roles: intentRoles },
  { id: "interaction", roles: interactionRoles },
  { id: "utility", roles: utilityRoles }
] as const;

/**
 * Roles a brand theme must give explicitly. Every other role is derived from them and from the
 * brand palettes, and can be overridden.
 */
export const coreColorRoles = [
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
] as const satisfies readonly SemanticColorRole[];

export type CoreColorRole = (typeof coreColorRoles)[number];

export type SemanticColors = Readonly<Record<SemanticColorRole, string>>;

/** Colors a brand theme writes: the core roles, plus any derived role it wants to override. */
export type BrandColors = Readonly<Record<CoreColorRole, string>> & Partial<SemanticColors>;
