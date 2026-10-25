import { defineContract, property } from "../../../define";

export const dividerContract = defineContract({
  status: "preview",
  id: "divider",
  name: "Divider",
  layer: "foundation",
  category: "layout",
  priority: "P0",
  description: "Horizontal or vertical separator",
  anatomy: ["root", "line", "label"],
  properties: [
    property("orientation", "enum", "Divider direction", {
      values: ["horizontal", "vertical"],
      defaultValue: "horizontal"
    }),
    property("variant", "enum", "Line style; gradient fades out at both ends", {
      values: ["solid", "dashed", "dotted", "gradient"],
      defaultValue: "solid"
    }),
    property("thickness", "enum", "Line weight: 1, 2 or 4 px", {
      values: ["thin", "medium", "thick"],
      defaultValue: "thin"
    }),
    property("tone", "enum", "Line color, from the border roles", {
      values: ["subtle", "default", "strong", "primary"],
      defaultValue: "default"
    }),
    property(
      "inset",
      "enum",
      "start lines up with list text; middle keeps a margin on both sides",
      {
        values: ["none", "start", "middle"],
        defaultValue: "none"
      }
    ),
    property("spacing", "enum", "Space before and after the line", {
      values: ["none", "sm", "md", "lg"],
      defaultValue: "none"
    }),
    property("label", "string", "Short text on the line, such as « ou » or a section name", {
      example: "ou"
    }),
    property("labelPlacement", "enum", "Where the label sits on the line", {
      values: ["start", "center", "end"],
      defaultValue: "center"
    }),
    property("decorative", "boolean", "Purely visual: hidden from assistive tech", {
      defaultValue: false
    }),
    property("disabled", "boolean", "Dimmed with the content it separates", {
      defaultValue: false
    }),
    property("children", "slot", "Custom label: icon, badge or button in place of the text")
  ],
  states: ["default", "disabled"],
  accessibility: {
    role: "separator",
    requirements: [
      "Expose a separator with its orientation, unless it is purely decorative",
      "A labelled divider reads its label as plain text; the lines around it are hidden",
      "Never rely on the line alone to group content: headings and lists carry the structure"
    ]
  },
  semanticTokens: ["divider.color", "divider.width", "divider.inset", "divider.spacing"],
  docs: {
    anatomy: {
      root: "The separator: orientation, inset and spacing apply here",
      line: "The stroke: solid, dashed, dotted or gradient, in a border color",
      label: "Optional text or content on the line, at the start, centre or end"
    },
    states: {
      disabled: "The line and its label take the disabled colors"
    },
    tokens: {
      "divider.color": "Border roles: subtle, default, strong, or the primary color",
      "divider.width": "Line weights of 1, 2 and 4 px",
      "divider.inset": "Start inset of 56 px, the width of a list avatar and its gap",
      "divider.spacing": "Space around the line: 8, 16 or 24 px"
    }
  }
});
