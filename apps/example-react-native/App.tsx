import {
  Button,
  NativesmartProvider,
  OfflineBanner,
  TransactionCard
} from "@nativesmart/react-native";
import { SafeAreaView } from "react-native";

const transaction = {
  id: "txn_001",
  title: "Wallet top-up",
  reference: "NS-2026-0001",
  amount: { amountMinor: 250000, currency: "NGN" },
  status: "successful" as const,
  createdAt: new Date().toISOString()
};

export default function App() {
  return (
    <NativesmartProvider>
      <SafeAreaView>
        <OfflineBanner />
        <TransactionCard transaction={transaction} />
        <Button label="Continue" onPress={() => {}} />
      </SafeAreaView>
    </NativesmartProvider>
  );
}
