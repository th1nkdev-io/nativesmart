import { describe, expect, it } from "vitest";
import { getCommand, getHelpText } from "./index";

describe("cli", () => {
  it("parses single-word commands", () => {
    expect(getCommand(["node", "nativesmart", "create"])).toBe("create");
  });

  it("parses two-word commands", () => {
    expect(getCommand(["node", "nativesmart", "add", "component"])).toBe("add component");
  });

  it("prints available commands", () => {
    expect(getHelpText()).toContain("sync-tokens");
    expect(getHelpText()).toContain("list kits");
  });
});
