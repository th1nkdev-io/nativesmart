import type { ComponentContract } from "../../../types";
import { metricCardContract } from "./metric-card";
import { subscriptionCardContract } from "./subscription-card";
import { planSelectorContract } from "./plan-selector";
import { usageMeterContract } from "./usage-meter";
import { workspaceSwitcherContract } from "./workspace-switcher";
import { activityFeedContract } from "./activity-feed";
import { teamMemberCardContract } from "./team-member-card";
import { notificationCenterContract } from "./notification-center";
import { settingsListContract } from "./settings-list";

export const saasContracts: readonly ComponentContract[] = [
  metricCardContract,
  subscriptionCardContract,
  planSelectorContract,
  usageMeterContract,
  workspaceSwitcherContract,
  activityFeedContract,
  teamMemberCardContract,
  notificationCenterContract,
  settingsListContract
];
