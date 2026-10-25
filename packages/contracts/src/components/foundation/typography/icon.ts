import { defineContract, property } from "../../../define";

export const iconContract = defineContract({
  status: "preview",
  id: "icon",
  name: "Icon",
  layer: "foundation",
  category: "typography",
  priority: "P0",
  description: "Named icon with decorative or meaningful semantics",
  anatomy: ["root", "glyph", "container"],
  properties: [
    property("name", "string", "Icon identifier", { required: true, example: "heart" }),
    property("label", "string", "Meaning when the icon is not decorative"),
    property("size", "enum", "Glyph size, from 10 to 48 px", {
      values: ["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"],
      defaultValue: "md"
    }),
    property("tone", "enum", "Color; current takes the surrounding text color", {
      values: ["current", "muted", "primary", "success", "warning", "danger", "info"],
      defaultValue: "current"
    }),
    property("variant", "enum", "Glyph alone, or inside a tinted, solid or outlined container", {
      values: ["plain", "soft", "solid", "outline"],
      defaultValue: "plain"
    }),
    property("shape", "enum", "Container shape", {
      values: ["circle", "rounded", "square"],
      defaultValue: "rounded"
    }),
    property("stroke", "enum", "Line weight; auto thins the largest sizes", {
      values: ["auto", "thin", "regular", "bold"],
      defaultValue: "auto"
    }),
    property("rotate", "enum", "Quarter turns, for arrows and chevrons", {
      values: ["0", "90", "180", "270"],
      defaultValue: "0"
    }),
    property("flip", "enum", "Mirrors the glyph", {
      values: ["none", "horizontal", "vertical"],
      defaultValue: "none"
    }),
    property("spin", "boolean", "Turns continuously, for loading or syncing", {
      defaultValue: false
    }),
    property("disabled", "boolean", "Takes the disabled color", { defaultValue: false })
  ],
  states: ["default", "spinning", "disabled"],
  accessibility: {
    role: "img",
    requirements: [
      "Decorative by default: hidden from assistive tech when it has no label",
      "An icon that carries meaning alone, such as a status, gets a label read as an image",
      "An icon inside a labelled button stays decorative; the button carries the name",
      "Arrows and chevrons pointing sideways mirror in right-to-left layouts",
      "Spinning stops when the system asks for reduced motion"
    ]
  },
  semanticTokens: ["icon.color", "icon.size", "icon.stroke", "icon.container"],
  docs: {
    anatomy: {
      root: "The svg, or the container that holds it",
      glyph: "Stroke paths drawn on a 24 × 24 grid in the current color",
      container: "Optional circle or rounded square, tinted, solid or outlined in the tone"
    },
    states: {
      spinning: "One turn per second, stopped under reduced motion",
      disabled: "Disabled text color, container in the disabled surface"
    },
    tokens: {
      "icon.color": "Current text color, or the tone's text color",
      "icon.size": "Icon sizes from 2xs 10 px to 3xl 48 px",
      "icon.stroke": "Thin, regular and bold stroke widths",
      "icon.container": "Tone muted background, solid tone or tone border, about twice the glyph"
    }
  }
});
