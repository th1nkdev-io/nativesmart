import React from "react";
import { View } from "react-native";
import { Text } from "../components/Text";
import { useNativesmartTheme } from "../theme";

export function OfflineBanner({
  message = "You are offline. Some actions will sync later."
}: {
  message?: string;
}) {
  const theme = useNativesmartTheme();
  return (
    <View style={{ backgroundColor: theme.colors.offline, padding: theme.spacing[2] }}>
      <Text style={{ color: "#111827", fontWeight: "600" }}>{message}</Text>
    </View>
  );
}
