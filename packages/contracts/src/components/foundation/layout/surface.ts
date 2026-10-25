import { defineContract, property } from "../../../define";

export const surfaceContract = defineContract({
  status: "preview",
  id: "surface",
  name: "Surface",
  layer: "foundation",
  category: "layout",
  priority: "P2",
  description: "Elevated layer with shadow and tonal background",
  anatomy: ["root", "content", "border", "shadow"],
  properties: [
    property(
      "level",
      "enum",
      "Height of the layer: background and shadow together; auto sits one level above its parent",
      {
        values: ["auto", "sunken", "base", "raised", "floating", "overlay"],
        defaultValue: "auto"
      }
    ),
    property("variant", "enum", "How the layer stands out: shadow, outline, fill or glass", {
      values: ["elevated", "outlined", "filled", "glass"],
      defaultValue: "elevated"
    }),
    property("tone", "enum", "Color of the layer; text and borders follow", {
      values: ["neutral", "primary", "success", "warning", "danger", "info", "brand", "inverse"],
      defaultValue: "neutral"
    }),
    property("radius", "enum", "Corner radius, from the radius scale", {
      values: ["none", "sm", "md", "lg", "xl", "2xl"],
      defaultValue: "lg"
    }),
    property("padding", "enum", "Inner space: 0, 8, 16, 24 or 32 px", {
      values: ["none", "sm", "md", "lg", "xl"],
      defaultValue: "md"
    }),
    property("as", "string", "Element to render: section, article, button, a…", {
      defaultValue: "div"
    }),
    property("interactive", "boolean", "Lifts on hover, presses down and shows a focus ring", {
      defaultValue: false
    }),
    property("selected", "boolean", "Outlined in the primary color, as a chosen option", {
      defaultValue: false
    }),
    property("disabled", "boolean", "Dimmed and no longer interactive", { defaultValue: false }),
    property("children", "slot", "Content of the layer; receives the resolved level")
  ],
  states: ["default", "hovered", "pressed", "focused", "selected", "disabled"],
  accessibility: {
    role: "none",
    requirements: [
      "A surface adds no role: pick the element, such as section with a heading or button",
      "An interactive surface is focusable and activates with Enter and Space",
      "Selected state is exposed with aria-pressed or aria-selected by the parent pattern",
      "Text on a toned surface keeps a 4.5:1 contrast: use its on-color, never the default text"
    ]
  },
  semanticTokens: [
    "surface.background",
    "surface.elevation",
    "surface.border",
    "surface.radius",
    "surface.padding"
  ],
  docs: {
    anatomy: {
      root: "The layer: background, radius and padding of its level and tone",
      content: "Whatever it holds; text takes the tone's on-color",
      border: "Outline of outlined and glass variants, and of the selected state",
      shadow: "Elevation of the level, lifted one step on hover when interactive"
    },
    states: {
      hovered: "Interactive: the shadow rises one level",
      pressed: "Interactive: the layer settles back and shrinks slightly",
      focused: "Keyboard focus draws the focus ring outside the layer",
      selected: "A 2 px primary outline",
      disabled: "Disabled colors, no shadow, no pointer events"
    },
    tokens: {
      "surface.background":
        "sunken, base, raised and floating surface colors, or the tone's muted color",
      "surface.elevation": "flat, card, raised, popover and modal shadows",
      "surface.border": "Subtle border, or the tone's border color",
      "surface.radius": "Radius scale from none to 2xl",
      "surface.padding": "Spacing steps 0, 2, 4, 6 and 8"
    }
  }
});
