import React from "react";
import { ActivityIndicator, Pressable, type PressableProps } from "react-native";
import { useNativesmartTheme } from "../theme";
import { Text } from "./Text";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = PressableProps & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

export function getButtonColors(
  variant: ButtonVariant,
  theme: ReturnType<typeof useNativesmartTheme>
) {
  const backgroundColor =
    variant === "primary"
      ? theme.colors.primary
      : variant === "danger"
        ? theme.colors.danger
        : variant === "secondary"
          ? theme.colors.surfaceMuted
          : "transparent";
  const color =
    variant === "primary" || variant === "danger" ? theme.colors.onPrimary : theme.colors.text;

  return { backgroundColor, color };
}

export function Button({
  label,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const theme = useNativesmartTheme();
  const { backgroundColor, color } = getButtonColors(variant, theme);
  const minHeight = size === "sm" ? 40 : size === "lg" ? 56 : 48;
  const paddingHorizontal = size === "sm" ? theme.spacing[3] : theme.spacing[4];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled || loading), busy: loading }}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          minHeight,
          borderRadius: theme.radius.md,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal,
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
