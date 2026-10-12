import { defineContract } from "../../../define";

export const languageSelectorContract = defineContract({
  id: "language-selector",
  name: "LanguageSelector",
  layer: "business",
  category: "identity",
  priority: "P2",
  description: "Switches app language"
});
