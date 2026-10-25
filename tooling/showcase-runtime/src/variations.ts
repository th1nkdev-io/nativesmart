import type { ComponentContract, ComponentProperty } from "@nativesmart/contracts";
import type { ShowcaseProps, ShowcasePropValue } from "./protocol";

export type VariationItem = { label: string; props: ShowcaseProps };
export type VariationGroup = { title: string; items: readonly VariationItem[] };

/** Property kinds the showcase can edit with a generated control. */
export const editableKinds = new Set(["boolean", "enum", "number", "string", "string-list"]);

function sampleValue(contract: ComponentContract, property: ComponentProperty) {
  if (property.example !== undefined) return property.example;
  switch (property.kind) {
    case "string":
      return property.name === "label" ? contract.name : property.required ? "Text" : undefined;
    case "enum":
      return property.values?.[0];
    case "boolean":
      return false;
    case "number":
      return property.required ? 0 : undefined;
    case "string-list":
      return [];
    default:
      return undefined;
  }
}

/**
 * Initial props: the contract's realistic example when it has one, otherwise its default, plus
 * sample values for required or labelling properties.
 */
export function defaultProps(contract: ComponentContract): ShowcaseProps {
  const props: Record<string, ShowcasePropValue> = {};
  for (const property of contract.properties) {
    if (!editableKinds.has(property.kind)) continue;
    const value = property.example ?? property.defaultValue ?? sampleValue(contract, property);
    if (value !== undefined) props[property.name] = value;
  }
  return props;
}

/**
 * Builds the variation matrix every renderer displays: one group per enum property listing all
 * its values, then one group with each boolean switched on. Other props keep their defaults.
 */
export function variationsFor(contract: ComponentContract): VariationGroup[] {
  const base = defaultProps(contract);
  const groups: VariationGroup[] = [];

  for (const property of contract.properties) {
    if (property.kind !== "enum" || !property.values?.length) continue;
    groups.push({
      title: property.name,
      items: property.values.map((value) => ({
        label: value,
        props: { ...base, [property.name]: value }
      }))
    });
  }

  /* Each boolean away from its default: on when it defaults to off, off when it defaults to on. */
  const booleans = contract.properties.filter((property) => property.kind === "boolean");
  if (booleans.length > 0) {
    groups.push({
      title: "states",
      items: [
        { label: "default", props: base },
        ...booleans.map((property) =>
          property.defaultValue === true
            ? { label: `${property.name}=false`, props: { ...base, [property.name]: false } }
            : { label: property.name, props: { ...base, [property.name]: true } }
        )
      ]
    });
  }

  if (groups.length === 0)
    groups.push({ title: "default", items: [{ label: "default", props: base }] });
  return groups;
}
