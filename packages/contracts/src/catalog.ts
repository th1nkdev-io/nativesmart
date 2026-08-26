import type { ComponentContract, ComponentProperty } from "./types";

const commonStates = ["default", "disabled"] as const;

function property(
  name: string,
  kind: ComponentProperty["kind"],
  description: string,
  options: Partial<ComponentProperty> = {}
): ComponentProperty {
  return { name, kind, description, ...options };
}

function foundationContract(
  id: string,
  options: Partial<Omit<ComponentContract, "id" | "name" | "layer" | "status">> = {}
): ComponentContract {
  return {
    id,
    name: id[0].toUpperCase() + id.slice(1),
    layer: "foundation",
    status: "preview",
    anatomy: ["root"],
    properties: [],
    states: commonStates,
    events: [],
    accessibility: { requirements: ["Expose semantics supported by the host platform"] },
    semanticTokens: [],
    ...options
  };
}

export const componentContracts: readonly ComponentContract[] = [
  foundationContract("avatar", {
    anatomy: ["root", "image", "fallback"],
    properties: [
      property("source", "string", "Image source"),
      property("label", "string", "Accessible identity label", { required: true }),
      property("size", "enum", "Avatar size", { values: ["sm", "md", "lg"] })
    ],
    semanticTokens: ["avatar.background", "avatar.foreground", "avatar.radius"]
  }),
  foundationContract("badge", {
    anatomy: ["root", "label"],
    properties: [
      property("label", "string", "Badge content", { required: true }),
      property("intent", "enum", "Semantic intent", {
        values: ["neutral", "info", "success", "warning", "danger"]
      })
    ],
    semanticTokens: ["badge.background", "badge.foreground", "badge.radius"]
  }),
  foundationContract("box", {
    properties: [property("children", "slot", "Box content")],
    semanticTokens: ["layout.spacing"]
  }),
  foundationContract("button", {
    anatomy: ["root", "leading-icon", "label", "trailing-icon", "spinner"],
    properties: [
      property("label", "string", "Accessible button label", { required: true }),
      property("variant", "enum", "Visual emphasis", {
        values: ["solid", "outline", "ghost", "link"],
        defaultValue: "solid"
      }),
      property("intent", "enum", "Semantic intent", {
        values: ["primary", "neutral", "danger"],
        defaultValue: "primary"
      }),
      property("size", "enum", "Control size", {
        values: ["sm", "md", "lg"],
        defaultValue: "md"
      }),
      property("loading", "boolean", "Whether an action is pending", { defaultValue: false }),
      property("disabled", "boolean", "Whether interaction is unavailable", {
        defaultValue: false
      })
    ],
    states: ["default", "hovered", "focused", "pressed", "loading", "disabled"],
    events: ["press", "focus", "blur"],
    accessibility: {
      role: "button",
      keyboard: ["Enter", "Space"],
      requirements: [
        "Expose disabled and busy states",
        "Keep a visible focus indicator where keyboard input exists",
        "Meet the target platform minimum touch target"
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
    ]
  }),
  foundationContract("card", {
    anatomy: ["root", "header", "content", "footer"],
    properties: [property("children", "slot", "Card content")],
    semanticTokens: ["card.background", "card.border", "card.radius", "card.shadow"]
  }),
  foundationContract("divider", {
    properties: [
      property("orientation", "enum", "Divider direction", {
        values: ["horizontal", "vertical"]
      })
    ],
    semanticTokens: ["divider.color", "divider.width"]
  }),
  foundationContract("icon", {
    properties: [
      property("name", "string", "Icon identifier", { required: true }),
      property("label", "string", "Meaning when the icon is not decorative")
    ],
    semanticTokens: ["icon.color", "icon.size"]
  }),
  foundationContract("input", {
    anatomy: ["root", "label", "control", "leading", "trailing", "description", "error"],
    properties: [
      property("label", "string", "Input label"),
      property("value", "string", "Controlled value"),
      property("placeholder", "string", "Input hint"),
      property("invalid", "boolean", "Whether validation failed", { defaultValue: false }),
      property("disabled", "boolean", "Whether editing is unavailable", { defaultValue: false })
    ],
    states: ["default", "hovered", "focused", "invalid", "readonly", "disabled"],
    events: ["change", "focus", "blur", "submit"],
    accessibility: {
      role: "textbox",
      keyboard: ["Tab"],
      requirements: ["Associate labels, descriptions and errors with the control"]
    },
    semanticTokens: [
      "input.background",
      "input.foreground",
      "input.border",
      "input.radius",
      "input.focus.ring",
      "input.error"
    ]
  }),
  foundationContract("modal", {
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
  }),
  foundationContract("spinner", {
    properties: [property("label", "string", "Accessible loading label")],
    states: ["indeterminate"],
    accessibility: { role: "progressbar", requirements: ["Announce ongoing activity when needed"] },
    semanticTokens: ["spinner.color", "spinner.size", "motion.duration.normal"]
  }),
  foundationContract("text", {
    properties: [
      property("children", "slot", "Text content", { required: true }),
      property("role", "enum", "Semantic text role", {
        values: ["body", "label", "caption", "heading", "display"]
      })
    ],
    semanticTokens: ["text.foreground", "typography.body", "typography.heading"]
  }),
  foundationContract("toast", {
    anatomy: ["root", "icon", "message", "action", "close-trigger"],
    properties: [
      property("message", "string", "Notification text", { required: true }),
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
  })
] as const;

export function getComponentContract(id: string) {
  return componentContracts.find((contract) => contract.id === id) ?? null;
}
