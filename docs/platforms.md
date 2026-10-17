# Platforms

Nativesmart covers web and mobile through **renderers** (packages that implement the component
contracts for one framework) and **integrations** (token outputs, meta-frameworks, shared logic,
delivery targets, tooling and channels that plug renderers into real products).

Both are declared in `@nativesmart/platform-registry` before implementation. A planned manifest is
a commitment to naming and scope, not a claim that the package exists. `pnpm architecture:validate`
checks every manifest against contracts and design systems.

## Renderer matrix

| Renderer                  | Id                        | Language         | Styling engine               | Builds on  | Design systems                | Status  |
| ------------------------- | ------------------------- | ---------------- | ---------------------------- | ---------- | ----------------------------- | ------- |
| React Native              | `react-native`            | TypeScript       | StyleSheet                   | —          | Thinkdev                      | preview |
| React Native + NativeWind | `react-native-nativewind` | TypeScript       | NativeWind (Tailwind preset) | —          | Thinkdev, Material, Cupertino | planned |
| Flutter                   | `flutter`                 | Dart             | ThemeData                    | —          | Thinkdev, Material            | preview |
| Kotlin (Jetpack Compose)  | `compose`                 | Kotlin           | MaterialTheme, Locals        | —          | Thinkdev, Material            | planned |
| Swift (SwiftUI)           | `swiftui`                 | Swift            | Environment values           | —          | Thinkdev, Material, Cupertino | planned |
| Ionic / Capacitor         | `ionic-capacitor`         | TypeScript       | CSS custom properties        | `html-css` | Thinkdev, Material, Cupertino | planned |
| .NET MAUI                 | `maui`                    | C#, XAML         | ResourceDictionary           | —          | Thinkdev, Material, Cupertino | planned |
| HTML-CSS (Web Components) | `html-css`                | HTML, CSS, JS    | CSS custom properties        | —          | Thinkdev, Material, Bootstrap | planned |
| React                     | `react-web`               | TypeScript       | CSS variables + Tailwind     | —          | Thinkdev, Material, Bootstrap | planned |
| Vue                       | `vue`                     | TypeScript       | CSS variables + Tailwind     | —          | Thinkdev, Material, Bootstrap | preview |
| Svelte                    | `svelte`                  | TypeScript       | CSS variables + Tailwind     | `html-css` | Thinkdev, Material, Bootstrap | planned |
| Angular                   | `angular`                 | TypeScript       | CSS custom properties        | `html-css` | Thinkdev, Material, Bootstrap | planned |
| Desktop web shell         | `desktop-web`             | TypeScript, Rust | CSS custom properties        | `html-css` | Thinkdev, Material, Bootstrap | planned |

Flutter additionally targets web and desktop; Compose Multiplatform targets desktop; SwiftUI
targets iPadOS and macOS. Bootstrap is never offered on mobile renderers and Cupertino is never
offered on web renderers: the validator rejects a design system that shares no category with the
renderer.

### Packages and directories

Each renderer has a package directory under `packages/<family>/<technology>` and a playground app
under `apps/<family>/<technology>`. Manifests record both as `packagePath` and `playgroundPath`,
and a registry test fails if either directory is missing.

