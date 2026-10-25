import { defineContract, property } from "../../../define";

export const stackContract = defineContract({
  status: "preview",
  id: "stack",
  name: "Stack",
  layer: "foundation",
  category: "layout",
  priority: "P1",
  description: "Vertical or horizontal layout with consistent gap",
  anatomy: ["root", "item", "gap", "divider"],
  properties: [
    property("direction", "enum", "Axis of the stack; it can change from a breakpoint up", {
      values: ["column", "row", "column-reverse", "row-reverse"],
      defaultValue: "column"
    }),
    property("gap", "enum", "Space between items, from the spacing scale", {
      values: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
      defaultValue: "md"
    }),
    property("align", "enum", "Alignment across the axis", {
      values: ["stretch", "start", "center", "end", "baseline"],
      defaultValue: "stretch"
    }),
    property("justify", "enum", "Distribution along the axis", {
      values: ["start", "center", "end", "between", "around", "evenly"],
      defaultValue: "start"
    }),
    property("wrap", "boolean", "Items flow onto new lines when the row is full", {
      defaultValue: false
    }),
    property("divided", "boolean", "Draws a line between items, in the middle of the gap", {
      defaultValue: false
    }),
    property("fill", "boolean", "Items share the length equally, such as a row of buttons", {
      defaultValue: false
    }),
    property(
      "compact",
      "boolean",
      "Joins the items into one group: no gap, shared borders, outer corners only",
      { defaultValue: false }
    ),
    property("inline", "boolean", "Sits in a line of text like a word, sized to its items", {
      defaultValue: false
    }),
    property("as", "string", "Element to render: ul or ol for a list, nav, section…", {
      defaultValue: "div"
    }),
    property("children", "slot", "The items, in order"),
    property("divider", "slot", "Custom separator between items, in place of the line")
  ],
  states: ["default"],
  accessibility: {
    role: "none",
    requirements: [
      "The stack adds no role: render it as a list (ul, ol) when its items form one",
      "Reverse directions change the visual order only: keep the source in reading order",
      "Separators are decorative and hidden from assistive tech",
      "Spacing and alignment follow the reading direction and mirror in right-to-left layouts"
    ]
  },
  semanticTokens: ["stack.gap", "stack.divider.color"],
  docs: {
    anatomy: {
      root: "The flex container: direction, alignment, wrapping and gap apply here",
      item: "Each child, left as it is; with fill they share the length equally",
      gap: "The space between two items, one step of the spacing scale",
      divider: "Optional line or custom separator, centred in each gap"
    },
    tokens: {
      "stack.gap": "Spacing steps: xs 4, sm 8, md 16, lg 24, xl 32 and 2xl 48 px",
      "stack.divider.color": "The subtle border color, as in Divider"
    }
  }
});
