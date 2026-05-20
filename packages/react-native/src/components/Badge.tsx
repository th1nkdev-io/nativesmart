import React from "react";
import { View } from "react-native";
import { useNativesmartTheme } from "../theme";
import { Text } from "./Text";

export type BadgeTone = "neutral" | "success" | "warning" | "danger";

export function Badge({ label, tone = "neutral" }: { label: string; tone?: BadgeTone }) {
  const theme = useNativesmartTheme();
  const color =
    tone === "success"
      ? theme.colors.success
      : tone === "warning"
        ? theme.colors.warning
        : tone === "danger"
          ? theme.colors.danger
          : theme.colors.textMuted;
  return (
    <View
      style={{
        alignSelf: "flex-start",
        borderRadius: theme.radius.full,
        backgroundColor: theme.colors.surfaceMuted,
        paddingHorizontal: theme.spacing[2],
        paddingVertical: theme.spacing[1]
      }}
    >
      <Text variant="caption" style={{ color, fontWeight: "600" }}>
        {label}
      </Text>
    </View>
  );
}
