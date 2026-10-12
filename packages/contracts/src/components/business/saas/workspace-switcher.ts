import { defineContract } from "../../../define";

export const workspaceSwitcherContract = defineContract({
  id: "workspace-switcher",
  name: "WorkspaceSwitcher",
  layer: "business",
  category: "saas",
  priority: "P2",
  description: "Switch organization or workspace"
});
