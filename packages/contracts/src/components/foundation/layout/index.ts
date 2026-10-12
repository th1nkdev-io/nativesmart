import type { ComponentContract } from "../../../types";
import { boxContract } from "./box";
import { stackContract } from "./stack";
import { gridContract } from "./grid";
import { containerContract } from "./container";
import { spacerContract } from "./spacer";
import { dividerContract } from "./divider";
import { aspectRatioContract } from "./aspect-ratio";
import { scrollAreaContract } from "./scroll-area";
import { safeAreaContract } from "./safe-area";
import { keyboardAvoiderContract } from "./keyboard-avoider";
import { surfaceContract } from "./surface";

export const layoutContracts: readonly ComponentContract[] = [
  boxContract,
  stackContract,
  gridContract,
  containerContract,
  spacerContract,
  dividerContract,
  aspectRatioContract,
  scrollAreaContract,
  safeAreaContract,
  keyboardAvoiderContract,
  surfaceContract
];
