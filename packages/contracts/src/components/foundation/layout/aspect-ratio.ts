import { defineContract, property } from "../../../define";

export const aspectRatioContract = defineContract({
  status: "preview",
  id: "aspect-ratio",
  name: "AspectRatio",
  layer: "foundation",
  category: "layout",
  priority: "P2",
  description: "Keeps media at a fixed ratio",
  anatomy: ["root", "media", "placeholder", "fallback", "overlay", "caption"],
  properties: [
    property("ratio", "enum", "Ratio token, or any number or `w:h` where the platform allows it", {
      values: ["video", "square", "photo", "portrait", "story", "wide", "golden", "auto"],
      defaultValue: "video"
    }),
    property("fit", "enum", "How the media fills the frame", {
      values: ["cover", "contain", "fill", "scale-down"],
      defaultValue: "cover"
    }),
    property("focus", "enum", "Part of the media kept in view when it is cropped", {
      values: ["center", "top", "bottom", "start", "end"],
      defaultValue: "center"
    }),
    property("radius", "enum", "Corner radius token", {
      values: ["image", "none", "sm", "md", "lg", "xl", "full"],
      defaultValue: "image"
    }),
    property("placeholder", "enum", "What shows while the media loads", {
      values: ["shimmer", "color", "none"],
      defaultValue: "shimmer"
    }),
    property("title", "string", "Caption title shown over the media", {
      example: "Lagune de Grand-Bassam"
    }),
    property("description", "string", "Caption line under the title"),
    property("scrim", "boolean", "Darkens the bottom of the media so overlays stay readable", {
      defaultValue: false
    }),
    property("zoom", "boolean", "Media zooms in slightly on hover, for galleries", {
      defaultValue: false
    }),
    property("loading", "boolean", "Forces the placeholder, for content that is not media", {
      defaultValue: false
    }),
    property("children", "slot", "Media: an image, video, iframe, map or any content"),
    property("overlay", "slot", "Content laid over the media: badges, actions, play button"),
    property("fallback", "slot", "Shown when the media fails to load")
  ],
  states: ["loading", "loaded", "error"],
  events: ["load", "error"],
  accessibility: {
    requirements: [
      "The media keeps its own alternative text",
      "The caption is real text, not part of the image",
      "Zoom and shimmer stop when reduced motion is requested"
    ]
  },
  semanticTokens: ["aspect.ratio", "aspect.radius", "aspect.placeholder", "aspect.scrim"]
});
