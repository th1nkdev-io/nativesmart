import { defineContract, property } from "../../../define";

export const containerContract = defineContract({
  status: "preview",
  id: "container",
  name: "Container",
  layer: "foundation",
  category: "layout",
  priority: "P1",
  description: "Max-width page wrapper with responsive gutters",
  anatomy: ["root", "gutter", "content"],
  properties: [
    property("as", "string", "Rendered element: main, section, header, footer…", {
      example: "section"
    }),
    property(
      "size",
      "enum",
      "Maximum content width: container token, reading measure or full width",
      {
        values: ["sm", "md", "lg", "xl", "2xl", "prose", "full"],
        defaultValue: "xl"
      }
    ),
    property(
      "gutter",
      "enum",
      "Side margins; auto follows the layout grid and widens with the screen",
      {
        values: ["auto", "none", "2", "4", "6", "8", "12"],
        defaultValue: "auto"
      }
    ),
    property("align", "enum", "Content centred, or against the start edge", {
      values: ["center", "start"],
      defaultValue: "center"
    }),
    property("spacing", "enum", "Vertical breathing room of a page section", {
      values: ["none", "sm", "md", "lg", "xl"],
      defaultValue: "none",
      example: "md"
    }),
    property("background", "enum", "Paints the whole band edge to edge; content keeps its width", {
      values: [
        "none",
        "background",
        "surface",
        "surface-muted",
        "surface-brand",
        "surface-inverse"
      ],
      defaultValue: "none",
      example: "surface-muted"
    }),
    property(
      "fixed",
      "boolean",
      "Width steps from breakpoint to breakpoint instead of following the window",
      {
        defaultValue: false
      }
    ),
    property("safeArea", "boolean", "Keeps content clear of notches and rounded screen corners", {
      defaultValue: true
    }),
    property("children", "slot", "Page content; a child marked data-bleed runs edge to edge")
  ],
  states: ["default"],
  accessibility: {
    requirements: [
      "Render page regions with their landmark element: main, header, footer, section with a heading",
      "Keep text within the reading measure: prose limits lines to about 65 characters",
      "Gutters mirror in right-to-left layouts and stay clear of screen notches"
    ]
  },
  semanticTokens: ["layout.container", "layout.margin", "layout.section", "typography.measure"],
  docs: {
    anatomy: {
      root: "The full-width band: carries the background and the vertical section spacing",
      gutter: "Side margins between the screen edge and the content; at least the grid margin",
      content: "The column of content, never wider than the size; data-bleed children escape it"
    },
    states: {
      default: "The container has no interaction; it only follows the screen width"
    },
    tokens: {
      "layout.container": "Maximum widths sm 640, md 768, lg 1024, xl 1280, 2xl 1536",
      "layout.margin": "Grid margin per breakpoint, from 16 px on phones to 48 px on large screens",
      "layout.section": "Vertical spacing of page sections, from 48 to 128 px",
      "typography.measure": "Reading widths of 45, 65 and 80 characters"
    }
  }
});
