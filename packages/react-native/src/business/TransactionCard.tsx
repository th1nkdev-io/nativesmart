import React from "react";
import { Pressable } from "react-native";
import type { TransactionSummary } from "@nativesmart/core";
import { formatMoney } from "@nativesmart/core";
import { Badge } from "../components/Badge";
import { Card } from "../components/Card";
import { Text } from "../components/Text";

export function TransactionCard({
  transaction,
  locale,
  onPress
}: {
  transaction: TransactionSummary;
  locale?: string;
  onPress?: () => void;
}) {
  const tone =
    transaction.status === "successful"
      ? "success"
      : transaction.status === "failed"
        ? "danger"
        : "warning";
  const content = (
    <Card>
      <Text variant="subtitle">{transaction.title}</Text>
      <Text muted>{transaction.reference}</Text>
      <Text style={{ fontWeight: "700" }}>{formatMoney(transaction.amount, locale)}</Text>
      <Badge tone={tone} label={transaction.status} />
    </Card>
  );

  if (!onPress) return content;

  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      {content}
    </Pressable>
  );
}
