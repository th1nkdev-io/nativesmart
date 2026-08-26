import { componentContracts, validateArchitecture } from "@nativesmart/contracts";
import { designSystems } from "@nativesmart/design-systems";
import { rendererManifests } from "./renderers";

export * from "./renderers";

export function validateNativesmartArchitecture() {
  return validateArchitecture({
    contracts: componentContracts,
    designSystems,
    renderers: rendererManifests
  });
}
