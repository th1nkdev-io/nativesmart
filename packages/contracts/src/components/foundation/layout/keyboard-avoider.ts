import { defineContract, property } from "../../../define";

export const keyboardAvoiderContract = defineContract({
  status: "preview",
  id: "keyboard-avoider",
  name: "KeyboardAvoider",
  layer: "foundation",
  category: "layout",
  priority: "P1",
  description: "Keeps focused inputs visible above the keyboard",
  platforms: ["mobile", "web"],
  anatomy: ["root", "content", "accessory", "inset"],
  properties: [
    property(
      "behavior",
      "enum",
      "How room is made: shrink the scroll area, cap the height, or lift the frame",
      {
        values: ["padding", "height", "translate", "none"],
        defaultValue: "padding"
      }
    ),
    property("offset", "number", "Pixels already covered above the frame, such as a fixed header", {
      defaultValue: 0
    }),
    property("focusGap", "enum", "Space kept between the focused field and the keyboard", {
      values: ["0", "2", "4", "6", "8"],
      defaultValue: "4"
    }),
    property(
      "scrollToFocused",
      "boolean",
      "Brings the focused field into view when the keyboard opens",
      {
        defaultValue: true
      }
    ),
    property("enabled", "boolean", "Turns the avoidance on or off", { defaultValue: true }),
    property(
      "keyboardHeight",
      "number",
      "Keyboard height from a native shell or for previews, instead of detection"
    ),
    property("children", "slot", "Screen content: a form, a chat, a sheet"),
    property("accessory", "slot", "Bar that rides above the keyboard: send button, toolbar, total")
  ],
  states: ["keyboard-hidden", "keyboard-visible", "disabled"],
  events: ["keyboard-change"],
  accessibility: {
    requirements: [
      "The focused field is never hidden behind the keyboard",
      "Focus order is unchanged: avoidance only moves pixels, never the reading order",
      "Movement follows the keyboard's own curve and stops when reduced motion is requested"
    ]
  },
  semanticTokens: ["keyboard.inset", "keyboard.gap", "motion.keyboard"],
  docs: {
    anatomy: {
      root: "The screen frame: fills its parent and makes room for the keyboard",
      content: "Scrolling area holding the fields; the focused one is scrolled into view",
      accessory: "Optional bar at the bottom that stays just above the keyboard",
      inset: "The keyboard's height minus the offset: the room made at the bottom"
    },
    states: {
      "keyboard-hidden": "No keyboard: the frame uses the whole height",
      "keyboard-visible": "The keyboard is open: room is made and the focused field stays visible",
      disabled: "Avoidance is off; the keyboard covers the bottom of the frame"
    },
    events: {
      "keyboard-change": {
        description: "The keyboard opened, closed or changed height",
        payload: "{ visible, height } in pixels"
      }
    },
    tokens: {
      "keyboard.inset": "Measured keyboard height, as --ns-keyboard-inset",
      "keyboard.gap": "Space above the focused field, a step of the spacing scale",
      "motion.keyboard":
        "Moderate duration and emphasized decelerate curve, close to the system keyboard"
    }
  }
});
