import { defineContract, property } from "../../../define";

const space = ["0", "1", "2", "3", "4", "6", "8", "12"];

export const boxContract = defineContract({
  status: "preview",
  id: "box",
  name: "Box",
  layer: "foundation",
  category: "layout",
  priority: "P0",
  description: "Base container with spacing, background and border tokens",
  anatomy: ["root", "content"],
  properties: [
    property("as", "string", "Rendered element: section, nav, li, button…", { example: "section" }),
    property("padding", "enum", "Inner spacing on every side, a step of the spacing scale", {
      values: space,
      example: "6"
    }),
    property("display", "enum", "Layout mode of the children", {
      values: ["block", "flex", "grid", "inline-flex", "none"],
      example: "flex"
    }),
    property("direction", "enum", "Main axis of a flex box", {
      values: ["row", "column", "row-reverse", "column-reverse"],
      example: "column"
    }),
    property("gap", "enum", "Space between children, with flex or grid", {
      values: space,
      example: "3"
    }),
    property("align", "enum", "Alignment of children across the main axis", {
      values: ["start", "center", "end", "stretch", "baseline"],
      defaultValue: "stretch"
    }),
    property("justify", "enum", "Distribution of children along the main axis", {
      values: ["start", "center", "end", "between", "around", "evenly"],
      defaultValue: "start"
    }),
    property("background", "enum", "Surface or tinted background role", {
      values: [
        "none",
        "surface",
        "surface-muted",
        "surface-raised",
        "surface-sunken",
        "surface-brand",
        "surface-inverse",
        "primary-muted",
        "success-muted",
        "warning-muted",
        "danger-muted"
      ],
      defaultValue: "none",
      example: "surface-muted"
    }),
    property("tone", "enum", "Text color; auto follows the background to keep contrast", {
      values: ["auto", "default", "muted", "subtle", "inherit"],
      defaultValue: "auto"
    }),
    property("border", "enum", "Border weight", {
      values: ["none", "subtle", "default", "strong", "dashed"],
      defaultValue: "none",
      example: "subtle"
    }),
    property("radius", "enum", "Corner radius token", {
      values: ["none", "sm", "md", "lg", "xl", "2xl", "card", "full"],
      defaultValue: "none",
      example: "xl"
    }),
    property("elevation", "enum", "Shadow level", {
      values: ["0", "1", "2", "3", "4", "5"],
      defaultValue: "0"
    }),
    property("material", "enum", "Translucent blurred surface over busy content", {
      values: ["none", "thin", "regular", "thick"],
      defaultValue: "none"
    }),
    property("wrap", "boolean", "Children wrap onto new lines", { defaultValue: false }),
    property(
      "interactive",
      "boolean",
      "Hover and pressed feedback, for a box that is a button or link",
      {
        defaultValue: false
      }
    ),
    property("disabled", "boolean", "Dimmed and not interactive", { defaultValue: false }),
    property("children", "slot", "Box content")
  ],
  states: ["default", "hovered", "pressed", "focused", "disabled"],
  accessibility: {
    requirements: [
      "Use a meaningful element through `as` (section, nav, aside, li) instead of a generic box",
      "A box that acts must be a button or a link, never a clickable div",
      "Text keeps AA contrast on every background: the auto tone follows the background",
      "Spacing uses logical sides, so layouts mirror in right-to-left languages"
    ]
  },
  semanticTokens: [
    "layout.spacing",
    "box.background",
    "box.border",
    "box.radius",
    "box.elevation",
    "box.material"
  ],
  docs: {
    anatomy: {
      root: "The box itself: spacing, background, border, radius and shadow all apply here",
      content: "Whatever the box holds, laid out by display, direction, gap and alignment"
    },
    states: {
      hovered: "Interactive boxes take the hover surface",
      pressed: "Interactive boxes sink slightly while pressed",
      focused: "A box rendered as a button or link shows the focus ring",
      disabled: "Dimmed, ignores pointer and keyboard"
    },
    tokens: {
      "layout.spacing": "Padding, margin and gap steps of the spacing scale, per breakpoint",
      "box.background": "Surface roles and tinted backgrounds, each paired with its text color",
      "box.border": "Subtle, default and strong border colors",
      "box.radius": "Corner radius scale and component radii",
      "box.elevation": "Shadow levels 0 to 5, lighter in dark mode",
      "box.material": "Translucent fills and blur of thin, regular and thick materials"
    }
  }
});
