import type { ComponentContract, ComponentProperty } from "./types";

type RequiredContractFields = "id" | "name" | "layer" | "category" | "priority" | "description";

export type ContractDefinition = Pick<ComponentContract, RequiredContractFields> &
  Partial<Omit<ComponentContract, RequiredContractFields>>;

export function property(
  name: string,
  kind: ComponentProperty["kind"],
  description: string,
  options: Partial<ComponentProperty> = {}
): ComponentProperty {
  return { name, kind, description, ...options };
}

/** Creates a contract; anything not specified starts as a minimal draft. */
export function defineContract(definition: ContractDefinition): ComponentContract {
  return {
    status: "draft",
    anatomy: ["root"],
    properties: [],
    states: ["default"],
    events: [],
    accessibility: { requirements: ["Expose semantics supported by the host platform"] },
    semanticTokens: [],
    ...definition
  };
}
