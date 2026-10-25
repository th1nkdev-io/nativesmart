import { defineContract, property } from "../../../define";

const space = ["layout", "0", "1", "2", "3", "4", "6", "8"];

export const gridContract = defineContract({
  status: "preview",
  id: "grid",
  name: "Grid",
  layer: "foundation",
  category: "layout",
  priority: "P1",
  description: "Responsive columns",
  anatomy: ["root", "column", "gutter", "item"],
  properties: [
    property(
      "columns",
      "enum",
      "Number of columns, or layout: 4 on phones, 8 on tablets, 12 on desktops",
      {
        values: ["12", "layout", "8", "6", "4", "3", "2", "1"],
        defaultValue: "12"
      }
    ),
    property("gap", "enum", "Space between cells; layout follows the layout gutter, 16 to 32 px", {
      values: space,
      defaultValue: "layout"
    }),
    property("align", "enum", "Vertical alignment of cells in their row", {
      values: ["stretch", "start", "center", "end", "baseline"],
      defaultValue: "stretch"
    }),
    property("justify", "enum", "Horizontal alignment of cells in their columns", {
      values: ["stretch", "start", "center", "end"],
      defaultValue: "stretch"
    }),
    property(
      "minItemWidth",
      "string",
      "Fluid grid: as many columns as fit, each at least this wide (240px)"
    ),
    property("breakpoints", "enum", "What breakpoints measure: the window, or the grid itself", {
      values: ["viewport", "container"],
      defaultValue: "viewport"
    }),
    property("dense", "boolean", "Fills holes left by wide items with later, smaller ones", {
      defaultValue: false
    }),
    property("children", "slot", "Grid items")
  ],
  subcomponents: [
    {
      name: "GridItem",
      description:
        "One cell. Every property takes a value per breakpoint: { base: 12, md: 6, lg: 4 }",
      properties: [
        property("span", "number", "Columns taken, or full; never more than the grid has", {
          defaultValue: 1
        }),
        property("offset", "number", "Empty columns before the item", { defaultValue: 0 }),
        property(
          "order",
          "number",
          "Display order, or first and last; reading order stays the source order",
          {
            defaultValue: 0
          }
        ),
        property("rowSpan", "number", "Rows taken", { defaultValue: 1 }),
        property("align", "enum", "Vertical alignment of this item only", {
          values: ["start", "center", "end", "stretch", "baseline"]
        })
      ]
    }
  ],
  states: ["default"],
  accessibility: {
    requirements: [
      "Keep the source order meaningful: order and dense move cells visually, never for screen readers",
      'Render a list of similar cards as a list: as="ul" with items as li',
      "Gutters and columns follow the reading direction in right-to-left layouts"
    ]
  },
  semanticTokens: ["layout.columns", "layout.gutter", "layout.breakpoints"],
  docs: {
    anatomy: {
      root: "The grid: columns, gaps and alignment apply here",
      column: "Equal tracks the items snap to: 12, the layout count, or as many as fit",
      gutter: "Space between columns and rows, from the layout gutter or the spacing scale",
      item: "A cell spanning one or more columns, offset and ordered per breakpoint"
    },
    states: {
      default: "The grid has no interaction; it reflows with the window or with its own width"
    },
    tokens: {
      "layout.columns": "Layout grid of 4 columns on phones, 8 on tablets and 12 on desktops",
      "layout.gutter": "Gutter of 16 px on phones, 24 px on tablets and 32 px on large screens",
      "layout.breakpoints": "sm 640, md 768, lg 1024 and xl 1280 px, for the window or the grid"
    }
  }
});
