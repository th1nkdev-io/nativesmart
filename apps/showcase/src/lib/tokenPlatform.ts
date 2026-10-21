import { tokenReference, type TokenPlatform } from "@nativesmart/tokens";
import { computed } from "vue";
import { state } from "../state";
import { getTechnology } from "../technologies";

const platforms: Readonly<Record<string, TokenPlatform>> = {
  swiftui: "swift",
  compose: "kotlin",
  flutter: "dart",
  "react-native": "react-native",
  "react-native-nativewind": "react-native"
};

/** Format of the tokens shown in the Lab, following the technology picked in the rail. */
export const tokenPlatform = computed<TokenPlatform>(() => platforms[state.tech] ?? "css");
export const tokenPlatformName = computed(() => getTechnology(state.tech).name);

/** Whether a string is a token name rather than a selector or a media query. */
export function isTokenName(value: string) {
  return /^(--ns-|\.?ns-text-)/.test(value);
}

/** The token as written in the active technology, or null when it only exists in CSS. */
export function referenceFor(value: string) {
  if (!isTokenName(value)) return value;
  return tokenReference(value, tokenPlatform.value);
}
