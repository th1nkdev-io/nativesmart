import { describe, expect, it } from "vitest";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { getCommand, getHelpText, runCli } from "./index";

function inTempWorkspace<T>(run: (dir: string) => T) {
  const dir = mkdtempSync(join(tmpdir(), "nativesmart-cli-"));
  const previous = process.cwd();
  process.chdir(dir);

  try {
    return run(dir);
  } finally {
    process.chdir(previous);
    rmSync(dir, { recursive: true, force: true });
  }
}

function captureConsole(run: () => number) {
  const logs: string[] = [];
  const errors: string[] = [];
  const originalLog = console.log;
  const originalError = console.error;
  console.log = (message?: unknown) => logs.push(String(message));
  console.error = (message?: unknown) => errors.push(String(message));

  try {
    const exitCode = run();
    return { exitCode, logs, errors };
  } finally {
    console.log = originalLog;
    console.error = originalError;
  }
}

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

  it("shows kit details by id", () => {
    const result = captureConsole(() => runCli(["node", "nativesmart", "show", "kit", "fintech"]));

    expect(result.exitCode).toBe(0);
    expect(result.logs.join("\n")).toContain('"id": "fintech"');
  });

  it("creates a starter app", () => {
    inTempWorkspace((dir) => {
      const result = captureConsole(() =>
        runCli([
          "node",
          "nativesmart",
          "create",
          "app",
          "--name",
          "wallet-app",
          "--template",
          "fintech-mobile-app"
        ])
      );

      expect(result.exitCode).toBe(0);
      expect(existsSync(join(dir, "wallet-app", "package.json"))).toBe(true);
      expect(readFileSync(join(dir, "wallet-app", "nativesmart.config.json"), "utf8")).toContain(
        "fintech"
      );
    });
  });

  it("adds a kit to local config", () => {
    inTempWorkspace((dir) => {
      const result = captureConsole(() =>
        runCli(["node", "nativesmart", "add", "kit", "mobile-money"])
      );

      expect(result.exitCode).toBe(0);
      expect(readFileSync(join(dir, "nativesmart.config.json"), "utf8")).toContain("mobile-money");
    });
  });
});
