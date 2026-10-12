import { designSystems } from "@nativesmart/design-systems";
import { integrationManifests, rendererManifests, validateNativesmartArchitecture } from "./index";

const errors = validateNativesmartArchitecture();

if (errors.length > 0) {
  throw new Error(`Invalid Nativesmart architecture:\n${errors.join("\n")}`);
} else {
  console.log(
    `Validated component contracts, ${designSystems.length} design systems, ` +
      `${rendererManifests.length} renderer targets and ${integrationManifests.length} integrations.`
  );
}
