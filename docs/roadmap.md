# Roadmap

## MVP

- Shared token source.
- React Native package with base components and business component structure.
- Flutter package with base widgets and business component structure.
- Playground apps for each platform under `apps/<family>/<technology>`.
- Starter template folders.
- Documentation for vision, architecture and contribution.
- Platform-neutral component contract schema and foundation catalog.
- Thinkdev, Material, Bootstrap and Cupertino design-system definitions.
- Explicit mobile, web and desktop renderer registry.
- Brand, mode, density and direction composition model.
- Semantic color roles and brand themes (Thinkdev, CV Action).
- CSS custom properties output and the shared Tailwind preset.

## Now: Vue and Nuxt first

The first full renderer is Vue 3 with Nuxt 4, validated inside CV Action
(`cv-action-io/cv-action__web-v1`) with the CV Action brand theme. Other technologies follow once
every contract and its tokens are complete.

1. Brand themes, CSS variables and Tailwind preset.
2. `@nativesmart/vue` native renderer, `@nativesmart/nuxt` module and the `apps/web/vue`
   playground showing every variation of every component.
3. Components group by group: contract, component tokens, Vue component, playground page.
4. Progressive replacement of the `cva-*` components in CV Action.

## Next

- Align React Native and Flutter public APIs with the shared component contracts.
- Export tokens in W3C DTCG format through Style Dictionary.
- Implement the React/DOM renderer and Next.js compatibility.
- Implement the Web Components renderer (`@nativesmart/elements`).
- Add the NativeWind variant of the React Native renderer.
- Add contract-conformance suites reusable by every renderer.
- Add visual examples and screenshot testing.
- Add token drift checks.
- Generate renderer types and token bindings from contracts.
- Expand fintech and marketplace starters.
- Add accessibility review checklist.
- Add offline-first primitives and sync state components.

## Later

- More brand theme packs.
- Figma token synchronization.
- Svelte and Angular renderers with SvelteKit support.
- Laravel Blade, Django templates and Astro integrations.
- PWA delivery, Storybook documentation and Ionic/Capacitor renderer.
- Kotlin Multiplatform core, Jetpack Compose and SwiftUI renderer implementations.
- .NET MAUI renderer on enterprise demand.
- USSD and SMS rendering of mobile money flows.
- Desktop shell integration and native desktop fidelity passes.
- Private registry publishing.
- Premium templates and licensed business components.
