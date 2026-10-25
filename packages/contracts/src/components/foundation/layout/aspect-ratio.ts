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
  semanticTokens: ["aspect.ratio", "aspect.radius", "aspect.placeholder", "aspect.scrim"],
  docs: {
    anatomy: {
      root: "The frame: holds the ratio, clips the media to its radius and paints the background",
      media: "The content in the frame, stretched to fill it and cropped by fit and focus",
      placeholder: "Shimmer or plain color under the media until it has loaded",
      fallback: "Shown in place of media that failed to load; reads the media's alternative text",
      overlay: "Free layer over the media for badges, actions or a play button",
      caption: "Title and description at the bottom, over a gradient scrim"
    },
    states: {
      loading: "The media is still downloading: the placeholder shows and the frame is marked busy",
      loaded: "The media is ready and fades in; content that is not media is loaded at once",
      error: "The media failed: the fallback replaces it, keeping its alternative text"
    },
    events: {
      load: {
        description: "The image, video or frame inside finished loading",
        payload: "the native load event of the media"
      },
      error: {
        description: "The media failed to load; the fallback is already showing",
        payload: "the native error event of the media"
      }
    },
    tokens: {
      "aspect.ratio": "Ratio presets: square, photo, video, wide, portrait, story, golden",
      "aspect.radius": "Corner radius of the frame, image radius by default",
      "aspect.placeholder": "Background and shimmer highlight shown while loading",
      "aspect.scrim": "Gradient that keeps captions and overlays readable"
    }
  }
});
