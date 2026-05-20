import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const requiredKitDirs = [
  "components",
  "screens",
  "flows",
  "mock-data",
  "adapters",
  "docs",
  "tests"
];
const requiredStarterDirs = ["navigation", "auth", "screens", "api", "docs"];

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const kitRegistry = readJson(join(root, "kits", "registry.json"));
for (const kit of kitRegistry.kits) {
  const kitDir = join(root, "kits", kit.id);
  const manifestPath = join(kitDir, "kit.json");
  assert(existsSync(manifestPath), `Missing kit manifest: ${kit.id}`);
  const manifest = readJson(manifestPath);
  assert(manifest.id === kit.id, `Kit id mismatch: ${kit.id}`);
  assert(Array.isArray(manifest.components), `Kit components must be an array: ${kit.id}`);
  assert(Array.isArray(manifest.flows), `Kit flows must be an array: ${kit.id}`);
  for (const dir of requiredKitDirs) {
    assert(existsSync(join(kitDir, dir)), `Missing ${dir} directory for kit: ${kit.id}`);
  }
}

const starterRegistry = readJson(join(root, "templates", "premium", "registry.json"));
for (const starter of starterRegistry.starters) {
  const starterDir = join(root, "templates", "premium", starter.id);
  const manifestPath = join(starterDir, "starter.json");
  assert(existsSync(manifestPath), `Missing starter manifest: ${starter.id}`);
  const manifest = readJson(manifestPath);
  assert(manifest.id === starter.id, `Starter id mismatch: ${starter.id}`);
  assert(Array.isArray(manifest.kits), `Starter kits must be an array: ${starter.id}`);
  for (const dir of requiredStarterDirs) {
    assert(
      existsSync(join(starterDir, dir)),
      `Missing ${dir} directory for starter: ${starter.id}`
    );
  }
}

console.log(
  `Validated ${kitRegistry.kits.length} kits and ${starterRegistry.starters.length} premium starters.`
);
