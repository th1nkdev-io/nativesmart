import { defineContract } from "../../../define";

export const numberInputContract = defineContract({
  id: "number-input",
  name: "NumberInput",
  layer: "foundation",
  category: "forms",
  priority: "P2",
  description: "Numeric field with increment and decrement"
});
