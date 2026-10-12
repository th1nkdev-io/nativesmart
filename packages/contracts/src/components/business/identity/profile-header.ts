import { defineContract } from "../../../define";

export const profileHeaderContract = defineContract({
  id: "profile-header",
  name: "ProfileHeader",
  layer: "business",
  category: "identity",
  priority: "P2",
  description: "User identity, verification and quick actions"
});
