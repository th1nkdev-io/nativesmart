import { componentContracts, validateArchitecture } from "@nativesmart/contracts";
import { designSystems } from "@nativesmart/design-systems";
import { integrationManifests } from "./integrations";
import { rendererManifests } from "./renderers";

export * from "./integrations";
export * from "./renderers";

export function validateNativesmartArchitecture() {
  return validateArchitecture({
    contracts: componentContracts,
    designSystems,
    renderers: rendererManifests,
    integrations: integrationManifests
  });
}
