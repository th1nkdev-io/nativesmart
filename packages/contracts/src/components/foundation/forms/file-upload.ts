import { defineContract } from "../../../define";

export const fileUploadContract = defineContract({
  id: "file-upload",
  name: "FileUpload",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "File or photo selection with progress and validation"
});
