# React Native

`@nativesmart/react-native` provides Expo-friendly UI components, business components, hooks and theming for React Native apps.

## Installation

Inside this monorepo, use the workspace package:

```bash
pnpm --filter @nativesmart/app-react-native dev
```

In a future external app, install the published package:

```bash
pnpm add @nativesmart/react-native
```

## Minimal Usage

```tsx
import { NativesmartProvider, Button, AmountInput } from "@nativesmart/react-native";

export function App() {
  return (
    <NativesmartProvider mode="light">
      <Button label="Continue" onPress={() => {}} />
      <AmountInput currency="XOF" />
    </NativesmartProvider>
  );
}
```

## Hooks

```tsx
useTheme();
useBoolean();
useNetworkState();
useAmountInput();
useOtpInput();
```

## Styling engines

React Native is delivered in two flavors that share contracts, hooks and business logic:

| Package                                | Styling                                        | Status  |
| -------------------------------------- | ---------------------------------------------- | ------- |
| `@nativesmart/react-native`            | `StyleSheet` from tokens, no Tailwind          | preview |
| `@nativesmart/react-native-nativewind` | NativeWind with `@nativesmart/tailwind-preset` | planned |

Choose the NativeWind flavor when the team already uses Tailwind on the web. Only the styling
layer differs; hooks and non-visual logic are not duplicated.

## Known Limits

- The playground app (`apps/mobile/react-native`) is a demo shell, not a production starter yet.
- Component tests are still minimal.
- Advanced mobile patterns such as bottom sheets, select menus and date pickers are not implemented yet.
