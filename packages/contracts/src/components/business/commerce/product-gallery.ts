import { defineContract } from "../../../define";

export const productGalleryContract = defineContract({
  id: "product-gallery",
  name: "ProductGallery",
  layer: "business",
  category: "commerce",
  priority: "P2",
  description: "Product images with zoom"
});
