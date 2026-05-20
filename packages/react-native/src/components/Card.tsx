import React from "react";
import { Box, type BoxProps } from "./Box";
import { useNativesmartTheme } from "../theme";

export function Card({ style, ...props }: BoxProps) {
  const theme = useNativesmartTheme();
  return (
    <Box
      background="surface"
      padding={4}
      style={[
        {
          borderRadius: theme.radius.lg,
          borderWidth: 1,
          borderColor: theme.colors.border
        },
        style
      ]}
      {...props}
    />
  );
}
