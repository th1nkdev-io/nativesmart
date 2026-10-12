import { defineContract } from "../../../define";

export const localeProviderContract = defineContract({
  id: "locale-provider",
  name: "LocaleProvider",
  layer: "foundation",
  category: "utilities",
  priority: "P1",
  description: "Language, number, currency and date formats"
});
