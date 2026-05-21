import { describe, expect, it } from "vitest";
import {
  getKitDefinition,
  getStarterDefinition,
  kitDefinitions,
  starterDefinitions
} from "./catalog";

describe("product catalog", () => {
  it("defines priority kits", () => {
    expect(kitDefinitions.filter((kit) => kit.priority === 1)).toHaveLength(4);
    expect(getKitDefinition("fintech")?.components).toContain("WalletBalanceCard");
  });

  it("links premium starters to kits", () => {
    expect(starterDefinitions).toHaveLength(5);
    expect(getStarterDefinition("offline-field-agent")?.kits).toContain("offline-first");
  });

  it("keeps starter kit references resolvable", () => {
    for (const starter of starterDefinitions) {
      for (const kitId of starter.kits) {
        expect(getKitDefinition(kitId), `${starter.id} references ${kitId}`).not.toBeNull();
      }
    }
  });
});
