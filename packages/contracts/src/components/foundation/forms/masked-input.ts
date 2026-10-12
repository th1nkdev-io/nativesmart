import { defineContract } from "../../../define";

export const maskedInputContract = defineContract({
  id: "masked-input",
  name: "MaskedInput",
  layer: "foundation",
  category: "forms",
  priority: "P2",
  description: "Input following a pattern (dates, IDs, card numbers)"
});
