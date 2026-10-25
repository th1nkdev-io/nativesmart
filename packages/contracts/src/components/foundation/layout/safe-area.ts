import { defineContract, property } from "../../../define";

export const safeAreaContract = defineContract({
  status: "preview",
  id: "safe-area",
  name: "SafeArea",
  layer: "foundation",
  category: "layout",
  priority: "P1",
  description: "Respects notches, status and navigation bars",
  platforms: ["mobile", "web"],
  anatomy: ["root", "inset", "content"],
  properties: [
    property("edges", "enum", "Edges kept clear; start and end follow the reading direction", {
      values: ["all", "top", "bottom", "vertical", "horizontal", "none"],
      defaultValue: "all"
    }),
    property(
      "mode",
      "enum",
      "padding keeps the background under the notch; margin leaves it uncovered",
      {
        values: ["padding", "margin"],
        defaultValue: "padding"
      }
    ),
    property("minimum", "enum", "Smallest space on each kept edge, even without an inset", {
      values: ["0", "2", "3", "4", "6", "8"],
      defaultValue: "0"
    }),
    property("spacing", "enum", "Space added on top of the inset", {
      values: ["0", "2", "3", "4", "6", "8"],
      defaultValue: "0"
    }),
    property("children", "slot", "Screen or bar content")
  ],
  states: ["default"],
  accessibility: {
    requirements: [
      "Interactive elements never sit under a notch, a rounded corner or the home indicator",
      "Touch targets near the bottom keep clear of the system gesture area",
      "Edges follow the reading direction: start and end swap in right-to-left layouts"
    ]
  },
  semanticTokens: ["safe-area.insets", "safe-area.minimum", "layout.spacing"],
  docs: {
    anatomy: {
      root: "The frame: background, padding or margin on the kept edges",
      inset: "Space the screen reserves: notch, status bar, rounded corners, home indicator",
      content: "Everything inside, laid out clear of the insets"
    },
    states: {
      default: "Follows the device insets, which change with rotation"
    },
    tokens: {
      "safe-area.insets":
        "env(safe-area-inset-*) on the web, the window insets on native platforms",
      "safe-area.minimum": "Floor applied to each kept edge, a step of the spacing scale",
      "layout.spacing": "Extra space added above the inset"
    }
  }
});
