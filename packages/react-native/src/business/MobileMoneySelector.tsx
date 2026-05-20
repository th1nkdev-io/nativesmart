import React from "react";
import { View } from "react-native";
import { Button } from "../components/Button";
import { useNativesmartTheme } from "../theme";

export type MobileMoneyProvider = "mtn" | "airtel" | "orange" | "wave" | "mpesa" | string;

export function MobileMoneySelector({
  providers,
  selected,
  onSelect
}: {
  providers: MobileMoneyProvider[];
  selected?: string;
  onSelect?: (provider: string) => void;
}) {
  const theme = useNativesmartTheme();
  return (
    <View style={{ gap: theme.spacing[2] }}>
      {providers.map((provider) => (
        <Button
          key={provider}
          label={provider.toUpperCase()}
          variant={selected === provider ? "primary" : "secondary"}
          onPress={() => onSelect?.(provider)}
        />
      ))}
    </View>
  );
}
