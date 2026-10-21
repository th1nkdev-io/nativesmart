import type { FontSizeKey, FontWeightKey, LeadingKey, LetterSpacingKey } from "../primitives";

export type FontFamilyRole = "sans" | "heading" | "display" | "serif" | "mono";

export type TextStyleCategory = "display" | "heading" | "title" | "body" | "label" | "special";

export type TextStyle = {
  category: TextStyleCategory;
  family: FontFamilyRole;
  /** Size on wide screens, and on every screen when the style is not fluid. */
  size: FontSizeKey;
  weight: FontWeightKey;
  tracking: LetterSpacingKey;
  /**
   * Fluid styles grow from `min` on a 375px screen to `size` on a 1440px screen. Their line height
   * becomes relative (`leading`) so it follows the size.
   */
  fluid?: { min: FontSizeKey; leading: LeadingKey };
  /** Relative line height for non-fluid styles that need more air than the scale gives. */
  leading?: LeadingKey;
  uppercase?: boolean;
  italic?: boolean;
  /** Figures of equal width, for amounts and tables. */
  tabular?: boolean;
  underline?: boolean;
  description: string;
};

/** Screen widths between which fluid styles grow, in pixels. */
export const fluidRange = { min: 375, max: 1440 } as const;

/**
 * Named text styles. Components and products use a style, never a raw font size, so the type
 * scale stays consistent. The font family comes from the brand theme.
 */
export const textStyles = {
  "display-xl": {
    category: "display",
    family: "display",
    size: "8xl",
    weight: "bold",
    tracking: "tightest",
    fluid: { min: "5xl", leading: "none" },
    description: "Landing page heroes"
  },
  "display-lg": {
    category: "display",
    family: "display",
    size: "6xl",
    weight: "bold",
    tracking: "tighter",
    fluid: { min: "4xl", leading: "tight" },
    description: "Hero titles on marketing pages"
  },
  "display-md": {
    category: "display",
    family: "display",
    size: "5xl",
    weight: "bold",
    tracking: "tighter",
    fluid: { min: "3xl", leading: "tight" },
    description: "Large section openers"
  },
  "display-sm": {
    category: "display",
    family: "display",
    size: "4xl",
    weight: "bold",
    tracking: "tighter",
    fluid: { min: "2xl", leading: "snug" },
    description: "Feature titles and empty states"
  },
  h1: {
    category: "heading",
    family: "heading",
    size: "4xl",
    weight: "bold",
    tracking: "tighter",
    fluid: { min: "3xl", leading: "snug" },
    description: "Page title"
  },
  h2: {
    category: "heading",
    family: "heading",
    size: "3xl",
    weight: "semibold",
    tracking: "tight",
    fluid: { min: "2xl", leading: "snug" },
    description: "Section title"
  },
  h3: {
    category: "heading",
    family: "heading",
    size: "2xl",
    weight: "semibold",
    tracking: "tight",
    description: "Subsection title"
  },
  h4: {
    category: "heading",
    family: "heading",
    size: "xl",
    weight: "semibold",
    tracking: "normal",
    description: "Card and dialog title"
  },
  h5: {
    category: "heading",
    family: "sans",
    size: "lg",
    weight: "semibold",
    tracking: "normal",
    description: "Group title"
  },
  h6: {
    category: "heading",
    family: "sans",
    size: "md",
    weight: "semibold",
    tracking: "normal",
    description: "Small group title"
  },
  "title-lg": {
    category: "title",
    family: "heading",
    size: "xl",
    weight: "medium",
    tracking: "tight",
    description: "Component titles: drawers, wide cards"
  },
  "title-md": {
    category: "title",
    family: "heading",
    size: "lg",
    weight: "medium",
    tracking: "normal",
    description: "Component titles: cards, list headers"
  },
  "title-sm": {
    category: "title",
    family: "heading",
    size: "md",
    weight: "medium",
    tracking: "normal",
    description: "Component titles: list items, tiles"
  },
  lead: {
    category: "body",
    family: "sans",
    size: "xl",
    weight: "regular",
    tracking: "normal",
    leading: "relaxed",
    description: "Introductions under a page title"
  },
  "body-lg": {
    category: "body",
    family: "sans",
    size: "lg",
    weight: "regular",
    tracking: "normal",
    description: "Lead paragraphs"
  },
  "body-md": {
    category: "body",
    family: "sans",
    size: "md",
    weight: "regular",
    tracking: "normal",
    description: "Default reading text"
  },
  "body-sm": {
    category: "body",
    family: "sans",
    size: "sm",
    weight: "regular",
    tracking: "normal",
    description: "Dense interfaces and secondary text"
  },
  "body-xs": {
    category: "body",
    family: "sans",
    size: "xs",
    weight: "regular",
    tracking: "normal",
    description: "Footnotes and legal text"
  },
  "label-lg": {
    category: "label",
    family: "sans",
    size: "md",
    weight: "medium",
    tracking: "normal",
    description: "Large buttons and tabs"
  },
  "label-md": {
    category: "label",
    family: "sans",
    size: "sm",
    weight: "medium",
    tracking: "normal",
    description: "Buttons, inputs, menu items"
  },
  "label-sm": {
    category: "label",
    family: "sans",
    size: "xs",
    weight: "medium",
    tracking: "wide",
    description: "Badges, chips, small controls"
  },
  "label-xs": {
    category: "label",
    family: "sans",
    size: "2xs",
    weight: "semibold",
    tracking: "wide",
    description: "Counters and status dots"
  },
  caption: {
    category: "label",
    family: "sans",
    size: "xs",
    weight: "regular",
    tracking: "normal",
    description: "Helper text, timestamps, legends"
  },
  overline: {
    category: "label",
    family: "sans",
    size: "xs",
    weight: "semibold",
    tracking: "wider",
    uppercase: true,
    description: "Eyebrows above titles"
  },
  link: {
    category: "special",
    family: "sans",
    size: "md",
    weight: "medium",
    tracking: "normal",
    underline: true,
    description: "Standalone links"
  },
  stat: {
    category: "special",
    family: "heading",
    size: "5xl",
    weight: "bold",
    tracking: "tighter",
    tabular: true,
    fluid: { min: "4xl", leading: "none" },
    description: "Key figures on dashboards"
  },
  price: {
    category: "special",
    family: "sans",
    size: "2xl",
    weight: "semibold",
    tracking: "tight",
    tabular: true,
    description: "Prices and amounts"
  },
  quote: {
    category: "special",
    family: "serif",
    size: "2xl",
    weight: "regular",
    tracking: "normal",
    italic: true,
    leading: "snug",
    description: "Testimonials and pull quotes"
  },
  code: {
    category: "special",
    family: "mono",
    size: "sm",
    weight: "regular",
    tracking: "normal",
    description: "Code, identifiers, references"
  },
  kbd: {
    category: "special",
    family: "mono",
    size: "xs",
    weight: "medium",
    tracking: "normal",
    description: "Keyboard shortcuts"
  }
} as const satisfies Record<string, TextStyle>;

export type TextStyleName = keyof typeof textStyles;
