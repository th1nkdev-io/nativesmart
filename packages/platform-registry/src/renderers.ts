import { componentContracts, type RendererManifest } from "@nativesmart/contracts";

const foundationComponents = componentContracts.map((component) => component.id);
const allDesignSystems = ["thinkdev", "material", "bootstrap", "cupertino"] as const;

function plannedRenderer(
  renderer: Omit<RendererManifest, "status" | "implementedComponents">
): RendererManifest {
  return { ...renderer, status: "planned", implementedComponents: [] };
}

export const rendererManifests: readonly RendererManifest[] = [
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
    implementedComponents: foundationComponents
  },
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
    implementedComponents: foundationComponents
  },
  plannedRenderer({
    id: "react-web",
    name: "React Web",
    framework: "React",
    language: ["TypeScript", "CSS"],
    categories: ["web"],
    operatingSystems: ["Web"],
    packageName: "@nativesmart/react",
    supportedDesignSystems: allDesignSystems
  }),
  plannedRenderer({
    id: "vue",
    name: "Vue",
    framework: "Vue",
    language: ["TypeScript", "CSS"],
    categories: ["web"],
    operatingSystems: ["Web"],
    packageName: "@nativesmart/vue",
    supportedDesignSystems: allDesignSystems
  }),
  plannedRenderer({
    id: "angular",
    name: "Angular",
    framework: "Angular",
    language: ["TypeScript", "CSS"],
    categories: ["web"],
    operatingSystems: ["Web"],
    packageName: "@nativesmart/angular",
    supportedDesignSystems: allDesignSystems
  }),
  plannedRenderer({
    id: "html-css",
    name: "HTML and CSS",
    framework: "Web Components",
    language: ["HTML", "CSS", "JavaScript"],
    categories: ["web"],
    operatingSystems: ["Web"],
    packageName: "@nativesmart/elements",
    supportedDesignSystems: ["thinkdev", "material", "bootstrap"]
  }),
  plannedRenderer({
    id: "compose",
    name: "Jetpack Compose",
    framework: "Compose Multiplatform",
    language: ["Kotlin"],
    categories: ["mobile", "desktop"],
    operatingSystems: ["Android", "Windows", "macOS", "Linux"],
    packageName: "com.thinkdev.nativesmart:compose",
    supportedDesignSystems: ["thinkdev", "material"]
  }),
  plannedRenderer({
    id: "swiftui",
    name: "SwiftUI",
    framework: "SwiftUI",
    language: ["Swift"],
    categories: ["mobile", "desktop"],
    operatingSystems: ["iOS", "iPadOS", "macOS"],
    packageName: "NativesmartSwiftUI",
    supportedDesignSystems: ["thinkdev", "material", "cupertino"]
  }),
  plannedRenderer({
    id: "desktop-web",
    name: "Desktop Web Shell",
    framework: "Electron or Tauri",
    language: ["TypeScript", "Rust"],
    categories: ["desktop"],
    operatingSystems: ["Windows", "macOS", "Linux"],
    packageName: "@nativesmart/desktop",
    supportedDesignSystems: ["thinkdev", "material", "bootstrap"]
  })
] as const;

export function getRendererManifest(id: string) {
  return rendererManifests.find((renderer) => renderer.id === id) ?? null;
}

export function getRenderersForDesignSystem(id: string) {
  return rendererManifests.filter((renderer) => renderer.supportedDesignSystems.includes(id));
}
