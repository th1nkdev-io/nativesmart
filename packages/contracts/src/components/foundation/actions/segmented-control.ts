import { defineContract, property } from "../../../define";

export const segmentedControlContract = defineContract({
  status: "preview",
  id: "segmented-control",
  name: "SegmentedControl",
  layer: "foundation",
  category: "actions",
  priority: "P1",
  description: "Mutually exclusive options shown inline",
  anatomy: ["root", "track", "indicator", "segment", "icon", "label"],
  properties: [
    property("options", "string-list", "Choices, as text or with value, icon and disabled", {
      example: ["Jour", "Semaine", "Mois", "Année"]
    }),
    property("value", "string", "The selected option; v-model in Vue", { example: "Semaine" }),
    property("label", "string", "Accessible name of the group", { example: "Période" }),
    property("variant", "enum", "Indicator: a raised surface, a primary fill or an underline", {
      values: ["surface", "primary", "underline"],
      defaultValue: "surface"
    }),
    property("size", "enum", "Control size", {
      values: ["sm", "md", "lg"],
      defaultValue: "md"
    }),
    property("shape", "enum", "Track and indicator corners", {
      values: ["rounded", "pill"],
      defaultValue: "rounded"
    }),
    property("block", "boolean", "Fills the width, segments sharing it equally", {
      defaultValue: false
    }),
    property("iconOnly", "boolean", "Shows the icons only; labels become the accessible names", {
      defaultValue: false
    }),
    property("disabled", "boolean", "Disables every option", { defaultValue: false })
  ],
  events: ["change"],
  states: ["default", "hovered", "focused", "selected", "disabled"],
  accessibility: {
    role: "radiogroup",
    keyboard: ["Tab", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"],
    requirements: [
      "A radiogroup of radios: the selection is announced as checked",
      "Only the selected option is in the tab order; arrows move and select, skipping disabled ones",
      "Arrows follow the reading direction in right-to-left layouts",
      "Icon-only options keep their label as accessible name and tooltip",
      "The sliding indicator is decorative and stops moving under reduced motion"
    ]
  },
  semanticTokens: ["segmented.track", "segmented.indicator", "segmented.text"],
  docs: {
    anatomy: {
      root: "The radiogroup, named by label",
      track: "The muted rail that holds the options",
      indicator: "Slides under the selected option: surface, primary fill or underline",
      segment: "One radio: its icon and label, equal width when block",
      icon: "Optional icon of an option",
      label: "Option text; the accessible name when icons only"
    },
    events: {
      change: { description: "Another option was selected", payload: "The new value" }
    },
    states: {
      hovered: "The text of an unselected option darkens",
      focused: "A focus ring around the option",
      selected: "Strong text over the indicator",
      disabled: "Disabled color; arrows skip it"
    },
    tokens: {
      "segmented.track": "Muted surface, a 3 px inner padding",
      "segmented.indicator": "Raised surface with a card shadow, the primary color, or a 2 px line",
      "segmented.text": "Muted text, strong text when selected, on-primary on a primary fill"
    }
  }
});
