import { componentContracts } from "./components";
import type { ComponentCategory, ComponentLayer, ComponentPriority } from "./types";

export * from "./components";

export function getComponentContract(id: string) {
  return componentContracts.find((contract) => contract.id === id) ?? null;
}

export function getContractsByLayer(layer: ComponentLayer) {
  return componentContracts.filter((contract) => contract.layer === layer);
}

export function getContractsByCategory(category: ComponentCategory) {
  return componentContracts.filter((contract) => contract.category === category);
}

export function getContractsByPriority(priority: ComponentPriority) {
  return componentContracts.filter((contract) => contract.priority === priority);
}