| Id                        | Package                                | Registry      | Package directory                         | Playground                            |
| ------------------------- | -------------------------------------- | ------------- | ----------------------------------------- | ------------------------------------- |
| `react-native`            | `@nativesmart/react-native`            | npm           | `packages/mobile/react-native`            | `apps/mobile/react-native`            |
| `react-native-nativewind` | `@nativesmart/react-native-nativewind` | npm           | `packages/mobile/react-native-nativewind` | `apps/mobile/react-native-nativewind` |
| `flutter`                 | `nativesmart_flutter`                  | pub.dev       | `packages/mobile/flutter`                 | `apps/mobile/flutter`                 |
| `compose`                 | `com.thinkdev.nativesmart:compose`     | Maven         | `packages/mobile/kotlin`                  | `apps/mobile/kotlin`                  |
| `swiftui`                 | `NativesmartSwiftUI`                   | Swift Package | `packages/mobile/swift`                   | `apps/mobile/swift`                   |
| `ionic-capacitor`         | `@nativesmart/capacitor`               | npm           | `packages/mobile/ionic-capacitor`         | `apps/mobile/ionic-capacitor`         |
| `maui`                    | `Thinkdev.Nativesmart.Maui`            | NuGet         | `packages/mobile/maui`                    | `apps/mobile/maui`                    |
| `html-css`                | `@nativesmart/elements`                | npm           | `packages/web/html-css`                   | `apps/web/html-css`                   |
| `react-web`               | `@nativesmart/react`                   | npm           | `packages/web/react`                      | `apps/web/react`                      |
| `vue`                     | `@nativesmart/vue`                     | npm           | `packages/web/vue`                        | `apps/web/vue`                        |
| `svelte`                  | `@nativesmart/svelte`                  | npm           | `packages/web/svelte`                     | `apps/web/svelte`                     |
| `angular`                 | `@nativesmart/angular`                 | npm           | `packages/web/angular`                    | `apps/web/angular`                    |
| `desktop-web`             | `@nativesmart/desktop`                 | npm           | `packages/desktop/electron-tauri`         | `apps/desktop/electron-tauri`         |

## Renderer strategy

### Web Components first

`@nativesmart/elements` implements every contract once as framework-neutral custom elements built
with Lit, styled with CSS custom properties generated from tokens. Svelte, Angular, Capacitor and
the desktop shell **wrap** it (`wraps: "html-css"` in the manifest) instead of reimplementing
components:

- Svelte: typed components, `bind:` support and slot mapping;
- Angular: standalone components and `ControlValueAccessor` for forms;
- Capacitor: native device plugins (camera for KYC, biometrics, share) around the same elements.

Wrappers own framework ergonomics only. Behavior, accessibility and styling live in the elements,
so a fix lands once for every wrapper.

React and Vue are the exceptions:

- `@nativesmart/vue` is the first renderer. It is written in native Vue 3 and validated inside CV
  Action (Nuxt 4) with the CV Action brand theme, which gives a real product from day one.
- `@nativesmart/react` is a native implementation so that SSR, hydration and React Server
  Components work without custom-element limitations.

### React Native: two styling engines

React Native is delivered in two flavors sharing the same contracts, hooks and business logic:

- `@nativesmart/react-native`: styles resolved from tokens through `StyleSheet`, no Tailwind
  dependency. Best for teams that avoid build-time styling tooling.
- `@nativesmart/react-native-nativewind`: the same components styled with NativeWind
  `className`s from `@nativesmart/tailwind-preset`. Best for teams that already use Tailwind on the
  web and want one styling vocabulary across platforms.

Only the styling layer differs. Shared hooks and non-visual logic must not be duplicated between
the two packages.

### Native mobile: Kotlin and Swift

- Kotlin uses Jetpack Compose (Compose Multiplatform for desktop). XML Views are not supported.
- Swift uses SwiftUI. UIKit apps embed components through `UIHostingController`; there is no
  separate UIKit renderer.
- Business rules (amount parsing, phone-number validation, OTP, transaction states) come from the
  Kotlin Multiplatform core (`kmp-core`), shared by both renderers instead of being written twice.

### .NET MAUI

Planned for enterprise and public-sector clients who standardize on .NET. It is delivered on
demand and does not block any other renderer.

## Integrations

Integrations with their own package live in `packages/integrations/<name>`. Next.js and
SvelteKit ship inside the React and Svelte renderer packages, and DTCG tokens inside
`packages/tokens`.

