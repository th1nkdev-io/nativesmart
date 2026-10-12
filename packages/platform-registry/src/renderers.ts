import { componentContracts, type RendererManifest } from "@nativesmart/contracts";

const foundationComponents = componentContracts.map((component) => component.id);
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
    status: "preview",
    supportedDesignSystems: ["thinkdev"],
    implementedComponents: foundationComponents,
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
    status: "preview",
    supportedDesignSystems: ["thinkdev", "material"],
    implementedComponents: foundationComponents,
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
    supportedDesignSystems: webDesignSystems,
    styling: "CSS custom properties and Tailwind preset",
    notes: "Native React implementation for SSR and React Server Components compatibility."
  }),
  plannedRenderer({
    id: "vue",
    name: "Vue",
    framework: "Vue",
    language: ["TypeScript", "CSS"],
    categories: ["web"],
    operatingSystems: ["Web"],
    packageName: "@nativesmart/vue",
    supportedDesignSystems: webDesignSystems,
    styling: "CSS custom properties and Tailwind preset",
    wraps: "html-css",
    notes: "Typed wrappers with v-model support around the Web Components."
  }),
  plannedRenderer({
    id: "svelte",
    name: "Svelte",
    framework: "Svelte",
    language: ["TypeScript", "CSS"],
    categories: ["web"],
    operatingSystems: ["Web"],
    packageName: "@nativesmart/svelte",
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
