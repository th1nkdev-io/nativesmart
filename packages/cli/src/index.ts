#!/usr/bin/env node

import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync
} from "node:fs";
import { join, resolve } from "node:path";
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

Examples:
  nativesmart list kits
  nativesmart show kit fintech
  nativesmart create app --name wallet-app --template fintech-mobile-app
  nativesmart add kit fintech
  nativesmart doctor
  nativesmart validate
`;
}

function formatList(items: { id: string; name: string; tier: string; status: string }[]) {
  return items.map((item) => `- ${item.id} (${item.tier}, ${item.status}) ${item.name}`).join("\n");
}

function getCommandLength(command: string | null) {
  return command?.includes(" ") ? 2 : 1;
}

function getArgsAfterCommand(argv: string[], command: string | null) {
  return argv.slice(2 + getCommandLength(command));
}

function getArgAfterCommand(argv: string[], command: string | null) {
  return (
    getArgsAfterCommand(argv, command).find((value) => value && !value.startsWith("-")) ?? null
  );
}

function getOption(argv: string[], name: string) {
  const index = argv.indexOf(`--${name}`);
  if (index === -1) return null;
  const value = argv[index + 1];
  return value && !value.startsWith("-") ? value : null;
}

function writeJson(path: string, value: unknown) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function getRepositoryRoot() {
  return resolve(__dirname, "../../..");
}

function copyDirectory(source: string, target: string) {
  mkdirSync(target, { recursive: true });

  for (const entry of readdirSync(source)) {
    const sourcePath = join(source, entry);
    const targetPath = join(target, entry);

    if (statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      copyFileSync(sourcePath, targetPath);
    }
  }
}

function copyStarterFiles(starterId: string, appDir: string) {
  const starterDir = join(getRepositoryRoot(), "templates", "premium", starterId);
  if (!existsSync(starterDir)) return false;

  for (const dir of ["api", "auth", "navigation", "screens"]) {
    const source = join(starterDir, dir);
    if (existsSync(source)) copyDirectory(source, join(appDir, "src", dir));
  }

  const docsDir = join(starterDir, "docs");
  if (existsSync(docsDir)) copyDirectory(docsDir, join(appDir, "docs"));

  return true;
}

function validateWorkspace(root = process.cwd()) {
  const errors: string[] = [];
  const kitsRegistryPath = join(root, "kits", "registry.json");
  const startersRegistryPath = join(root, "templates", "premium", "registry.json");

  if (!existsSync(kitsRegistryPath)) errors.push("Missing kits/registry.json");
  if (!existsSync(startersRegistryPath)) errors.push("Missing templates/premium/registry.json");

  for (const kit of kitDefinitions) {
    const manifestPath = join(root, "kits", kit.id, "kit.json");
    if (!existsSync(manifestPath)) {
      errors.push(`Missing kit manifest: ${kit.id}`);
      continue;
    }

    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as { id?: string };
    if (manifest.id !== kit.id) errors.push(`Kit id mismatch: ${kit.id}`);
  }

  for (const starter of starterDefinitions) {
    const manifestPath = join(root, "templates", "premium", starter.id, "starter.json");
    if (!existsSync(manifestPath)) {
      errors.push(`Missing starter manifest: ${starter.id}`);
      continue;
    }

    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as { id?: string };
    if (manifest.id !== starter.id) errors.push(`Starter id mismatch: ${starter.id}`);
  }

  return errors;
}

function createApp(argv: string[]) {
  const name = getOption(argv, "name") ?? "nativesmart-app";
  const templateId = getOption(argv, "template") ?? "fintech-mobile-app";
  const starter = getStarterDefinition(templateId);

  if (!starter) {
    console.error(`Starter not found: ${templateId}`);
    return 1;
  }

  const appDir = resolve(process.cwd(), name);
  if (existsSync(appDir)) {
    console.error(`Target directory already exists: ${appDir}`);
    return 1;
  }

  mkdirSync(appDir, { recursive: true });
  mkdirSync(join(appDir, "src"), { recursive: true });
  const copiedStarter = copyStarterFiles(starter.id, appDir);

  writeJson(join(appDir, "package.json"), {
    name,
    version: "0.1.0",
    private: true,
    scripts: {
      start: "expo start",
      android: "expo start --android",
      ios: "expo start --ios",
      web: "expo start --web"
    },
    dependencies: {
      "@nativesmart/core": "latest",
      "@nativesmart/react-native": "latest",
      expo: "^53.0.0",
      react: "^19.0.0",
      "react-native": "^0.79.0"
    }
  });
  writeJson(join(appDir, "nativesmart.config.json"), {
    starter: starter.id,
    kits: starter.kits,
    theme: "light",
    source: copiedStarter ? "premium-template" : "generated-minimal"
  });
  writeJson(join(appDir, "tsconfig.json"), {
    extends: "expo/tsconfig.base",
    compilerOptions: {
      strict: true
    }
  });

  writeFileSync(
    join(appDir, "App.tsx"),
    copiedStarter
      ? [
          'import { AppNavigator } from "./src/navigation/AppNavigator";',
          "",
          "export default AppNavigator;",
          ""
        ].join("\n")
      : [
          'import { NativesmartProvider, Text, Button, Card } from "@nativesmart/react-native";',
          "",
          "export default function App() {",
          "  return (",
          '    <NativesmartProvider mode="light">',
          "      <Card>",
          `        <Text variant="title">${starter.name}</Text>`,
          "        <Text muted>Generated with Nativesmart.</Text>",
          '        <Button label="Continue" />',
          "      </Card>",
          "    </NativesmartProvider>",
          "  );",
          "}",
          ""
        ].join("\n")
  );

  writeFileSync(
    join(appDir, "README.md"),
    [
      `# ${starter.name}`,
      "",
      `Generated from \`${starter.id}\` with Nativesmart.`,
      copiedStarter
        ? "Premium template files were copied into `src/`."
        : "A minimal shell was generated.",
      "",
      "## Included kits",
      "",
      ...starter.kits.map((kit) => `- ${kit}`),
      ""
    ].join("\n")
  );

  console.log(`Created ${starter.name} in ${appDir}`);
  return 0;
}

