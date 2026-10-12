import { defineContract } from "../../../define";

export const videoPlayerContract = defineContract({
  id: "video-player",
  name: "VideoPlayer",
  layer: "foundation",
  category: "media",
  priority: "P2",
  description: "Accessible video playback with captions"
});
