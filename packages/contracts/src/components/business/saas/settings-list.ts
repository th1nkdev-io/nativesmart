import { defineContract } from "../../../define";

export const settingsListContract = defineContract({
  id: "settings-list",
  name: "SettingsList",
  layer: "business",
  category: "saas",
  priority: "P1",
  description: "Grouped settings rows with toggles and links"
});
