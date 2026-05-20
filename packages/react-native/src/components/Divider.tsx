import React from "react";
import { View } from "react-native";
import { useNativesmartTheme } from "../theme";

export function Divider() {
  const theme = useNativesmartTheme();
  return <View style={{ height: 1, backgroundColor: theme.colors.border }} />;
}
