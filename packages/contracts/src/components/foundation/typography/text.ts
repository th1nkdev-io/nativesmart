import { defineContract, property } from "../../../define";

export const textContract = defineContract({
  status: "preview",
  id: "text",
  name: "Text",
  layer: "foundation",
  category: "typography",
  priority: "P0",
  description: "Body, caption and label text with semantic roles",
  anatomy: ["root", "content", "mark", "expand", "copy"],
  properties: [
    property("children", "slot", "Text content", { required: true }),
    property("role", "enum", "Semantic text role: picks the text style and the element", {
      values: ["body", "lead", "label", "caption", "overline", "quote", "heading", "display"],
      defaultValue: "body"
    }),
    property("size", "enum", "Body and label sizes; auto takes the role's", {
      values: ["auto", "xs", "sm", "md", "lg"],
      defaultValue: "auto"
    }),
    property("weight", "enum", "Font weight; auto takes the role's", {
      values: ["auto", "regular", "medium", "semibold", "bold"],
      defaultValue: "auto"
    }),
    property("tone", "enum", "Text color", {
      values: ["default", "muted", "subtle", "primary", "success", "warning", "danger", "inherit"],
      defaultValue: "default"
    }),
    property("align", "enum", "Alignment, following the reading direction", {
      values: ["start", "center", "end", "justify"],
      defaultValue: "start"
    }),
    property("lines", "number", "Lines kept before an ellipsis"),
    property("expandable", "boolean", "With lines: a button reveals the rest", {
      defaultValue: false
    }),
    property("truncate", "boolean", "Cuts the text on one line with an ellipsis", {
      defaultValue: false
    }),
    property("strong", "boolean", "Bold, for importance", { defaultValue: false }),
    property("italic", "boolean", "Italic, for emphasis or a term", { defaultValue: false }),
    property("underline", "boolean", "Underlined", { defaultValue: false }),
    property("strike", "boolean", "Struck through, such as an old price", { defaultValue: false }),
    property("mark", "boolean", "Highlighted, such as a search match", { defaultValue: false }),
    property("numeric", "boolean", "Tabular figures, so amounts line up", { defaultValue: false }),
    property("copyable", "boolean", "Adds a button that copies the text", { defaultValue: false }),
    property("disabled", "boolean", "Disabled color", { defaultValue: false }),
    property("level", "number", "Heading level, 1 to 6, for the heading role", {
      defaultValue: 2
    }),
    property("as", "string", "Element, when the role's default does not fit: legend, dt…")
  ],
  events: ["copy", "expand"],
  states: ["default", "clamped", "expanded", "copied", "disabled"],
  accessibility: {
    role: "none",
    requirements: [
      "The role picks a matching element: p for body and lead, blockquote for quote, h1 to h6 for heading",
      "Strong, italic, strike and mark render strong, em, s and mark, so their meaning is announced",
      "Clamped text stays whole in the page; the expand button says whether it is open",
      "Color alone never carries meaning: a danger tone sits beside a word or an icon"
    ]
  },
  semanticTokens: ["text.style", "text.color", "text.mark"],
  docs: {
    anatomy: {
      root: "The element of the role: p, span, blockquote or a heading",
      content: "The text, wrapped in strong, em, s or mark when decorated",
      mark: "Highlight in the warning tint, such as a search match",
      expand: "Shows the clamped rest, then folds it back",
      copy: "Copies the plain text and confirms with a check"
    },
    events: {
      copy: { description: "The text was copied", payload: "The copied text" },
      expand: { description: "The clamped text opened or closed", payload: "Whether it is open" }
    },
    states: {
      clamped: "Lines beyond the limit hide behind an ellipsis",
      expanded: "The whole text shows, with a button to fold it",
      copied: "The copy icon turns into a check for two seconds",
      disabled: "Disabled text color"
    },
    tokens: {
      "text.style": "Text styles body, lead, label, caption, overline, quote, h1 to h6 and display",
      "text.color": "Text, muted, subtle and the tones' text colors",
      "text.mark": "Warning muted background with its on-color"
    }
  }
});
