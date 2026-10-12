import React from "react";
import type { TransactionSummary } from "@nativesmart/core";
import { Card } from "../components/Card";
import { Divider } from "../components/Divider";
import { Text } from "../components/Text";
import { TransactionCard } from "./TransactionCard";

export function ReceiptView({ transaction }: { transaction: TransactionSummary }) {
  return (
    <Card>
      <Text variant="title">Receipt</Text>
      <Divider />
      <TransactionCard transaction={transaction} />
    </Card>
  );
}
