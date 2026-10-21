import {
  coreColorRoles,
  palette,
  type BrandTheme,
  type ColorIntent,
  type ContrastResult,
  type IntentVariant,
  type SemanticColorRole
} from "@nativesmart/tokens";

export const intentNames: Record<ColorIntent, string> = {
  primary: "Primaire",
  secondary: "Secondaire",
  neutral: "Neutre",
  success: "Succès",
  warning: "Avertissement",
  danger: "Danger",
  info: "Information"
};

export const intentUsages: Record<ColorIntent, string> = {
  primary: "Action principale, sélection, liens",
  secondary: "Accent de marque, actions complémentaires",
  neutral: "Actions discrètes, filtres, étiquettes",
  success: "Validation, opération réussie",
  warning: "Attention requise, état dégradé",
  danger: "Erreur, action destructrice",
  info: "Aide, nouveauté, message neutre"
};

export const variantNames: Record<IntentVariant, { label: string; usage: string }> = {
  base: { label: "Base", usage: "Remplissage plein" },
  hover: { label: "Survol", usage: "Remplissage survolé" },
  pressed: { label: "Pression", usage: "Remplissage pressé" },
  on: { label: "Texte dessus", usage: "Texte et icônes sur le plein" },
  muted: { label: "Doux", usage: "Fond adouci : badge, alerte" },
  mutedHover: { label: "Doux survolé", usage: "Fond adouci survolé" },
  onMuted: { label: "Texte sur doux", usage: "Texte sur le fond adouci" },
  border: { label: "Bordure", usage: "Contour teinté" },
  text: { label: "Texte", usage: "Texte coloré sur une surface" }
};

/** What each non-intent role is for. */
export const roleUsages: Partial<Record<SemanticColorRole, string>> = {
  background: "Fond de la page",
  surface: "Cartes, panneaux, champs",
  surfaceMuted: "Zones en retrait, en-têtes de tableau",
  surfaceRaised: "Éléments posés au-dessus de la page",
  surfaceSunken: "Puits : code, zones de dépôt",
  surfaceFloating: "Menus, popovers, listes déroulantes",
  surfaceHover: "Ligne ou élément survolé",
  surfaceSelected: "Ligne ou élément sélectionné",
  surfaceDisabled: "Fond d'un contrôle désactivé",
  surfaceInverse: "Bandeaux et snackbars inversés",
  surfaceBrand: "Sections et bannières de marque",
  overlay: "Voile derrière une modale",
  text: "Texte principal",
  textMuted: "Texte secondaire",
  textSubtle: "Aide, métadonnées, horodatages",
  textDisabled: "Texte désactivé (exempté WCAG)",
  textPlaceholder: "Texte indicatif des champs",
  textInverse: "Texte sur surface inversée",
  textOnBrand: "Texte sur surface de marque",
  textLink: "Liens",
  textLinkHover: "Lien survolé",
  textLinkVisited: "Lien visité",
  border: "Séparateurs et contours par défaut",
  borderSubtle: "Séparateurs discrets",
  borderStrong: "Contours appuyés",
  borderInput: "Contour des champs, 3:1 garanti",
  borderInputHover: "Champ survolé",
  borderFocus: "Champ actif",
  borderSelected: "Carte ou option sélectionnée",
  borderDisabled: "Contour désactivé",
  focusRing: "Anneau de focus clavier",
  selection: "Texte sélectionné",
  onSelection: "Texte dans la sélection",
  highlight: "Surlignage, résultat de recherche",
  onHighlight: "Texte surligné",
  accent: "Touche de couleur de la marque",
  tooltip: "Fond des infobulles",
  onTooltip: "Texte des infobulles",
  skeleton: "Squelettes de chargement",
  offline: "Indicateur hors ligne"
};

/** Foreground roles shown as text on the background they are made for. */
export const pairedBackground: Partial<Record<SemanticColorRole, SemanticColorRole>> = {
  text: "surface",
  textMuted: "surface",
  textSubtle: "surface",
  textDisabled: "surface",
  textPlaceholder: "surface",
  textInverse: "surfaceInverse",
  textOnBrand: "surfaceBrand",
  textLink: "surface",
  textLinkHover: "surface",
  textLinkVisited: "surface",
  onSelection: "selection",
  onHighlight: "highlight",
  onTooltip: "tooltip"
};

/** Border roles shown as an outline on a surface. */
export const outlinedRoles = new Set<SemanticColorRole>([
  "border",
  "borderSubtle",
  "borderStrong",
  "borderInput",
  "borderInputHover",
  "borderFocus",
  "borderSelected",
  "borderDisabled",
  "focusRing"
]);

const coreRoles = new Set<string>(coreColorRoles);

export function isDerived(role: SemanticColorRole) {
  return !coreRoles.has(role);
}

/** Where a color comes from: a step of a brand or reference scale, or a computed mix. */
export function colorOrigin(theme: BrandTheme, hex: string) {
  const value = hex.toLowerCase();
  if (value === "#ffffff") return "white";
  if (value === "#000000") return "black";
  for (const [name, scale] of Object.entries(theme.palette)) {
    for (const [step, color] of Object.entries(scale)) {
      if (color.toLowerCase() === value) return `${name}-${step}`;
    }
  }
  for (const [name, scale] of Object.entries(palette)) {
    for (const [step, color] of Object.entries(scale)) {
      if (color.toLowerCase() === value) return `${name}-${step}`;
    }
  }
  return null;
}

const staticUsages: Record<string, string> = {
  "Page text": "Texte de la page",
  "Text on cards": "Texte sur les cartes",
  "Text in wells": "Texte dans un puits",
  "Secondary text": "Texte secondaire",
  "Secondary text on cards": "Texte secondaire sur les cartes",
  "Helper text, placeholders": "Aide et texte indicatif",
  "Helper text on the page": "Aide sur le fond de page",
  "Inverse surfaces": "Surfaces inversées",
  "Brand surfaces": "Surfaces de marque",
  Links: "Liens",
  "Visited links": "Liens visités",
  "Links, outline buttons": "Liens, boutons contour",
  "Error messages": "Messages d'erreur",
  "Selected text": "Texte sélectionné",
  "Highlighted text": "Texte surligné",
  Tooltips: "Infobulles",
  "Input boundaries": "Contour des champs",
  "Input boundaries on the page": "Contour des champs sur la page",
  "Focus indicator": "Indicateur de focus",
  "Focus indicator on cards": "Indicateur de focus sur les cartes"
};

const intentByLabel: Record<string, ColorIntent> = {
  Primary: "primary",
  Secondary: "secondary",
  Neutral: "neutral",
  Success: "success",
  Warning: "warning",
  Danger: "danger",
  Info: "info"
};

const intentUsageSuffixes: Record<string, string> = {
  solid: "plein",
  "solid, hovered": "plein survolé",
  "solid, pressed": "plein pressé",
  soft: "doux",
  "soft, hovered": "doux survolé",
  "text on surfaces": "texte sur surface"
};

/** French label of a contrast pair, and whether it belongs to an intent. */
export function contrastUsage(result: ContrastResult) {
  if (staticUsages[result.usage]) return { label: staticUsages[result.usage], intent: null };
  const [label, ...rest] = result.usage.split(" ");
  const intent = intentByLabel[label];
  const suffix = intentUsageSuffixes[rest.join(" ")];
  if (intent && suffix) return { label: `${intentNames[intent]} · ${suffix}`, intent };
  return { label: result.usage, intent: null };
}
