import React from "react";
import { View } from "react-native";
import { useNativesmartTheme } from "../theme";

export function IconPlaceholder({ size = 20 }: { size?: number }) {
  const theme = useNativesmartTheme();
  return (
    <View
      accessibilityLabel="Icon placeholder"
      style={{
        width: size,
        height: size,
        borderRadius: theme.radius.xs,
        backgroundColor: theme.colors.border
      }}
    />
  );
}
