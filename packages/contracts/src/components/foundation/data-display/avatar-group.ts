import { defineContract } from "../../../define";

export const avatarGroupContract = defineContract({
  id: "avatar-group",
  name: "AvatarGroup",
  layer: "foundation",
  category: "data-display",
  priority: "P2",
  description: "Stacked avatars with overflow count"
});
