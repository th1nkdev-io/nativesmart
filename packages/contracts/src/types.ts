export type ComponentLayer = "foundation" | "business" | "pattern";
export type ComponentStatus = "draft" | "preview" | "stable" | "deprecated";
export type PropertyKind = "boolean" | "enum" | "number" | "slot" | "string";
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
  description: string;
};

export type ComponentContract = {
  id: string;
  name: string;
  layer: ComponentLayer;
  status: ComponentStatus;
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
  status: RendererStatus;
  /** Renderer identifiers consuming or served by this integration. */
  targets: readonly string[];
};
