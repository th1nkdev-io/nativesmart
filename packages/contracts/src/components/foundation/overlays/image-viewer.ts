import { defineContract } from "../../../define";

export const imageViewerContract = defineContract({
  id: "image-viewer",
  name: "ImageViewer",
  layer: "foundation",
  category: "overlays",
  priority: "P2",
  description: "Fullscreen zoomable image, for receipts and documents"
});
