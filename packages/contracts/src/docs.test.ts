import { describe, expect, it } from "vitest";
import { componentContracts, getComponentContract } from "./catalog";
import { describeContract } from "./docs";

describe("contract docs", () => {
  it("only explains parts, states, events, keys and tokens the contract has", () => {
    for (const contract of componentContracts) {
      const docs = contract.docs ?? {};
      const check = (label: string, keys: object | undefined, known: readonly string[]) => {
        for (const key of Object.keys(keys ?? {})) {
          expect(known, `${contract.id} documents an unknown ${label} "${key}"`).toContain(key);
        }
      };
      check("part", docs.anatomy, contract.anatomy);
      check("state", docs.states, contract.states);
      check("event", docs.events, contract.events);
      check("key", docs.keyboard, contract.accessibility.keyboard ?? []);
      check("token", docs.tokens, contract.semanticTokens);
    }
  });

  it("explains every state, event and key of the reviewed contracts", () => {
    for (const contract of componentContracts.filter((item) => item.status !== "draft")) {
      const description = describeContract(contract);
      for (const item of [...description.states, ...description.events, ...description.keyboard]) {
        expect(item.description, `${contract.id}: ${item.name}`).not.toBe("");
      }
    }
  });

  it("prefers the contract's own words over the standard ones", () => {
    const description = describeContract(getComponentContract("aspect-ratio")!);
    const loading = description.states.find((state) => state.name === "loading")!;
    expect(loading.standard).toBe(false);
    expect(description.events.find((event) => event.name === "load")?.payload).toBeDefined();
  });
});
