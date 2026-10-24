export type ComponentLayer = "foundation" | "business" | "pattern";
export type FoundationCategory =
  | "layout"
  | "typography"
  | "actions"
  | "forms"
  | "feedback"
  | "overlays"
  | "navigation"
  | "data-display"
  | "media"
  | "utilities"
  | "immersive";
export type BusinessCategory =
  | "identity"
  | "payments"
  | "connectivity"
  | "commerce"
  | "delivery"
  | "saas"
  | "public-services";
export type ComponentCategory = FoundationCategory | BusinessCategory;
/** P0: Core v1.0. P1: needed for a real product. P2: on demand or with a kit. */
export type ComponentPriority = "P0" | "P1" | "P2";
export type ComponentStatus = "draft" | "preview" | "stable" | "deprecated";
export type PropertyKind = "boolean" | "enum" | "number" | "slot" | "string" | "string-list";
export type PlatformCategory = "desktop" | "mobile" | "web";
export type RendererStatus = "planned" | "preview" | "stable" | "deprecated";
export type IntegrationKind =
  | "channel"
  | "delivery"
  | "design-tool"
  | "hybrid-shell"
  | "meta-framework"
  | "server-templates"
  | "shared-logic"
  | "token-output"
  | "tooling";
export type ColorMode = "dark" | "high-contrast" | "light" | "system";
export type Density = "comfortable" | "compact" | "spacious";
export type TextDirection = "ltr" | "rtl";

export type ComponentProperty = {
  name: string;
  kind: PropertyKind;
  required?: boolean;
  defaultValue?: string | number | boolean;
  values?: readonly string[];
  /** Realistic sample used by playgrounds and docs when there is no default. */
  example?: string | number | boolean;
  description: string;
};

export type ComponentContract = {
  id: string;
  name: string;
  layer: ComponentLayer;
  category: ComponentCategory;
  priority: ComponentPriority;
  status: ComponentStatus;
  description: string;
  /** Platform families the component targets. Omitted means every family. */
  platforms?: readonly PlatformCategory[];
  anatomy: readonly string[];
  properties: readonly ComponentProperty[];
  states: readonly string[];
  events: readonly string[];
  accessibility: {
    role?: string;
    keyboard?: readonly string[];
    requirements: readonly string[];
  };
  semanticTokens: readonly string[];
};

export type ComponentRecipe = {
  component: string;
  variants: Readonly<Record<string, Readonly<Record<string, string | number>>>>;
  defaults: Readonly<Record<string, string | number | boolean>>;
};

export type DesignSystemDefinition = {
  id: string;
  name: string;
  description: string;
  supportedCategories: readonly PlatformCategory[];
  principles: readonly string[];
  foundationOverrides: Readonly<Record<string, string | number>>;
  recipes: readonly ComponentRecipe[];
};

export type BrandDefinition = {
  id: string;
  name: string;
  description?: string;
  tokenOverrides: Readonly<Record<string, string | number>>;
};

export type DesignConfiguration = {
  designSystem: string;
  brand?: BrandDefinition;
  mode: ColorMode;
  density: Density;
  direction: TextDirection;
  tokenOverrides?: Readonly<Record<string, string | number>>;
};

export type RendererManifest = {
  id: string;
  name: string;
  framework: string;
  language: readonly string[];
  categories: readonly PlatformCategory[];
  operatingSystems: readonly string[];
  packageName: string;
  status: RendererStatus;
  supportedDesignSystems: readonly string[];
  implementedComponents: readonly string[];
  /** Repository directory holding the renderer package. */
  packagePath: string;
  /** Repository directory holding the renderer playground app. */
  playgroundPath: string;
  /** Styling engine used by the renderer, such as StyleSheet, NativeWind or CSS. */
  styling?: string;
  /** Renderer this one wraps instead of reimplementing components. */
  wraps?: string;
  notes?: string;
};

export type IntegrationManifest = {
  id: string;
  name: string;
  kind: IntegrationKind;
  description: string;
  packageName: string;
  /** Repository directory holding the integration package. */
  packagePath: string;
  status: RendererStatus;
  /** Renderer identifiers consuming or served by this integration. */
  targets: readonly string[];
};
