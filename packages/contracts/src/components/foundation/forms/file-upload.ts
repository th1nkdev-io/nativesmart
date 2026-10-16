import { defineContract, property } from "../../../define";

export const fileUploadContract = defineContract({
  status: "preview",
  id: "file-upload",
  name: "FileUpload",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "File or photo selection with progress and validation",
  anatomy: [
    "root",
    "label",
    "dropzone",
    "trigger",
    "file-list",
    "file-item",
    "progress",
    "remove-trigger",
    "retry-trigger",
    "description",
    "error"
  ],
  properties: [
    property("label", "string", "Visible label", { required: true }),
    property("name", "string", "Field name used when the form is submitted"),
    property("accept", "string", "Accepted MIME types or extensions, comma separated"),
    property("multiple", "boolean", "Whether several files can be selected", {
      defaultValue: false
    }),
    property("maxFiles", "number", "Maximum number of files"),
    property("maxSize", "number", "Maximum size per file in bytes"),
    property("capture", "enum", "Camera to open directly on mobile", {
      values: ["none", "user", "environment"],
      defaultValue: "none"
    }),
    property("description", "string", "Helper text such as accepted formats and size"),
    property("errorMessage", "string", "Message shown when the selection is invalid"),
    property("required", "boolean", "Whether a file is mandatory", { defaultValue: false }),
    property("invalid", "boolean", "Whether validation failed", { defaultValue: false }),
    property("disabled", "boolean", "Whether selection is unavailable", { defaultValue: false })
  ],
  states: ["idle", "dragging", "uploading", "success", "error", "disabled"],
  events: ["change", "reject", "remove", "retry"],
  accessibility: {
    role: "button",
    keyboard: ["Enter", "Space"],
    requirements: [
      "Provide a button to choose files; drag and drop is never the only way",
      "Announce upload progress, success and errors for each file",
      "Label remove and retry triggers with the file name",
      "Keep failed uploads retryable without reselecting the file on slow networks"
    ]
  },
  semanticTokens: [
    "file-upload.dropzone.background",
    "file-upload.dropzone.border",
    "file-upload.dropzone.active.border",
    "file-upload.radius",
    "file-upload.item.background",
    "file-upload.progress.track",
    "file-upload.progress.indicator",
    "file-upload.focus.ring",
    "file-upload.error"
  ]
});
