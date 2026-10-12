import type {
  ComponentContract,
  DesignSystemDefinition,
  IntegrationManifest,
  RendererManifest
} from "./types";

function duplicates(values: readonly string[]) {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

export function validateComponentContracts(contracts: readonly ComponentContract[]) {
  const errors: string[] = [];
  for (const id of duplicates(contracts.map((contract) => contract.id))) {
    errors.push(`Duplicate component contract: ${id}`);
  }
  for (const contract of contracts) {
    if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(contract.id)) {
      errors.push(`${contract.id} must be a kebab-case identifier`);
    }
    if (contract.description.trim() === "") errors.push(`${contract.id} must have a description`);
    if (contract.anatomy.length === 0) errors.push(`${contract.id} must define its anatomy`);
    if (contract.states.length === 0) errors.push(`${contract.id} must define its states`);
    for (const name of duplicates(contract.properties.map((item) => item.name))) {
      errors.push(`${contract.id} has duplicate property: ${name}`);
    }
  }
  return errors;
}

export function validateArchitecture(input: {
  contracts: readonly ComponentContract[];
  designSystems: readonly DesignSystemDefinition[];
  renderers: readonly RendererManifest[];
  integrations?: readonly IntegrationManifest[];
}) {
  const errors = validateComponentContracts(input.contracts);
  const contractIds = new Set(input.contracts.map((item) => item.id));
  const designSystems = new Map(input.designSystems.map((item) => [item.id, item]));
  const rendererIds = new Set(input.renderers.map((item) => item.id));

  for (const id of duplicates(input.renderers.map((renderer) => renderer.id))) {
    errors.push(`Duplicate renderer: ${id}`);
  }

  for (const renderer of input.renderers) {
    for (const component of renderer.implementedComponents) {
      if (!contractIds.has(component)) {
        errors.push(`${renderer.id} implements unknown component: ${component}`);
      }
    }
    for (const id of renderer.supportedDesignSystems) {
      const designSystem = designSystems.get(id);
      if (!designSystem) {
        errors.push(`${renderer.id} supports unknown design system: ${id}`);
      } else if (
        !renderer.categories.some((category) => designSystem.supportedCategories.includes(category))
      ) {
        errors.push(`${renderer.id} supports ${id}, which targets none of its categories`);
      }
    }
    if (renderer.wraps !== undefined) {
      if (renderer.wraps === renderer.id) errors.push(`${renderer.id} cannot wrap itself`);
      else if (!rendererIds.has(renderer.wraps)) {
        errors.push(`${renderer.id} wraps unknown renderer: ${renderer.wraps}`);
      }
    }
  }

  const integrations = input.integrations ?? [];
  for (const id of duplicates(integrations.map((integration) => integration.id))) {
    errors.push(`Duplicate integration: ${id}`);
  }
  for (const integration of integrations) {
    for (const target of integration.targets) {
      if (!rendererIds.has(target)) {
        errors.push(`${integration.id} targets unknown renderer: ${target}`);
      }
    }
  }

  for (const designSystem of input.designSystems) {
    for (const recipe of designSystem.recipes) {
      if (!contractIds.has(recipe.component)) {
        errors.push(`${designSystem.id} has recipe for unknown component: ${recipe.component}`);
      }
    }
  }

  for (const category of ["mobile", "web", "desktop"] as const) {
    if (!input.renderers.some((renderer) => renderer.categories.includes(category))) {
      errors.push(`No renderer targets the ${category} category`);
    }
  }

  return errors;
}
