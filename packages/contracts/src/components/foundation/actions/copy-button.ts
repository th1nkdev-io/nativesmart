import { defineContract } from "../../../define";

export const copyButtonContract = defineContract({
  id: "copy-button",
  name: "CopyButton",
  layer: "foundation",
  category: "actions",
  priority: "P1",
  description: "Copies a value (reference, account number) with feedback"
});
