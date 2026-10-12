import { defineContract } from "../../../define";

export const cameraCaptureContract = defineContract({
  id: "camera-capture",
  name: "CameraCapture",
  layer: "foundation",
  category: "media",
  priority: "P1",
  description: "Guided photo capture with framing overlay",
  platforms: ["mobile"]
});
