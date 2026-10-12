import { defineContract } from "../../../define";

export const conflictStateContract = defineContract({
  id: "conflict-state",
  name: "ConflictState",
  layer: "business",
  category: "connectivity",
  priority: "P2",
  description: "Resolve local and server data conflicts"
});
