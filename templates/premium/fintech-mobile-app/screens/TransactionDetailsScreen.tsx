import { useEffect, useState } from "react";
import { Button, Card, ReceiptView, Text } from "@nativesmart/react-native";
import { getTransaction, type FintechTransaction } from "../api/mockApi";

export function TransactionDetailsScreen({
  transactionId,
  onBack
}: {
  transactionId: string;
  onBack: () => void;
}) {
  const [transaction, setTransaction] = useState<FintechTransaction | null>(null);

  useEffect(() => {
    void getTransaction(transactionId).then(setTransaction);
  }, [transactionId]);

  if (!transaction) {
    return (
      <Card>
        <Text>Transaction not found.</Text>
        <Button label="Back" variant="secondary" onPress={onBack} />
      </Card>
    );
  }

  return (
    <>
      <ReceiptView transaction={transaction} />
      <Button label="Back to wallet" variant="secondary" onPress={onBack} />
    </>
  );
}
