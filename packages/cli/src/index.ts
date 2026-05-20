#!/usr/bin/env node

export const commands = [
  "create",
  "add component",
  "sync-tokens",
  "create app",
  "add screen",
  "add flow",
  "add kit",
  "doctor",
  "validate",
  "upgrade",
  "theme create",
  "brand create"
] as const;

export function getCommand(argv: string[]) {
  const args = argv.slice(2).filter(Boolean);
  if (args.length === 0) return null;
  if (args[0] === "--help" || args[0] === "-h") return "help";
  return args.slice(0, 2).join(" ");
}

export function getHelpText() {
  return `Nativesmart CLI

Usage:
  nativesmart <command> [options]

Commands:
  ${commands.join("\n  ")}
`;
}

export function runCli(argv = process.argv) {
  const command = getCommand(argv);

  if (!command || command === "help") {
    console.log(getHelpText());
    return 0;
  }

  if (!commands.includes(command as (typeof commands)[number])) {
    console.error(`Unknown command: ${command}`);
    return 1;
  }

  console.log(`Command "${command}" is reserved for the MVP generator roadmap.`);
  return 0;
}

if (require.main === module) {
  const exitCode = runCli(process.argv);
  process.exit(exitCode);
}
