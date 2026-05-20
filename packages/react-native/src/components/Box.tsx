import React from "react";
import { View, type ViewProps } from "react-native";
import { useNativesmartTheme } from "../theme";

export type BoxProps = ViewProps & {
  padding?: keyof ReturnType<typeof useNativesmartTheme>["spacing"];
  background?: keyof ReturnType<typeof useNativesmartTheme>["colors"];
};

export function Box({ padding, background, style, ...props }: BoxProps) {
  const theme = useNativesmartTheme();
  return (
    <View
      style={[
        {
          padding: padding === undefined ? undefined : theme.spacing[padding],
          backgroundColor: background ? theme.colors[background] : undefined
        },
        style
      ]}
      {...props}
    />
  );
}
