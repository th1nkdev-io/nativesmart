import { defineContract, property } from "../../../define";

export const listContract = defineContract({
  status: "preview",
  id: "list",
  name: "List",
  layer: "foundation",
  category: "typography",
  priority: "P2",
  description: "Ordered and unordered text lists",
  anatomy: ["root", "item", "marker", "title", "description", "connector"],
  properties: [
    property("items", "string-list", "Items as text; the default slot can hold li elements", {
      example: ["Créez votre compte", "Ajoutez un bénéficiaire", "Envoyez en un geste"]
    }),
    property(
      "marker",
      "enum",
      "Bullet, number, check, dash, a custom icon, numbered steps or none",
      {
        values: ["bullet", "number", "check", "dash", "icon", "steps", "none"],
        defaultValue: "bullet"
      }
    ),
    property("icon", "string", "Icon of the icon marker", { defaultValue: "star" }),
    property("tone", "enum", "Marker color", {
      values: ["neutral", "primary", "success", "warning", "danger"],
      defaultValue: "primary"
    }),
    property("size", "enum", "Text and marker size", {
      values: ["sm", "md", "lg"],
      defaultValue: "md"
    }),
    property("spacing", "enum", "Space between items", {
      values: ["tight", "normal", "relaxed"],
      defaultValue: "normal"
    }),
    property("columns", "enum", "Items flow into columns on wide screens", {
      values: ["1", "2", "3"],
      defaultValue: "1"
    }),
    property("dividers", "boolean", "A line between items", { defaultValue: false }),
    property("start", "number", "First number of an ordered list", { defaultValue: 1 }),
    property("label", "string", "Accessible name, when the list needs one"),
    property("children", "slot", "li elements, when items is not set"),
    property("item", "slot", "Custom rendering of each item")
  ],
  states: ["default"],
  accessibility: {
    role: "list",
    requirements: [
      "Numbers and steps render an ol, other markers a ul, so the order is announced when it matters",
      "Markers are generated content: they are not read, the list semantics carry the meaning",
      "role list is set explicitly, since browsers drop list semantics when markers are styled",
      "An item's description belongs to it and is read with its title"
    ]
  },
  semanticTokens: ["list.marker", "list.gap", "list.step", "list.divider"],
  docs: {
    anatomy: {
      root: "A ul or an ol, with its spacing, columns and dividers",
      item: "One li: the marker, then its title and description",
      marker: "Bullet, number, check, dash or icon, in the tone color",
      title: "The item text",
      description: "Optional muted line under the title",
      connector: "With steps, the line joining one number to the next"
    },
    tokens: {
      "list.marker": "Tone colors; steps use the tone fill with its on-color",
      "list.gap": "Item spacing 4, 8 or 16 px",
      "list.step": "Numbered circles of 24 to 32 px",
      "list.divider": "Subtle border between items"
    }
  }
});
