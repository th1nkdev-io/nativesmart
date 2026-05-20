import React from "react";
import { TextInput, type TextInputProps } from "react-native";
import { useNativesmartTheme } from "../theme";

export type InputProps = TextInputProps & {
  invalid?: boolean;
};

export function Input({ invalid = false, style, placeholderTextColor, ...props }: InputProps) {
  const theme = useNativesmartTheme();
  return (
    <TextInput
      placeholderTextColor={placeholderTextColor ?? theme.colors.textMuted}
      style={[
        {
          minHeight: 48,
          borderRadius: theme.radius.md,
          borderWidth: 1,
          borderColor: invalid ? theme.colors.danger : theme.colors.border,
          backgroundColor: theme.colors.surface,
          color: theme.colors.text,
          paddingHorizontal: theme.spacing[3],
          fontSize: theme.typography.fontSize.md
        },
        style
      ]}
      {...props}
    />
  );
}
