import React from "react";
import { View } from "react-native";
import { useNativesmartTheme } from "../theme";
import { Text } from "./Text";

export function Toast({ message }: { message: string }) {
  const theme = useNativesmartTheme();
  return (
    <View
      style={{
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.text,
        padding: theme.spacing[3]
      }}
    >
      <Text style={{ color: theme.colors.background }}>{message}</Text>
    </View>
  );
}
