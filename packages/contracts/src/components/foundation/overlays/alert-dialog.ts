import { defineContract } from "../../../define";

export const alertDialogContract = defineContract({
  id: "alert-dialog",
  name: "AlertDialog",
  layer: "foundation",
  category: "overlays",
  priority: "P1",
  description: "Confirmation of a destructive or important action"
});
