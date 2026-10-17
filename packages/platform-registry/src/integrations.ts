import type { IntegrationManifest } from "@nativesmart/contracts";

const webRenderers = ["html-css", "react-web", "vue", "svelte", "angular"] as const;

export const integrationManifests: readonly IntegrationManifest[] = [
  // Token outputs
  {
    id: "tokens-dtcg",
    name: "W3C DTCG tokens",
    kind: "token-output",
    description:
      "Canonical tokens exported in the W3C Design Tokens Community Group format and transformed with Style Dictionary for every renderer.",
    packageName: "@nativesmart/tokens",
    packagePath: "packages/tokens",
    status: "planned",
    targets: [
      "react-native",
      "react-native-nativewind",
      "flutter",
      "compose",
      "swiftui",
      "maui",
      ...webRenderers
    ]
  },
  {
    id: "tailwind-preset",
    name: "Tailwind preset",
    kind: "token-output",
    description:
      "Tailwind CSS preset generated from tokens and shared by NativeWind and the web renderers.",
    packageName: "@nativesmart/tailwind-preset",
    packagePath: "packages/integrations/tailwind-preset",
    status: "preview",
    targets: ["react-native-nativewind", "react-web", "vue", "svelte", "html-css"]
  },
  {
    id: "figma-tokens",
    name: "Figma token sync",
    kind: "design-tool",
    description: "Two-way token synchronization with Figma through Tokens Studio and DTCG files.",
    packageName: "@nativesmart/figma-tokens",
    packagePath: "packages/integrations/figma-tokens",
    status: "planned",
    targets: []
  },

  // Shared logic
  {
    id: "kmp-core",
    name: "Kotlin Multiplatform core",
    kind: "shared-logic",
    description:
      "Port of @nativesmart/core business rules (amounts, phone numbers, OTP, transaction states) shared by Kotlin and Swift renderers.",
    packageName: "com.thinkdev.nativesmart:core",
    packagePath: "packages/integrations/kmp-core",
    status: "planned",
    targets: ["compose", "swiftui"]
  },

  // Meta-frameworks
  {
    id: "nextjs",
    name: "Next.js",
    kind: "meta-framework",
    description: "SSR, App Router and React Server Components compatibility plus a starter.",
    packageName: "@nativesmart/react",
    packagePath: "packages/web/react",
    status: "planned",
    targets: ["react-web"]
  },
  {
    id: "nuxt",
    name: "Nuxt",
    kind: "meta-framework",
    description: "Nuxt module registering components, tokens and SSR-safe custom elements.",
    packageName: "@nativesmart/nuxt",
    packagePath: "packages/integrations/nuxt",
    status: "planned",
    targets: ["vue"]
  },
  {
    id: "sveltekit",
    name: "SvelteKit",
    kind: "meta-framework",
    description: "SSR compatibility and a SvelteKit starter.",
    packageName: "@nativesmart/svelte",
    packagePath: "packages/web/svelte",
    status: "planned",
    targets: ["svelte"]
  },
  {
    id: "astro",
    name: "Astro",
    kind: "meta-framework",
    description: "Astro integration for content sites and islands using Web Components or React.",
    packageName: "@nativesmart/astro",
    packagePath: "packages/integrations/astro",
    status: "planned",
    targets: ["html-css", "react-web"]
  },

  // Server templates
  {
    id: "laravel-blade",
    name: "Laravel Blade",
    kind: "server-templates",
    description: "Blade components rendering the HTML and CSS renderer markup server-side.",
    packageName: "thinkdev/nativesmart-blade",
    packagePath: "packages/integrations/laravel-blade",
    status: "planned",
    targets: ["html-css"]
  },
  {
    id: "django-templates",
    name: "Django templates",
    kind: "server-templates",
    description: "Django template tags rendering the HTML and CSS renderer markup server-side.",
    packageName: "nativesmart-django",
    packagePath: "packages/integrations/django",
    status: "planned",
    targets: ["html-css"]
  },

  // Delivery and hybrid shells
  {
    id: "pwa",
    name: "Progressive Web App",
    kind: "delivery",
    description:
      "Installable, offline-first web delivery with service worker, sync queue and low-data defaults.",
    packageName: "@nativesmart/pwa",
    packagePath: "packages/integrations/pwa",
    status: "planned",
    targets: [...webRenderers]
  },
  {
    id: "expo",
    name: "Expo",
    kind: "hybrid-shell",
    description: "Expo config plugin, EAS build profiles and starters for React Native renderers.",
    packageName: "@nativesmart/expo",
    packagePath: "packages/integrations/expo",
    status: "planned",
    targets: ["react-native", "react-native-nativewind"]
  },

  // Tooling
  {
    id: "storybook",
    name: "Storybook",
    kind: "tooling",
    description:
      "Shared component documentation, visual regression and accessibility checks across renderers.",
    packageName: "@nativesmart/storybook",
    packagePath: "packages/integrations/storybook",
    status: "planned",
    targets: ["react-native", "react-native-nativewind", ...webRenderers]
  },

  // Channels
  {
    id: "ussd-sms",
    name: "USSD and SMS flows",
    kind: "channel",
    description:
      "Text-only rendering of mobile money flow contracts (send money, OTP, receipt) for feature phones and no-data fallback.",
    packageName: "@nativesmart/ussd",
    packagePath: "packages/integrations/ussd",
    status: "planned",
    targets: []
  }
] as const;

export function getIntegrationManifest(id: string) {
  return integrationManifests.find((integration) => integration.id === id) ?? null;
}

export function getIntegrationsForRenderer(id: string) {
  return integrationManifests.filter((integration) => integration.targets.includes(id));
}
