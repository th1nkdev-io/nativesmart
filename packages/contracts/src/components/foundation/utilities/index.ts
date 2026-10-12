import type { ComponentContract } from "../../../types";
import { themeProviderContract } from "./theme-provider";
import { portalContract } from "./portal";
import { focusTrapContract } from "./focus-trap";
import { visuallyHiddenContract } from "./visually-hidden";
import { liveRegionContract } from "./live-region";
import { localeProviderContract } from "./locale-provider";

export const utilitiesContracts: readonly ComponentContract[] = [
  themeProviderContract,
  portalContract,
  focusTrapContract,
  visuallyHiddenContract,
  liveRegionContract,
  localeProviderContract
];
