import { useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { NativesmartProvider, useTheme } from "@nativesmart/react-native";
import { AuthScreen } from "../auth/AuthScreen";
import { TransactionDetailsScreen } from "../screens/TransactionDetailsScreen";
import { WalletDashboardScreen } from "../screens/WalletDashboardScreen";

type Route = "auth" | "wallet" | "transaction";

export function AppNavigator() {
  const [route, setRoute] = useState<Route>("auth");

  return (
    <NativesmartProvider mode="light">
      <NavigatorContent route={route} setRoute={setRoute} />
    </NativesmartProvider>
  );
}

function NavigatorContent({ route, setRoute }: { route: Route; setRoute: (route: Route) => void }) {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ padding: theme.spacing[4], gap: theme.spacing[4] }}>
        {route === "auth" ? <AuthScreen onContinue={() => setRoute("wallet")} /> : null}
        {route === "wallet" ? (
          <WalletDashboardScreen onOpenTransaction={() => setRoute("transaction")} />
        ) : null}
        {route === "transaction" ? (
          <TransactionDetailsScreen transactionId="txn_001" onBack={() => setRoute("wallet")} />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
