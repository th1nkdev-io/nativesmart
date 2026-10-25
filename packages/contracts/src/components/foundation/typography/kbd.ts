import { defineContract, property } from "../../../define";

export const kbdContract = defineContract({
  status: "preview",
  id: "kbd",
  name: "Kbd",
  layer: "foundation",
  category: "typography",
  priority: "P2",
  description: "Keyboard shortcut hint",
  platforms: ["web", "desktop"],
  anatomy: ["root", "key", "separator"],
  properties: [
    property("keys", "string", "Shortcut such as mod+k, or keys in sequence such as g i", {
      example: "mod+shift+p"
    }),
    property(
      "platform",
      "enum",
      "Whose keyboard: auto reads the device; mod is ⌘ on Apple, Ctrl elsewhere",
      {
        values: ["auto", "apple", "other"],
        defaultValue: "auto"
      }
    ),
    property("display", "enum", "Modifier symbols such as ⌘ ⇧, or their names", {
      values: ["symbol", "text"],
      defaultValue: "symbol"
    }),
    property(
      "separator",
      "enum",
      "Between the keys of a combination; a sequence always reads then",
      {
        values: ["none", "plus"],
        defaultValue: "none"
      }
    ),
    property("variant", "enum", "Raised keycap, flat tint or bare text", {
      values: ["keycap", "soft", "ghost"],
      defaultValue: "keycap"
    }),
    property("size", "enum", "Key size", { values: ["sm", "md", "lg"], defaultValue: "md" }),
    property("listen", "boolean", "Lights up the keys the user presses and emits match", {
      defaultValue: false
    }),
    property("label", "string", "Spoken text, in place of the generated key names"),
    property("thenLabel", "string", "Word between keys of a sequence", { defaultValue: "then" }),
    property("children", "slot", "A single key, when keys is not set")
  ],
  events: ["match"],
  states: ["default", "pressed", "matched"],
  accessibility: {
    role: "none",
    requirements: [
      "A kbd element holds one kbd per key, as HTML describes a key combination",
      "Symbols are hidden from assistive tech and read as names: Command, Shift, P",
      "The hint never replaces the visible control: the shortcut is a second way in",
      "Listening only highlights; the page still owns the shortcut and its behaviour"
    ]
  },
  semanticTokens: ["kbd.font", "kbd.surface", "kbd.border", "kbd.pressed"],
  docs: {
    anatomy: {
      root: "An outer kbd holding the keys, read as one shortcut",
      key: "One kbd per key, as a keycap with a bottom edge",
      separator: "A plus or nothing between combined keys, the then word in a sequence"
    },
    events: {
      match: { description: "With listen, every key of the combination is held down" }
    },
    states: {
      pressed: "With listen, a held key sinks and takes the primary tint",
      matched: "The whole shortcut flashes in the success color"
    },
    tokens: {
      "kbd.font": "Kbd text style, mono family",
      "kbd.surface": "Raised surface with a 2 px bottom edge in the strong border",
      "kbd.border": "Default border color",
      "kbd.pressed": "Primary muted tint, edge flattened"
    }
  }
});
