import { defineContract, property } from "../../../define";

export const imageContract = defineContract({
  status: "preview",
  id: "image",
  name: "Image",
  layer: "foundation",
  category: "typography",
  priority: "P1",
  description: "Responsive image with placeholder, fallback and lazy load",
  anatomy: ["root", "frame", "image", "placeholder", "fallback", "caption", "preview"],
  properties: [
    property("src", "string", "Image address; without one the placeholder stays", {
      example: "lab/lagoon.svg"
    }),
    property("alt", "string", "What the image shows; empty only when decorative", {
      example: "Lagune bordée de palmiers"
    }),
    property("ratio", "enum", "Frame shape; auto keeps the image's own", {
      values: ["auto", "1/1", "4/3", "3/2", "16/9", "3/4", "21/9"],
      defaultValue: "16/9"
    }),
    property("fit", "enum", "How the image fills the frame", {
      values: ["cover", "contain", "fill", "scale-down"],
      defaultValue: "cover"
    }),
    property("position", "enum", "Part kept in view when the image is cropped", {
      values: ["center", "top", "bottom", "start", "end"],
      defaultValue: "center"
    }),
    property("radius", "enum", "Corner radius", {
      values: ["none", "sm", "md", "lg", "xl", "full"],
      defaultValue: "lg"
    }),
    property(
      "placeholder",
      "enum",
      "What shows while loading: shimmer, blurred preview or a tint",
      {
        values: ["shimmer", "blur", "color", "none"],
        defaultValue: "shimmer"
      }
    ),
    property("lazySrc", "string", "Small image shown blurred while the full one loads"),
    property("fallbackSrc", "string", "Image used when src fails, before the alt text panel"),
    property("srcset", "string", "Candidates for screen densities or widths"),
    property("sizes", "string", "Displayed widths, so the browser picks from srcset"),
    property("loading", "enum", "Native lazy loading below the fold", {
      values: ["lazy", "eager"],
      defaultValue: "lazy"
    }),
    property("caption", "string", "Text under the image, or over it with a scrim", {
      example: "Lagune d'Assinie, au lever du jour"
    }),
    property("captionPlacement", "enum", "Caption below the frame or over its foot", {
      values: ["below", "overlay"],
      defaultValue: "below"
    }),
    property("preview", "boolean", "Opens the full image in a lightbox with zoom", {
      defaultValue: false
    }),
    property("bordered", "boolean", "A hairline border, for images on a similar background", {
      defaultValue: false
    }),
    property("decorative", "boolean", "Purely visual: empty alt, hidden from assistive tech", {
      defaultValue: false
    }),
    property("previewLabel", "string", "Accessible name of the preview button", {
      defaultValue: "Enlarge image"
    }),
    property("closeLabel", "string", "Accessible name of the lightbox close button", {
      defaultValue: "Close"
    }),
    property("fallback", "slot", "Custom content when the image cannot load"),
    property("overlay", "slot", "Content over the image, such as a badge")
  ],
  events: ["load", "error", "preview"],
  states: ["loading", "loaded", "error", "previewing"],
  accessibility: {
    role: "img",
    requirements: [
      "Every meaningful image has an alt describing it; decorative images have an empty alt",
      "A captioned image is a figure, so the caption is announced with it",
      "The preview trigger is a button named after the action and the image",
      "The lightbox is a modal dialog: focus moves in, Escape closes, focus comes back",
      "The fallback panel shows the alt text so the content is not lost"
    ]
  },
  semanticTokens: ["image.radius", "image.placeholder", "image.fallback", "image.scrim"],
  docs: {
    anatomy: {
      root: "A figure when there is a caption, otherwise a frame",
      frame: "Holds the ratio, the radius and the crop",
      image: "The img element; it fades in once loaded",
      placeholder: "Shimmer, blurred lazy source or tint while loading",
      fallback: "Fallback image, or an icon with the alt text when nothing loads",
      caption: "Text under the frame, or over a dark scrim at its foot",
      preview: "Lightbox dialog with zoom in, zoom out and close"
    },
    events: {
      load: { description: "The image loaded" },
      error: { description: "The source and the fallback source both failed" },
      preview: { description: "The lightbox opened" }
    },
    states: {
      loading: "The placeholder shows until the image arrives",
      loaded: "The image fades in over the placeholder",
      error: "The fallback image, or the alt text panel",
      previewing: "The lightbox covers the page"
    },
    tokens: {
      "image.radius": "Radius scale, or full for round avatars and thumbnails",
      "image.placeholder": "Muted surface with a moving highlight",
      "image.fallback": "Sunken surface, muted icon and text",
      "image.scrim": "Gradient from transparent to 70 % black under an overlay caption"
    }
  }
});
