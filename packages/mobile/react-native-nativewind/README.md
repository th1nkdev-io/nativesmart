# React Native + NativeWind

Planned Nativesmart renderer. Nothing is implemented yet.

- Registry id: `react-native-nativewind`
- Package: `@nativesmart/react-native-nativewind`
- Language: TypeScript
- Styling: NativeWind with @nativesmart/tailwind-preset
- Playground: [`apps/mobile/react-native-nativewind`](../../../apps/mobile/react-native-nativewind)

## Planned layout

```txt
src/
  components/      # same contracts as @nativesmart/react-native, styled with className
  business/
  index.ts
test/
```

The renderer implements the shared component contracts from `@nativesmart/contracts` and consumes
tokens from `@nativesmart/tokens`. See [Platforms](../../../docs/platforms.md) for scope, delivery
order and promotion rules.
