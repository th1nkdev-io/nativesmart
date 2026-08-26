import { describe, expect, it } from "vitest";
import { componentContracts, getComponentContract } from "./catalog";
import { validateComponentContracts } from "./validate";

describe("component contracts", () => {
  it("defines the current foundation catalog", () => {
    expect(componentContracts).toHaveLength(12);
    expect(getComponentContract("button")?.states).toContain("focused");
    expect(getComponentContract("modal")?.accessibility.role).toBe("dialog");
  });

  it("is structurally valid", () => {
    expect(validateComponentContracts(componentContracts)).toEqual([]);
  });
});
