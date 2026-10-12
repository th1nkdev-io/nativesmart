import React from "react";
import { Modal as NativeModal, View, type ModalProps as NativeModalProps } from "react-native";
import { useNativesmartTheme } from "../theme";

export type ModalProps = NativeModalProps & {
  children: React.ReactNode;
};

export function Modal({
  children,
  transparent = true,
  animationType = "fade",
  ...props
}: ModalProps) {
  const theme = useNativesmartTheme();
  return (
    <NativeModal transparent={transparent} animationType={animationType} {...props}>
      <View
        style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(2, 6, 23, 0.56)" }}
      >
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderTopLeftRadius: theme.radius.xl,
            borderTopRightRadius: theme.radius.xl,
            padding: theme.spacing[4]
          }}
        >
          {children}
        </View>
      </View>
    </NativeModal>
  );
}
