import { defineContract, property } from "../../../define";

export const scrollAreaContract = defineContract({
  status: "preview",
  id: "scroll-area",
  name: "ScrollArea",
  layer: "foundation",
  category: "layout",
  priority: "P1",
  description: "Scrollable region with consistent scrollbars and insets",
  anatomy: ["root", "viewport", "content", "scrollbar", "thumb", "fade"],
  properties: [
    property("orientation", "enum", "Directions that scroll", {
      values: ["vertical", "horizontal", "both"],
      defaultValue: "vertical"
    }),
    property(
      "scrollbars",
      "enum",
      "When the bars show: on hover, while scrolling, always, on overflow, never, or the system's",
      {
        values: ["hover", "scroll", "always", "auto", "hidden", "native"],
        defaultValue: "hover"
      }
    ),
    property("size", "enum", "Bar thickness: 6 or 10 px", {
      values: ["regular", "thin"],
      defaultValue: "regular"
    }),
    property("snap", "enum", "Children snap into place at the start or the centre", {
      values: ["none", "start", "center"],
      defaultValue: "none"
    }),
    property("shadows", "boolean", "Fades the edges where more content is hidden", {
      defaultValue: true
    }),
    property("label", "string", "Accessible name of the region, announced on keyboard focus", {
      example: "Dernières opérations"
    }),
    property("maxHeight", "string", "Height after which the region scrolls", { example: "320px" }),
    property(
      "hideDelay",
      "number",
      "Milliseconds the bars stay after scrolling or hovering stops",
      {
        defaultValue: 600
      }
    ),
    property("itemHeight", "number", "Row height of the virtual list, in pixels", {
      defaultValue: 48
    }),
    property("overscan", "number", "Rows rendered beyond the visible ones in a virtual list", {
      defaultValue: 4
    }),
    property("endThreshold", "number", "Distance from the end at which end-reached fires", {
      defaultValue: 160
    }),
    property("children", "slot", "Scrolling content"),
    property(
      "item",
      "slot",
      "Row of a virtual list, given { item, index }: only visible rows render"
    )
  ],
  states: ["idle", "scrolling", "hovered", "focused"],
  events: ["scroll", "end-reached"],
  accessibility: {
    role: "region",
    keyboard: ["Tab", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"],
    requirements: [
      "A region that scrolls takes keyboard focus, so it can be scrolled without a pointer",
      "Give it a label when the page has several scrolling regions",
      "Scrolling stays native: wheel, touch, inertia and assistive tech work unchanged",
      "In a virtual list, rows keep their place in the set: aria-setsize and aria-posinset"
    ]
  },
  semanticTokens: ["scrollbar.thumb", "scrollbar.size", "motion.fade"],
  docs: {
    anatomy: {
      root: "The frame: clips the content and holds the bars",
      viewport: "The native scroll container: wheel, touch, keyboard and focus happen here",
      content:
        "What scrolls; in a virtual list, a spacer of the full height with only the visible rows",
      scrollbar: "The drawn track, along the end edge or the bottom",
      thumb: "Its draggable handle, sized to the visible share of the content",
      fade: "Edges that fade out where more content is hidden"
    },
    states: {
      idle: "Bars hidden or quiet, depending on the scrollbars setting",
      scrolling: "Bars show while scrolling and for the hide delay after",
      hovered: "With hover bars, the pointer over the region reveals them",
      focused: "The viewport has keyboard focus: arrows, Page and Home and End scroll it"
    },
    events: {
      scroll: { description: "The content moved", payload: "{ top, left } in pixels" },
      "end-reached": {
        description:
          "The end came within the threshold: load the next page; fires again after new content arrives"
      }
    },
    keyboard: {
      ArrowDown: "Scrolls down a line",
      ArrowUp: "Scrolls up a line",
      PageDown: "Scrolls down a page",
      PageUp: "Scrolls up a page",
      Home: "Goes to the top",
      End: "Goes to the bottom"
    },
    tokens: {
      "scrollbar.thumb": "Thumb color, a share of the text color that works in both modes",
      "scrollbar.size": "Bar thickness of 6 or 10 px",
      "motion.fade": "Normal duration for the bars fading in and out"
    }
  }
});
