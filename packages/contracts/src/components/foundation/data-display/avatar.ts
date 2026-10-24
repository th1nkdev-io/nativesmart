import { defineContract, property } from "../../../define";

export const avatarContract = defineContract({
  status: "preview",
  id: "avatar",
  name: "Avatar",
  layer: "foundation",
  category: "data-display",
  priority: "P0",
  description: "Person or entity image with initials fallback",
  states: ["default", "disabled"],
  anatomy: ["root", "image", "fallback"],
  properties: [
    property("source", "string", "Image source"),
    property("label", "string", "Accessible identity label", {
      required: true,
      example: "Kofi Mensah"
    }),
    property("size", "enum", "Avatar size", { values: ["sm", "md", "lg"] })
  ],
  semanticTokens: ["avatar.background", "avatar.foreground", "avatar.radius"]
});
