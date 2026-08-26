import { validateNativesmartArchitecture } from "./index";

const errors = validateNativesmartArchitecture();

if (errors.length > 0) {
  throw new Error(`Invalid Nativesmart architecture:\n${errors.join("\n")}`);
} else {
  console.log("Validated component contracts, 4 design systems and 9 renderer targets.");
}
