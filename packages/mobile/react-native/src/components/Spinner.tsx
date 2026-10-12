import React from "react";
import { ActivityIndicator, type ActivityIndicatorProps } from "react-native";
import { useNativesmartTheme } from "../theme";

export function Spinner(props: ActivityIndicatorProps) {
  const theme = useNativesmartTheme();
  return <ActivityIndicator color={theme.colors.primary} {...props} />;
}
