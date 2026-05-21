import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const allowMissing = process.argv.includes("--allow-missing");
const flutterPackageDir = resolve("packages/flutter");

function commandExists(command) {
  const lookup = process.platform === "win32" ? "where" : "which";
  const result = spawnSync(lookup, [command], {
    encoding: "utf8",
    shell: process.platform === "win32"
  });
  return result.status === 0;
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    encoding: "utf8",
    shell: process.platform === "win32"
  });

  if (result.error?.code === "ENOENT") {
    if (allowMissing) {
      console.warn("Flutter SDK not found; skipping optional Flutter validation.");
      process.exit(0);
    }

    console.error("Flutter SDK not found. Install Flutter to validate packages/flutter.");
    process.exit(1);
  }

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (!commandExists("flutter")) {
  if (allowMissing) {
    console.warn("Flutter SDK not found; skipping optional Flutter validation.");
    process.exit(0);
  }

  console.error("Flutter SDK not found. Install Flutter to validate packages/flutter.");
  process.exit(1);
}

run("flutter", ["--version"]);
run("flutter", ["pub", "get"], { cwd: flutterPackageDir });
run("flutter", ["analyze"], { cwd: flutterPackageDir });
run("flutter", ["test"], { cwd: flutterPackageDir });
