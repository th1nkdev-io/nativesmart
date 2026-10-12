import { defineContract } from "../../../define";

export const metricCardContract = defineContract({
  id: "metric-card",
  name: "MetricCard",
  layer: "business",
  category: "saas",
  priority: "P2",
  description: "KPI with trend, built on Stat"
});
