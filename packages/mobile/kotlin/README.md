# Kotlin (Jetpack Compose)

Planned Nativesmart renderer. Nothing is implemented yet.

- Registry id: `compose`
- Package: `com.thinkdev.nativesmart:compose`
- Language: Kotlin
- Styling: MaterialTheme and CompositionLocal
- Playground: [`apps/mobile/kotlin`](../../../apps/mobile/kotlin)

## Planned layout

```txt
build.gradle.kts
src/commonMain/kotlin/com/thinkdev/nativesmart/
  components/
  business/
  theme/
src/androidMain/
src/desktopMain/
src/commonTest/
```

The renderer implements the shared component contracts from `@nativesmart/contracts` and consumes
tokens from `@nativesmart/tokens`. See [Platforms](../../../docs/platforms.md) for scope, delivery
order and promotion rules.
