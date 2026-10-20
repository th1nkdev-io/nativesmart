import type { FontSizeKey, FontWeightKey, LetterSpacingKey } from "../primitives";

export type FontFamilyRole = "sans" | "heading" | "mono";

export type TextStyle = {
  family: FontFamilyRole;
  size: FontSizeKey;
  weight: FontWeightKey;
  tracking: LetterSpacingKey;
  uppercase?: boolean;
  description: string;
};

/**
 * Named text styles. Components and products use a style, never a raw font size, so the type
 * scale stays consistent. The font family comes from the brand theme.
 */
export const textStyles = {
  "display-lg": {
    family: "heading",
    size: "6xl",
    weight: "bold",
    tracking: "tighter",
    description: "Hero titles on marketing pages"
  },
  "display-md": {
    family: "heading",
    size: "5xl",
    weight: "bold",
    tracking: "tighter",
    description: "Large section openers"
  },
  h1: {
    family: "heading",
    size: "4xl",
    weight: "bold",
    tracking: "tighter",
    description: "Page title"
  },
  h2: {
    family: "heading",
    size: "3xl",
    weight: "semibold",
    tracking: "tight",
    description: "Section title"
  },
  h3: {
    family: "heading",
    size: "2xl",
    weight: "semibold",
    tracking: "tight",
    description: "Subsection title"
  },
  h4: {
    family: "heading",
    size: "xl",
    weight: "semibold",
    tracking: "normal",
    description: "Card and dialog title"
  },
  h5: {
    family: "sans",
    size: "lg",
    weight: "semibold",
    tracking: "normal",
    description: "Group title"
  },
  h6: {
    family: "sans",
    size: "md",
    weight: "semibold",
    tracking: "normal",
    description: "Small group title"
  },
  "body-lg": {
    family: "sans",
    size: "lg",
    weight: "regular",
    tracking: "normal",
    description: "Lead paragraphs"
  },
  "body-md": {
    family: "sans",
    size: "md",
    weight: "regular",
    tracking: "normal",
    description: "Default reading text"
  },
  "body-sm": {
    family: "sans",
    size: "sm",
    weight: "regular",
    tracking: "normal",
    description: "Dense interfaces and secondary text"
  },
  "label-lg": {
    family: "sans",
    size: "md",
    weight: "medium",
    tracking: "normal",
    description: "Large buttons and tabs"
  },
  "label-md": {
    family: "sans",
    size: "sm",
    weight: "medium",
    tracking: "normal",
    description: "Buttons, inputs, menu items"
  },
  "label-sm": {
    family: "sans",
    size: "xs",
    weight: "medium",
    tracking: "wide",
    description: "Badges, chips, small controls"
  },
  caption: {
    family: "sans",
    size: "xs",
    weight: "regular",
    tracking: "normal",
    description: "Helper text, timestamps, legends"
  },
  overline: {
    family: "sans",
    size: "xs",
    weight: "semibold",
    tracking: "wider",
    uppercase: true,
    description: "Eyebrows above titles"
  },
  code: {
    family: "mono",
    size: "sm",
    weight: "regular",
    tracking: "normal",
    description: "Code, identifiers, references"
  }
} as const satisfies Record<string, TextStyle>;

export type TextStyleName = keyof typeof textStyles;
