import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
  AmountInput,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  IconPlaceholder,
  Input,
  KycDocumentUpload,
  MobileMoneySelector,
  Modal,
  NativesmartProvider,
  NetworkRetryState,
  OfflineBanner,
  OTPInput,
  PaymentMethodSelector,
  PhoneNumberInput,
  ReceiptView,
  Spinner,
  Text,
  Toast,
  TransactionCard,
  useTheme
} from "@nativesmart/react-native";

const transaction = {
  id: "txn_001",
  title: "Wallet top-up",
  reference: "NS-2026-0001",
  amount: { amountMinor: 250000, currency: "NGN" },
  status: "successful" as const,
  createdAt: new Date().toISOString()
};

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [otp, setOtp] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mtn");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <NativesmartProvider mode={mode}>
      <DemoContent
        mode={mode}
        setMode={setMode}
        otp={otp}
        setOtp={setOtp}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </NativesmartProvider>
  );
}

function DemoContent({
  mode,
  setMode,
  otp,
  setOtp,
  paymentMethod,
  setPaymentMethod,
  modalVisible,
  setModalVisible
}: {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
  otp: string;
  setOtp: (value: string) => void;
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}) {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ padding: theme.spacing[4], gap: theme.spacing[4] }}>
        <Box>
          <Text variant="title">Nativesmart Kitchen Sink</Text>
          <Text muted>
            React Native / Expo demo for UI, forms, payments and transaction states.
          </Text>
        </Box>

        <Card>
          <Text variant="subtitle">Theme preview</Text>
          <Text muted>Switch between light and dark mode.</Text>
          <View style={{ flexDirection: "row", gap: theme.spacing[2] }}>
            <Button
              label="Light"
              variant={mode === "light" ? "primary" : "secondary"}
              onPress={() => setMode("light")}
            />
            <Button
              label="Dark"
              variant={mode === "dark" ? "primary" : "secondary"}
              onPress={() => setMode("dark")}
            />
          </View>
        </Card>

        <Card>
          <Text variant="subtitle">UI components</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: theme.spacing[3] }}>
            <Avatar initials="TD" />
            <Badge label="verified" tone="success" />
            <IconPlaceholder />
            <Spinner />
          </View>
          <Input placeholder="Basic input" />
          <Button label="Open modal" onPress={() => setModalVisible(true)} />
          <Toast message="Toast preview" />
        </Card>

        <Card>
          <Text variant="subtitle">Form demo</Text>
          <PhoneNumberInput countryCode="+221" placeholder="77 000 00 00" />
          <AmountInput currency="XOF" placeholder="25000" />
          <OTPInput value={otp} onChange={setOtp} />
          <Text muted>OTP value: {otp || "empty"}</Text>
        </Card>

        <Card>
          <Text variant="subtitle">Payment demo</Text>
          <MobileMoneySelector
            providers={["mtn", "orange", "wave"]}
            selected={paymentMethod}
            onSelect={setPaymentMethod}
          />
          <Divider />
          <PaymentMethodSelector
            providers={["cash", "card", "mobile money"]}
            selected={paymentMethod}
            onSelect={setPaymentMethod}
          />
        </Card>

        <OfflineBanner />
        <NetworkRetryState />
        <KycDocumentUpload />
        <TransactionCard transaction={transaction} />
        <ReceiptView transaction={transaction} />
      </ScrollView>

      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <Text variant="subtitle">Modal demo</Text>
        <Text muted>This is a reusable bottom-sheet style modal placeholder.</Text>
        <Button label="Close" onPress={() => setModalVisible(false)} />
      </Modal>
    </SafeAreaView>
  );
}
