import type {
  BrandDefinition,
  ComponentRecipe,
  DesignConfiguration,
  DesignSystemDefinition
} from "@nativesmart/contracts";

function buttonRecipe(input: {
  radius: string;
  height: number;
  fontWeight: number;
  elevation: string;
}): ComponentRecipe {
  return {
    component: "button",
    defaults: { variant: "solid", intent: "primary", size: "md" },
    variants: {
      base: {
        "button.radius": input.radius,
        "button.height": input.height,
        "button.font.weight": input.fontWeight,
        "button.shadow": input.elevation
      },
      solid: {
        "button.background": "color.action.primary",
        "button.foreground": "color.on-action.primary"
      },
      outline: {
        "button.background": "color.transparent",
        "button.border": "color.action.primary",
        "button.foreground": "color.action.primary"
      },
      ghost: {
        "button.background": "color.transparent",
        "button.foreground": "color.action.primary"
      }
    }
  };
}

export const thinkdevDesignSystem: DesignSystemDefinition = {
  id: "thinkdev",
  name: "Thinkdev",
  description: "The neutral, brandable Nativesmart foundation used as the company default.",
  supportedCategories: ["mobile", "web", "desktop"],
  principles: ["brandable", "accessible", "product-oriented", "platform-aware"],
  foundationOverrides: {
    "shape.radius.control": "radius.md",
    "typography.family.body": "font.system",
    "motion.emphasis": "motion.normal"
  },
  recipes: [
    buttonRecipe({ radius: "radius.md", height: 48, fontWeight: 600, elevation: "shadow.none" })
  ]
};

export const materialDesignSystem: DesignSystemDefinition = {
  id: "material",
  name: "Material",
  description: "Material-oriented recipes with expressive shape, elevation and state layers.",
  supportedCategories: ["mobile", "web", "desktop"],
  principles: ["state-layers", "tonal-color", "elevation", "adaptive-layout"],
  foundationOverrides: {
    "shape.radius.control": "radius.full",
    "typography.family.body": "font.system",
    "motion.emphasis": "motion.expressive"
  },
  recipes: [
    buttonRecipe({ radius: "radius.full", height: 40, fontWeight: 500, elevation: "shadow.sm" })
  ]
};

export const bootstrapDesignSystem: DesignSystemDefinition = {
  id: "bootstrap",
  name: "Bootstrap",
  description: "Web-first recipes compatible with Bootstrap visual and interaction conventions.",
  supportedCategories: ["web", "desktop"],
  principles: ["utility-friendly", "content-first", "responsive", "browser-native"],
  foundationOverrides: {
    "shape.radius.control": "radius.sm",
    "typography.family.body": "font.system",
    "motion.emphasis": "motion.fast"
  },
  recipes: [
    buttonRecipe({ radius: "radius.sm", height: 38, fontWeight: 400, elevation: "shadow.none" })
  ]
};

export const cupertinoDesignSystem: DesignSystemDefinition = {
  id: "cupertino",
  name: "Cupertino",
  description: "Apple-platform recipes that preserve native hierarchy, motion and interaction.",
  supportedCategories: ["mobile", "desktop"],
  principles: ["native-first", "clarity", "deference", "depth"],
  foundationOverrides: {
    "shape.radius.control": "radius.lg",
    "typography.family.body": "font.system",
    "motion.emphasis": "motion.spring"
  },
  recipes: [
    buttonRecipe({ radius: "radius.lg", height: 44, fontWeight: 600, elevation: "shadow.none" })
  ]
};

export const designSystems: readonly DesignSystemDefinition[] = [
  thinkdevDesignSystem,
  materialDesignSystem,
  bootstrapDesignSystem,
  cupertinoDesignSystem
] as const;

export function getDesignSystem(id: string) {
  return designSystems.find((designSystem) => designSystem.id === id) ?? null;
}

export function getComponentRecipe(designSystemId: string, componentId: string) {
  return (
    getDesignSystem(designSystemId)?.recipes.find((recipe) => recipe.component === componentId) ??
    null
  );
}

export function createBrand(definition: BrandDefinition) {
  if (!/^[a-z][a-z0-9-]*$/.test(definition.id)) {
    throw new Error("Brand id must use lowercase kebab-case");
  }
  return Object.freeze({ ...definition, tokenOverrides: { ...definition.tokenOverrides } });
}

export function resolveDesignConfiguration(configuration: DesignConfiguration) {
  const designSystem = getDesignSystem(configuration.designSystem);
  if (!designSystem) throw new Error(`Unknown design system: ${configuration.designSystem}`);

  return {
    metadata: {
      designSystem: designSystem.id,
      brand: configuration.brand?.id ?? null,
      mode: configuration.mode,
      density: configuration.density,
      direction: configuration.direction
    },
    tokens: {
      ...designSystem.foundationOverrides,
      ...configuration.brand?.tokenOverrides,
      ...configuration.tokenOverrides
    },
    recipes: designSystem.recipes
  } as const;
}
