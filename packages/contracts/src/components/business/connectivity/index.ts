import type { ComponentContract } from "../../../types";
import { offlineBannerContract } from "./offline-banner";
import { networkRetryStateContract } from "./network-retry-state";
import { retryActionContract } from "./retry-action";
import { syncStatusCardContract } from "./sync-status-card";
import { pendingQueueListContract } from "./pending-queue-list";
import { conflictStateContract } from "./conflict-state";
import { dataSaverNoticeContract } from "./data-saver-notice";

export const connectivityContracts: readonly ComponentContract[] = [
  offlineBannerContract,
  networkRetryStateContract,
  retryActionContract,
  syncStatusCardContract,
  pendingQueueListContract,
  conflictStateContract,
  dataSaverNoticeContract
];
