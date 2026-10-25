import { defineContract, property } from "../../../define";

export const spacerContract = defineContract({
  status: "preview",
  id: "spacer",
  name: "Spacer",
  layer: "foundation",
  category: "layout",
  priority: "P2",
  description: "Flexible or fixed empty space inside a stack",
  anatomy: ["root", "fill", "label"],
  properties: [
    property(
      "size",
      "enum",
      "auto takes the free space; a step reserves a fixed space; none collapses it",
      {
        values: ["auto", "none", "xs", "sm", "md", "lg", "xl", "2xl"],
        defaultValue: "auto"
      }
    ),
    property("grow", "number", "Share of the free space when several auto spacers split it", {
      defaultValue: 1
    }),
    property("minSize", "enum", "Space an auto spacer keeps even when the row is full", {
      values: ["none", "xs", "sm", "md", "lg"],
      defaultValue: "none"
    }),
    property(
      "axis",
      "enum",
      "auto follows the parent's flex direction; horizontal or vertical also work in normal flow",
      {
        values: ["auto", "horizontal", "vertical"],
        defaultValue: "auto"
      }
    ),
    property("reveal", "boolean", "Draws the space with its size, to check a layout", {
      defaultValue: false
    })
  ],
  states: ["default", "revealed"],
  accessibility: {
    role: "none",
    requirements: [
      "Hidden from assistive tech: it carries no content and no meaning",
      "Never use empty space alone to separate groups that a heading or list should structure",
      "Spacing follows the reading direction, so it mirrors in right-to-left layouts"
    ]
  },
  semanticTokens: ["spacer.size", "spacer.grow"],
  docs: {
    anatomy: {
      root: "The empty element: it grows into the free space or keeps a fixed size",
      fill: "Hatching that shows the space, only with reveal",
      label: "The size read out in the middle, only with reveal"
    },
    states: {
      revealed: "The space is hatched in the primary color, with its size in the middle"
    },
    tokens: {
      "spacer.size": "Spacing steps: xs 4, sm 8, md 16, lg 24, xl 32 and 2xl 48 px",
      "spacer.grow": "Flex grow factor of auto spacers, 1 by default"
    }
  }
});
