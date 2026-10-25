import type { RendererManifest } from "@nativesmart/contracts";

/** The P0 contracts implemented by the Vue, React Native and Flutter preview renderers. */
const previewComponents = [
  "avatar",
  "badge",
  "box",
  "button",
  "card",
  "divider",
  "icon",
  "input",
  "modal",
  "spinner",
  "text",
  "toast"
];
const webDesignSystems = ["thinkdev", "material", "bootstrap"] as const;
const mobileDesignSystems = ["thinkdev", "material", "cupertino"] as const;

function plannedRenderer(
  renderer: Omit<RendererManifest, "status" | "implementedComponents">
): RendererManifest {
  return { ...renderer, status: "planned", implementedComponents: [] };
}

export const rendererManifests: readonly RendererManifest[] = [
  // Mobile
  {
    id: "react-native",
    name: "React Native",
    framework: "React Native",
    language: ["TypeScript"],
    categories: ["mobile"],
    operatingSystems: ["Android", "iOS"],
    packageName: "@nativesmart/react-native",
    packagePath: "packages/mobile/react-native",
    playgroundPath: "apps/mobile/react-native",
    status: "preview",
    supportedDesignSystems: ["thinkdev"],
    implementedComponents: previewComponents,
    styling: "StyleSheet",
    notes: "Expo-compatible. Styles are resolved from tokens through StyleSheet, without Tailwind."
  },
  plannedRenderer({
    id: "react-native-nativewind",
    name: "React Native with NativeWind",
    framework: "React Native",
    language: ["TypeScript"],
    categories: ["mobile"],
    operatingSystems: ["Android", "iOS"],
    packageName: "@nativesmart/react-native-nativewind",
    packagePath: "packages/mobile/react-native-nativewind",
    playgroundPath: "apps/mobile/react-native-nativewind",
    supportedDesignSystems: mobileDesignSystems,
    styling: "NativeWind",
    notes:
      "Shares contracts, hooks and behavior with react-native; only the styling layer differs and uses @nativesmart/tailwind-preset."
  }),
  {
    id: "flutter",
    name: "Flutter",
    framework: "Flutter",
    language: ["Dart"],
    categories: ["mobile", "web", "desktop"],
    operatingSystems: ["Android", "iOS", "Web", "Windows", "macOS", "Linux"],
    packageName: "nativesmart_flutter",
    packagePath: "packages/mobile/flutter",
    playgroundPath: "apps/mobile/flutter",
    status: "preview",
    supportedDesignSystems: ["thinkdev", "material"],
    implementedComponents: previewComponents,
    styling: "ThemeData"
  },
  plannedRenderer({
    id: "compose",
    name: "Jetpack Compose",
    framework: "Compose Multiplatform",
    language: ["Kotlin"],
    categories: ["mobile", "desktop"],
    operatingSystems: ["Android", "Windows", "macOS", "Linux"],
    packageName: "com.thinkdev.nativesmart:compose",
    packagePath: "packages/mobile/kotlin",
    playgroundPath: "apps/mobile/kotlin",
    supportedDesignSystems: ["thinkdev", "material"],
    styling: "MaterialTheme and CompositionLocal",
    notes: "Kotlin renderer. Business logic comes from the Kotlin Multiplatform core."
  }),
  plannedRenderer({
    id: "swiftui",
    name: "SwiftUI",
    framework: "SwiftUI",
    language: ["Swift"],
    categories: ["mobile", "desktop"],
    operatingSystems: ["iOS", "iPadOS", "macOS"],
    packageName: "NativesmartSwiftUI",
    packagePath: "packages/mobile/swift",
    playgroundPath: "apps/mobile/swift",
    supportedDesignSystems: ["thinkdev", "material", "cupertino"],
    styling: "Environment values",
    notes: "UIKit apps consume components through UIHostingController; no separate UIKit renderer."
  }),
  plannedRenderer({
    id: "ionic-capacitor",
    name: "Ionic and Capacitor",
    framework: "Capacitor",
    language: ["TypeScript", "HTML", "CSS"],
    categories: ["mobile"],
    operatingSystems: ["Android", "iOS"],
    packageName: "@nativesmart/capacitor",
    packagePath: "packages/mobile/ionic-capacitor",
    playgroundPath: "apps/mobile/ionic-capacitor",
    supportedDesignSystems: mobileDesignSystems,
    styling: "CSS custom properties",
    wraps: "html-css",
    notes: "Hybrid apps built from the Web Components renderer plus native device plugins."
  }),
  plannedRenderer({
    id: "maui",
    name: ".NET MAUI",
    framework: ".NET MAUI",
    language: ["C#", "XAML"],
    categories: ["mobile", "desktop"],
    operatingSystems: ["Android", "iOS", "Windows", "macOS"],
    packageName: "Thinkdev.Nativesmart.Maui",
    packagePath: "packages/mobile/maui",
    playgroundPath: "apps/mobile/maui",
    supportedDesignSystems: mobileDesignSystems,
    styling: "ResourceDictionary",
    notes: "Delivered on enterprise or public-sector demand."
  }),

  // Web
  plannedRenderer({
    id: "html-css",
    name: "HTML and CSS",
    framework: "Web Components",
    language: ["HTML", "CSS", "JavaScript"],
    categories: ["web"],
    operatingSystems: ["Web"],
    packageName: "@nativesmart/elements",
    packagePath: "packages/web/html-css",
    playgroundPath: "apps/web/html-css",
    supportedDesignSystems: webDesignSystems,
    styling: "CSS custom properties",
    notes:
      "Framework-neutral custom elements built with Lit. Base for the Vue, Svelte, Angular and Capacitor wrappers."
  }),
  plannedRenderer({
    id: "react-web",
    name: "React Web",
    framework: "React",
    language: ["TypeScript", "CSS"],
    categories: ["web"],
    operatingSystems: ["Web"],
    packageName: "@nativesmart/react",
    packagePath: "packages/web/react",
    playgroundPath: "apps/web/react",
    supportedDesignSystems: webDesignSystems,
    styling: "CSS custom properties and Tailwind preset",
    notes: "Native React implementation for SSR and React Server Components compatibility."
  }),
  {
    id: "vue",
    name: "Vue",
    framework: "Vue",
    language: ["TypeScript", "CSS"],
    categories: ["web"],
    operatingSystems: ["Web"],
    packageName: "@nativesmart/vue",
    packagePath: "packages/web/vue",
    playgroundPath: "apps/web/vue",
    status: "preview",
    supportedDesignSystems: webDesignSystems,
    implementedComponents: [
      "aspect-ratio",
      "container",
      "grid",
      "keyboard-avoider",
      "safe-area",
      "scroll-area",
      "spacer",
      ...previewComponents
    ],
    styling: "CSS custom properties and Tailwind preset",
    notes: "First renderer: native Vue 3 components, validated in CV Action with Nuxt 4."
  },
  plannedRenderer({
    id: "svelte",
    name: "Svelte",
    framework: "Svelte",
    language: ["TypeScript", "CSS"],
    categories: ["web"],
    operatingSystems: ["Web"],
    packageName: "@nativesmart/svelte",
    packagePath: "packages/web/svelte",
    playgroundPath: "apps/web/svelte",
    supportedDesignSystems: webDesignSystems,
    styling: "CSS custom properties and Tailwind preset",
    wraps: "html-css",
    notes: "Typed wrappers with bind: support around the Web Components."
  }),
  plannedRenderer({
    id: "angular",
    name: "Angular",
    framework: "Angular",
    language: ["TypeScript", "CSS"],
    categories: ["web"],
    operatingSystems: ["Web"],
    packageName: "@nativesmart/angular",
    packagePath: "packages/web/angular",
    playgroundPath: "apps/web/angular",
    supportedDesignSystems: webDesignSystems,
    styling: "CSS custom properties",
    wraps: "html-css",
    notes: "Standalone components with ControlValueAccessor around the Web Components."
  }),

  // Desktop
  plannedRenderer({
    id: "desktop-web",
    name: "Desktop Web Shell",
    framework: "Electron or Tauri",
    language: ["TypeScript", "Rust"],
    categories: ["desktop"],
    operatingSystems: ["Windows", "macOS", "Linux"],
    packageName: "@nativesmart/desktop",
    packagePath: "packages/desktop/electron-tauri",
    playgroundPath: "apps/desktop/electron-tauri",
    supportedDesignSystems: webDesignSystems,
    styling: "CSS custom properties",
    wraps: "html-css"
  })
] as const;

export function getRendererManifest(id: string) {
  return rendererManifests.find((renderer) => renderer.id === id) ?? null;
}

export function getRenderersForDesignSystem(id: string) {
  return rendererManifests.filter((renderer) => renderer.supportedDesignSystems.includes(id));
}

export function getRenderersWrapping(id: string) {
  return rendererManifests.filter((renderer) => renderer.wraps === id);
}
