import { defineContract } from "../../../define";

export const segmentedControlContract = defineContract({
  id: "segmented-control",
  name: "SegmentedControl",
  layer: "foundation",
  category: "actions",
  priority: "P1",
  description: "Mutually exclusive options shown inline"
});
