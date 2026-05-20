import React from "react";
import { ActivityIndicator, Pressable, type PressableProps } from "react-native";
import { useNativesmartTheme } from "../theme";
import { Text } from "./Text";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export type ButtonProps = PressableProps & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
};

export function Button({
  label,
  variant = "primary",
  loading = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const theme = useNativesmartTheme();
  const backgroundColor =
    variant === "primary"
      ? theme.colors.primary
      : variant === "danger"
        ? theme.colors.danger
        : variant === "secondary"
          ? theme.colors.surfaceMuted
          : "transparent";
  const color = variant === "primary" || variant === "danger" ? "#ffffff" : theme.colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          minHeight: 48,
          borderRadius: theme.radius.md,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: theme.spacing[4],
          backgroundColor,
          opacity: disabled ? 0.48 : pressed ? 0.82 : 1
        },
        typeof style === "function" ? style({ pressed }) : style
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={color} />
      ) : (
        <Text style={{ color, fontWeight: "600" }}>{label}</Text>
      )}
    </Pressable>
  );
}
