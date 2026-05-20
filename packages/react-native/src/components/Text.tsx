import React from "react";
import { Text as NativeText, type TextProps as NativeTextProps } from "react-native";
import { useNativesmartTheme } from "../theme";

export type TextVariant = "body" | "caption" | "title" | "subtitle";

export type TextProps = NativeTextProps & {
  variant?: TextVariant;
  muted?: boolean;
};

const variants = {
  body: { fontSize: 16, lineHeight: 24, fontWeight: "400" },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: "400" },
  title: { fontSize: 24, lineHeight: 32, fontWeight: "700" },
  subtitle: { fontSize: 18, lineHeight: 28, fontWeight: "600" }
} as const;

export function Text({ variant = "body", muted = false, style, ...props }: TextProps) {
  const theme = useNativesmartTheme();
  return (
    <NativeText
      style={[
        variants[variant],
        { color: muted ? theme.colors.textMuted : theme.colors.text },
        style
      ]}
      {...props}
    />
  );
}