| Integration         | Id                 | Kind             | Package                         | Serves                                   |
| ------------------- | ------------------ | ---------------- | ------------------------------- | ---------------------------------------- |
| W3C DTCG tokens     | `tokens-dtcg`      | token-output     | `@nativesmart/tokens`           | all renderers                            |
| Tailwind preset     | `tailwind-preset`  | token-output     | `@nativesmart/tailwind-preset`  | NativeWind, React, Vue, Svelte, HTML-CSS |
| Figma token sync    | `figma-tokens`     | design-tool      | `@nativesmart/figma-tokens`     | design tooling                           |
| Kotlin MP core      | `kmp-core`         | shared-logic     | `com.thinkdev.nativesmart:core` | Compose, SwiftUI                         |
| Next.js             | `nextjs`           | meta-framework   | `@nativesmart/react`            | React                                    |
| Nuxt                | `nuxt`             | meta-framework   | `@nativesmart/nuxt`             | Vue                                      |
| SvelteKit           | `sveltekit`        | meta-framework   | `@nativesmart/svelte`           | Svelte                                   |
| Astro               | `astro`            | meta-framework   | `@nativesmart/astro`            | HTML-CSS, React                          |
| Laravel Blade       | `laravel-blade`    | server-templates | `thinkdev/nativesmart-blade`    | HTML-CSS                                 |
| Django templates    | `django-templates` | server-templates | `nativesmart-django`            | HTML-CSS                                 |
| Progressive Web App | `pwa`              | delivery         | `@nativesmart/pwa`              | all web renderers                        |
| Expo                | `expo`             | hybrid-shell     | `@nativesmart/expo`             | both React Native flavors                |
| Storybook           | `storybook`        | tooling          | `@nativesmart/storybook`        | React Native flavors and web renderers   |
| USSD and SMS flows  | `ussd-sms`         | channel          | `@nativesmart/ussd`             | mobile money flow contracts              |

Notes:

- **Tokens** are exported in the W3C DTCG format and transformed with Style Dictionary into CSS
  custom properties, Tailwind, TypeScript, Dart, Kotlin, Swift and C# outputs. See
  [Tokens](tokens.md).
- **Server templates** render the same markup and classes as `@nativesmart/elements`, so
  PHP/Laravel and Python/Django products get Nativesmart without a JavaScript framework.
- **PWA** provides installable, offline-first delivery with a service worker, sync queue and
  low-data defaults, extending the `offline-first` kit to the web.
- **USSD and SMS** render mobile money flow contracts (send money, OTP, receipt) as text menus for
  feature phones and no-data fallback. They consume flow contracts, not visual components.

## Delivery order

1. Brand themes, CSS custom properties and the Tailwind preset (done).
2. `@nativesmart/vue` and the Nuxt module, validated in CV Action, with the Nativesmart Lab.
3. `@nativesmart/react` (Core v1.0 stable web renderer) and Next.js compatibility.
4. `@nativesmart/elements` (Web Components) and the server-template integrations.
5. `@nativesmart/react-native-nativewind`, then Svelte and Angular wrappers with SvelteKit.
6. PWA, Storybook and Capacitor.
7. Kotlin Multiplatform core and the Compose renderer.
8. SwiftUI renderer.
9. Desktop shell, .NET MAUI and USSD/SMS on demand.

Only React Native and React/DOM are required for Core v1.0 (see the
[production readiness checklist](production-readiness-checklist.md)). Every other target can ship
later as `preview` without blocking the release.

## Nativesmart Lab

The [Nativesmart Lab](../apps/showcase/README.md) is the public page where every component can be
tried live, published on GitHub Pages from `dev`. It switches technology, brand theme, light or
dark mode, direction and screen width. Each renderer exposes a playground app that the Lab loads
in an iframe, so a new technology appears there as soon as its playground is plugged in.

## Promotion rules

A renderer moves from `planned` to `preview` when its package exists, lists its implemented
components in the manifest and passes its own build and tests. It becomes `stable` only after it:

- implements every Core v1.0 contract with all required properties, states and events;
- passes the shared conformance suite, accessibility checks and visual regression;
- supports light, dark, density and LTR/RTL;
- documents installation, minimum platform versions and known limits.

Wrapper renderers inherit behavior from the renderer they wrap but still need their own binding,
form-integration and SSR tests.

## Adding a renderer or integration

1. Create `packages/<family>/<technology>` (and `apps/<family>/<technology>` for a renderer) with a
   README describing the planned package.
2. Add a manifest in `packages/platform-registry/src/renderers.ts` or `integrations.ts` with status
   `planned` and the directory paths.
3. Run `pnpm architecture:validate` and fix any unknown design system, wrap or target.
4. Update this page and the [roadmap](roadmap.md).
5. Implement the package, then move the manifest to `preview` with its `implementedComponents`.
