import { defineContract, property } from "../../../define";

export const headingContract = defineContract({
  status: "preview",
  id: "heading",
  name: "Heading",
  layer: "foundation",
  category: "typography",
  priority: "P1",
  description: "Titles with document outline levels",
  anatomy: ["root", "eyebrow", "title", "anchor", "subtitle"],
  properties: [
    property("text", "string", "The title; the default slot can hold it instead", {
      example: "Envoyez de l'argent en un geste"
    }),
    property("level", "enum", "Place in the document outline: h1 to h6", {
      values: ["1", "2", "3", "4", "5", "6"],
      defaultValue: "2"
    }),
    property("size", "enum", "Visual size, independent of the level; auto follows the level", {
      values: ["auto", "display", "xl", "lg", "md", "sm", "xs"],
      defaultValue: "auto"
    }),
    property("weight", "enum", "Font weight; auto takes the text style's", {
      values: ["auto", "medium", "semibold", "bold", "extrabold"],
      defaultValue: "auto"
    }),
    property("tone", "enum", "Color of the title", {
      values: ["default", "muted", "primary", "gradient"],
      defaultValue: "default"
    }),
    property("align", "enum", "Alignment, following the reading direction", {
      values: ["start", "center", "end"],
      defaultValue: "start"
    }),
    property("eyebrow", "string", "Short overline above the title", { example: "Transferts" }),
    property("subtitle", "string", "Lead paragraph under the title", {
      example: "Kofi, Aïcha ou Moussa reçoivent leur argent en quelques secondes."
    }),
    property("lines", "number", "Lines kept before an ellipsis"),
    property("anchor", "boolean", "Shows a link to this title on hover, with an id from its text", {
      defaultValue: false
    }),
    property("id", "string", "Anchor id; derived from the text when anchor is on"),
    property("anchorLabel", "string", "Accessible name of the anchor link", {
      defaultValue: "Link to this section"
    }),
    property("children", "slot", "The title, when text is not set"),
    property("actions", "slot", "Buttons at the end of the title line")
  ],
  states: ["default"],
  accessibility: {
    role: "heading",
    requirements: [
      "The level follows the document outline: one h1 per page, no skipped levels",
      "Size changes the look only, so a small h2 or a large h3 keeps its place in the outline",
      "The eyebrow and subtitle sit in an hgroup and are not headings themselves",
      "The anchor link has an accessible name and appears on keyboard focus as well as hover"
    ]
  },
  semanticTokens: ["heading.style", "heading.color", "heading.eyebrow", "heading.subtitle"],
  docs: {
    anatomy: {
      root: "An hgroup when there is an eyebrow or a subtitle, otherwise the h element",
      eyebrow: "Overline style in the primary color, above the title",
      title: "The h1 to h6 element in the text style of its size",
      anchor: "A # link to the title, shown on hover and focus",
      subtitle: "Lead style in the muted color, under the title"
    },
    tokens: {
      "heading.style": "Text styles display-md and h1 to h5, with their family, size and tracking",
      "heading.color": "Text, muted, primary text or the brand gradient",
      "heading.eyebrow": "Overline text style",
      "heading.subtitle": "Lead text style"
    }
  }
});