function addKit(argv: string[]) {
  const kitId = getArgAfterCommand(argv, "add kit");
  const kit = kitId ? getKitDefinition(kitId) : null;

  if (!kit) {
    console.error(`Kit not found: ${kitId ?? "(missing id)"}`);
    return 1;
  }

  const configPath = resolve(process.cwd(), "nativesmart.config.json");
  const current = existsSync(configPath)
    ? (JSON.parse(readFileSync(configPath, "utf8")) as { kits?: string[] })
    : {};
  const kits = Array.from(new Set([...(current.kits ?? []), kit.id]));
  writeJson(configPath, { ...current, kits });
  console.log(`Added kit: ${kit.id}`);
  return 0;
}

function runDoctor() {
  const errors = validateWorkspace();
  const nodeMajor = Number(process.versions.node.split(".")[0]);

  console.log(`Node: ${process.versions.node}`);
  console.log(`Kits: ${kitDefinitions.length}`);
  console.log(`Starters: ${starterDefinitions.length}`);

  if (nodeMajor < 20) {
    console.error("Node 20 or newer is required.");
    return 1;
  }

  if (errors.length > 0) {
    console.error(errors.join("\n"));
    return 1;
  }

  console.log("Nativesmart workspace looks healthy.");
  return 0;
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
    const id = getArgAfterCommand(argv, command);
    const kit = id ? getKitDefinition(id) : null;
    if (!kit) {
      console.error(`Kit not found: ${id ?? "(missing id)"}`);
      return 1;
    }
    console.log(JSON.stringify(kit, null, 2));
    return 0;
  }

  if (command === "show starter") {
    const id = getArgAfterCommand(argv, command);
    const starter = id ? getStarterDefinition(id) : null;
    if (!starter) {
      console.error(`Starter not found: ${id ?? "(missing id)"}`);
      return 1;
    }
    console.log(JSON.stringify(starter, null, 2));
    return 0;
  }

  if (command === "create app") return createApp(argv);
  if (command === "add kit") return addKit(argv);
  if (command === "doctor") return runDoctor();

  if (command === "validate") {
    const errors = validateWorkspace();
    if (errors.length > 0) {
      console.error(errors.join("\n"));
      return 1;
    }
    console.log("Nativesmart catalog is valid.");
    return 0;
  }

  if (command === "sync-tokens") {
    console.log(
      "Run `pnpm tokens:build` to regenerate JSON, Flutter and React Native token outputs."
    );
    return 0;
  }

  console.log(`Command "${command}" is reserved for the MVP generator roadmap.`);
  return 0;
}

if (require.main === module) {
  const exitCode = runCli(process.argv);
  process.exit(exitCode);
}
