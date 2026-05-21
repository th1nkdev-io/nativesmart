import { useState } from "react";
import { AmountInput, Button, Card, PhoneNumberInput, Text } from "@nativesmart/react-native";

export function AuthScreen({ onContinue }: { onContinue: () => void }) {
  const [phone, setPhone] = useState("");

  return (
    <Card>
      <Text variant="title">Sign in</Text>
      <Text muted>Use a phone-first login flow for wallet and transfer products.</Text>
      <PhoneNumberInput value={phone} onChangeText={setPhone} countryCode="+234" />
      <AmountInput currency="NGN" placeholder="Optional opening balance" />
      <Button label="Continue" disabled={phone.length < 8} onPress={onContinue} />
    </Card>
  );
}
