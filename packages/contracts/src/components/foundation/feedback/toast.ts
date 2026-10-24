import { defineContract, property } from "../../../define";

export const toastContract = defineContract({
  status: "preview",
  id: "toast",
  name: "Toast",
  layer: "foundation",
  category: "feedback",
  priority: "P0",
  description: "Short, non-blocking notification",
  anatomy: ["root", "icon", "message", "action", "close-trigger"],
  properties: [
    property("message", "string", "Notification text", {
      required: true,
      example: "Paiement envoyé à Kofi Mensah."
    }),
    property("intent", "enum", "Semantic intent", {
      values: ["info", "success", "warning", "danger"]
    })
  ],
  states: ["entering", "visible", "exiting"],
  events: ["dismiss", "action"],
  accessibility: {
    role: "status",
    requirements: ["Use a non-interrupting announcement unless the message is critical"]
  },
  semanticTokens: ["toast.background", "toast.foreground", "toast.radius", "toast.shadow"]
});
