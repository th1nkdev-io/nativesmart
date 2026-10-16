import { describe, expect, it } from "vitest";
import { defineContract, property } from "./define";
import { validateComponentContracts } from "./validate";

const base = {
  id: "sample",
  name: "Sample",
  layer: "foundation",
  category: "forms",
  priority: "P1",
  description: "Sample contract"
} as const;

describe("contract validation", () => {
  it("rejects malformed properties", () => {
    const contract = defineContract({
      ...base,
      properties: [
        property("size", "enum", "No values"),
        property("tone", "enum", "Bad default", { values: ["a", "b"], defaultValue: "c" }),
        property("open", "boolean", "Wrong default type", { defaultValue: "yes" }),
        property("label", "string", "Values on a string", { values: ["x"] })
      ]
    });
    expect(validateComponentContracts([contract])).toEqual([
      "sample.size is an enum without values",
      "sample.tone default value is not one of its values",
      "sample.open has a default value that does not match its boolean kind",
      "sample.label declares values but is not an enum"
    ]);
  });

  it("rejects duplicate states and events", () => {
    const contract = defineContract({
      ...base,
      states: ["default", "default"],
      events: ["change", "change"]
    });
    expect(validateComponentContracts([contract])).toEqual([
      "sample has duplicate state: default",
      "sample has duplicate event: change"
    ]);
  });
});
