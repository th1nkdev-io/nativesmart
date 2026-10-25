import { defineContract, property } from "../../../define";

export const buttonContract = defineContract({
  status: "preview",
  id: "button",
  name: "Button",
  layer: "foundation",
  category: "actions",
  priority: "P0",
  description: "Primary action with variants, intents and loading",
  anatomy: ["root", "leading-icon", "label", "trailing-icon", "spinner"],
  properties: [
    property("label", "string", "Accessible button label", { required: true, example: "Envoyer" }),
    property("variant", "enum", "Visual emphasis, from filled to text only", {
      values: ["solid", "soft", "outline", "ghost", "link"],
      defaultValue: "solid"
    }),
    property("intent", "enum", "Semantic intent", {
      values: ["primary", "neutral", "success", "warning", "danger"],
      defaultValue: "primary"
    }),
    property("size", "enum", "Control size: 28 to 56 px high", {
      values: ["xs", "sm", "md", "lg", "xl"],
      defaultValue: "md"
    }),
    property("shape", "enum", "Corners: the brand radius, a pill or square", {
      values: ["rounded", "pill", "sharp"],
      defaultValue: "rounded"
    }),
    property("icon", "string", "Icon before the label", { example: "send" }),
    property("iconEnd", "string", "Icon after the label, such as a chevron"),
    property("loading", "boolean", "Whether an action is pending", { defaultValue: false }),
    property("loadingText", "string", "Label shown beside the spinner while loading"),
    property("block", "boolean", "Takes the full width of its container", { defaultValue: false }),
    property("disabled", "boolean", "Whether interaction is unavailable", {
      defaultValue: false
    }),
    property("href", "string", "Renders a link that looks like a button"),
    property("type", "string", "Form behaviour of a button element: button, submit or reset", {
      defaultValue: "button"
    }),
    property("children", "slot", "Custom label content; label stays the accessible name"),
    property("leading", "slot", "Custom content before the label"),
    property("trailing", "slot", "Custom content after the label, such as a badge")
  ],
  states: ["default", "hovered", "focused", "pressed", "loading", "disabled"],
  events: ["press", "focus", "blur"],
  accessibility: {
    role: "button",
    keyboard: ["Enter", "Space"],
    requirements: [
      "Expose disabled and busy states",
      "Keep a visible focus indicator where keyboard input exists",
      "Meet the target platform minimum touch target",
      "A button that navigates is a link: give it href so it is announced as one",
      "While loading, the button keeps its width and announces that it is busy"
    ]
  },
  semanticTokens: [
    "button.background",
    "button.foreground",
    "button.border",
    "button.radius",
    "button.height",
    "button.padding.inline",
    "button.focus.ring"
  ],
  docs: {
    anatomy: {
      root: "The button or link: background, border, radius and height",
      "leading-icon": "Optional icon before the label",
      label: "The visible text, also its accessible name",
      "trailing-icon": "Optional icon after the label",
      spinner: "Replaces the content while loading, keeping the width"
    },
    events: {
      press: { description: "Activated by click, Enter or Space; not while loading or disabled" },
      focus: { description: "Received keyboard or pointer focus" },
      blur: { description: "Lost focus" }
    },
    states: {
      hovered: "Solid darkens, the others take the intent's muted tint",
      focused: "A focus ring outside the button",
      pressed: "Solid takes the pressed shade and the button sinks by 1 px",
      loading: "A spinner replaces the content; press is ignored and aria-busy is set",
      disabled: "Reduced opacity, not focusable"
    },
    tokens: {
      "button.background": "The intent color, its muted tint or transparent",
      "button.foreground": "On-intent color for solid, the intent text color otherwise",
      "button.border": "The intent color for outline, transparent otherwise",
      "button.radius": "Control radius, full for pill, extra small for sharp",
      "button.height": "Control heights xs 28 to xl 56 px",
      "button.padding.inline": "Grows with the size, from 10 to 28 px",
      "button.focus.ring": "Focus ring color, danger for danger buttons"
    }
  }
});
