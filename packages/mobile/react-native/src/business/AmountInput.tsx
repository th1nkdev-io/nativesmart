import React from "react";
import { View } from "react-native";
import { Input, type InputProps } from "../components/Input";
import { Text } from "../components/Text";
import { useNativesmartTheme } from "../theme";

export function AmountInput({ currency = "NGN", ...props }: InputProps & { currency?: string }) {
  const theme = useNativesmartTheme();
  return (
    <View style={{ flexDirection: "row", gap: theme.spacing[2], alignItems: "center" }}>
      <Text style={{ fontWeight: "700" }}>{currency}</Text>
      <Input keyboardType="decimal-pad" style={{ flex: 1 }} {...props} />
    </View>
  );
}
