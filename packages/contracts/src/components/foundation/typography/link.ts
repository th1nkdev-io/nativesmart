import { defineContract, property } from "../../../define";

export const linkContract = defineContract({
  status: "preview",
  id: "link",
  name: "Link",
  layer: "foundation",
  category: "typography",
  priority: "P1",
  description: "Inline navigation, internal or external",
  anatomy: ["root", "icon", "text", "external", "arrow"],
  properties: [
    property("href", "string", "Destination", { example: "/conditions" }),
    property("text", "string", "Link text; the default slot can hold it instead", {
      example: "nos conditions d'envoi"
    }),
    property("variant", "enum", "Inside a sentence, or on its own line with an arrow", {
      values: ["inline", "standalone"],
      defaultValue: "inline"
    }),
    property("underline", "enum", "When the underline shows; inline links keep it", {
      values: ["always", "hover", "none"],
      defaultValue: "always"
    }),
    property("tone", "enum", "Link color", {
      values: ["primary", "neutral", "muted", "danger", "inherit"],
      defaultValue: "primary"
    }),
    property("size", "enum", "Text size; inherit follows the sentence", {
      values: ["inherit", "sm", "md", "lg"],
      defaultValue: "inherit"
    }),
    property("icon", "string", "Icon before the text"),
    property("external", "boolean", "Opens in a new tab; detected from another site's address", {
      defaultValue: false
    }),
    property("visited", "boolean", "Visited links take the visited color", {
      defaultValue: false
    }),
    property("download", "boolean", "Downloads the target instead of opening it", {
      defaultValue: false
    }),
    property("disabled", "boolean", "Not followable, in the disabled color", {
      defaultValue: false
    }),
    property("as", "string", "Element or router component, such as RouterLink with to"),
    property("newTabLabel", "string", "Announced after the text of an external link", {
      defaultValue: "opens in a new tab"
    }),
    property("children", "slot", "Link text, when text is not set")
  ],
  states: ["default", "hovered", "focused", "visited", "disabled"],
  accessibility: {
    role: "link",
    requirements: [
      "The text names the destination on its own: never « click here »",
      "Inline links keep an underline, so color is not the only cue",
      "External links open in a new tab with rel noopener and say so to screen readers",
      "A disabled link has no href and aria-disabled, so it is skipped and announced as such",
      "Focus shows a ring around the whole link, wrapped lines included"
    ]
  },
  semanticTokens: ["link.color", "link.hover", "link.visited", "link.underline"],
  docs: {
    anatomy: {
      root: "The a element, or the router component given in as",
      icon: "Optional icon before the text",
      text: "The link text, underlined by default",
      external: "Arrow out of a box after an external link, with its spoken mention",
      arrow: "Standalone links end with an arrow that slides on hover"
    },
    states: {
      hovered: "The hover color, and the underline when it shows on hover",
      focused: "A focus ring around every line of the link",
      visited: "The visited color, when visited is on",
      disabled: "Disabled color, no underline, not focusable"
    },
    tokens: {
      "link.color": "Link text color, or the neutral, muted and danger text colors",
      "link.hover": "Link hover color",
      "link.visited": "Link visited color",
      "link.underline": "1 px underline at 25 % offset, 2 px on hover"
    }
  }
});
