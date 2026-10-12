import type { ComponentContract } from "../../../types";
import { toastContract } from "./toast";
import { alertContract } from "./alert";
import { bannerContract } from "./banner";
import { spinnerContract } from "./spinner";
import { progressBarContract } from "./progress-bar";
import { progressCircleContract } from "./progress-circle";
import { skeletonContract } from "./skeleton";
import { badgeContract } from "./badge";
import { statusDotContract } from "./status-dot";
import { emptyStateContract } from "./empty-state";
import { errorStateContract } from "./error-state";
import { resultStateContract } from "./result-state";

export const feedbackContracts: readonly ComponentContract[] = [
  toastContract,
  alertContract,
  bannerContract,
  spinnerContract,
  progressBarContract,
  progressCircleContract,
  skeletonContract,
  badgeContract,
  statusDotContract,
  emptyStateContract,
  errorStateContract,
  resultStateContract
];
