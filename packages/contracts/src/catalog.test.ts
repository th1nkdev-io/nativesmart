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
    expect(componentContracts).toHaveLength(193);
    expect(getContractsByLayer("foundation")).toHaveLength(113);
    expect(getContractsByLayer("business")).toHaveLength(80);
  });

  it("keeps the Core v1.0 contracts reviewed", () => {
    const core = getContractsByPriority("P0").map((contract) => contract.id);
    expect(core).toHaveLength(13);
    expect(getComponentContract("button")?.states).toContain("focused");
    expect(getComponentContract("modal")?.accessibility.role).toBe("dialog");
    const reviewed = componentContracts.filter((contract) => contract.status !== "draft");
    expect(reviewed).toHaveLength(12);
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
