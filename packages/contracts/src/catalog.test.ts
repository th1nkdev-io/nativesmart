import { describe, expect, it } from "vitest";
import {
  componentContracts,
  getComponentContract,
  getContractsByCategory,
  getContractsByLayer,
  getContractsByPriority
} from "./catalog";
import { validateComponentContracts } from "./validate";

describe("component contracts", () => {
  it("declares one contract per inventoried component", () => {
    expect(componentContracts).toHaveLength(201);
    expect(getContractsByLayer("foundation")).toHaveLength(121);
    expect(getContractsByLayer("business")).toHaveLength(80);
  });

  it("keeps the Core v1.0 contracts reviewed", () => {
    const core = getContractsByPriority("P0").map((contract) => contract.id);
    expect(core).toHaveLength(13);
    expect(getComponentContract("button")?.states).toContain("focused");
    expect(getComponentContract("modal")?.accessibility.role).toBe("dialog");
    const reviewed = componentContracts.filter((contract) => contract.status !== "draft");
    expect(reviewed).toHaveLength(36);
  });

  it("specifies every P1 form control", () => {
    const forms = getContractsByCategory("forms").filter((contract) => contract.priority !== "P2");
    expect(forms).toHaveLength(15);
    for (const contract of forms) {
      expect(contract.status, contract.id).not.toBe("draft");
      expect(contract.properties.length, contract.id).toBeGreaterThan(0);
      expect(contract.semanticTokens.length, contract.id).toBeGreaterThan(0);
    }
  });

  it("groups contracts by category", () => {
    expect(getContractsByCategory("forms").map((contract) => contract.id)).toContain("input");
    expect(getContractsByCategory("payments").map((contract) => contract.id)).toContain(
      "amount-input"
    );
  });

  it("is structurally valid", () => {
    expect(validateComponentContracts(componentContracts)).toEqual([]);
  });
});
