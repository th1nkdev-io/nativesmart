import { defineContract, property } from "../../../define";

export const modalContract = defineContract({
  status: "preview",
  id: "modal",
  name: "Modal",
  layer: "foundation",
  category: "overlays",
  priority: "P0",
  description: "Blocking dialog with focus trap",
  anatomy: ["backdrop", "container", "title", "content", "actions", "close-trigger"],
  properties: [
    property("open", "boolean", "Visibility state", { required: true }),
    property("children", "slot", "Modal content")
  ],
  states: ["closed", "opening", "open", "closing"],
  events: ["open-change", "dismiss"],
  accessibility: {
    role: "dialog",
    keyboard: ["Escape", "Tab"],
    requirements: ["Trap and restore focus on keyboard platforms", "Expose a dialog title"]
  },
  semanticTokens: ["modal.backdrop", "modal.background", "modal.radius", "modal.shadow"]
});
