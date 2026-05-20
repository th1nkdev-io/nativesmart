import { useMemo } from "react";
import type { NetworkStatus, RetryState } from "@nativesmart/core";

export function useNetworkState(status: NetworkStatus = "online", retryCount = 0): RetryState {
  return useMemo(() => ({ status, retryCount }), [retryCount, status]);
}
