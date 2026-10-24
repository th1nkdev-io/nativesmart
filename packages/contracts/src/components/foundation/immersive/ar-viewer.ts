import { defineContract } from "../../../define";

export const arViewerContract = defineContract({
  id: "ar-viewer",
  name: "ArViewer",
  layer: "foundation",
  category: "immersive",
  priority: "P2",
  description: "Places a model in the room with AR Quick Look or Scene Viewer",
  platforms: ["mobile"]
});
