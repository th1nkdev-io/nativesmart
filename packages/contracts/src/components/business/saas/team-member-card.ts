import { defineContract } from "../../../define";

export const teamMemberCardContract = defineContract({
  id: "team-member-card",
  name: "TeamMemberCard",
  layer: "business",
  category: "saas",
  priority: "P2",
  description: "Member identity, role and actions"
});
