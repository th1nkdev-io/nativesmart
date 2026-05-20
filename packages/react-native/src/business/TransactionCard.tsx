import React from "react";
import type { TransactionSummary } from "@nativesmart/core";
import { formatMoney } from "@nativesmart/core";
import { Badge } from "../components/Badge";
import { Card } from "../components/Card";
import { Text } from "../components/Text";

export function TransactionCard({
  transaction,
  locale
}: {
  transaction: TransactionSummary;
  locale?: string;
}) {
  const tone =
    transaction.status === "successful"
      ? "success"
      : transaction.status === "failed"
        ? "danger"
        : "warning";
  return (
    <Card>
      <Text variant="subtitle">{transaction.title}</Text>
      <Text muted>{transaction.reference}</Text>
      <Text style={{ fontWeight: "700" }}>{formatMoney(transaction.amount, locale)}</Text>
      <Badge tone={tone} label={transaction.status} />
    </Card>
  );
}
