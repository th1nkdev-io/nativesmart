export type NetworkStatus = "online" | "offline" | "degraded";

export type RetryState = {
  status: NetworkStatus;
  retryCount: number;
  lastAttemptAt?: string;
};
