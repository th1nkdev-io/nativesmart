import { useEffect, useState } from "react";
import { Button, Card, OfflineBanner, Text, TransactionCard } from "@nativesmart/react-native";
import { formatMoney } from "@nativesmart/core";
import { getWalletSnapshot, type WalletSnapshot } from "../api/mockApi";

export function WalletDashboardScreen({ onOpenTransaction }: { onOpenTransaction: () => void }) {
  const [snapshot, setSnapshot] = useState<WalletSnapshot | null>(null);

  useEffect(() => {
    void getWalletSnapshot().then(setSnapshot);
  }, []);

  if (!snapshot) {
    return (
      <Card>
        <Text>Loading wallet...</Text>
      </Card>
    );
  }

  return (
    <>
      <OfflineBanner />
      <Card>
        <Text muted>Available balance</Text>
        <Text variant="title">{formatMoney(snapshot.balance)}</Text>
        <Button label="Send money" />
      </Card>
      {snapshot.transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          onPress={onOpenTransaction}
        />
      ))}
    </>
  );
}
