import type { ComponentContract } from "../../../types";
import { buttonContract } from "./button";
import { iconButtonContract } from "./icon-button";
import { buttonGroupContract } from "./button-group";
import { toggleButtonContract } from "./toggle-button";
import { segmentedControlContract } from "./segmented-control";
import { fabContract } from "./fab";
import { copyButtonContract } from "./copy-button";

export const actionsContracts: readonly ComponentContract[] = [
  buttonContract,
  iconButtonContract,
  buttonGroupContract,
  toggleButtonContract,
  segmentedControlContract,
  fabContract,
  copyButtonContract
];
