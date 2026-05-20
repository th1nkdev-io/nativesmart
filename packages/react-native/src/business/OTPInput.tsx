import React from "react";
import { View } from "react-native";
import { Input } from "../components/Input";
import { updateOtpAtIndex } from "../hooks/useOtpInput";
import { useNativesmartTheme } from "../theme";

export function OTPInput({
  length = 6,
  value = "",
  onChange
}: {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const theme = useNativesmartTheme();
  return (
    <View style={{ flexDirection: "row", gap: theme.spacing[2] }}>
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          value={value[index] ?? ""}
          maxLength={1}
          keyboardType="number-pad"
          onChangeText={(digit) => {
            onChange?.(updateOtpAtIndex(value, index, digit, length));
          }}
          style={{ width: 44, textAlign: "center" }}
        />
      ))}
    </View>
  );
}
