import React from "react";
import { View } from "react-native";
import { Input, type InputProps } from "../components/Input";
import { Text } from "../components/Text";
import { useNativesmartTheme } from "../theme";

export function PhoneNumberInput({
  countryCode = "+234",
  ...props
}: InputProps & { countryCode?: string }) {
  const theme = useNativesmartTheme();
  return (
    <View style={{ flexDirection: "row", gap: theme.spacing[2], alignItems: "center" }}>
      <Text style={{ fontWeight: "600" }}>{countryCode}</Text>
      <Input
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        style={{ flex: 1 }}
        {...props}
      />
    </View>
  );
}
