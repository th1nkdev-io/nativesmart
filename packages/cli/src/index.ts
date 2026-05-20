#!/usr/bin/env node

import {
  getKitDefinition,
  getStarterDefinition,
  kitDefinitions,
  starterDefinitions
} from "@nativesmart/core";

export const commands = [
  "create",
  "add component",
  "sync-tokens",
  "list kits",
  "list starters",
  "show kit",
  "show starter",
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

function formatList(items: { id: string; name: string; tier: string; status: string }[]) {
  return items.map((item) => `- ${item.id} (${item.tier}, ${item.status}) ${item.name}`).join("\n");
}

function getArgAfterCommand(argv: string[]) {
  return argv.slice(4).find((value) => value && !value.startsWith("-")) ?? null;
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

  if (command === "list kits") {
    console.log(formatList(kitDefinitions));
    return 0;
  }

  if (command === "list starters") {
    console.log(formatList(starterDefinitions));
    return 0;
  }

  if (command === "show kit") {
    const id = getArgAfterCommand(argv);
    const kit = id ? getKitDefinition(id) : null;
    if (!kit) {
      console.error(`Kit not found: ${id ?? "(missing id)"}`);
      return 1;
    }
    console.log(JSON.stringify(kit, null, 2));
    return 0;
  }

  if (command === "show starter") {
    const id = getArgAfterCommand(argv);
    const starter = id ? getStarterDefinition(id) : null;
    if (!starter) {
      console.error(`Starter not found: ${id ?? "(missing id)"}`);
      return 1;
    }
    console.log(JSON.stringify(starter, null, 2));
    return 0;
  }

  console.log(`Command "${command}" is reserved for the MVP generator roadmap.`);
  return 0;
}

if (require.main === module) {
  const exitCode = runCli(process.argv);
  process.exit(exitCode);
}
