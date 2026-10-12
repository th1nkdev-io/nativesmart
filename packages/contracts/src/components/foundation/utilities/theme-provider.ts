import { defineContract } from "../../../define";

export const themeProviderContract = defineContract({
  id: "theme-provider",
  name: "ThemeProvider",
  layer: "foundation",
  category: "utilities",
  priority: "P0",
  description: "Resolves design system, brand, mode, density and direction"
});
