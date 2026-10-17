// Builds the Nativesmart Lab: the showcase shell plus every renderer playground under it.
import { execSync } from "node:child_process";
import { cpSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const renderers = [{ id: "vue", app: "@nativesmart/app-vue", dir: "apps/web/vue" }];
const output = resolve(root, "apps/showcase/dist");

const run = (command) => execSync(command, { cwd: root, stdio: "inherit" });

run("pnpm --filter @nativesmart/showcase build");
for (const renderer of renderers) {
  run(`pnpm --filter ${renderer.app} build`);
  const target = resolve(output, renderer.id);
  rmSync(target, { recursive: true, force: true });
  cpSync(resolve(root, renderer.dir, "dist"), target, { recursive: true });
}
console.log(`Nativesmart Lab built in ${output}`);
