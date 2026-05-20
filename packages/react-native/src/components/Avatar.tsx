import React from "react";
import { Image, View, type ImageSourcePropType } from "react-native";
import { useNativesmartTheme } from "../theme";
import { Text } from "./Text";

export function Avatar({
  initials,
  source,
  size = 40
}: {
  initials?: string;
  source?: ImageSourcePropType;
  size?: number;
}) {
  const theme = useNativesmartTheme();
  const style = { width: size, height: size, borderRadius: size / 2 };
  if (source) return <Image source={source} style={style} />;

  return (
    <View
      style={[
        style,
        {
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.primaryMuted
        }
      ]}
    >
      <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>{initials ?? "NS"}</Text>
    </View>
  );
}
