import type { ComponentContract, DesignSystemDefinition, RendererManifest } from "./types";

function duplicates(values: readonly string[]) {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

export function validateComponentContracts(contracts: readonly ComponentContract[]) {
  const errors: string[] = [];
  for (const id of duplicates(contracts.map((contract) => contract.id))) {
    errors.push(`Duplicate component contract: ${id}`);
  }
  for (const contract of contracts) {
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
}) {
  const errors = validateComponentContracts(input.contracts);
  const contractIds = new Set(input.contracts.map((item) => item.id));
  const designSystemIds = new Set(input.designSystems.map((item) => item.id));

  for (const renderer of input.renderers) {
    for (const component of renderer.implementedComponents) {
      if (!contractIds.has(component)) {
        errors.push(`${renderer.id} implements unknown component: ${component}`);
      }
    }
    for (const designSystem of renderer.supportedDesignSystems) {
      if (!designSystemIds.has(designSystem)) {
        errors.push(`${renderer.id} supports unknown design system: ${designSystem}`);
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
