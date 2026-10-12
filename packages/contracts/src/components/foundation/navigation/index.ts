import type { ComponentContract } from "../../../types";
import { appBarContract } from "./app-bar";
import { tabsContract } from "./tabs";
import { bottomNavigationContract } from "./bottom-navigation";
import { sidebarContract } from "./sidebar";
import { navigationRailContract } from "./navigation-rail";
import { breadcrumbContract } from "./breadcrumb";
import { paginationContract } from "./pagination";
import { stepperContract } from "./stepper";
import { toolbarContract } from "./toolbar";
import { skipLinkContract } from "./skip-link";

export const navigationContracts: readonly ComponentContract[] = [
  appBarContract,
  tabsContract,
  bottomNavigationContract,
  sidebarContract,
  navigationRailContract,
  breadcrumbContract,
  paginationContract,
  stepperContract,
  toolbarContract,
  skipLinkContract
];
