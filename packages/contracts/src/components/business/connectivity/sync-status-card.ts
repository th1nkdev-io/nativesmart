import { defineContract } from "../../../define";

export const syncStatusCardContract = defineContract({
  id: "sync-status-card",
  name: "SyncStatusCard",
  layer: "business",
  category: "connectivity",
  priority: "P2",
  description: "Last sync, pending items and sync action"
});
