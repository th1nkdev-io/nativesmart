import { defineContract } from "../../../define";

export const modelViewerContract = defineContract({
  id: "model-viewer",
  name: "ModelViewer",
  layer: "foundation",
  category: "immersive",
  priority: "P1",
  description: "glTF or USDZ model with orbit controls, poster and loading state"
});
