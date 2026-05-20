import React from "react";
import { View } from "react-native";
import { Input } from "../components/Input";
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
            const next = value.split("");
            next[index] = digit;
            onChange?.(next.join("").slice(0, length));
          }}
          style={{ width: 44, textAlign: "center" }}
        />
      ))}
    </View>
  );
}
